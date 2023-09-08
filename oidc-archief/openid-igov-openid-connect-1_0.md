| M. Varley, Ed.  
---|---  
|  
| P. Grassi, Ed.  
| October 05, 2018  
  
International Government Assurance Profile (iGov) for OpenID Connect 1.0 -
Draft 03  
openid-igov-openid-connect-1_0

# Abstract

The OpenID Connect protocol defines an identity federation system that allows
a relying party to request and receive authentication and profile information
about an end user.

This specification profiles the OpenID Connect protocol to increase baseline
security, provide greater interoperability, and structure deployments in a
manner specifically applicable to (but not limited to) government and public
service domains.

This profile builds on top of, and inherits all properties of, the OAUTH
profile for iGov.

* * *

# Table of Contents

  * 1\. Introduction
    * 1.1. Requirements Notation and Conventions
    * 1.2. Terminology
    * 1.3. Conformance
  * 2\. Relying Party Profile
    * 2.1. Requests to the Authorization Endpoint (Authentication Request)
    * 2.2. Requests to the Token Endpoint
    * 2.3. ID Tokens
    * 2.4. Request Objects
    * 2.5. Discovery
  * 3\. OpenID Provider Profile
    * 3.1. ID Tokens
    * 3.2. Pairwise Identifiers
    * 3.3. UserInfo Endpoint
    * 3.4. Request Objects
    * 3.5. Vectors of Trust
    * 3.6. Authentication Context
    * 3.7. Discovery
    * 3.8. Dynamic Registration
  * 4\. User Info
    * 4.1. Claims Supported
    * 4.2. Scope Profiles
    * 4.3. Claims Request
    * 4.4. Claims Response
    * 4.5. Claims Metadata
  * 5\. Privacy Considerations
  * 6\. Security Considerations
  * 7\. Normative References
  * Appendix A. Acknowledgements
  * Appendix B. Notices
  * Appendix C. Document History
  * Authors' Addresses

#  1. Introduction

Government regulations for permitting users (citizens and non-citizens) online
access to government resources vary greatly from region to region. There is a
strong desire to leverage federated authentication and identity services for
public access to government resources online to reduce 'password fatigue',
increase overall account security, reduce cost, and provide reliable identity
assurances from established and trusted sources when applicable.

This specification aims to define an OpenID Connect profile that provides
governments with a foundation for securing federated access to public services
online.

#  1.1. Requirements Notation and Conventions

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD",
"SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this
document are to be interpreted as described in RFC 2119 .

All uses of JSON Web Signature (JWS) and JSON Web Encryption (JWE) data
structures in this specification utilize the JWS Compact Serialization or the
JWE Compact Serialization; the JWS JSON Serialization and the JWE JSON
Serialization are not used.

#  1.2. Terminology

This specification uses the terms "Access Token", "Authorization Code",
"Authorization Endpoint", "Authorization Grant", "Authorization Server",
"Client", "Client Authentication", "Client Identifier", "Client Secret",
"Grant Type", "Protected Resource", "Redirection URI", "Refresh Token",
"Resource Owner", "Resource Server", "Response Type", and "Token Endpoint"
defined by OAuth 2.0 , the terms "Claim Name", "Claim Value", and "JSON Web
Token (JWT)" defined by JSON Web Token (JWT) , and the terms defined by OpenID
Connect Core 1.0 .

#  1.3. Conformance

This specification defines requirements for the following components:

  * OpenID Connect 1.0 relying parties (also known as OpenID Clients) 
  * OpenID Connect 1.0 identity providers (also known as OpenID Providers) 

The specification also defines features for interaction between these
components:

  * Relying party to identity provider

When an iGov-compliant component is interacting with other iGov-compliant
components, in any valid combination, all components MUST fully conform to the
features and requirements of this specification. All interaction with non-iGov
components is outside the scope of this specification.

An iGov-compliant OpenID Connect IdP MUST support all features as described in
this specification. A general-purpose IdP MAY support additional features for
use with non-iGov clients.

An iGov-compliant OpenID Connect IdP MAY also provide iGov-compliant OAuth 2.0
authorization server functionality. In such cases, the authorization server
MUST fully implement the OAuth 2.0 iGov profile. If an iGov-compliant OpenID
Connect IdP does not provide iGov-compliant OAuth 2.0 authorization server
services, all features related to interaction between the authorization server
and protected resource are therefore OPTIONAL.

An iGov-compliant OpenID Connect client MUST use all functions as described in
this specification. A general-purpose client library MAY support additional
features for use with non-iGov IdPs.

#  2. Relying Party Profile

#  2.1. Requests to the Authorization Endpoint (Authentication Request)

The iGov OAuth2 profile specifies requirements for requests to Authorization
Endpoints - for example, when to use the PKCE parameters to secure token
exchange.

In addition to the requirements specified in Section 2.1.1 of the iGov OAuth2
profile, the following describes the supported OpenID Connect Authorization
Code Flow parameters for use with iGov compatible IdPs.

Request Parameters:

client_id

    REQUIRED. OAuth 2.0 Client Identifier valid at the Authorization Server. 
response_type

    REQUIRED. MUST be set to code . 
scope

    REQUIRED. Indicates the attributes being requested. (See below) 
redirect_uri

    REQUIRED. Indicates a valid endpoint where the client will receive the authentication response. See (core section 3.1.2.1) 
state

    REQUIRED. Unguessable random string generated by the RP, used to protect against CSRF attacks. Must contain a sufficient amount of entropy to avoid guessing. Returned to the RP in the authentication response. 
nonce

    REQUIRED. Unguessable random string generated by the client, used to protect against CSRF attacks. Must contain a sufficient amount of entropy to avoid guessing. Returned to the client in the ID Token. 
vtr

    OPTIONAL. MUST be set to a value as described in Section 6.1 of Vectors of Trust vtr takes precedence over acr_values. 
acr_values

    OPTIONAL. Lists the acceptable LoAs for this authentication. See (below). MUST not be set if vtr is specified. 
code_challenge and code_challenge_method

    OPTIONAL. If the PKCE protocol is being used by the client. See OAUTH profile for iGov.

A sample request may look like:

    
    
    https://idp.government.gov/oidc/authorization?
      response_type=code
      &client_id=827937609728-m2mvqffo9bsefh4di90saus4n0diar2h
      &scope=d+openid
      &redirect_uri=https%3A%2F%2Frp.fed1.gov%2Foidc%2FloginResponse
      &state=2ca3359dfbfd0
      &acr_values=http%3A%2F%2Fidmanagement.gov%2Fns%2Fassurance%2Floa%2F1
    +http%3A%2F%2Fidmanagement.gov%2Fns%2Fassurance%2Floa%2F2
    +http%3A%2F%2Fidmanagement.gov%2Fns%2Fassurance%2Floa%2F3 
    +http%3A%2F%2Fidmanagement.gov%2Fns%2Fa
    

#  2.2. Requests to the Token Endpoint

In addition to the requirements specified in Section 2.1.2 of the iGov OAuth2
profile , the following claims MUST be included:

The following parameters are specified:

grant_type

    MUST be set to authorization_code . 
code

    The value of the code parameter returned in the authorization response.
client_assertion_type

    MUST be set to urn:ietf:params:oauth:client-assertion-type:jwt-bearer . 
client_assertion

    The value of the signed client authentication JWT generated as described below. The RP must generate a new assertion JWT for each call to the token endpoint. 

#  2.3. ID Tokens

All clients MUST validate the signature of an ID Token before accepting it
using the public key of the issuing server, which is published in JSON Web Key
(JWK) format. ID Tokens MAY be encrypted using the appropriate key of the
requesting client.

Clients MUST verify the following in received ID tokens:

iss

    The "issuer" field is the Uniform Resource Locater (URL) of the expected issuer 
aud

    The "audience" field contains the client ID of the client 
exp, iat, nbf

    The "expiration", "issued at", and "not before" timestamps for the token are dates (integer number of seconds since from 1970-01-01T00:00:00Z UTC) within acceptable ranges 

#  2.4. Request Objects

Clients MAY optionally send requests to the authorization endpoint using the
request parameter as defined by OpenID Connect . Clients MAY send requests to
the authorization endpoint by reference using the request_uri parameter.

Request objects MUST be signed by the client's registered key. Request objects
MAY be encrypted to the authorization server's public key.

#  2.5. Discovery

Clients and protected resources SHOULD cache OpenID Provider metadata once an
OP has been discovered and used by the client.

#  3. OpenID Provider Profile

#  3.1. ID Tokens

All ID Tokens MUST be signed by the OpenID Provider's private signature key.
ID Tokens MAY be encrypted using the appropriate key of the requesting client.

The ID Token MUST expire and SHOULD have an active lifetime no longer than
five minutes. Since the ID token is consumed by the client and not presented
to remote systems, much shorter expiration times are RECOMMENDED where
possible.

The token response includes an access token (which can be used to make a
UserInfo request) and ID token (a signed and optionally encrypted JSON Web
Token). ID Token values have the following meanings:

iss

    REQUIRED. The "issuer" field is the Uniform Resource Locater (URL) of the expected issuer. 
aud

    REQUIRED. The "audience" field contains the client ID of the client. 
sub

    REQUIRED. The identifier of the user. OpenID Providers MUST support a pairwise identifier in accordance with OpenID Connect section 8.1. See Pairwise Identifiers below on when it may be useful to relax this requirement. 
vot

    OPTIONAL. The vector value as specified in Vectors of Trust . See Vectors of Trust for more details. vot takes precedence over acr. 
vtm

    REQUIRED if vot is provided. The trustmark URI as specified in Vectors of Trust . See Vectors of Trust for more details. 
acr

    OPTIONAL. The LoA the user was authenticated at. MUST be a member of the acr_values list from the authentication request. The OpenID Provider MUST NOT include this field if vot is provided. See Authentication Context for more details. 
nonce

    REQUIRED. MUST match the nonce value that was provided in the authentication request. 
jti

    REQUIRED. A unique identifier for the token, which can be used to prevent reuse of the token. 
auth_time

    RECOMMENDED. This SHOULD be included if the provider can assert an end- user's authentication intent was demonstrated. For example, a login event where the user took some action to authenticate. 
exp, iat, nbf

    REQUIRED. The "expiration", "issued at", and "not before" timestamps for the token are dates (integer number of seconds since from 1970-01-01T00:00:00Z UTC) within acceptable ranges. 

This example ID token has been signed using the server's RSA key:

    
    
    eyJhbGciOiJSUzI1NiJ9.eyJhdXRoX3RpbWUiOjE0
            MTg2OTg3ODIsImV4cCI6MTQxODY5OTQxMiwic3ViI
            joiNldaUVBwblF4ViIsIm5vbmNlIjoiMTg4NjM3Yj
            NhZjE0YSIsImF1ZCI6WyJjMWJjODRlNC00N2VlLTR
            iNjQtYmI1Mi01Y2RhNmM4MWY3ODgiXSwiaXNzIjoi
            aHR0cHM6XC9cL2lkcC1wLmV4YW1wbGUuY29tXC8iL
            CJpYXQiOjE0MTg2OTg4MTJ9mQc0rtL56dnJ7_zO_f
            x8-qObsQhXcn-qN-FC3JIDBuNmP8i11LRA_sgh_om
            RRfQAUhZD5qTRPAKbLuCD451lf7ALAUwoGg8zAASI
            5QNGXoBVVn7buxPd2SElbSnHxu0o8ZsUZZwNpircW
            NUlYLje6APJf0kre9ztTj-5J1hRKFbbHodR2I1m5q
            8zQR0ql-FoFlOfPhvfurXxCRGqP1xpvLLBUi0JAw3
            F8hZt_i1RUYWMqLQZV4VU3eVNeIPAD38qD1fxTXGV
            Ed2XDJpmlcxjrWxzJ8fGfJrbsiHCzmCjflhv34O22
            zb0lJpC0d0VScqxXjNTa2-ULyCoehLcezmssg

Its claims are as follows:

    
    
     {
            "auth_time": 1418698782,
            "exp": 1418699412,
            "sub": "6WZQPpnQxV",
            "nonce": "188637b3af14a",
            "aud": [
              "c1bc84e4-47ee-4b64-bb52-5cda6c81f788"
            ],
            "iss": "https://idp-p.example.com/",
            "acr":"LOA1",
            "vot":"P1.C1",
            "vtm":"https://ipd-p.example.com/vtm.json"
            "iat": 1418698812
            }
            

#  3.2. Pairwise Identifiers

Pairwise identifiers specified in OpenID Connect Core section 8 help protect
an end user's privacy by allowing an OpenID Provider to represent a single
user with a different subject identifier (sub) for every client the user
connects to. This technique can help mitigate correlation of a user between
multiple clients by preventing the clients from using the subject identifier
(the sub claim) to track a user between different sites and applications. Use
of pairwise identifiers does not prevent clients from correlating data based
on other identifying attributes such as names, phone numbers, email addresses,
document numbers, or other attributes. However, since not all transactions
require access to these attributes, but a subject identifier is always
required, a pairwise identifier will aid in protecting the privacy of end
users as they navigate the system.

OpenID Providers MUST support pairwaise identifiers for cases where clients
require this functionality. OpenID Providers MAY support public identifiers i
for frameworks where public identifiers are required, or for cases where
public identifiers are shared as attributes and the framework does not have a
requirement for subject anonymity.

#  3.3. UserInfo Endpoint

OpenID Providers MUST support the UserInfo Endpoint and, at a minimum, the sub
(subject) claim. It is expected that the sub claim will remain pseudonymous in
use cases where obtaining personal information is not needed.

Support for a UserInfo Endpoint is important for maximum client implementation
interoperability even if no additional user information is returned. Clients
are not required to call the UserInfo Endpoint, but should not receive an
error if they do.

In an example transaction, the client sends a request to the UserInfo Endpoint
like the following:

    
    
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
    Accept: text/plain, application/json, application/*+json, */*
    Host: idp-p.example.com
    Connection: Keep-Alive
    User-Agent: Apache-HttpClient/4.2.3 (java 1.5)
    

And receives a document in response like the following:

    
    
    HTTP/1.1 200 OK
    Date: Tue, 16 Dec 2014 03:00:12 GMT
    Access-Control-Allow-Origin: *
    Content-Type: application/json;charset=ISO-8859-1
    Content-Language: en-US
    Content-Length: 333
    Connection: close
    
    {
       "sub": "6WZQPpnQxV",
       "iss": "https://idp-p.example.com"
       "given_name": "Stephen",
       "family_name": "Emeritus",
    }
    

OpenID Providers MUST support the generation of JWT encoded responses from the
UserInfo Endpoint in addition to unsigned JSON objects. Signed responses MUST
be signed by the OpenID Provider's key, and encrypted responses MUST be
encrypted with the authorized client's public key. The OpenID Provider MUST
support the RS256 signature method (the Rivest, Shamir, and Adleman (RSA)
signature algorithm with a 256-bit hash) and MAY use other asymmetric
signature and encryption methods listed in the JSON Web Algorithms (JWA)
specification.

#  3.4. Request Objects

OpenID Providers MUST accept requests containing a request object signed by
the client's private key. Servers MUST validate the signature on such requests
against the client's registered public key. OpenID Connect Providers MUST
accept request objects encrypted with the server's public key.

OpenID Providers MAY accept request objects by reference using the request_uri
parameter.

Both of these methods allow for clients to create a request that is protected
from tampering through the browser, allowing for a higher security mode of
operation for clients and applications that require it. Clients are not
required to use request objects, but OpenID Providers are required to support
requests using them.

#  3.5. Vectors of Trust

If the vtr (Vectors of Trust Request) value is present in the authorization
request as defined in the Vectors of Trust standard, the OpenID Provider
SHOULD respond with a valid vot value as defined in [section 3.1]. Both the
vtr and vot MUST contain values in accordance with the Vectors of Trust
standard. These values MAY be those defined in the Vectors of Trust standard
directly or MAY be from a compatible standard. The OpenID Provider MAY require
the user to re-authenticate, provide a second factor, or perform another
action in order to fulfill the state requested in the vtr.

For backwards compatibility clients MAY send an acr_values parameter. If both
the vtr and acr_values are in the request, the vtr MUST take precedence and
the acr_values MUST be ignored.

It is out of scope of this document to determine how an organization maps
their digital identity practices to valid VOT component values.

#  3.6. Authentication Context

OpenID Providers MAY provide acr (authentication context class reference,
equivalent to the Security Assertion Markup Language (SAML) element of the
same name) and amr (authentication methods reference) values in ID tokens only
if vtr is not used.

#  3.7. Discovery

OpenID Connect Discovery standard provides a standard, programatic way for
clients to obtain configuration details for communicating with OpenID
Providers. Discovery is an important part of building scalable federation
ecosystsems.

Exposing a Discovery endpoint does NOT inherently put the OpenID Provider at
risk to attack. Endpoints and parameters specified in the Discovery document
SHOULD be considered public information regardless of the existence of the
Discovery document.

Access to the Discovery document MAY be protected with existing web
authentication methods if required by the Provider. Credentials for the
Discovery document are then managed by the Provider. Support for these
authentication methods is outside the scope of this specification.

Endpoints described in the Discovery document MUST be secured in accordance
with this specification and MAY have additonal controls the Provider wishes to
support.

All OpenID Providers are uniquely identified by a URL known as the issuer.
This URL serves as the prefix of a service discovery endpoint as specified in
the OpenID Connect Discovery standard. The discovery document MUST contain at
minimum the following fields:

issuer

    REQUIRED. The fully qualified issuer URL of the OpenID Provider. 
authorization_endpoint

    REQUIRED. The fully qualified URL of the OpenID Provider's authorization endpoint defined by [RFC6749]. 
token_endpoint

    REQUIRED. The fully qualified URL of the server's token endpoint defined by [RFC6749]. 
introspection_endpoint

    OPTIONAL. The fully qualified URL of the server's introspection endpoint defined by OAuth Token Introspection. 
revocation_endpoint

    OPTIONAL. The fully qualified URL of the server's revocation endpoint defined by OAuth Token Revocation. 
jwks_uri

    REQUIRED. The fully qualified URI of the server's public key in JWK Set format. For verifying the signatures on the id_token. 
scopes_supported

    REQUIRED. The list of scopes, including iGov scopes, the server supports. 
claims_supported

    REQUIRED. The list of claims available in the supported scopes. See below. 
vot

    OPTIONAL. The vectors supported. 
acr_values

    OPTIONAL. The acrs supported. 

The following example shows the JSON document found at a discovery endpoint
for an authorization server:

    
    
    {
      "request_parameter_supported": true,
      "id_token_encryption_alg_values_supported": [
        "RSA-OAEP", "RSA1_5", "RSA-OAEP-256"
      ],
      "registration_endpoint": "https://idp-p.example.com/register",
      "userinfo_signing_alg_values_supported": [
        "HS256", "HS384", "HS512", "RS256", "RS384", "RS512"
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
        "RSA-OAEP", "RSA1_5",
        "RSA-OAEP-256"
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
        "HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "none"
      ],
      "authorization_endpoint": "https://idp-p.example.com/authorize",
      "require_request_uri_registration": false,
      "introspection_endpoint": "https://idp-p.example.com/introspect",
      "request_object_encryption_alg_values_supported": [
        "RSA-OAEP", ?RSA1_5", "RSA-OAEP-256"
      ],
      "service_documentation": "https://idp-p.example.com/about",
      "response_types_supported": [
        "code", "token"
      ],
      "token_endpoint_auth_signing_alg_values_supported": [
        "HS256", "HS384", "HS512", "RS256", "RS384", "RS512"
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
      "vot": "???"
      "acr" " ??? "
    }
    

It is RECOMMENDED that servers provide cache information through HTTP headers
and make the cache valid for at least one week.

The server MUST provide its public key in JWK Set format, such as the
following 2048-bit RSA key:

    
    
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
          "kid": "rsa1"
        }
      ]
    }
    

#  3.8. Dynamic Registration

If the OP is acting as an iGov OAuth Authorization Server (iGov OAuth2
profile), then Dynamic Registration MUST be supported in accordance with that
specification (see section 3.13).

#  4. User Info

The availability, quality, and reliability of an individual's identity
attributes will vary greatly across jurisdictions and Provider systems. The
following recommendations ensure maximum cross-jurisdictional
interoperability, while setting Client expectations on the type of data they
may acquire.

#  4.1. Claims Supported

Discovery mandates the inclusion of the claims_supported field that defines
the claims a client MAY expect to receive for the supported scopes. OpenID
Providers MUST return claims on a best effort basis. However, a Provider
asserting it can provide a user claim does not imply that this data is
available for all its users: clients MUST be prepared to receive partial data.
Providers MAY return claims outside of the claims_supported list, but they
MUST still ensure that the extra claims to not violate the privacy policies
set out by the federation.

#  4.2. Scope Profiles

In the interests of data minimization balanced with the requirement to
successfully identify the individual signing in to a service, the default
OpenID Connect profiles may not be appropriate.

Matching of the identity assertion based on claims to a local identifier or
'account' related to the individual identity at a level of assurance is a
requirement where the government in question is not able to provide a single
identifier for all citizens based on an authoritative register of citizens.

The requirement for matching is also of importance where a cross-border or
cross-jurisdiction authentication is required and therefore the availability
of a single identifier (e.g. social security number) cannot be guaranteed for
the individual wishing to authenticate.

This standard defines a set of common scope values that aim to provide maximum
cross-jurisdictional identity matching while not being perscriptive on the
exact attributes shared, as every jurisdiction will likely have varius levels
of information available, and different policies for sharing personal data
even if it is on file.

profile

    The OpenID Connect Core defined profile provides baseline identity information. It is HIGHLY RECOMMENDED that the attributes for given_name, family_name, address, birthdate be supported by iGov Providers if possible, unless data quality requirements or privacy considerations prevent it. It is left to the OpenID Provider and the trust framework to set any further limitations on this profile data - see Privacy Considerations below. 
doc

    The identity document type(s) and associated "number" the Provider is capable of providing. Mutliple document types MAY be returned. This could be passport, driver's license, national ID card, health insurance no., and so on. See the Claims below for the document claims available. 

#  4.3. Claims Request

OpenID.Core section 5.5 defines a method for a client to request specific
claims in the UserInfo object. OpenID Providers MUST support this claims
parameter in the interest of data minimization - that is, the Provider only
returns information on the subject the client specifically asks for, and does
not volunteer additonal information about the subject.

Clients requesting the profile scope MAY provide a claims request parameter.
If the claims request is omitted, the OpenID Provider SHOULD provide a default
claims set that it has available for the subject, in accordance with any
policies set out by the trust framework the Provider supports.

Client requesting the doc scope MUST provide a claims request parameter
indicating the document type (or types) and fields they wish to receive, or
they will receive none. The OpenID Provider MUST NOT return any doc related
claims not included in the claims request. Client requests that include the
doc scope but no claims request MUST NOT be rejected by the OpenID Provider,
but simply no doc related claims are returned in the UserInfo object.

#  4.4. Claims Response

Response to a UserInfo request MUST match the scope and claims requested to
avoid having a OpenID Provider over-expose a user's identity information.

The document doc claims response include:

type

    The document type. 
num

    The value of the document identifier. Note that not all values are technically numeric. 
issued

    The date the document was issued. Timestamp format. 
expires

    The date the document expires (or expired). Timestamp format. 
issuer_location

    The location/address of the issuing agency. 

Claims response MAY also make use of the aggegated and/or distributed claims
structure to refer to the original source of the subject's claims.

#  4.5. Claims Metadata

Claims Metadata (such as locale or the confidence level the OpenID Provider
has in the claim for the user) can be expressed as attributes within the
UserInfo object, but are outside the scope of this document. These types of
claims are best described by the trust framework the clients and OpenID
Providers operate within.

#  5. Privacy Considerations

Data minimization is an essential concept in trust frameworks and federations
exchanging user identity information for government applications. The design
of this specification takes into consideration mechanisms to protect the
user's government identity information and activity from unintentional
exposure.

Pairwise anonymous identifiers MUST be supported by the OpenID Providers for
frameworks where subjects should not be traceable across clients by their
subject ID. This prevents a situation where a user may inadvertently be
assigned a universal government identifier.

Request claims MUST be supported by the OpenID Providers to ensure that only
the data the client explicitly requests is provided in the UserInfo response.
This prevents situations where a client may only require a partial set of
claims, but receives (and is therefore exposed to) a full set of claims. For
example, if a client only needs a single government document type and number,
the OpenID Provider MUST NOT send the client the full document information,
possibly from multiple documents.

Despite the mechanisms enforced by this specification, the operational
circumstances of a federation may allow these controls to be relaxed. For
example, if a framework always requires clients to request a national ID
number, then the pairwise anonymous identifer requirement may be relaxed. In
cases where all clients are entitled to all government document claims
associated to a subject at an OpenID Provider, the claims request requirement
may be relaxed.

The reasons for relaxing the controls that support data minimalization are
outside the scope of this specification.

#  6. Security Considerations

All transactions MUST be protected in transit by TLS as described in BCP195 .

All clients MUST conform to applicable recommendations found in the Security
Considerations sections of [RFC6749] and those found in the OAuth 2.0 Threat
Model and Security Considerations document .

#  7. Normative References

**[BCP195]** |  Sheffer, Y., Holz, R. and P. Saint-Andre, "[Recommendations for Secure Use of Transport Layer Security (TLS) and Datagram Transport Layer Security (DTLS)](https://tools.ietf.org/html/rfc7525)", BCP 195, RFC 7525, DOI 10.17487/RFC7525, May 2015.  
---|---  
**[HEART.OAuth2]** |  [Richer, J.](mailto:openid@justin.richer.org), "[Health Relationship Trust Profile for OAuth 2.0](http://openid.net/specs/openid-heart-oauth2-1_0.html)", April 2017.  
**[I-D.ietf-oauth-pop-architecture]** |  Hunt, P., Richer, J., Mills, W., Mishra, P. and H. Tschofenig, "[OAuth 2.0 Proof-of-Possession (PoP) Security Architecture](https://tools.ietf.org/html/draft-ietf-oauth-pop-architecture-08)", Internet-Draft draft-ietf-oauth-pop-architecture-08, July 2016.  
**[iGov.OAuth2]** |  [Richer, J.](mailto:openid@justin.richer.org), "[iGov Profile for OAuth 2.0](http://openid.net/specs/openid-igov-oauth2-1_0.html)", October 2018.  
**[OpenID.Core]** |  Sakimura, N., Bradley, J., Jones, M., de Medeiros, B. and C. Mortimore, "[OpenID Connect Core 1.0](http://openid.net/specs/openid-connect-core-1_0.html)", August 2015.  
**[OpenID.Discovery]** |  Sakimura, N., Bradley, J., Jones, M. and E. Jay, "[OpenID Connect Discovery 1.0](http://openid.net/specs/openid-connect-discovery-1_0.html)", August 2015.  
**[RFC2119]** |  Bradner, S., "[Key words for use in RFCs to Indicate Requirement Levels](https://tools.ietf.org/html/rfc2119)", BCP 14, RFC 2119, DOI 10.17487/RFC2119, March 1997.  
**[RFC2246]** |  Dierks, T. and C. Allen, "[The TLS Protocol Version 1.0](https://tools.ietf.org/html/rfc2246)", RFC 2246, DOI 10.17487/RFC2246, January 1999.  
**[RFC3986]** |  Berners-Lee, T., Fielding, R. and L. Masinter, "[Uniform Resource Identifier (URI): Generic Syntax](https://tools.ietf.org/html/rfc3986)", STD 66, RFC 3986, DOI 10.17487/RFC3986, January 2005.  
**[RFC5246]** |  Dierks, T. and E. Rescorla, "[The Transport Layer Security (TLS) Protocol Version 1.2](https://tools.ietf.org/html/rfc5246)", RFC 5246, DOI 10.17487/RFC5246, August 2008.  
**[RFC5322]** |  Resnick, P., "[Internet Message Format](https://tools.ietf.org/html/rfc5322)", RFC 5322, DOI 10.17487/RFC5322, October 2008.  
**[RFC5646]** |  Phillips, A. and M. Davis, "[Tags for Identifying Languages](https://tools.ietf.org/html/rfc5646)", BCP 47, RFC 5646, DOI 10.17487/RFC5646, September 2009.  
**[RFC5785]** |  Nottingham, M. and E. Hammer-Lahav, "[Defining Well-Known Uniform Resource Identifiers (URIs)](https://tools.ietf.org/html/rfc5785)", RFC 5785, DOI 10.17487/RFC5785, April 2010.  
**[RFC6125]** |  Saint-Andre, P. and J. Hodges, "[Representation and Verification of Domain-Based Application Service Identity within Internet Public Key Infrastructure Using X.509 (PKIX) Certificates in the Context of Transport Layer Security (TLS)](https://tools.ietf.org/html/rfc6125)", RFC 6125, DOI 10.17487/RFC6125, March 2011.  
**[RFC6749]** |  Hardt, D., "[The OAuth 2.0 Authorization Framework](https://tools.ietf.org/html/rfc6749)", RFC 6749, DOI 10.17487/RFC6749, October 2012.  
**[RFC6750]** |  Jones, M. and D. Hardt, "[The OAuth 2.0 Authorization Framework: Bearer Token Usage](https://tools.ietf.org/html/rfc6750)", RFC 6750, DOI 10.17487/RFC6750, October 2012.  
**[RFC6819]** |  Lodderstedt, T., McGloin, M. and P. Hunt, "[OAuth 2.0 Threat Model and Security Considerations](https://tools.ietf.org/html/rfc6819)", RFC 6819, DOI 10.17487/RFC6819, January 2013.  
**[RFC7009]** |  Lodderstedt, T., Dronia, S. and M. Scurtescu, "[OAuth 2.0 Token Revocation](https://tools.ietf.org/html/rfc7009)", RFC 7009, DOI 10.17487/RFC7009, August 2013.  
**[RFC7033]** |  Jones, P., Salgueiro, G., Jones, M. and J. Smarr, "[WebFinger](https://tools.ietf.org/html/rfc7033)", RFC 7033, DOI 10.17487/RFC7033, September 2013.  
**[RFC7515]** |  Jones, M., Bradley, J. and N. Sakimura, "[JSON Web Signature (JWS)](https://tools.ietf.org/html/rfc7515)", RFC 7515, DOI 10.17487/RFC7515, May 2015.  
**[RFC7516]** |  Jones, M. and J. Hildebrand, "[JSON Web Encryption (JWE)](https://tools.ietf.org/html/rfc7516)", RFC 7516, DOI 10.17487/RFC7516, May 2015.  
**[RFC7517]** |  Jones, M., "[JSON Web Key (JWK)](https://tools.ietf.org/html/rfc7517)", RFC 7517, DOI 10.17487/RFC7517, May 2015.  
**[RFC7518]** |  Jones, M., "[JSON Web Algorithms (JWA)](https://tools.ietf.org/html/rfc7518)", RFC 7518, DOI 10.17487/RFC7518, May 2015.  
**[RFC7519]** |  Jones, M., Bradley, J. and N. Sakimura, "[JSON Web Token (JWT)](https://tools.ietf.org/html/rfc7519)", RFC 7519, DOI 10.17487/RFC7519, May 2015.  
**[RFC7636]** |  Sakimura, N., Bradley, J. and N. Agarwal, "[Proof Key for Code Exchange by OAuth Public Clients](https://tools.ietf.org/html/rfc7636)", RFC 7636, DOI 10.17487/RFC7636, September 2015.  
**[RFC7662]** |  Richer, J., "[OAuth 2.0 Token Introspection](https://tools.ietf.org/html/rfc7662)", RFC 7662, DOI 10.17487/RFC7662, October 2015.  
**[RFC7800]** |  Jones, M., Bradley, J. and H. Tschofenig, "[Proof-of-Possession Key Semantics for JSON Web Tokens (JWTs)](https://tools.ietf.org/html/rfc7800)", RFC 7800, DOI 10.17487/RFC7800, April 2016.  
**[RFC8485]** |  Richer, J. and L. Johansson, "[Vectors of Trust](https://tools.ietf.org/html/rfc8485)", RFC 8485, DOI 10.17487/RFC8485, October 2018.  
  
#  Appendix A. Acknowledgements

The OpenID Community would like to thank the following people for their
contributions to this specification: Justin Ritcher, Paul Grassi, John
Bradley, Adam Cooper, ...

#  Appendix B. Notices

Copyright (c) 2015 The OpenID Foundation.

The OpenID Foundation (OIDF) grants to any Contributor, developer,
implementer, or other interested party a non-exclusive, royalty free,
worldwide copyright license to reproduce, prepare derivative works from,
distribute, perform and display, this Implementers Draft or Final
Specification solely for the purposes of (i) developing specifications, and
(ii) implementing Implementers Drafts and Final Specifications based on such
documents, provided that attribution be made to the OIDF as the source of the
material, but that such attribution does not indicate an endorsement by the
OIDF.

The technology described in this specification was made available from
contributions from various sources, including members of the OpenID Foundation
and others. Although the OpenID Foundation has taken steps to help ensure that
the technology is available for distribution, it takes no position regarding
the validity or scope of any intellectual property or other rights that might
be claimed to pertain to the implementation or use of the technology described
in this specification or the extent to which any license under such rights
might or might not be available; neither does it represent that it has made
any independent effort to identify any such rights. The OpenID Foundation and
the contributors to this specification make no (and hereby expressly disclaim
any) warranties (express, implied, or otherwise), including implied warranties
of merchantability, non-infringement, fitness for a particular purpose, or
title, related to this specification, and the entire risk as to implementing
this specification is assumed by the implementer. The OpenID Intellectual
Property Rights policy requires contributors to offer a patent promise not to
assert certain patent claims against other contributors and against
implementers. The OpenID Foundation invites any interested party to bring to
its attention any copyrights, patents, patent applications, or other
proprietary rights that may cover technology that may be required to practice
this specification.

#  Appendix C. Document History

-2018-05-07

  * Removed Verifiable Claims definition (will go in another spec). 
  * Clarified Scope and Metadata. 

-2016-07-25

  * Imported content from OpenID HEART 1.0 profile and Connect.Gov integration guide v 1.4 

# Authors' Addresses

Michael Varley (editor)  Varley EMail:
[mike.varley@securekey.com](mailto:mike.varley@securekey.com)

Paul Grassi (editor)  Grassi EMail:
[pgrassi@easydynamics.com](mailto:pgrassi@easydynamics.com)

