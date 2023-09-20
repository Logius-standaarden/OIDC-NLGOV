let respecConfig = {
  useLogo: true,
  useLabel: true,
  license: "cc-by",
  specStatus: "DEF",
  specType: "ST",
  pubDomain: "api",
  shortName: "oidc",
  publishDate: "2023-09-18",
  publishVersion: "1.0.1",
  
  previousVersion: "1.0",
  previousPublishDate: "2021-02-18",
  previousMaturity: "WV",
  title: "OpenID NLGov",
  // content: {"NLGovOpenID": ""},
  content: {"Introduction": "", "UseCase": "", "Flow": "", "ClientProfile": "", "ProviderProfile": "", "UserInfo": "", "Considerations": "", "Appendix": "informative" },
  editors:
    [
      {
        name: "Remco Schaar",
        company: "Logius",
        companyURL: "https://github.com/Logius-standaarden",
      },
      {
        name: "Frank van Es",
        company: "Logius",
        companyURL: "https://github.com/Logius-standaarden",
      },
      {
        name: "Pieter Hering",
        company: "Logius",
        companyURL: "https://github.com/Logius-standaarden",
      },
      {
        name: "Martin van der Plas",
        company: "Logius",
        companyURL: "https://github.com/Logius-standaarden",
       },
      {
        name: "Alexander Green",
        company: "Logius",
        companyURL: "https://github.com/Logius-standaarden",
      }
    ],
  authors:
    [
      {
        name: "Remco Schaar",
        company: "Logius",
        companyURL: "https://github.com/Logius-standaarden",
      },
      {
        name: "Frank van Es",
        company: "Logius",
        companyURL: "https://github.com/Logius-standaarden",
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


  // Create PDF and link to file in header (optional):
  alternateFormats: [
      {
          label: "pdf",
          uri: "OpenID-NLGov.pdf",
      },
  ],
  localBiblio: {
    "ebMS3": {
      href: "https://docs.oasis-open.org/ebxml-msg/ebms/v3.0/core/ebms_core-3.0-spec.pdf",
      title:
        "OASIS ebXML Messaging Services 3 Version 3.0: Part 1, Core Features",
      authors: ["Ian Jones", "Pete Wenzel"],
      date: "October 2007",
      publisher: "OASIS",
    },
    "BPSS": {
      href: "http://www.ebxml.org/specs/ebBPSS.pdf",
      title:
        "ebXML Business Process Specification Schema",
      authors: ["Paul  Levine"],
      date: "May 2001",
      publisher: "OASIS",
    },
    "eIDAS.SAML": {
      href: "https://ec.europa.eu/cefdigital/wiki/download/attachments/82773108/eIDAS%20SAML%20Message%20Format%20v.1.2%20Final.pdf",
      title: "eIDAS SAML Message Format",
      publisher: "eIDAS Coorperation Network"
    },
    "LO.GBA": {
      href: "https://www.rvig.nl/logisch-ontwerp-brp ",
      title: " Logisch ontwerp BRP",
      authors: [""],
      date: "July 2023",
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
    "OAuth2.NLGov": {
      href: "https://gitdocumentatie.logius.nl/publicatie/api/oauth/",
      title:
        "NL GOV Assurance profile for OAuth 2.0",
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
    "OpenID.NLGov": {
      href: "https://logius.gitlab.io/oidc/",
      title: "NL GOV Assurance profile for OpenID Connect 1.0",
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
    "PKI-CA": {
      href: "https://www.logius.nl/diensten/pkioverheid/aansluiten-als-tsp/toegetreden-vertrouwensdienstverleners",
      title:
        "Toegetreden vertrouwensdienstverleners",
      authors: [""],
      date: "2018",
      publisher: "Logius",
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
      href: "https://english.ncsc.nl/publications?keyword=IT+Security+Guidelines+for+Transport+Layer+Security&start-date=&end-date=&topic=All+topics&type=All+publications",
      title: " IT Security Guidelines for Transport Layer Security (TLS)",
      authors: [""],
      date: "23-05-2019",
      publisher: "NCSC",
    },
    "SG.LoA": {
href: "https://www.forumstandaardisatie.nl/sites/default/files/BFS/4-basisinformatie/publicaties/Assurance-levels-for-digital-service-provision.pdf",
title: "Assurance level for digital service provision",
authors: [""],
date: "September 2017",
publisher: "The Standardisation Forum (NL)",
    },
    "UMMR10": {
      href: "https://www.unece.org/fileadmin/DAM/cefact/umm/UMM_Revision_10_2001.zip",
      title:
        "UN/CEFACT Modelling Methodology (UMM) Revison 10",
      authors: [""],
      date: "2001",
      publisher: "UN/CEFACT",
    },
},

};
