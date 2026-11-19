// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "Publications",
          description: "Papers in reverse date order, then talks.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-projects",
          title: "Projects",
          description: "Research from my PhD and fun side projects applying the same skills. Covering graph neural networks, molecular spectroscopy pipelines, and scientific database tooling.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "dropdown-guide",
              title: "Guide",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/toolkit/";
              },
            },{id: "dropdown-kit",
              title: "Kit",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/toolkit/kit/";
              },
            },{id: "dropdown-examples",
              title: "Examples",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/toolkit/examples/";
              },
            },{id: "dropdown-talks",
              title: "Talks",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/toolkit/talks/";
              },
            },{id: "nav-cv",
          title: "CV",
          description: "Academic CV. PhD researcher in machine learning and molecular physics at UCL ExoMol.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "news-paper-exomol-line-lists-for-12-co-isotopologues-mnras-2025",
          title: 'Paper: ExoMol line lists for 12 CO₂ isotopologues (MNRAS, 2025)',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/mnras_2025/";
            },},{id: "news-paper-machine-learning-isotope-shifts-in-molecular-energy-levels-jms-2026",
          title: 'Paper: Machine learning isotope shifts in molecular energy levels (JMS, 2026)',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/jmolspec_2026/";
            },},{id: "news-talk-machine-learning-for-isotopologue-extrapolation-hrms-2026-prague",
          title: 'Talk: Machine learning for isotopologue extrapolation (HRMS 2026, Prague)',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/hrms_2026/";
            },},{id: "news-paper-automated-quantum-number-assignment-for-co-jqsrt-2026",
          title: 'Paper: Automated quantum number assignment for CO₂ (JQSRT, 2026)',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/jqsrt_2026/";
            },},{id: "news-talk-working-with-agents-llm-discussion-series-ucl-astronomy",
          title: 'Talk: Working with agents (LLM Discussion Series, UCL Astronomy)',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/llm_discussion_2026/";
            },},{id: "projects-machine-learning-isotope-shifts",
          title: 'Machine learning isotope shifts',
          description: "Neural network corrections to the energy levels of rare isotopic molecules. Published in the Journal of Molecular Spectroscopy (2026).",
          section: "Projects",handler: () => {
              window.location.href = "/projects/01_isotopologue_extrapolation/";
            },},{id: "projects-quantum-number-assignment-for-co",
          title: 'Quantum number assignment for CO₂',
          description: "A graph neural network that labels computed CO₂ energy levels with quantum numbers, across all 12 stable isotopologues. Published in JQSRT (2026).",
          section: "Projects",handler: () => {
              window.location.href = "/projects/02_qn_prediction/";
            },},{id: "projects-exomol-llm-wiki",
          title: 'ExoMol LLM wiki',
          description: "A source-checked knowledge base of the ExoMol literature, built with an LLM and kept honest by deterministic checks.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/03_exomol_wiki/";
            },},{id: "projects-football-analytics",
          title: 'Football analytics',
          description: "Side projects applying my PhD toolkit to football data. A transfer fee model, Elo ratings for the 2026 World Cup and the English league pyramid, and a study of crowds and referees.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/04_football_analytics/";
            },},{id: "projects-marvel-database",
          title: 'MARVEL database',
          description: "One database for MARVEL energy level data across many molecules, with a read-only API and a website in development.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/05_marvel_database/";
            },},{id: "projects-headers-for-exomol",
          title: 'Headers for ExoMol',
          description: "A command-line tool that adds column labels to ExoMol data files and converts them to CSV, without changing the originals.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/06_exomol_headers/";
            },},{id: "projects-ai-toolkit",
          title: 'AI Toolkit',
          description: "How I run AI coding agents day to day, from one agent per project to an orchestrator with many workers, written up as a living guide.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/07_ai_toolkit/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%6D%61%72%63%6F.%62%61%72%6E%66%69%65%6C%64.%32%34@%75%63%6C.%61%63.%75%6B", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/mbarnfield63", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/mbarnfield", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=KXJVCS0AAAAJ", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
