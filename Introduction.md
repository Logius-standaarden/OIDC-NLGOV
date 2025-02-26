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
<p title="NLGov alteration" class="nlgov">

- "Introspection Endpoint" defined by [[RFC7662]];
- "Revocation Endpoint" defined by [[RFC7009]];
- "Browser-based application" defined by [[?OAuth2.Browser-Based-Apps]];
- "Native app", "Hybrid app", "External user-agent", "Embedded user-agent", "In-app browser tab", "Web-view", "Claimed 'https' scheme URI", "Private-use URI scheme" defined by 'OAuth 2.0 for Native Apps' [[RFC8252]];
- "User-agent" defined by 'Hypertext Transfer Protocol' [[RFC2616]].


In addition to the above terminology, this profile defines the following terms:

- "Representation", "Representation Relationship", "eIDAS".

Definitions for these terms as well as their abbreviations used throughout this specification are listed in the [[[#glossary]]].
</p>

## Conformance

<p title="NLGov alteration" class="nlgov">
As well as sections marked as non-normative, all authoring guidelines, diagrams, examples, and notes in this specification are non-normative. Everything else in this specification is normative.

This profile is based upon the 'International Government Assurance Profile (iGov) for OpenID Connect 1.0' [[OpenID.iGov]] as published by the [OpenID Foundation](https://openid.net/foundation/). It should be considered a fork of this profile, as the iGov profile is geared more towards a United States context and this NL GOV profile towards a Dutch context with European Union regulations applicable.

This specification defines requirements for the following components:

- OpenID Connect 1.0 Relying Parties (also known as OpenID Clients, or RP)
- OpenID Connect 1.0 Identity Providers (also known as OpenID Providers, IdP or OP)

The specification also defines features for interaction between these components:

- Relying Party to Identity Provider

When an NL GOV-compliant component is interacting with other NL GOV-compliant components, in any valid combination, all components MUST fully conform to the features and requirements of this specification. All interaction with non-NL GOV components is outside the scope of this specification.

An NL GOV-compliant OpenID Connect Identity Provider MUST support all features as described in this specification. A general-purpose Identity Provider MAY support additional features for use with non-NL GOV Clients.

An NL GOV-compliant OpenID Connect Identity Provider MAY also provide NL GOV-compliant OAuth 2.0 Authorization Server functionality. In such cases, the Authorization Server MUST fully implement the NL GOV Assurance profile for OAuth 2.0 [[OAuth2.NLGov]]. If an NL GOV-compliant OpenID Connect Identity Provider does not provide NL GOV-compliant OAuth 2.0 Authorization Server services, all features related to interaction between the Authorization Server and protected resource are OPTIONAL.

An NL GOV-compliant OpenID Connect Client MUST support all required functionality described in this specification. A general-purpose Client library MAY support additional features for use with non-NL GOV OpenID Connect Identity Providers.
</p>
