export const siteInfo = {
  url: String(process.env.NEXT_PUBLIC_APP_URL),
  name: String(process.env.NEXT_PUBLIC_APP_NAME).length
    ? String(process.env.NEXT_PUBLIC_APP_NAME)
    : "BSG Games",
  description: "Get perfect BSG games scores",
  slogan: "Get perfect BSG games scores",
  screenshot: `${process.env.NEXT_PUBLIC_APP_URL}/screenshot.png`,
  logo: "/logos/logo.png",
  twitter: "https://twitter.com/bsg",
  twitterUsername: "dukaloco",
  whatsapp: "+254701000111",
  keywords: ["bsg", "games", "essay"],
  googleTrackingId: `${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TAG}`,
};

export const BSG_STEPS = {
  STEP1: {
    title: "Practice Round",
    rounds: {
      11: {
        with_zoon: 106,
        no_zoom: 65,
      },
      12: {
        with_zoon: 106,
        no_zoom: 65,
      },
      13: {
        with_zoon: 106,
        no_zoom: 65,
      },
      14: {
        with_zoon: 106,
        no_zoom: 65,
      },
      15: {
        with_zoon: 106,
        no_zoom: 65,
      },
      16: {
        with_zoon: 106,
        no_zoom: 65,
      },
      17: {
        with_zoon: 106,
        no_zoom: 65,
      },
      18: {
        with_zoon: 106,
        no_zoom: 65,
      },
      19: {
        with_zoon: 106,
        no_zoom: 65,
      },
      20: {
        with_zoon: 106,
        no_zoom: 65,
      },
    },
  },
  STEP2: {
    title: "Competition Round",
  },
  STEP3: {
    title: "3-Yr. Strategic Plan",
  },
  STEP4: {
    title: "Reports",
  },
};
