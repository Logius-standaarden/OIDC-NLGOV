# Introduction

Government regulations for permitting users (citizens and non-citizens) online access to government resources vary greatly from region to region.  There is a strong desire to leverage federated authentication and identity services for public access to government resources online to reduce 'password fatigue', increase overall account security, reduce cost, and provide reliable identity assurances from established and trusted sources when applicable.

This specification aims to define an OpenID Connect profile that provides <span title="NLGov alteration" class="nlgov">Dutch</span> governments with a foundation for securing federated access to public services online.

## Requirements Notation and Conventions

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [[RFC2119]].

All uses of [[[RFC7515]]] [[RFC7515]] and [[[RFC7516]]] [[RFC7516]] data structures in this specification utilize the JWS Compact Serialization or the JWE Compact Serialization; the JWS JSON Serialization and the JWE JSON Serialization are not used.

## Terminology

This specification uses the following terms.

- "Access Token", "Authorization Code", "Authorization Endpoint", "Authorization Grant", "Authorization Server", "Client", "Client Authentication", "Client Identifier", "Client Secret", "Grant Type", "Protected Resource", "Redirection URI", "Refresh Token", "Resource Server", "Response Type", and "Token Endpoint" defined by 'OAuth 2.0' [[RFC6749]];
- "Claim Name", "Claim Value", and "JSON Web Token (JWT)" defined by 'JSON Web Token (JWT)' [[RFC7519]];
- the terms defined by 'OpenID Connect Core 1.0' [[OpenID.Core]];
<div title="NLGov alteration" class="nlgov">

- "Introspection Endpoint" defined by [[RFC7662]];
- "Revocation Endpoint" defined by [[RFC7009]];
- "Browser-based application" defined by [[?OAuth2.Browser-Based-Apps]];
- "Native app", "Hybrid app", "External user-agent", "Embedded user-agent", "In-app browser tab", "Web-view", "Claimed 'https' scheme URI", "Private-use URI scheme" defined by 'OAuth 2.0 for Native Apps' [[RFC8252]];
- "User-agent" defined by 'Hypertext Transfer Protocol' [[RFC2616]].


In addition to the above terminology, this profile defines the following terms:

- "Representation", "Representation Relationship", "eIDAS".

Definitions for these terms as well as their abbreviations used throughout this specification are listed in the [[[#glossary]]].
</div>

## Conformance

<div title="NLGov alteration" class="nlgov">
As well as sections marked as non-normative, all authoring guidelines, diagrams, examples, and notes in this specification are non-normative. Everything else in this specification is normative.

This profile is based upon the [[[OpenID.iGov]]] as published by the [OpenID Foundation](https://openid.net/foundation/). It should be considered a fork of this profile, as the iGov profile is geared more towards a United States context and this NL GOV profile towards a Dutch context with European Union regulations applicable.

This specification defines requirements for the following components:

- OpenID Connect 1.0 relying parties (also known as OpenID Clients, or RP)
- OpenID Connect 1.0 identity providers (also known as OpenID Providers, IdP or OP)

The specification also defines features for interaction between these components:

- Relying party to identity provider

When an NLGov-compliant component is interacting with other NLGov-compliant components, in any valid combination, all components MUST fully conform to the features and requirements of this specification. All interaction with non-NLGov components is outside the scope of this specification.

An NLGov-compliant OpenID Connect IdP MUST support all features as described in this specification. A general-purpose IdP MAY support additional features for use with non-NLGov clients.

An NLGov-compliant OpenID Connect IdP MAY also provide NLGov-compliant OAuth 2.0 authorization server functionality. In such cases, the authorization server MUST fully implement the [[[OAuth2.NLGov]]]. If an NLGov-compliant OpenID Connect IdP does not provide NLGov-compliant OAuth 2.0 authorization server services, all features related to interaction between the authorization server and protected resource are therefore OPTIONAL.

An NLGov-compliant OpenID Connect client MUST use all functions as described in this specification. A general-purpose client library MAY support additional features for use with non-NLGov IdPs.
</div>
