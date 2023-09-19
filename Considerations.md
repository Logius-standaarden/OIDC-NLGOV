# Considerations

## Privacy considerations

Data minimization is an essential concept in trust frameworks and federations exchanging End-User identity information for government applications.
The design of this profile takes into consideration mechanisms to protect the End-User's government identity information and activity from unintentional exposure.

Pairwise Subject identifiers MUST be supported by the OpenID Providers for frameworks where subjects should not be traceable or linkable across Clients by their Subject ID. This prevents situations where an End-User may inadvertently be assigned a universal government identifier.

Request Claims using the `claim` parameter MUST be supported by OpenID Providers to ensure that only the data the Client explicitly requests is provided in the UserInfo response or ID Token.
This prevents situations where a Client may only require a partial set of Claims, but receives (and is therefore exposed to) a full set of Claims. For example, if a Client only needs an identifier and the persons legal age, the OpenID Provider MUST NOT send the Client the full user name and birth date.
Similarly, broad attribute requests through the `scope` parameter, such as `profile` SHOULD NOT be used.

All Clients MUST apply the concept of data minimization. As a result, a Client MUST NOT request any more identifiers, attributes or other Claims than strictly necessary.
Additionally, Clients SHOULD ensure they minimize the scope and audience they request, use and forward. This principle applies to both to usage at the Client as well as forwarded Access Tokens in a Service Intermediation scenario.
Token Exchange [[RFC8693]] SHOULD be used to request Access Tokens with a minimal scope and audience.

> Note that per-instance registration of Native Clients can increase the risk of Client -- and thus End-User -- observability and traceability. This because the `client_id` is unique, can be linked to an individual and may be observed. The `client_id` SHOULD be considered and treated as sensitive data in case per-instance registration is applied.
Although the `client_id` will be protected by TLS, it may be exposed at the Client itself or the OpenID Provider or elsewhere. As mitigating measure, implementations MAY use encrypted request objects and tokens.
OpenID Providers SHOULD assign unpredictable Client Identifiers in case of per-instance registration for Native Clients, in order to mitigate guessing and (cross Client and cross audience) linkability of Client Identifiers.

In order to provide end-to-end security and privacy, identifiers and attributes SHOULD be encrypted from the providing source to the ultimate intended recipient. This can be accomplished by either encrypting entire response messages and tokens or by using aggregated or distributed Claims (see Section 5.6.2 of [[OpenID.Core]]). Applying end-to-end encryption is strongly RECOMMENDED for both the BSN (_Burgerservicenummer_, the Dutch citizen ID) and sensitive attributes.

Despite the mechanisms enforced by this profile, the operational circumstances may allow these controls to be relaxed in a specific context.
For example, if a bilateral agreement between two agencies legally entitles usage of citizen identifiers, then the Pairwise Pseudonymous Identifier requirement may be relaxed. In cases where all Clients are entitled to process Claims associated to a subject at an OpenID Provider, the Claims request requirement may be relaxed.

The reasons for relaxing the controls that support data minimization are outside the scope of this profile.

## Security considerations

Implementations of this profile or any form of access to a service, MUST make a risk assessment or security classification for that service and the information disclosed. It is strongly RECOMMENDED to follow the guide 'Assurance level for digital service provision' [[SG.LoA]].
Particularly when implementing for higher levels of assurance (e.g. eIDAS "high" or "substantial"), requirements specified as SHOULD (NOT) or (NOT) RECOMMENDED in this profile are more pertinent to implement accordingly. In line with the scope of the "Assurance level for digital service provision" guide, information and services classified as "state secret" (Dutch: "*staatsgeheim*") are out of scope for implementations under this profile.

An OpenID Provider MUST use a distinct Client Identifier (`client_id`) and registration for each unique Client. This in particular applies to public Clients, these registrations MUST NOT be shared with confidential Clients, even if they are operated by the same organisation.
Distinct registrations MAY be applied to different versions of (native and browser-based public) Clients as well. This will allow a form of support for version management, noting that this can not be considered a very reliable method from a security point of view.

Refresh Tokens SHOULD only be applied and enabled when a functional need exists. Support for Refresh Tokens SHOULD therefore be disabled by default.
Refresh Tokens for confidential Clients MUST be sender-constrained by the issuing OpenID Provider. How the OP accomplishes this is implementation specific, suggestions can be found in [[?OAuth2.1]], Section 6.1.
Using Refresh Tokens in combination with public Clients SHOULD be avoided when possible. If a specific scenario does call for usage of Refresh Tokens with public Clients, Refresh Tokens MUST rotate on each use with a limited valid lifetime.

All transactions MUST be protected in transit by TLS as described in BCP195 [[RFC7525]]. In addition, all compliant implementations MUST apply the IT Security Guidelines for TLS by the Dutch NCSC [[SG.TLS]]. Implementations SHOULD only implement settings and options indicated as "good", SHOULD NOT use any settings with a status "phase out" and MUST NOT use any setting with a status "insufficient" in these security guidelines or future updates thereof.

Implementations MUST implement 'HTTP Strict Transport Security', as specified in [[RFC6797]].

All Clients MUST conform to applicable recommendations found in the 'Security Considerations' sections of [[RFC6749]] and those found in 'OAuth 2.0 Threat Model and Security Considerations' [[RFC6819]]. For all Tokens, the 'JSON Web Token Best Current Practices' [[RFC8725]] SHOULD be applied.

All Clients MUST apply cross-site request forgery (CSRF) counter measures. Clients can leverage the OpenID Connect `nonce` and OAuth2 `state` parameters to do so. A Client MUST utilize one or more of these parameters to verify an Authentication Response matches with the Authentication Request sent. After first use, the Client SHOULD invalidate the parameter so it can be used only once (see [[?OAuth2.Security]], Section 4.2.4).

In case Clients are relying on and communicating with multiple OpenID Providers (and/or OAuth2 Authorization Servers), Clients MUST implement countermeasures to prevent mix-up attacks. Clients SHOULD at least use distinct redirect URIs for each OpenID Provider / Authorization Server, or alternatively validate the issuer (`iss`) in the response (ID Token) matches the initiating Authentication Request (see [[RFC8252]], Section 8.10 and [[?OAuth2.Security]], Section 2.1 and 4.4.2).

<!-- [Algorithms](#algorithms) --->
### Algorithms

Security of OpenID Connect and OAuth 2.0 is significantly based on the application of cryptography. Herein the choice of algorithms is important for both security as well as interoperability. This section lists relevant choices of algorithms for all messages and tokens.

For signing of messages and tokens, implementations:

- MUST support `RS256`.
- SHOULD support `PS256`; usage of `PS256` is RECOMMENDED over `RS256`.
- MAY support other algorithms, provided they are at least equally secure as `RS256`.
- MUST NOT support algorithms that are less secure than `RS256`.

For asymmetric encryption, in particular encryption of content encryption keys, implementations:

- MUST support `RSA-OAEP`.
- SHOULD support `RSA-OAEP-256`.
- MAY support other algorithms, provided they are at least equally secure as `RSA-OAEP`.
- MUST NOT support algorithms that are less secure than `RSA-OAEP`.

For symmetric encryption, implementations:

- MUST support `A256GCM`.
- MAY support other algorithms, provided they are at least equally secure as `A256GCM`.
- MUST NOT support algorithms that are less secure than `A256GCM`.

In addition to proper selection and configuration of algorithms, implementations MUST ensure to use a cryptographically secure (pseudo)random generator. Administrators and implementations MUST apply industry best practices for key management of cryptographic keys. This includes best practices for selection of applicable key length as applicable for the relevant algorithm(s) selected.

## Future updates

This profile was created using published, finalized specifications and standards as basis. Some relevant new documents are under development at the time of writing. As this profile does not use any draft documents as basis, these cannot be included.
However, we want to attend readers to these developments and for them to take into account that future updates to this profile may incorporate the resulting standards and specifications. Furthermore we would like encourage readers to follow relevant developments.

### Service Intermediation

One functionality that is widely used in the (semi-)governmental sector but is not included in the initial version of this profile specification is *Service Intermediation*. This scenario is sometimes also refered to as identity propagation.
Examples of Service Intermediation scenario's include portals, API aggregators and Clients with enhanched or automated assistence for consuming services.

Service Intermediation is applicable when the Service Provider does not directly interact with the End-User, but delegates this responsibility to a Service Intermediary. The Service Intermediary therefore interacts with the OpenID Provider for End-User authentication, with the service offered by the Serivce Provider in scope of the Authentication Request. The Service Provider can now rely on a token from the OpenID Provider received via the Service Intermediary. Note that there is interaction with OAuth2, the Service Provider acts as Resource Server.

Such a Service Intermediary can intermediate a single service offered by a single Service Provider (e.g. an accounting app (service) that has an option to submit a tax declaration) or it can aggregate multiple Services offered by multiple Service Providers using intermediation (e.g. an app that aggregates your health information stored at several health organisations).

It is anticipated that support for Service Intermediation will be added in a later version of this profile; when it will, the following should be considered:

- Service Intermediaries should be able to obtain Claims and subject identifiers for different intermediated Services via different interactions with the OpenID Provider, with End-User consent but without the need of complete re-authentication.
- Service Intermediaries are generally not allowed to access Claims and subject identifiers. Hence, the use of pairwise and encrypted subject identifiers and Claims is usually required.
- Service Providers control which Service Intermediaries they support, specifically when confidential information is involved. Hence, Client Registration with the OpenID Provider must be established such that Service Intermediaries can only intermediate (and request Claims and subject identifiers for) Services that they are authorized for. A potential solution direction could be the use of Proof-of-Possession Key Semantics, as described in [[RFC7800]].

### Federations

This profile acknowledges that federations are widely in use, in particular among (semi-)governmental and public domain orgranisations. However, no specific support or requirements for federations are included in this version of this profile.
The OpenID Foundation is currently drafting a specification for explicit support of federations using OpenID Connect. Future updates to this profile may adopt such federation specificaitons once finalized. See [Federation at the OpenID Foundation](https://openid.net/tag/federation/).

### Other features

The following overview lists RFC and BCP documents being drafted by the OAuth 2.0 working group of the Internet Engineering Task Force (IETF) and work-in-progress by the OpenID Foundation. Future updates to this profile are likely to seek usage of and interoperability with these specifications once finalized.

[[?OAuth2.JWT]]
- An RFC for Access Tokens in JWT format is being drafted in the OAuth 2.0 working group at IETF.

[[?OAuth2.JAR]]
- An RFC for Secured (signed and/or encrypted) Authorization Requests is being drafted in the OAuth 2.0 working group at IETF. Most of the practices described in this RFC are already part of the OpenID Connect Core specification.

[[?OAuth2.RAR]]
- An RFC that introduces a request parameter `authorization_details`, which allows for more expressive Authentication Requests than those possible with the `scope` parameter, is being drafted in the OAuth 2.0 working group at IETF.

[[?OAuth2.PAR]]
- An RFC that introduces an endpoint to which Clients can push Authorization Requests via a direct POST request to an Authorizaton Server, prior to forwarding the End-User with a `request_uri` referencing the request to the Authorization Server, is being drafted in the OAuth 2.0 working group at IETF. The practices described in this RFC are already part of the OpenID Connect Core specification.

[[?OAuth2.Security]]
- A Best Current Practice document that extends the OAuth 2.0 Security Threat Model and provides security recommendations to address security challenges in OAuth 2.0 is being drafted in the OAuth 2.0 working group at IETF.

[[?OAuth2.Browser-Based-Apps]]
- A Best Current Practice document that details security considerations and best practices to be taken into account when implementing browser-based applications that use OAuth 2.0 is being drafted in the OAuth 2.0 working group at IETF.

[[?OAuth2.1]]
- An effort to consolidate and simplify OAuth 2.0 by adding and removing functionality of the core OAuth 2.0 specification and by incorporating several RFCs and BCPs that were built upon OAuth 2.0.

[[?OpenID.Federation]]
- Work by the OpenID Foundation to support federations of OpenID Providers and relying Service Providers, by publishing aggregated metadata in a specified format.
