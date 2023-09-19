# User Info

The availability, quality and reliability of an individual's identity attributes will vary greatly across jurisdictions and Provider systems. The following recommendations ensure maximum cross-jurisdictional interoperability, while setting Client expectations on the type of data they may acquire.

## Claim Interoperability

As per Section 5.1.2 of [[OpenID.Core]], Claim names SHOULD be collision-resistant. It is RECOMMENDED to use domain name based URIs as attribute names.

[[OpenID.Core]] Section 5.1 specifies a list of standard Claims. In a Dutch governmental context, attribute Claims are commonly registered in the BRP (_Basis Registratie Personen_, the Dutch citizen registry), as defined in [[?LO.GBA]]. Note that some of the standard Claims of OpenID Connect do not map directly or correctly with BRP attributes. BRP attributes SHOULD be prefered over OpenID Connect claims for attributes.
Additionally, usage of, or interoperability with, the ISA<sup>2</sup> core vocabularies is RECOMMENDED.

## Claims Supported

Discovery requires including the `claims_supported` field, which defines the Claims a Client MAY expect to receive for the supported scopes. OpenID Providers MUST return Claims on a best effort basis. However, an OpenID Provider asserting it can provide an End-User Claim does not imply that this data is available for all its End-Users: Clients MUST be prepared to receive partial data.
OpenID Providers MAY return Claims outside of the `claims_supported` list, but they MUST still ensure that the extra Claims to not violate the privacy policies set out by the trust framework the Provider supports. The OpenID Provider MUST ensure to comply with applicable privacy legislation (e.g. informed consent as per GDPR) at all times.

> Note that when Representation is supported, the OpenID Provider MUST include `represents` in the list of supported Claims and MAY include nested Claims inside the `represents` Claim.

## Scope Profiles

In the interests of data minimization balanced with the requirement to successfully identify the individual signing in to a service, the default OpenID Connect scope profiles to request Claims ([[OpenID.Core]] Section [5.4](https://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims)) may not be appropriate.

Matching of the identity assertion based on Claims to a local identifier or `account` related to the individual identity at a Level of Assurance is a requirement where the government in question is not able to provide a single identifier for all citizens based on an authoritative register of citizens.

The requirement for matching is also of importance where a cross-border or cross-jurisdiction authentication is required and therefore the availability of a single identifier (e.g. social security number) cannot be guaranteed for the individual wishing to authenticate.

However, in the Netherlands the BSN is, as a common identifier for citizens, available to BSN-eligible organizations. Nationwide interoperable pseudonyms per OpenID Client for non-BSN-eligible organizations exist as well.

The default `profile` scope of OpenID Connect is very wide, which is undesired from a privacy perspective. As such, the `profile` scope SHOULD NOT be used.

> Note that the `doc` profile described in the iGov profile for OpenID Connect [[OpenID.iGov]] is not in common use in the Netherlands and therefore not included in this profile.

## Claims Request

OpenID Core Section 5.5 [[OpenID.Core]] defines a method for a Client to request specific Claims in the UserInfo object or ID Token. OpenID Providers MUST support this `claims` parameter in the interest of data minimization - that is, the Provider only returns information on the subject the Client specifically asks for, and does not volunteer additional information about the subject.

Clients requesting the `profile` scope MAY provide a `claims` request parameter.
If the Claims request is omitted, the OpenID Provider SHOULD provide a default Claims set that it has available for the subject, in accordance with any policies set out by the trust framework the Provider supports.
> **Note:** Clients SHOULD NOT request the `profile` scope, as described in the previous section.

## Claims Response

Response to a UserInfo request MUST match the scope and Claims requested to avoid having a OpenID Provider over-expose an End-User's identity information.
OpenID Providers MUST NOT provide any personal identifiable information without applicable consent.

Claims responses MAY also make use of the aggregated and/or distributed Claims structure to refer to the original source of the subject's Claims.

## Claims Metadata

Claims Metadata (such as locale or the confidence level the OpenID Provider has in the Claim for the End-User) can be expressed as attributes within the UserInfo object, but are outside the scope of this document. These types of Claims are best described by the trust framework the Clients and OpenID Providers operate within.
It is up to the Client to assess the level of confidence provided by the OpenID Provider or the trust framework, per Claim. Expressing or evaluating such confidence is beyond the scope of this profile.

In order to provide a source, including integrity and optionally confidentiality, an OpenID Provider SHOULD be able to provide aggregated or support distributed Claims. The signee of such aggregated or distributed Claims implies the source and can support in assessing the level confidence or quality of the Claim.
