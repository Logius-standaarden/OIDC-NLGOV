# User Info

The availability, quality and reliability of an individual's identity attributes will vary greatly across jurisdictions and Provider systems. The following recommendations ensure maximum cross-jurisdictional interoperability, while setting Client expectations on the type of data they may acquire.

## Claim Interoperability

As per Section 5.1.2 of [[OpenID.Core]], Claim names SHOULD be collision-resistant. It is RECOMMENDED to use domain name based URIs as attribute names.

[[OpenID.Core]] Section 5.1 specifies a list of standard Claims. In a Dutch governmental context, attribute Claims are commonly registered in the BRP (_Basis Registratie Personen_, the Dutch citizen registry), as defined in [[?LO.GBA]]. Note that some of the standard Claims of OpenID Connect do not map directly or correctly with BRP attributes. BRP attributes SHOULD be prefered over OpenID Connect claims for attributes.

<aside class="example">
  
The following example demonstrates the interoperability issues between the Dutch naming system and standard claims. We show the possible use of the `family_name_affix` attribute in combination with the standard claim set.
Below is a sample payload from an OIDC ID Token or `userinfo` endpoint response:
<pre>
{
  "sub": "abc123",
  "name": "Jan van den Broek",
  "given_name": "Jan",
  "family_name": "Broek",
  "family_name_affix": "van den",
  "preferred_username": "j.broek",
  "email": "jan.broek@voorbeeld.nl",
  "email_verified": true,
  "updated_at": 1719859200
}

</pre>
- `family_name_affix` is a custom claim that allows parsing/sorting systems to treat the affix separately.
- `name` remains intact for display purposes.
- `family_name` only includes the given surname for structured or legal purposes.

In order to make this easier to validate, one could define a json schema that represents the structure of a persons profile. Below is just an **imaginary example**.

<pre>
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "NL GOV OIDC Extended User Profile",
  "type": "object",
  "properties": {
    "sub": {
      "type": "string",
      "description": "Subject identifier"
    },
    "name": {
      "type": "string",
      "description": "Full display vv"
    },
    "given_name": {
      "type": "string",
      "description": "Given name(s)"
    },
    "family_name": {
      "type": "string",
      "description": "Family name without affix"
    },
    "family_name_affix": {
      "type": "string",
      "description": "Name affix or prefix used in Dutch surnames (e.g., 'van der', 'de')"
    },
    "preferred_username": {
      "type": "string",
      "description": "Preferred username"
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "email_verified": {
      "type": "boolean"
    },
    "updated_at": {
      "type": "integer",
      "description": "Last update timestamp"
    }
  },
  "required": ["sub", "name", "given_name", "family_name", "email", "email_verified"]
}

</pre>

> **Implementation notes:** OIDC servers based on Keycloak, Auth0, etc., allow custom claims via user attribute mappings or protocol mappers. Relying parties can choose to use family_name_affix if needed — otherwise, it’s ignored. 
</aside>

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

Claims Metadata (such as locale or the confidence level the OpenID Provider has in the Claim for the End-User) can be expressed as attributes within the UserInfo object. These types of Claims are best described by the trust framework the Clients and OpenID Providers operate within.
It is up to the Client to assess the level of confidence provided by the OpenID Provider or the trust framework, per Claim.

In order to provide a source, including integrity and optionally confidentiality, an OpenID Provider SHOULD be able to provide aggregated or support distributed Claims. The signee of such aggregated or distributed Claims implies the source and can support in assessing the level confidence or quality of the Claim.

For identity assurance there is a standardised extension in [[[OpenID.Identity_Assurance]]]. It allows for use under different regulations, such as eIDAS. Below is an example of how to apply eIDAS within the NLgov profile.

### Identity assurance on eIDAS level

The `verified_claims` attribute is part of the [[[OpenID.Identity_Assurance]]] to convey verified identity information about the user. This includes attributes like name, date of birth, or national identification number, which have been verified by the OpenID Provider (OP) according to a specific assurance level. In the context of eIDAS, the verified_claims attribute would be used to provide additional verified identity information, ensuring that the claims meet the required eIDAS LoA. For example, if the `acr` value indicates a _"high" LoA_, the `verified_claims` would include identity attributes that have been verified to that high assurance level.

<aside class="example">
  
The following example shows the use of the `verified_claims` attribute with eIDAS LoA:
<pre>
{
  "iss": "https://idp-p.example.com/",
  "sub": "248289761001",
  "acr": "http://eidas.europa.eu/LoA/high",
  "verified_claims": {
    "verification": {
      "trust_framework": "eidas",
      "assurance_level": "high",
    },
    "claims": {
      "given_name": "Jan",
      "family_name": "Wandelaar",
      "birthdate": "1985-01-01",
      "place_of_birth": {
        "country": "NL",
        "locality": "Delft"
      },
      "nationalities": [
        "NL"
      ]
    }
  }
}
</pre>
</aside>

In this example we have:
- `iss`: The issuer of the token, which is the OpenID Provider (OP).
- `sub`: The subject identifier, uniquely identifying the user.
- `verified_claims`: Contains verified identity information, structured as follows:
- `verification`: Describes the verification process:
- `trust_framework`: Indicates the trust framework used (in this case eIDAS). This anwsers the question of _which rules_ are in play.
- `assurance_level`: Matches the acr value, confirming the LoA.
- `claims`: Contains the verified identity attributes (e.g., name, birthdate, nationality).

Clients can request a specific LoA using the `acr_values` parameter in the authentication request. The OP must ensure that the provided `acr` value meets or exceeds the requested LoA.
If the client also sends a `vtr` (_Vectors of Trust Request_) parameter, the `acr_values` take precedence, and the `vtr` is ignored. This ensures compatibility with the eIDAS LoA framework.
The verified_claims attribute would then be populated with identity information that aligns with the resulting `acr` value.
