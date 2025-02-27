# use case & context

This profile supports several use cases or partial aspects thereof. Design choices within this profile have been made with these use cases taken into account.

The generic use case is an End-User with the intention to consume an online service of a service provider. As the service requires authentication, this triggers the authentication process.

Authentication is provided in a federated manner. In other words, a client system is relying upon another system, the OpenID provider, for authentication.
Either a shared central OpenID provider or a (distributed) network of OpenID providers — also known as a federation or scheme — is being used. The ecosystem supported by the OpenID provider can either be a single organization (intra-organizational) or multiple organizations (inter-organizational), through either bilateral or multilateral agreements.
In case a federation or scheme is being used, an identity broker may be applicable. Although this profile allows for usage in a federation, no explicit support for federations is _currently_ included.

The service is offered by a (semi-)governmental or public service provider. The use cases therefore explicitly cover Citizen-to-Government as well as Business-to-Government contexts. Note that business-to-government is not strictly limited to businesses, these may be other governmental organisations (inter-organizational) or internal service consumers (intra-organisational). This profile is not limited to these contexts, nor intended to exclude Business-to-Consumer and Business-to-Business contexts, but additional considerations may be applicable in those contexts.

The service provider or OpenID client requests either an identifier, attributes, or both of an authenticated End-User through the OpenID provider. As target End-User audiences are diverse, multiple types of identifiers can be supported. Supported use cases therefore span both identifiale and attribute-based authentication.

From an architectual standpoint, the use case can utilize a client in the form of a hosted web-application, a mobile/native application or a browser based single-page-application (SPA). See [[[#client-types]]] for more details.

## Representation

This profile supports several use cases for representation relationships, which apply when an End-User intends to consume an online service on behalf of a Natural or Juridical Person (the service consumer), where authentication and authorization is required. The End-User in these use cases is a Natural Person, representing the service consumer through a Representation Relationship. The relationship has to be formalized and may be either a direct relationship, either voluntarily or on legal grounds, or a chain of representation relationships. The formalization of these relationships is out of scope of this profile.

Example Representation use cases include voluntary authorization, representative assigned by court order (guardian, administrator), statutory signatory (director, president), limited authorized signatory, etc.

## Miscellaneous

[[[OpenID.Core]]] supports self-issued OpenID Connect providers. However, as this profile centers around (semi-)governmental and public domain use cases where assurance on identity verification is virtually always required, self-issued OpenID providers MUST NOT be accepted by OpenID clients under this profile.

As the Dutch identity eco-system supports multiple OpenID providers, identity brokers are in common use. Brokers relieve OpenID clients of managing multiple connections to OpenID providers, but every additional step introduces security risks and concern with regards to privacy. Among the privacy concerns is the forming of so-called privacy hotspots, points where data collection can be concentrated.
To mitigate such risks, end-to-end security is considered throughout this profile. Controls such as signing, to assure integrity, and encryption, to strengthen confidentiality, are encouraged to increase overall end-to-end security.

Note that future versions of this profile may support use cases where service intermediation is applicable (see [[[#service-intermediation]]]).
