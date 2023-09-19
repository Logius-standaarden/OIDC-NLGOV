# OpenID Client profile

## Client Types

OAuth 2.0 defines two Client Types (*confidential* and *public* Clients) and three Client Profiles (*Web Applications*, *Browser / User-Agent based Applications*, and *Native Applications*).

This profile includes specific design considerations related to security and platform capabilities for these different Client Types and Profiles.

> **Note:** The iGov and NL GOV Assurance profiles for OAuth 2.0 use a slightly different segregation of Client Types: *Full Clients* and *Native Clients* act on behalf of a End-User and *Direct Access Clients* act on behalf of themselves (e.g. those Clients that facilitate bulk transfers). *Direct Access Clients* are out of scope for this profile; *Full Clients* and *Native Clients* are treated as *Web applications* and *Native applications* respectively. This profile follows the OAuth 2.0 specification [[RFC6749]] instead, as it allows for better provisioning of specific security considerations specific to the different Client types and it aligns better to the Security Best Practices for the different Client profiles.

The following design considerations apply to all Clients:

- Clients MUST use 'Proof Key for Code Exchange' [[RFC7636]] to protect calls to the Token Endpoint.
- Clients SHOULD restrict its Client-Side script (e.g. JavaScript) execution to a set of statically hosted scripts via a 'Content Security Policy' [[CSP]].
- Clients SHOULD use 'Subresource Integrity' [[SRI]] to verify that any dependencies they include (e.g. via a Content Delivery Network) are not unexpectedly manipulated.

### Web Applications

*Web applications* are applications that run on a web server and are consumed through the user-agent ("browser") by the End-User. Web applications are capable of securely authenticating themselves and of maintaining the confidentiality of secrets (e.g. Client credentials and tokens) and are therefore considered *confidential* Clients (OAuth 2.0 [[RFC6749]], Section 2.1).

### Browser-based Applications

*Browser-based applications* are applications that are dynamically downloaded and executed in a web browser that are also sometimes referred to as *user-agent-based applications* or *single-page applications*. Browser-based applications are considered to be not capable of maintaining the confidentiality of secrets, as they may be vulnerable to several types of attacks, including Cross-Site Scripting (XSS), Cross Site Request Forgery (CSRF) and OAuth token theft. Browser-based applications are considered *public* Clients (OAuth 2.0 [[RFC6749]], Section 2.1).

- Browser-based applications SHOULD follow the best practices specified in [[?OAuth2.Browser-Based-Apps]].

### Native and Hybrid Applications

*Native applications* are applications installed and executed on the device used by the End-User (i.e. desktop applications, native mobile applications). Native applications can sufficiently protect dynamically issued secrets, but are not capable of maintaining the confidentiality of secrets that are statically included as part of an app distribution. Therefore, Native applications are considered *public* Clients, except when they are provisioned per-instance secrets via mechanisms like Dynamic Client Registration (OAuth 2.0 [[RFC6749]], Section 2.1).

*Hybrid applications* are applications implemented using web-based technology but distributed as a native app; these are considered equivalent to native applications for the purpose of this profile.

- Native applications MUST follow the best practices as specified in OAuth 2.0 for Native Apps [[RFC8252]].
- The use of *confidential* Native applications (which are provisioned per-instance secrets) is RECOMMENDED over *public* Native applications, as *confidential* Clients provide better means to perform secure Client Authentication.
- Native applications MUST use an external user-agent or "in-app browser tab" to make authorization requests; an "embedded user-agent" or "web-view" components MUST NOT be used for this purpose. See 'OAuth 2.0 for Native apps' [[RFC8252]] for more information on the "in-app browser tab" feature and support on various platforms.

## Authorization Endpoint

### Authentication Request

The following describes the supported OpenID Connect Authorization Code Flow parameters for use with a NL Gov compatible OpenID Provider.
Some of these requirements are inherited as specified in Section 2.1.1 of [[OAuth2.NLGov]].

Request Parameters:

`client_id`

- REQUIRED. Valid OAuth 2.0 Client Identifier. MUST have the value as obtained during registration. Identical as in [[OAuth2.NLGov]].

`response_type`

- REQUIRED. MUST have value `code` for the Authorization Code Flow. Identical as in [[OAuth2.NLGov]].

`scope`

- REQUIRED. Indicates the access privileges being requested. MUST contain at least the value `openid` and SHOULD contain a specific scope for which access is requested.

`redirect_uri`

- REQUIRED. Indicates a valid endpoint where the Client will receive the authentication response. MUST be an absolute HTTPS URL unless the Client is a native application operating on a desktop device. In case of a native application on a desktop, this MAY be an absolute HTTP URL with the literal loopback IP address and port number the Client is listening on as hostname. MUST NOT use `localhost` for loopback addresses, see [[RFC8252]] Sections 7.3 and 8.3. MUST exactly match one of the Redirection URI values for the Client pre-registered at the OpenID Provider, except for the port URI component on loopback addresses for native applications on desktops. Inter-app redirect URIs for Native applications on mobile devices MUST use Claimed `https` Scheme URI Redirection, as specified in Section 7.2 of [[RFC8252]].

`state`

- REQUIRED. Unguessable random string generated by the Client, used to protect against Cross-Site Request Forgery (CSRF, XSRF) attacks. Must contain at least 128 bits of cryptographic random to avoid guessing. Returned to the Client in the Authentication Response. Identical as in [[OAuth2.NLGov]].

`nonce`

- REQUIRED. Unguessable random string generated by the Client, used to associate a Client session with an ID Token and to protect against replay attacks. Must contain at least 128 bits of cryptographic random to avoid guessing. Returned to the Client in the ID Token. See also [[OpenID.Core]], Section 15.5.2 for implementation notes.

`acr_values`

- OPTIONAL. Lists the acceptable LoAs for this authentication. Under this profile, `acr_values` takes precedence over `vtr`. See also [Section 5.2.3](#authentication-context). Identical as in [[OpenID.Core]].

`vtr`

- OPTIONAL. MUST be set to a value as described in Section 6.1 of Vectors of Trust [[RFC8485]]. MUST NOT be used when `acr_values` is set or when the `acr` Claim is requested via the `claims` parameter. See also [Section 5.2.4](#vectors-of-trust).

`claims`

- OPTIONAL. This parameter is used to request specific Claims. The value is a JSON object listing the requested Claims, as specified in section 5.5 of [[OpenID.Core]].

`code_challenge`

- REQUIRED. Code challenge as in PKCE [[RFC7636]].

`code_challenge_method`
- REQUIRED. MUST use the value of `S256`.

<aside class="example">
A sample request may look like:
  <pre>
  https://idp-p.example.com/authorize?
  client_id=55f9f559-2496-49d4-b6c3-351a586b7484
  &nonce=cd567ed4d958042f721a7cdca557c30d
  &response_type=code
  &scope=openid+email
  &redirect_uri=https%3A%2F%2Fclient.example.org%2Fcb
  &state=481e9c0c52e751a120fd90f7f4b5a637
  &acr_values=http%3a%2f%2feidas.europa.eu%2fLoA%2fsubstantial
  &code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM
  &code_challenge_method=S256
  </pre>
</aside>

### Request Objects

Clients MAY optionally send requests to the Authorization Endpoint using the `request` or `request_uri` parameter as defined by OpenID Connect [[OpenID.Core]], section 6.
Passing a Request Object by reference using the `request_uri` is preferred because of browser limits and network latency.

Request Objects MUST be signed by the Client's registered key. Request Objects MAY be encrypted to the OpenID Provider's public key. When sending Request Objects by reference, Clients MUST pre-register `request_uri` values with the OpenID Provider at registration and MUST only use pre-registered values for `request_uri`.

### Authentication Response Validation

All Clients MUST validate the following in received Authentication Responses:

`state`
- The `state` response parameter MUST be present and MUST equal the `state` request parameter sent in the Authentication Request.

This in line with OpenID Connect Core ([[OpenID.Core]], Section 3.1.2.7), which equals to OAuth 2.0 ([[RFC6749]], Section 4.1.2 and 10.12). Verifying the `state` returned in the Authorization Response is part of CSRF mitigation measures and will help prevent attacks with late or stale responses, among others.

## Token Endpoint

### Client Authentication

Confidential Clients, as defined in [Section 4.1](#client-types), MUST authenticate to the OpenID Provider using either:

- a JWT assertion as defined by the 'JWT Profile for OAuth 2.0 Client Authentication and Authorization Grants' [[RFC7523]] using only the `private_key_jwt` method defined in [[OpenID.Core]]; or
- mutually authenticated TLS, as specified in [[RFC8705]]. In case of a mutual TLS connection (mTLS) between the Client and the server, the JWT assertion SHOULD be omitted and the `client_id` parameter MUST be included.

Public Clients MAY authenticate to the OpenID Provider. However, the OpenID Provider MUST NOT rely on public Client Authentication for the purpose of identifying the Client.

Clients MUST NOT use more than one authentication method in each request.

### Token Request

The following describes the supported parameters for the Token Request. Some of these requirements are inherited as specified in Section 2.3.1 of [[OAuth2.NLGov]].

The following parameters are specified:

`grant_type`
- REQUIRED. MUST contain the value `authorization_code`. Identical as in [[OAuth2.NLGov]].
  
`code`
- REQUIRED. The value of the `code` parameter returned in the Authorization Response. Clients MUST NOT use the same authorization code more than once. Identical as in [[OAuth2.NLGov]].

`client_assertion`
- REQUIRED, in case `private_key_jwt` is used for Client Authentication. The value of the signed Client Authentication JWT generated as described in [[OAuth2.NLGov]]. The OpenID Client MUST generate a new assertion JWT for each call to the Token Endpoint.  

`client_assertion_type`
- REQUIRED, in case `client_assertion` is present. MUST be set to `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`.
  
`client_id`
- REQUIRED, in case mutually authenticated TLS is used for Client Authentication.

`code_verifier`
- REQUIRED. Code verifier as in PKCE [[RFC7636]].

### Token Response Validation

All Clients MUST validate the following in received Token Responses:

- Follow the Token Response validation rules in [[RFC6749]], Sections 5.1 and 10.12.
- Validate the Access Token according to [[OpenID.Core]], Section 3.1.3.8.
- Validate the ID Token according to [[OpenID.Core]], Section 3.1.3.7, as well as the below mentioned requirements for validating the ID Token.

This in line with [[OpenID.Core]], Section 3.1.3.5.

### ID Tokens

All Clients MUST validate the signature of an ID Token before accepting it. Validation can be done using the public key of the issuing server, which is published in JSON Web Key (JWK) format. ID Tokens MAY be encrypted using the appropriate key of the requesting Client.

Clients MUST verify the following in received ID tokens:

`iss`
- The `issuer` Claim is the Uniform Resource Locater (URL) of the expected Issuer. Identical as in [[OpenID.iGov]].

`aud`
- The `audience` Claim contains the Client ID of the Client. Identical as in [[OpenID.iGov]].

`nonce`
- The `nonce` parameter in the ID Token MUST equal the `nonce` request parameter sent in the Authentication Request. This is in line with [[OpenID.Core]], Section 3.1.3.7.

`exp`, `iat`, `nbf`
- The `expiration`, `issued at`, and `not before` timestamps for the token are within acceptable ranges. These Claims are formatted as Unix Time Stamps (number of seconds since 1970-01-01T00:00:00Z UTC). Values for `iat` and `nbf` MUST lie in the past and `exp` MUST lie in the future; the acceptable range for how far away `iat` is in the past is specific to the Client. This is in line with [[OpenID.iGov]].

`acr`
- The Level of Assurance received in the `acr` Claim is at least the Level of Assurance requested. See also [Section 5.2.3](#authentication-context). This is in line with [[OpenID.Core]], Section 3.1.3.7.

`represents`
- The `represents` Claim, if applicable, identifies the represented service consumer on behalf of which the End-User intends to authenticate. Any Client MUST be able to process `represents` Claims. As an exception, `represents` Claims MAY be ignored by the Client if, and only if, it is explicitly agreed upon beforehand that no Representation will be provided.

## Discovery

All Clients SHOULD use OpenID Provider discovery to avoid manual configuration and risk of mistakes.

Clients SHOULD acquire OpenID Provider metadata using either 'OpenID Connect Discovery 1.0' ([[OpenID.Discovery]] Section 4) or 'OAuth 2.0 Authorization Server Metadata' ([[RFC8414]] Section 3) via one of the Discovery endpoints provided by the OpenID Provider. See also Section [5.4](#discovery).

Clients SHOULD NOT use OpenID Provider Issuer Discover using WebFinger (as described in [[OpenID.Core]], Section 2) to avoid privacy issues such as leaking information to unknown locations.

Clients SHOULD follow caching directives provided by the OpenID Provider via HTTP headers [[RFC7234]] for the OpenID Provider's Discovery and `jwks` endpoints. This to avoid having to unnecessarily re-retrieve these documents while getting fresh updates of these documents when they have changed.

Clients SHOULD support `signed_metadata` as specified in [[RFC8414]] Section 2.1. In case signed metadata is available, this MUST be used over non-signed metadata and the signature MUST be verified prior to further utilizing any contents.

Clients MUST use the public keys obtained from the `jwks` endpoint to validate the signature on tokens or to encrypt Request Objects to the OpenID Provider.

## Registration

All Clients MUST register with the OpenID Provider.

Native Clients MUST either be provisioned a unique per-instance Client identifier or be registered as *public* Clients by using a common Client identifier; browser-based Clients MUST be registered as *public* Clients.

Clients SHOULD use Dynamic Registration as per [[RFC7591]] to reduce manual labor and the risks of configuration errors. Dynamic Client Registration Management Protocol [[RFC7592]] MAY be used by Clients.

In case a native Client is using per-instance registration, the Client MUST use Dynamic Registration.
