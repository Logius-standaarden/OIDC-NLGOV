# Use Case & context

This profile supports several Use Cases or partial aspects thereof. Design choices within this profile have been made with these Use Cases under consideration.

The generic Use Case is an End-User with the intention to consume an online service of a Service Provider. As the service requires authentication, this triggers the authentication process.

Authentication is provided in a federated manner. In other words, a Client system is relying upon another system, the OpenID Provider, for authentication.
Either a shared central OpenID Provider or a (distributed) network of OpenID Providers, a.k.a. a federation or scheme is being used. The ecosystem supported by the OpenID Provider can either be a single organization (intra-organizational) or multiple organizations (inter-organizational), through either bilateral or multilateral agreements.
In case a federation or scheme is being used, an Identity Broker may be applicable. Although this profile allows for usage in a federation, no explicit support for federations is _currently_ included.

The service is offered by a (semi-)governmental or public Service Provider. The Use Cases therefore explicitly covers Citizen-to-Government as well as Business-to-Government contexts. Note that business-to-government is not strictly limited to businesses, these may be other governmental organisations (inter-organizational) or internal service consumers (intra-organisational). This profile is not limited to these contexts, nor intended to exclude Business-to-Consumer and Business-to-Business contexts, but additional considerations may be applicable in those contexts.

The Service Provider or OpenID Client requests either an identifier, attributes or both of an authenticated End-User from the OpenID Provider. As target End-User audiences are diverse, multiple types of identifiers can be supported. Supported Use Cases therefore span both identifiale and attribute-based authentication.

From an architectual standpoint, the Use Case can utilize a Client in the form of a hosted web-application, a mobile/native application or a browser based single-page-application (SPA). See [Section 4.1 Client Types](#client-types) for more details.

## Representation

This profile supports several Use Cases for Representation Relationships, which apply when an End-User intends to consume an online service on behalf of a Natural or Juridical Person (the service consumer), where authentication and authorization is required. The End-User in these Use Cases is a Natural Person, representing the service consumer through a Representation Relationship. The relationship has to be formalized and may be either a direct relationship, either voluntarily or on legal grounds, or a chain of Representation Relationships. The formalization of these relationships is out of scope of this profile.

Example Representation Use Cases include voluntary authorization, representative assigned by court order (guardian, administrator), statutory signatory (director, president), limited authorized signatory, etc.

## Misc

The OpenID Connect specification [[OpenID.Core]] supports self-issued OpenID Connect Providers. However, as this profile centers around (semi-)governmental and public domain Use Cases where assurance on identity verification is virtually always required, self-issued OpenID Providers MUST NOT be accepted by OpenID Clients under this profile.

As the Dutch identity eco-system supports multiple OpenID Providers, Identity Brokers are in common use. Brokers relieve OpenID Clients of managing multiple connections to OpenID Providers, but every additional step introduces security risks and concern with regards to privacy. Among the privacy concerns is the forming of so-called privacy hotspots, points were data collection can be concentrated.
To mitigate such risks, end-to-end security is considered throughout this profile. Controls such as signing, to assure integrity, and encryption, to strengthen confidentiality, are encouraged to increase overall end-to-end security.

> Note that future versions of this profile may support use cases where Service Intermediation is applicable.
