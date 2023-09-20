# OpenID Provider profile

For OpenID Providers the following items are applicable:

- OpenID Providers MUST implement all *Mandatory to Implement Features for All OpenID Providers* (Section 15.1) and all *Mandatory to Implement Features for Dynamic OpenID Providers* (Section 15.2) of [[OpenID.Core]]. Note that these Mandatory to Implement features include required support for the Hybrid Flow for authentication (Response Types `id_token` and `id_token token`). This profile deviates from this requirement, as this profile specifically forbids the use of the Hybrid Flow (see also [Chapter 3](#flow)).
- OpenID Providers MUST support and require the use of 'Proof Key for Code Exchange' ([[RFC7636]]) using only the `S256` verification method and a code verifier with at least 43 and at most 128 cryptographically random characters to allow Clients to protect calls to the Token Endpoint.
- OpenID Providers MUST apply the necessary 'Cross-Origin Resource Sharing' ([[CORS]]) headers to allow browsers to protect requests to its endpoints and SHOULD NOT use wildcard origins.
- OpenID Providers that support Web Applications SHOULD follow the best practices specified in [[?OAuth2.Browser-Based-Apps]].
- OpenID Providers that support Native Applications MUST follow the best practices specified in OAuth 2.0 for Native Apps [[RFC8252]].

## Authorization Endpoint of the Provider profile

### Request Objects of the Provider profile

OpenID Providers MUST accept requests containing a Request Object signed by the Client's private key. OpenID Providers MUST validate the signature on such requests against the Client's registered public key. OpenID Providers MUST accept Request Objects encrypted to the OpenID Provider's public key.

OpenID Providers SHOULD accept Request Objects by reference using the `request_uri` parameter. The Request Object can be either hosted by the Client or pushed to the OpenID Provider prior to the Authentication Request. OpenID Providers MUST verify that the `request_uri` parameter exactly matches one of the `request_uri` values for the Client pre-registered at the OpenID Provider, with the matching performed as described in Section 6.2.1 of [[RFC3986]] (Simple String Comparison).

Using Request Objects allows for Clients to create a request that is protected from tampering through the browser, allowing for a higher security and privacy mode of operation for Clients and applications that require it. Clients are not required to use Request Objects, but OpenID Providers are required to support requests using them.

> Note that when a Request Object is used (either passed by value or by reference), the Client MAY send the parameters included in the Request Object duplicated in the query parameters as well for backwards compatibility (so that the request is a valid OAuth 2.0 Authorization Request). However, the OpenID Provider MUST only consider the parameters included in the Request Object and ignore the duplicated query parameters.

## Token Endpoint of the Provider profile

### Token Request Validation

OpenID Providers MUST validate all incoming Token Requests according to [[OpenID.Core]], Section 3.1.3.2.

In addition, OpenID Providers MUST validate the `code_verifier` value against the `code_challenge` and `code_challenge_method` values specified by the Client in the Authorization Request according to [[RFC7636]], Section 4.6.

### ID Tokens of the Provider profile

All ID Tokens MUST be signed by the OpenID Provider's private signature key.
ID Tokens MAY be encrypted using the appropriate key of the requesting Client.

The ID Token MUST expire and SHOULD have an active lifetime no longer than five minutes. Since the ID Token is consumed by the Client and not presented to remote systems, it is RECOMMENDED that expiration times are kept as short as possible.

The Token Response includes an Access Token (which can be used to make a UserInfo request) and ID Token (a signed and optionally encrypted JSON Web Token). This profile imposes the following requirements on the Claims used in ID Tokens:

`iss`

- REQUIRED. The `issuer` field is the Uniform Resource Locator (URL) of the expected Issuer. Identical as in [[OpenID.iGov]].

`aud`

- REQUIRED. The `audience` field contains the Client ID of the Client. Identical as in [[OpenID.iGov]].

`sub`

- REQUIRED. The identifier of the authenticated End-User, also known as the subject. OpenID Providers MUST support a pairwise identifier in accordance with the OpenID Connect specification [[OpenID.Core]], section 8.1. See [Pairwise Identifiers](#pairwise-identifiers) on when it may be useful to relax this requirement. Identical as in [[OpenID.iGov]].

`sub_id_type`

- OPTIONAL. The type of identifier passed in the `sub` Claim. In order to support multiple types of identifiers in an interoperable way, the type of identifier used for the identifier in the `sub` Claim SHOULD be explicitly included. The value of the `sub_id_type` MUST be a URI. Values supported by the OpenID Provider are provided via the [Discovery endpoint](#discovery-endpoint).

`acr`

- OPTIONAL. The LoA the End-User was authenticated at. MUST be at least the requested Level of Assurance value requested by the Client (either via the `acr_values` or `claims` parameters) or - if none was requested - a Level of Assurance established through prior agreement. See also [Section 5.2.3](#authentication-context). As eIDAS is leading in most scenarios targeted by this profile, using the `acr` Claim to express the Level of Assurance is preferred over Vectors of Trust (`vot`).

`nonce`

- REQUIRED. MUST contain the `nonce` value that was provided in the Authentication Request. Identical as in [[OpenID.iGov]].

`jti`

- REQUIRED. A unique identifier for the token, which can be used to prevent reuse of the token. The value of `jti` MUST uniquely identify the ID Token between sender and receiver for at least 12 months.

`auth_time`

- REQUIRED if `max_age` was specified in the request or when `auth_time` was requested as an Essential Claim. Otherwise `auth_time` is OPTIONAL and SHOULD be included if the OpenID Provider can assert an End-User's authentication intent was demonstrated. For example, a login event where the End-User took some action to authenticate. See also Section 15.1 of [[OpenID.Core]].

`exp`, `iat`, `nbf`

- REQUIRED. The `expiration`, `issued at`, and `not before` timestamps indicate when the token expires, was issued and becomes valid, respectively. The expiration time for ID Tokens is specific to the OpenID Provider. In line with [[OpenID.iGov]].

`represents`

- REQUIRED in case Representation is applicable, the `represents` Claim provides information about the effective authorization due to a Representation Relationship for the End-User.

`alt_sub`

- OPTIONAL. Describes alternative Subject Identifiers for the authenticated End-User in the context of a specific audience. The value of `alt_sub` is an array of objects, each of which MUST contain `sub` and `aud` Claims to uniquely identify the authenticated End-User and the audience for the alternative Subject Identifier and SHOULD contain a `sub_id_type` Claim to explicitly indicate the type of identifier used in the `sub` claim if the OpenID Provider supports multiple types of subject identifiers.

`vot`

- OPTIONAL. The vector value as specified in Vectors of Trust. MUST NOT be included when `acr` is included. See also [Section 5.2.4](#vectors-of-trust).

`vtm`

- REQUIRED if `vot` is provided. The trustmark URI as specified in Vectors of Trust. See also [Section 5.2.4](#vectors-of-trust).

Other Claims MAY be included. See Claims Request below on how such Claims SHOULD be requested by the Client to be provided by the OpenID Provider.

<aside class="example">
  
This example ID Token has been signed using the server's RSA key:
<pre>
            eyJhbGciOiJSUzI1NiJ9.eyJleHAiOjE0MTg2OTk0
            MTIsInN1YiI6IjZXWlFQcG5ReFYiLCJzdWJfaWRfd
            HlwZSI6InVybjpubC1laWQtZ2RpOjEuMDppZDpwc2
            V1ZG9ueW0iLCJub25jZSI6IjE4ODYzN2IzYWYxNGE
            iLCJhdWQiOlsiYzFiYzg0ZTQtNDdlZS00YjY0LWJi
            NTItNWNkYTZjODFmNzg4Il0sImFsdF9zdWIiOlt7I
            mF1ZCI6IjM3OWIwMjJkLWQ5ZDAtNGM0My1iN2RlLT
            I5MGEwMjNlYjQ2MSIsInN1YiI6InhTSENyRm05Qkc
            iLCJzdWJfaWRfdHlwZSI6InVybjpubC1laWQtZ2Rp
            OjEuMDppZDpwc2V1ZG9ueW0ifV0sImlzcyI6Imh0d
            HBzOi8vaWRwLXAuZXhhbXBsZS5jb20vIiwiYWNyIj
            oiaHR0cDovL2VpZGFzLmV1cm9wYS5ldS9Mb0Evc3V
            ic3RhbnRpYWwiLCJpYXQiOjE0MTg2OTg4MTIsImp0
            aSI6ImE2NWM1NjBkLTA4NWMtNDY2ZS05N2M1LWY4N
            jM5ZmNhNWVhNyIsIm5iZiI6MTQxODY5OTExMn0
</pre>
Its Claims are as follows:
<pre>
     {
            "auth_time": 1418698782,
            "exp": 1418699412,
            "sub": "6WZQPpnQxV",
            "sub_id_type": "urn:nl-eid-gdi:1.0:id:pseudonym",
            "nonce": "188637b3af14a",
            "aud": [
              "c1bc84e4-47ee-4b64-bb52-5cda6c81f788"
            ],
            "alt_sub": [{
              "aud": "379b022d-d9d0-4c43-b7de-290a023eb461",
              "sub": "xSHCrFm9BG",
              "sub_id_type": "urn:nl-eid-gdi:1.0:id:pseudonym"
            }],
            "iss": "https://idp-p.example.com/",
            "acr": "http://eidas.europa.eu/LoA/substantial",
            "iat": 1418698812,
            "jti": "a65c560d-085c-466e-97c5-f8639fca5ea7",
            "nbf": 1418699112,
      }
</pre>
</aside>

### Pairwise Identifiers

Pairwise Subject Identifiers specified in OpenID Connect Core [[OpenID.Core]] Section 8 help protect an End-User's privacy by allowing an OpenID Provider to represent a single End-User with a different Subject Identifier (`sub`) for every Client the End-User connects to. This technique can help mitigate correlation of an End-User between multiple Clients and therewith tracking of End-Users between different sites and applications.

Use of pairwise identifiers does not prevent Clients from correlating data based on other identifying attributes such as names, phone numbers, email addresses, document numbers, or other attributes. However, since not all transactions require access to these attributes, but a Subject Identifier is always required, a pairwise identifier will aid in protecting the privacy of End-Users as they navigate the system.

OpenID Providers MUST support pairwise identifiers for cases where correlation of End-User's activities across Clients is not appropriate. OpenID Providers MAY support public identifiers for frameworks where public identifiers are required, or for cases where public identifiers are shared as attributes and the framework does not have a requirement for subject anonymity.

*Burgerservicenummers (BSN)*, *Rechtspersonen en Samenwerkingsverbanden Identificatienummers (RSIN)* and *Kamer van Koophandel (KvK) nummers* are considered public sectoral identifiers and therefore MUST NOT be used as Subject Identifiers in case correlation of End-User's activities across Clients is not appropriate. In such cases, the use of Polymorphic Pseudonyms or Polymorphic Identities is preferred.

> Note that BSNs MUST only be used by Relying Parties for Services eligible for using the BSN according to Dutch Law and that the BSN, or token containing it, SHOULD be encrypted.

### Representation Relationships

In Use Cases that involve Representation Relationships, Representation Relationships are explicitly mentioned in the form of a `represents` Claim, analogous to the Delegation Semantics specified in [[RFC8693]].

> **Note**: Whereas [[RFC8693]] lists the End-User in the `act` or `may_act` Claims and the represented service consumer in the `sub` Claim, this is reversed in this profile: the End-User is listed in the `sub` Claim and the represented service consumer is listed in the `represents` Claim. Reason for this is to mitigate the risk that a Client that does not explicitly supports the Representation Use Cases cannot recognize the difference between an End-User that authenticates on behalf of himself or on behalf of someone else via Representation.

As such, all Clients MUST process `represents` Claims used, in case Representation can be applicable in the context of the OpenID Client and OpenID Provider. As an exception, `represents` Claims MAY be ignored by the Client if, and only if, it is explicitly agreed upon beforehand that no Representation will be provided.

This profile specifies Representation Relations in ID Tokens as follows:

- The End-User is always identified by the `sub` Claim;
- The represented service consumer is mentioned in the `represents` Claim.
- In case a chain representation is applicable, the representation chain is represented as a series of nested `represents` Claims with the represented service consumer listed as the deepest nested `represents` Claim.
- Each `represents` Claim MUST contain `sub` and `iss` Claims to uniquely identify the represented party and SHOULD contain a `sub_id_type` Claim to explicitly indicate the type of identifier used in the `sub` claim if the OpenID Provider supports multiple types of subject identifiers.
- `represents` Claims MAY contain additional Claims (e.g. `email`) to provide additional useful information about the represented party.
- Claims within the `represents` Claim pertain only to the identity of that party and MUST NOT contain Claims that are not related to the represented party, such as top-level Claims `exp`, `nbf`, and `aud`.

<aside class="example">
A sample chain representation for a requested scope `urn:uuid:a9e17a2e-d358-406d-9d5f-ad6045f712ba` may look like (note: the requested scope also includes the required `openid` scope; Claims that do not add to the example are omitted for readability):
<pre>
      {
        "scope": "openid urn:uuid:a9e17a2e-d358-406d-9d5f-ad6045f712ba",
        /* End-User - representing the service consumer */
        "sub": "RKyLpEVr1L",
        "sub_id_type": "urn:nl-eid-gdi:1.0:id:pseudonym",
        "iss": "urn:uuid:b556992a-e233-4fdc-915a-e2b52d3cc355",
        "represents": {
          /* Intermediary in representation chain - an organization in this example */
          "sub": "492099595",
          "sub_id_type": "urn:nl-eid-gdi:1.0:id:RSIN",
          "iss": "urn:uuid:28e0686f-20ff-41bd-8520-57b9c68cc9a3",
          "alt_sub": {
            "sub": "27381312",
            "sub_id_type": "urn:nl-eid-gdi:1.0:id:KvKnr",
            "iss": "urn:uuid:ebc29845-d35f-4c6a-bbb2-a59fdcb1cc6b"
          }
          "represents": {
            /* service consumer - represented by the End-User */
            "sub": "4Yg8u72NxR",
            "sub_id_type": "urn:nl-eid-gdi:1.0:id:pseudonym",
            "iss": "urn:uuid:55291cc0-fd2a-4eb6-b444-5b2783e62673"
          }
        }
      }
</pre>
</aside>

### Authentication Context

Whereas the iGov Assurance Profile for OpenID Connect [[OpenID.iGov]] recommends the use of Vectors of Trust (`vot`) to determine the amount of trust to be placed in digital transactions, using Authentication Context Class References (`acr`) instead is RECOMMENDED by this profile, due to their better alignment to the Levels of Assurance (LoA) defined by the `eIDAS` standards that are used in the European Union.

OpenID Providers SHOULD use eIDAS Level of Assurance (LoA) values for the `acr` Claim, but MAY use different values if eIDAS is not applicable. The eIDAS Level of Assurance values are defined as URIs in [[?eIDAS.SAML]], Section 3.2.

OpenID Providers MUST provide a Level of Assurance as `acr` value that is at least the requested Level of Assurance value requested by the Client (either via the `acr_values` or `claims` parameters) or - if none was requested - a Level of Assurance established through prior agreement.

OpenID Providers MUST NOT provide Authentication Methods References (`amr`), but MUST use Authentication Context Class References (`acr`) instead.

Clients MAY send an `vtr` (Vectors of Trust Request) parameter. If both the `vtr` and `acr_values` are in the request, the `acr_values` MUST take precedence and the `vtr` MUST be ignored.

> **Note:** Risk Based Authentication (RBA) should be an integral part of the LoA framework that is used by an OpenID Provider (the Identity Provider), such that the risk criteria for the resulting authentication are at least sufficient to meet the applicable LoA. That is, an OpenID Provider MAY apply RBA to require authentication methods with enhanced security or ease towards more user friendly methods when allowed by evaluated risk for an authentication, as long as the trust framework requirements are met. Selection of and criteria for any LoA framework are, however, situation specific and beyond the scope of this profile.

### Vectors of Trust

OpenID Providers MAY provide `vot` (Vectors of Trust) and `vtm` (Vector Trust Mark) values in ID Tokens only if the `acr` Claim is not requested by the Client (either via the `acr_values` or `claims` parameters). More information on Vectors of Trust is provided in [[RFC8485]].

### Access Tokens

This profile requires an Access Token to be in JWT form. This is in line with the underlying NL GOV Assurance profile for OAuth 2.0 [[OAuth2.NLGov]].

Using a JWT formatted Access Token allows any OpenID Client to consume and verify a token without the need for introspection, thus reducing the dependency on an interaction with an external endpoint. As a result this may reduce load and availability requirements on the OpenID Provider. Furthermore, it provides a more uniform format over Access Token, ID Token, UserInfo response and Introspection response.

> Note that ID Tokens and UserInfo responses are primarily intended for the Client. The Access Token is primarily intended for consumption by a Resource Server. The Introspection response is intended for the requestor of an Introspection, which can be either a Client or Resource Server.
The Resource Server is typically not considered as an actor in OpenID Connect, but OpenID Providers will often act as Authorization Servers. In the case of Service Intermediation this is applicable by definition.
This profile does not directly place any constraints on the placement of Claims in various tokens or response messages. Claims may be placed in any of the four tokens/response messages, unless explicitly specified otherwise. This allows for maximum flexibility and interoperability.

### Refresh Tokens

OpenID Providers MAY issue Refresh Tokens to Clients; when used, Refresh Tokens MUST be one-time-use or sender-constrained.

OpenID Providers MAY cryptographically bind Refresh Tokens to the specific Client instance (see also [[?OAuth2.1]], Section 6.1); other methods to create sender-constrained Refresh Tokens MAY be applied as well.

For security reasons, Refresh Tokens that are not sender-constrained MUST be one-time-use, i.e. with every Access Token refresh response the OpenID Provider can issue a new Refresh Token and MUST invalidate the previous Refresh Token (see also [[RFC6819]], Section 5.2.2.3 and [[?OAuth2.1]], Section 6.1).

Refresh Tokens MUST expire if the Client has been inactive for some time, i.e., the Refresh Token has not been used to obtain fresh Access Tokens for some time. The expiration time is at the discretion of the OpenID Provider, but MUST NOT exceed a maximum of 6 hours, preferably shorter.

For public Clients, no cryptographic key or Client Authentication method for binding Refresh Tokens to a specific Client is available. Public Clients therefore MUST use one-time-use Refresh Tokens with a limited validity, if applied.

## UserInfo Endpoint

OpenID Providers MUST support the UserInfo Endpoint and, at a minimum, the `sub` (subject) Claim. It is expected that the `sub` Claim will remain pseudonymous in Use Cases where obtaining personal information is not needed.

Support for a UserInfo Endpoint is important for maximum Client implementation interoperability even if no additional End-User information is returned. Clients are not required to call the UserInfo Endpoint, but SHOULD NOT receive an error if they do.

<aside class="example">
In an example transaction, the Client sends a request to the UserInfo Endpoint like the following:
<pre>
    GET /userinfo HTTP/1.1
    Authorization: Bearer eyJhbGciOiJSUzI1NiJ9.eyJleHAiOjE0MTg3MDI0MTIsIm
      F1ZCI6WyJjMWJjODRlNC00N2VlLTRiNjQtYmI1Mi01Y2RhNmM4MWY3ODgiXSwiaXNzIjo
      iaHR0cHM6XC9cL2lkcC1wLmV4YW1wbGUuY29tXC8iLCJqdGkiOiJkM2Y3YjQ4Zi1iYzgx
      LTQwZWMtYTE0MC05NzRhZjc0YzRkZTMiLCJpYXQiOjE0MTg2OTg4MTJ9i.HMz_tzZ90_b
      0QZS-AXtQtvclZ7M4uDAs1WxCFxpgBfBanolW37X8h1ECrUJexbXMD6rrj_uuWEqPD738
      oWRo0rOnoKJAgbF1GhXPAYnN5pZRygWSD1a6RcmN85SxUig0H0e7drmdmRkPQgbl2wMhu
      -6h2Oqw-ize4dKmykN9UX_2drXrooSxpRZqFVYX8PkCvCCBuFy2O-HPRov_SwtJMk5qjU
      WMyn2I4Nu2s-R20aCA-7T5dunr0iWCkLQnVnaXMfA22RlRiU87nl21zappYb1_EHF9ePy
      q3Q353cDUY7vje8m2kKXYTgc_bUAYuW-W3SMSw5UlKaHtSZ6PQICoA
    Accept: application/json
    Host: idp-p.example.com
    Connection: Keep-Alive
</pre>
And receives a document in response like the following:
<pre>
    HTTP/1.1 200 OK
    Date: Mon, 16 Dec 2019 03:00:12 GMT
    Access-Control-Allow-Origin: *
    Content-Type: application/json
    Content-Language: en-US
    Content-Length: 333
    Connection: close
</pre>
<pre>
    {
       "sub": "6WZQPpnQxV",
       "iss": "https://idp-p.example.com",
       "given_name": "Stephen",
       "family_name": "Emeritus",
    }
</pre>
</aside>

OpenID Providers MUST support the generation of JWT encoded responses from the UserInfo Endpoint. Responding with unsigned JSON objects when neither signing nor encryption are requested by the Client as part of the `userinfo_signed_response_alg` and `userinfo_encrypted_response_alg` Client metadata parameters registered as part of Client Registration is OPTIONAL. Signed responses MUST be signed by the OpenID Provider's signing key, and encrypted responses MUST be encrypted with the authorized Client's public key. Please refer to [Algorithms](#algorithms) for more information on cryptographic algorithms and keys.

## Discovery

The OpenID Connect Discovery [[OpenID.Discovery]] standard provides a standard, programmatic way for Clients to obtain configuration details for communicating with OpenID Providers. Discovery is an important part of building scalable federation ecosystems.

OpenID Providers under this profile MUST publish their server metadata to help minimize configuration errors and support automation for scalable deployments.

- Exposing a Discovery endpoint does NOT inherently put the OpenID Provider at risk to attack. Endpoints and parameters specified in the Discovery document SHOULD be considered public information regardless of the existence of the Discovery document.
- Access to the Discovery document MAY be protected with existing web authentication methods if required by the OpenID Provider. Credentials for the Discovery document are then managed by the OpenID Provider. Support for these authentication methods is outside the scope of this profile.
- Endpoints described in the Discovery document MUST be secured in accordance with this profile and MAY have additional controls the Provider wishes to support.

### Discovery endpoint

All OpenID Providers are uniquely identified by a URL known as the `issuer` and MUST make a Discovery document in JSON format available at the path formed by concatenating `/.well-known/openid-configuration` to the `issuer` and SHOULD also make this Discovery document available at the path formed by concatenating `/.well-known/oauth-authorization-server` to the `issuer`. OpenID Providers MAY also publish their Discovery documents on other locations. All paths on which the Discovery document is published MUST use the `https` scheme.

> Note that for privacy considerations, only direct requests to the server metadata document SHOULD be used. The WebFinger method to locate the relevant OpenID Provider and its metadata, as described in [[OpenID.Discovery]] section 2, MUST NOT be supported.

### Discovery document

This profile imposes the following requirements upon the Discovery document:

`issuer`

- REQUIRED. The fully qualified Issuer URL of the OpenID Provider as defined by [[RFC8414]].

`authorization_endpoint`

- REQUIRED. The fully qualified URL of the OpenID Provider's Authorization Endpoint as defined by [[RFC6749]].

`token_endpoint`

- REQUIRED. The fully qualified URL of the OpenID Provider's Token Endpoint as defined by [[RFC6749]].

`userinfo_endpoint`

- RECOMMENDED. The fully qualified URL of the OpenID Provider's Userinfo Endpoint as defined by [[OpenID.Core]].

`registration_endpoint`

- RECOMMENDED. The fully qualified URL of the OpenID Provider's Dynamic Registration endpoint [[RFC7591]].

`introspection_endpoint`

- OPTIONAL. The fully qualified URL of the OpenID Provider's Introspection Endpoint as defined by 'OAuth 2.0 Token Introspection' [[RFC7662]].

`revocation_endpoint`

- OPTIONAL. The fully qualified URL of the OpenID Provider's Revocation Endpoint as defined by 'OAuth 2.0 Token Revocation' [[RFC7009]].

`jwks_uri`

- REQUIRED. The fully qualified URL of the OpenID Provider's public keys in JWK Set format. These keys can be used by Clients to verify signatures on tokens and responses from the OpenID Provider and for encrypting requests to the OpenID Provider.

`scopes_supported`

- REQUIRED. The list of scopes the OpenID Provider supports as defined by [[RFC8414]].

`response_types_supported`

- REQUIRED. JSON array containing the list of OAuth 2.0 `response_type` values that the OpenID Provider supports. In the context of this profile, the value MUST Be ['code'].

`grant_types_supported`

- REQUIRED. JSON array containing the list of OAuth 2.0 `grant_type` values that the OpenID Provider supports. In the context of this profile, the value MUST be ['authorization_code'].

`claims_parameter_supported`

- OPTIONAL. Boolean value specifying whether the OpenID Provider supports the use of the `claims` parameter, as defined by [[OpenID.Discovery]].

`claims_supported`

- REQUIRED. JSON array containing the list of Claims available in the supported scopes as defined by [[OpenID.Discovery]]. See [Claims Supported](#claims-supported).

`claim_types_supported`

- OPTIONAL. JSON array containing the list of Claim types that the OpenID Provider supports. REQUIRED when `aggregated` or `distributed` Claims are used. If omitted, the OpenID Provider only supports `normal` Claims. Identical to [[OpenID.Discovery]].

`sub_id_types_supported`

- OPTIONAL. JSON array containing the list of supported types of Subject Identifiers in the `sub` Claim of ID Tokens. The values MUST be URIs, the exact URIs to be used are situation specific; as an example encrypted BSNs and Pseudonyms could be specified with `urn:nl-eid-gdi:1.0:id:BSN` or `urn:nl-eid-gdi:1.0:id:Pseudonym` respectively.

`acr_values_supported`

- OPTIONAL. JSON array containing the list of supported Levels of Assurances, as defined by [[OpenID.Discovery]]. See [Authentication Context](#authentication-context).

`subject_types_supported`

- REQUIRED. JSON array containing the list of Subject Identifier types that this OpenID Provider supports. Valid types include `pairwise` and `public`.

`token_endpoint_auth_methods_supported`

- REQUIRED. JSON array containing the list of Client Authentication methods that this OpenID Provider supports. With respect to this profile, the allowed values are `private_key_jwt`, `tls_client_auth`, or both.

`id_token_signing_alg_values_supported`

- REQUIRED. JSON array containing the list of JWS signing algorithms (`alg` values) supported by the OpenID Provider for the ID Token to encode the Claims in a JWT. For more information, refer to [Algorithms](#algorithms).

`id_token_encryption_alg_values_supported`

- OPTIONAL. JSON array containing the list of JWE encryption algorithms (`alg` values) supported by the OpenID Provider for the ID Token to encrypt the Content Encryption Key (CEK). REQUIRED when the OpenID Provider supports encryption of ID Tokens. For more information, refer to [Algorithms](#algorithms).

`id_token_encryption_enc_values_supported`

- OPTIONAL. JSON array containing the list of JWE encryption algorithms (`enc` values) supported by the OpenID Provider for the ID Token to encrypt the Claims in a JWT using the CEK. REQUIRED when the OpenID Provider supports encryption of ID Tokens. For more information, refer to [Algorithms](#algorithms).

`userinfo_signing_alg_values_supported`

- REQUIRED. JSON array containing the list of JWS signing algorithms (`alg` values) supported by the UserInfo Endpoint to encode the Claims in a JWT. For more information, refer to [Algorithms](#algorithms).

`userinfo_encryption_alg_values_supported`

- OPTIONAL. JSON array containing the list of JWE encryption algorithms (`alg` values) supported by the OpenID Provider for the UserInfo Endpoint to encrypt the Content Encryption Key (CEK). REQUIRED when the OpenID Provider supports encryption of UserInfo responses. For more information, refer to [Algorithms](#algorithms).

`userinfo_encryption_enc_values_supported`

- OPTIONAL. JSON array containing the list of JWE encryption algorithms (`enc` values) supported by the OpenID Provider for the UserInfo Endpoint to encrypt the Claims in a JWT using the CEK. REQUIRED when the OpenID Provider supports encryption of UserInfo responses. For more information, refer to [Algorithms](#algorithms).

`request_object_signing_alg_values_supported`

- REQUIRED. JSON array containing the list of JWS signing algorithms (`alg` values) supported by the OpenID Provider for Request Objects. These algorithms are applicable for Request Objects passed by value and passed by reference. For more information, refer to [Algorithms](#algorithms).

`request_object_encryption_alg_values_supported`

- OPTIONAL. JSON array containing the list of JWE encryption algorithms (`alg` values) supported by the OpenID Provider for Request Objects to encrypt the Content Encryption Key (CEK). REQUIRED when the OpenID Provider supports encryption of UserInfo responses. For more information, refer to [Algorithms](#algorithms).

`request_object_encryption_enc_values_supported`

- OPTIONAL. JSON array containing the list of JWE encryption algorithms (`enc` values) supported by the OpenID Provider for Request Objects to encrypt the Claims in a JWT using the CEK. REQUIRED when the OpenID Provider supports encryption of UserInfo responses. For more information, refer to [Algorithms](#algorithms).

`request_uri_parameter_supported`

- OPTIONAL. Boolean value which specifies whether the OpenID Provider accepts Request Objects passed by reference using the `request_uri` parameter. As per [[OpenID.Core]], the default value is `true`.

`require_request_uri_registration`

- REQUIRED and MUST have Boolean value `true` if the OpenID Provider accepts Request Objects passed by reference using the `request_uri` parameter. OPTIONAL otherwise. This parameter indicates that `request_uri` values used by the Client to send Request Objects by reference must always be pre-registered.

`signed_metadata`

- RECOMMENDED. A JWT, signed using JWS, containing metadata values about the OpenID Provider as claims, as specified in [[RFC8414]], Section 2.1.

<aside class="example">
The following example shows the JSON document found at a discovery endpoint for an OpenID Provider:
<pre>
    {
      "request_parameter_supported": true,
      "id_token_encryption_alg_values_supported": [
        "RSA-OAEP", "RSA-OAEP-256"
      ],
      "registration_endpoint": "https://idp-p.example.com/register",
      "userinfo_signing_alg_values_supported": [
        "RS256", "RS384", "RS512"
      ],
      "token_endpoint": "https://idp-p.example.com/token",
      "request_uri_parameter_supported": false,
      "request_object_encryption_enc_values_supported": [
        "A192CBC-HS384", "A192GCM", "A256CBC+HS512",
        "A128CBC+HS256", "A256CBC-HS512",
        "A128CBC-HS256", "A128GCM", "A256GCM"
      ],
      "token_endpoint_auth_methods_supported": [
        "private_key_jwt",
      ],
      "userinfo_encryption_alg_values_supported": [
        "RSA-OAEP", "RSA-OAEP-256"
      ],
      "subject_types_supported": [
        "public", "pairwise"
      ],
      "id_token_encryption_enc_values_supported": [
        "A192CBC-HS384", "A192GCM", "A256CBC+HS512",
        "A128CBC+HS256", "A256CBC-HS512", "A128CBC-HS256",
        "A128GCM", "A256GCM"
      ],
      "claims_parameter_supported": false,
      "jwks_uri": "https://idp-p.example.com/jwk",
      "id_token_signing_alg_values_supported": [
        "RS256", "RS384", "RS512"
      ],
      "authorization_endpoint": "https://idp-p.example.com/authorize",
      "require_request_uri_registration": false,
      "introspection_endpoint": "https://idp-p.example.com/introspect",
      "request_object_encryption_alg_values_supported": [
        "RSA-OAEP", "RSA-OAEP-256"
      ],
      "service_documentation": "https://idp-p.example.com/about",
      "response_types_supported": [
        "code", "token"
      ],
      "token_endpoint_auth_signing_alg_values_supported": [
        "RS256", "RS384", "RS512"
      ],
      "revocation_endpoint": "https://idp-p.example.com/revoke",
      "request_object_signing_alg_values_supported": [
        "HS256", "HS384", "HS512", "RS256", "RS384", "RS512"
      ],
      "claim_types_supported": [
        "normal"
      ],
      "grant_types_supported": [
        "authorization_code",
      ],
      "scopes_supported": [
        "profile", "openid", "doc"
      ],
      "userinfo_endpoint": "https://idp-p.example.com/userinfo",
      "userinfo_encryption_enc_values_supported": [
        "A192CBC-HS384", "A192GCM", "A256CBC+HS512","A128CBC+HS256",
        "A256CBC-HS512", "A128CBC-HS256", "A128GCM", "A256GCM"
      ],
      "op_tos_uri": "https://idp-p.example.com/about",
      "issuer": "https://idp-p.example.com/",
      "op_policy_uri": "https://idp-p.example.com/about",
      "claims_supported": [
        "sub", "name", "vot", "acr"
      ],
      "acr_values_supported" [
        "http://eidas.europa.eu/LoA/substantial",
        "http://eidas.europa.eu/LoA/high"
      ]
    }
</pre>
</aside>

### Caching

It is RECOMMENDED that OpenID Providers provide caching directives through HTTP headers for the Discovery endpoint and the `jwks_uri` endpoint and make the cache valid for at least one week.
OpenID Providers SHOULD document their change procedure. In order to support automated transitions to configuration updates, OpenID Providers SHOULD only make non-breaking changes and retain backward compatibility when possible. It is RECOMMENDED that OpenID Providers monitor usage of outdated configuration options used by any OpenID Client and actively work with their administrators to update configurations.
The above on caching and changes MUST be applied to the `jwks_uri` containing the OpenID Provider's key set as well.

### Public keys

The OpenID Provider MUST provide its public keys in JWK Set format, such as the following example JWK Set containing a PKIoverheid certificate chain and its 2048-bit RSA key (example certificates abbreviated):

<aside class="example">
  <pre>
    {
      "keys": [
        {
          "alg": "RS256",
          "e": "AQAB",
          "n": "o80vbR0ZfMhjZWfqwPUGNkcIeUcweFyzB2S2T-hje83IOVct8gVg9Fx
                vHPK1ReEW3-p7-A8GNcLAuFP_8jPhiL6LyJC3F10aV9KPQFF-w6Eq6V
                tpEgYSfzvFegNiPtpMWd7C43EDwjQ-GrXMVCLrBYxZC-P1ShyxVBOze
                R_5MTC0JGiDTecr_2YT6o_3aE2SIJu4iNPgGh9MnyxdBo0Uf0TmrqEI
                abquXA1-V8iUihwfI8qjf3EujkYi7gXXelIo4_gipQYNjr4DBNl
                E0__RI0kDU-27mb6esswnP2WgHZQPsk779fTcNDBIcYgyLujlcUATEq
                fCaPDNp00J6AbY6w",
          "kty": "RSA",
          "kid": "rsa-PKIo",
          "x5c": [
            "MIIE3jCCA8agAwIBAgICAwEwDQYJKoZIhvcNAQEFBQAwYzELMAkGA
            1UEBhMCVVMxITAfBgNVBAoTGFRoZSBHbyBEYWRkeSBHcm91cCwgSW5
            jLjExMC8GA1UECxMoR2[...]TVSzGh6O1mawGhId/dQb8vxRMDsxux
            N89txJx9OjxUUAiKEngHUuHqDTMBqLdElrRhjZkAzVvb3du6/KFUJh
            eqwNTrZEjYx8WnM25sgVjOuH0aBsXBTWVU+4=",
            "MIIE+zCCBGSgAwIBAgICAQ0wDQYJKoZIhvcNAQEFBQAwgbsxJDAiB
            gNVBAcTG1ZhbGlDZXJ0IFZhbGlkYXRpb24gTmV0d29yazEXMBUGA1U
            EChMOVmFsaUNlcnQsIE[...]luYAzBgNVBAsTLFZhbGlDZXJ0IENsY
            XNzIDIgUG9saWN5IFZhbGlkYXRpb24gQXV0aG9yaXR5MSEwHwYDVQQ
            DExhodHRwOjZXRn453HWkrugp++85j09VZw==",
            "MIIC5zCCAlACAQEwDQYJKoZIhvcNAQEFBQAwgbsxJDAiBgNVBAcTG
            1ZhbGlDZXJ0IFZhbGlkYXRpb24gTmV0d29yazEXMBUGA1UEChMOVmF
            saUNlcnQsIEluYy4xNT[...]AzBgNVBAsTLFZhbGlDZXJ0IENsYXNz
            IDIgUG9saWN5IFZhbGlkYXRpb24gQXV0aMtsq2azSiGM5bUMMj4Qss
            xsodyamEwCW/POuZ6lcg5Ktz885hZo+L7tdEy8W9ViH0Pd"
          ],
          "use": "sig",
        }
      ]
    }
    </pre>
</aside>

In case PKIoverheid certificates are used, the certificate and entire certificate chain up until the root certificate MUST be included as either an `x5c` or as `x5u` parameter, according to [[RFC7517]] Sections 4.6 and 4.7. Parties SHOULD support the inclusion of the certificate chain as `x5c` parameter, for maximum interoperability. Parties MAY agree to use `x5u`, for instance for communication within specific environments.

The OpenID Provider SHOULD utilize the approaches described in [[OpenID.Core]], Sections 10.1.1 (signing keys) and 10.2.1 (encryption keys), to facilitate rotation of public keys.

Please refer to [Algorithms](#algorithms) for more information on eligible cryptographic methods and keys that can be used by OpenID Providers.

## Dynamic Registration

If the OpenID Provider is acting as an NL-Gov OAuth Authorization Server [[OAuth2.NLGov]], then Dynamic Registration MUST be supported in accordance with Section 3.1.3 of that specification.

Dynamic Registration MUST also be supported in combination with per-instance provisioning of secrets when registering Native Applications as confidential Clients.

In other cases, particularly when dealing with Browser-based applications or Native Apps, Dynamic Registration SHOULD be supported in accordance with the NL GOV Assurance profile for OAuth 2.0 [[OAuth2.NLGov]].

This profile imposes the following requirements upon the Client Registration request:

`Initial access tokens`

- In cases where the OpenID Provider limits the parties that are allowed to register Clients using Dynamic Registration (i.e. when open registration is not applicable), the use of an initial access token in the form of an OAuth2 Bearer token using the `Authorization` HTTP header [[RFC6750]] is REQUIRED for making Client Registration requests. In cases where open registration is applicable, the use of an initial access token is OPTIONAL.

`redirect_uris`

- REQUIRED. Array of Redirection URI values used by the Client. MUST be absolute HTTPS URLs. One of these registered Redirection URI values MUST exactly match the `redirect_uri` parameter value used in each Authorization Request.
- The only exception is when the Client is a Native Application operating on a desktop device and is exclusively registered as such. In such cases:

- the `redirect_uri` MAY contain absolute HTTP URLs with the literal loopback IP addresses and port numbers the Client is listening on as hostnames. MUST NOT use `localhost` as hostname for the loopback address, see [[RFC8252]] Sections 7.3 and 8.3; and
- even though the port number is part of the registered `redirect_uri`, the OpenID Provider MUST allow any port to be specified in the Authorization Request for loopback IP redirect URIs.

`jwks_uri` *or* `jwks`

- Clients SHOULD reference their JSON Web Key (JWK) Set via the `jwks_uri` parameter rather than passing their JWK Set document by value using the `jwks` parameter, as it allows for easier key rotation. Also, the `jwks` and `jwks_uri` parameters MUST NOT both be present in the same request.

`subject_type`

- For cases where correlation of End-User's activities across Clients is not appropriate, the `subject_type` parameter MUST be set to `pairwise`. In other cases, the use of `pairwise` is RECOMMENDED unless the use of public identifiers is required.

`request_uris`

- Array of `request_uri` values that are pre-registered by the Client for use at the OpenID Provider. Clients that make Authentication Requests using the `request_uri` parameter, MUST only do so via pre-registered `request_uri` values.

Section 2 of [[OpenID.Dynamic-Registration]] lists all Client Metadata values that are used by OpenID Connect. Note that additional parameters are defined in OAuth 2.0 Dynamic Client Registration Protocol ([[RFC7591]]) can be relevant as well and MAY be used.

<aside class="example">
An example of a Client registration request:
<pre>
    POST /connect/register HTTP/1.1
    Content-Type: application/json
    Accept: application/json
    Host: server.example.com
    Authorization: Bearer eyJhbGciOiJSUzI1NiJ9.eyJ ...
</pre>
<pre>
    {
      "application_type": "web",
      "redirect_uris":
        ["https://client.example.org/callback",
        "https://client.example.org/callback2"],
      "client_name": "My Example",
      "subject_type": "pairwise",
      "sector_identifier_uri":
        "https://other.example.net/file_of_redirect_uris.json",
      "token_endpoint_auth_method": "client_secret_basic",
      "jwks_uri": "https://client.example.org/my_public_keys.jwks",
      "userinfo_encrypted_response_alg": "RSA1_5",
      "userinfo_encrypted_response_enc": "A128CBC-HS256",
      "contacts": ["mary@example.org"],
    }
</pre>
</aside>

Please refer to [Algorithms](#algorithms) for more information on eligible cryptographic methods and keys that can be used when registering a Client.
