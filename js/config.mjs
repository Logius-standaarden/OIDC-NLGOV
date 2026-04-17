import { loadRespecWithConfiguration } from "https://logius-standaarden.github.io/publicatie/respec/organisation-config.mjs";
import { generateMermaidFigures } from "https://logius-standaarden.github.io/publicatie/respec/plugins/mermaid.mjs";

loadRespecWithConfiguration({
  useLogo: true,
  useLabel: true,
  license: "cc-by",
  specStatus: "WV",
  specType: "ST",
  pubDomain: "api",
  shortName: "oidc",
  publishDate: "2023-09-18",
  publishVersion: "1.0.1",

  previousPublishVersion: [],
  previousPublishDate: "2021-02-18",
  previousMaturity: "WV",

  editors:
    [
      {
        name: "Remco Schaar",
        company: "Logius",
        companyURL: "https://www.logius.nl",
      },
      {
        name: "Frank van Es",
        company: "Logius",
        companyURL: "https://www.logius.nl",
      },
      {
        name: "Pieter Hering",
        company: "Logius",
        companyURL: "https://www.logius.nl",
      },
      {
        name: "Martin van der Plas",
        company: "Logius",
        companyURL: "https://www.logius.nl",
      },
      {
        name: "Alexander Green",
        company: "Logius",
        companyURL: "https://www.logius.nl",
      }
    ],
  authors:
    [
      {
        name: "Remco Schaar",
        company: "Logius",
        companyURL: "https://www.logius.nl",
      },
      {
        name: "Frank van Es",
        company: "Logius",
        companyURL: "https://www.logius.nl",
      },
      {
        name: "Joris Joosten",
        company: "VZVZ",
        companyURL: "https://www.vzvz.nl/",
      },
      {
        name: "Jan Geert Koops",
        company: "Dictu",
        companyURL: "https://www.dictu.nl/",
      }
    ],
  github: "https://github.com/Logius-standaarden/OIDC-NLGOV/",

  localBiblio: {
    "BPSS": {
      href: "http://www.ebxml.org/specs/ebBPSS.pdf",
      title:
        "ebXML Business Process Specification Schema",
      authors: ["Paul  Levine"],
      date: "May 2001",
      publisher: "OASIS",
    },
    "eIDAS.SAML": {
      href: "https://ec.europa.eu/digital-building-blocks/sites/download/attachments/467109280/eIDAS%20SAML%20Message%20Format%20v.1.4.1_final.pdf",
      title: "eIDAS SAML Message Format",
      publisher: "eIDAS Coorperation Network"
    },
    "LO.GBA": {
      href: "https://www.rvig.nl/lo-brp",
      title: "Logisch ontwerp BRP",
      authors: [""],
      date: "1 april, 2025",
      publisher: "RvIG",
    },
    "OAuth2.1": {
      href: "https://tools.ietf.org/html/draft-parecki-oauth-v2-1",
      title: "OAuth 2.1 Working draft",
      authors: ["D. Hardt", "A. Parecki", "T. Lodderstedt"],
      date: "April 2020",
      publisher: "IETF OAuth Working Group"
    },
    "OAuth2.Browser-Based-Apps": {
      href: "https://tools.ietf.org/html/draft-ietf-oauth-browser-based-apps",
      title:
        "OAuth 2.0 for Browser-Based Apps",
      authors: ["A. Parecki", "D. Waite"],
      status: "Internet-Draft",
      publisher: "IETF OAuth Working Group",
    },
    "OAuth2.JAR": {
      href: "https://tools.ietf.org/html/draft-ietf-oauth-jwsreq",
      title:
        "The OAuth 2.0 Authorization Framework: JWT Secured Authorization Request (JAR)",
      authors: ["N. Sakimura", "J. Bradley"],
      status: "Internet-Draft",
      publisher: "IETF OAuth Working Group",
    },
    "OAuth2.JWT": {
      href: "https://tools.ietf.org/html/draft-ietf-oauth-access-token-jwt",
      title:
        "JSON Web Token (JWT) Profile for OAuth 2.0 Access Tokens",
      authors: ["V. Bertocci"],
      status: "Internet-Draft",
      publisher: "IETF OAuth Working Group",
    },
    "OAuth2.NLgov": {
      href: "https://gitdocumentatie.logius.nl/publicatie/api/oauth/",
      title:
        "NLgov Assurance profile for OAuth 2.0",
      authors: ["F. Terpstra", "J. van Gelder"],
      date: "july 2020",
      publisher: "Logius",
    },
    "OAuth2.PAR": {
      href: "https://tools.ietf.org/html/draft-lodderstedt-oauth-par",
      title:
        "OAuth 2.0 Pushed Authorization Requests",
      authors: ["T. Lodderstedt", "B. Campbell", "N. Sakimura", "D. Tonge", "F. Skokan"],
      status: "Internet-Draft",
      publisher: "IETF OAuth Working Group",
    },
    "OAuth2.RAR": {
      href: "https://tools.ietf.org/html/draft-lodderstedt-oauth-rar",
      title:
        "OAuth 2.0 Rich Authorization Requests",
      authors: ["T. Lodderstedt", "J. Richer", "B. Campbell"],
      status: "Internet-Draft",
      publisher: "IETF OAuth Working Group",
    },
    "OAuth2.Security": {
      href: "https://tools.ietf.org/html/draft-ietf-oauth-security-topics",
      title:
        "OAuth 2.0 Security Best Current Practice",
      authors: ["T. Lodderstedt", "J. Bradley", "A. Labunets", "D. Fett"],
      status: "Internet-Draft",
      publisher: "IETF OAuth Working Group",
    },
    "OpenID.Core": {
      href: "https://openid.net/specs/openid-connect-core-1_0.html",
      title: "OpenID Connect Core 1.0",
      authors: [
        "N. Sakimura", "J. Bradley", "M. B. Jones",
        "B. de Medeiros", "C. Mortimore"],
      date: "2014",
      publisher: "The OpenID Foundation",
    },
    "OpenID.Discovery": {
      href: "https://openid.net/specs/openid-connect-discovery-1_0.html",
      title: "OpenID Connect Discovery 1.0",
      authors: [
        "N. Sakimura", "J. Bradley", "M. Jones",
        "E. Jay"],
      date: "2014",
      publisher: "The OpenID Foundation",
    },
    "OpenID.Dynamic-Registration": {
      href: "https://openid.net/specs/openid-connect-registration-1_0.html",
      title: "OpenID Connect Dynamic Client Registration 1.0",
      authors: [
        "N. Sakimura", "J. Bradley", "M. Jones"
      ],
      date: "2014",
      publisher: "The OpenID Foundation",
    },
    "OpenID.iGov": {
      href: "https://openid.net/specs/openid-igov-openid-connect-1_0.html",
      title: "International Government Assurance Profile (iGov) for OpenID Connect 1.0",
      authors: [
        "M. Varley", "P. Grassi"],
      date: "2018",
      publisher: "The OpenID Foundation",
    },
    "OpenID.Identity_Assurance": {
      href: "https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html",
      title: "OpenID Connect for Identity Assurance 1.0",
      authors: [
        "Torsten Lodderstedt",
        "Mark Haine",
        "Alberto Pulido",
        "David Waite",
        "Joseph Heenan",
        "Ralph Bragg"
      ],
      date: "1 October, 2024",
      publisher: "The OpenID Foundation",
    },
    "OpenID.NLgov": {
      href: "https://gitdocumentatie.logius.nl/publicatie/api/oidc/",
      title: "NLgov Assurance profile for OpenID Connect 1.0",
      authors: [
        "R. Schaar", "F. van Es", "J. Joosten", "J. G. Koops"],
      date: "2021",
      publisher: "Logius",
    },
    "OpenID.Federation": {
      href: "https://openid.net/specs/openid-connect-federation-1_0-12.html",
      title: "OpenID Connect Federation 1.0 - draft 12",
      authors: [
        "R. Hedberg", "M. Jones", "A. Solberg", "S. Gulliksson", "J. Bradley"],
      date: "June 30, 2020",
      published: "The OpenID Foundation",
    },
    "PKI.Policy": {
      href: "https://www.logius.nl/sites/default/files/public/bestanden/diensten/PKIoverheid/Deel2-eisen-voor-TSPs-v4.7.pdf",
      title:
        "Programma van Eisen deel 2: Toetreding tot en toezicht binnen de PKI voor de overheid",
      authors: [""],
      date: "8 februari 2019",
      publisher: "Logius",
    },
    "SG.TLS": {
      href: "https://www.ncsc.nl/en/transport-layer-security/ICT-beveiligingsrichtlijnen-voor-TLS",
      title: "IT Security Guidelines for Transport Layer Security (TLS) v2.1",
      authors: [""],
      date: "19-01-2021",
      publisher: "NCSC",
    },
    "SG.LoA": {
      href: "https://www.forumstandaardisatie.nl/sites/default/files/BFS/4-basisinformatie/publicaties/Assurance-levels-for-digital-service-provision.pdf",
      title: "Assurance level for digital service provision",
      authors: [""],
      date: "September 2017",
      publisher: "The Standardisation Forum (NL)",
    },
  },

  postProcess: [generateMermaidFigures]
});
