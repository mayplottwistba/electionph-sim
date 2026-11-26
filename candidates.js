
const candidates = [
  {
    id: "risa",
    name: "Risa Hontiveros",
    fullName: "Ana Theresia Hontiveros",
    birth: "1966-02-24",
    party: "Akbayan",
    hometown: "Manila",
    homecourtProvince: null,
    wiki: "Risa Hontiveros",
    saln: null,
    salnYear: null,
    advocacies: [
      "Women's rights and gender equality",
      "Universal healthcare",
      "Mental health services",
      "Child protection"
    ],
    color: "#e5b2c1"
  },
  {
    id: "sara",
    name: "Sara Duterte",
    fullName: "Sara Zimmerman Duterte",
    birth: "1978-05-31",
    party: "HNP / Lakas-CMD",
    hometown: "Davao City",
    homecourtProvince: null,
    wiki: "Sara Duterte",
    saln: null,
    salnYear: null,
    advocacies: [
      "Women's protection",
      "Healthcare accessibility",
      "Education",
      "Local government development"
    ],
    color: "#b7dfc2"
  },
  {
    id: "leni",
    name: "Leni Robredo",
    fullName: "Maria Leonor Gerona Robredo",
    birth: "1965-04-23",
    party: "Independent",
    hometown: "Naga City, Camarines Sur",
    homecourtProvince: "Camarines Sur",
    wiki: "Leni Robredo",
    saln: null,
    salnYear: null,
    advocacies: [
      "Agricultural development",
      "Education",
      "OFW welfare",
      "Community-based poverty alleviation"
    ],
    color: "#f0b6c4"
  },
  {
    id: "raffy",
    name: "Raffy Tulfo",
    fullName: "Rafael Teshiba Tulfo",
    birth: "1960-03-12",
    party: "Independent",
    hometown: "Quezon City",
    homecourtProvince: null,
    wiki: "Raffy Tulfo",
    saln: null,
    salnYear: null,
    advocacies: [
      "Workers' rights",
      "OFW protection",
      "Family welfare",
      "Public assistance"
    ],
    color: "#b9cbed"
  },
  {
    id: "bam",
    name: "Bam Aquino",
    fullName: "Paolo Benigno Aguirre Aquino IV",
    birth: "1977-05-07",
    party: "KANP",
    hometown: "Manila",
    homecourtProvince: null,
    wiki: "Bam Aquino",
    saln: null,
    salnYear: null,
    advocacies: [
      "Quality education",
      "Entrepreneurship",
      "Science and technology",
      "Consumer protection"
    ],
    color: "#d6c5ef"
  },
  {
    id: "tito",
    name: "Tito Sotto",
    fullName: "Vicente Castelo Sotto III",
    birth: "1948-08-24",
    party: "NPC",
    hometown: "Manila",
    homecourtProvince: null,
    wiki: "Tito Sotto",
    saln: null,
    salnYear: null,
    advocacies: [
      "Agriculture",
      "Government efficiency",
      "Anti-corruption",
      "Disaster preparedness"
    ],
    color: "#edc99f"
  }
];

// BUDGET = 10% OF DECLARED SALN ONLY

function calculateCampaignBudget(candidate) {
  if (
    candidate.saln === null ||
    candidate.saln === undefined ||
    !Number.isFinite(Number(candidate.saln))
  ) {
    return {
      total: null,
      salnVerified: false
    };
  }

  return {
    total: Number(candidate.saln) * 0.10,
    salnVerified: true
  };
}
