import { CaseStudy } from "../types/portfolio";

export const caseStudies: CaseStudy[] = [
  {
    projectId: 1,
    overview: "Campus Connect is a comprehensive peer collaboration hub designed to bridge communication gaps in university environments. Built with a React frontend and an Express/Node.js backend, it integrates support forums, real-time peer messaging, and a student-to-student marketplace into a single, unified workspace.",
    problemStatement: "Modern university communications are highly fragmented. Students rely on separate platforms for supporting coursework, selling items, organizing study groups, and real-time chat, leading to missed updates, security concerns in transaction processes, and isolated peer communities.",
    whyIBuiltIt: "I noticed my fellow students struggling to find textbooks, form study groups, and get peer help across multiple disjointed chat groups. I wanted to design a single, trusted campus-exclusive workspace where all student collaboration needs are resolved securely and efficiently.",
    systemArchitecture: {
      description: "Relies on a layered Client-Server architecture. The React frontend interacts with an Express server, using PostgreSQL and MongoDB as databases for forums, messages, and listings.",
      diagramSteps: [
        { title: "Client Layer", desc: "React Web application styled using custom CSS and Framer Motion transitions." },
        { title: "API Gateway", desc: "Express REST API handling authentication, CORS, rate limiting, and request routing." },
        { title: "Service Layer", desc: "Specialized services managing messaging sockets, forum threads, and marketplace listings." },
        { title: "Storage Layer", desc: "MongoDB for flexible forum threads and chat archives; PostgreSQL for structured transaction records and user authentication profiles." }
      ]
    },
    features: [
      { title: "Sub-Community Forums", desc: "Discussion channels organized by courses, hobbies, or clubs." },
      { title: "Peer Messaging", desc: "Real-time peer chat with active indicator status to keep students connected instantly." },
      { title: "Student Marketplace", desc: "A secure campus-only portal for peer transactions of books, items, and services." }
    ],
    technicalChallenges: [
      {
        challenge: "Handling real-time messaging updates efficiently without overloading the server.",
        solution: "Integrated WebSocket communication protocol using Socket.io, with rooms partitioned by user pairings and optimized message indexing."
      },
      {
        challenge: "Synchronizing relational student profiles with unstructured forum data.",
        solution: "Implemented a hybrid database approach using MongoDB for forums/messages and PostgreSQL for accounts, linking them via unique UUID keys."
      }
    ],
    lessonsLearned: [
      "Designing a dual-database architecture requires strict synchronization protocols.",
      "I learned the value of robust authentication guards and data validation on user-generated content to prevent cross-site scripting (XSS)."
    ],
    futureImprovements: [
      "Integrated course enrollment matching for automatic study group creation.",
      "Native calendar scheduling for booking campus study rooms.",
      "Push notifications via service workers."
    ],
    screenshots: [
      { src: "/images/projects/campus_connect_dashboard.jpg", caption: "Unified collaboration feed dashboard displaying academic updates and peer posts." },
      { src: "/images/projects/campus_connect_chat.jpg", caption: "Real-time instant peer chat system built with Socket.io channels." },
      { src: "/images/projects/campus_connect_market.jpg", caption: "Campus restricted student-to-student transactions marketplace." }
    ],
    metrics: [
      { label: "Full Stack Platform", value: "React + Node.js", desc: "Dual client-server architecture setup" },
      { label: "Multi-Service Architecture", value: "4 Layers", desc: "Decoupled Gateway, Messaging, Forum & Marketplace" },
      { label: "Community Driven", value: "10+ Course Hubs", desc: "Peer-to-peer student discussion channels" },
      { label: "Marketplace Features", value: "Instant Sockets", desc: "Real-time websocket item negotiations" }
    ]
  },
  {
    projectId: 2,
    overview: "A tourism exploration web application designed for the Smart India Hackathon 2024 to promote regional heritage. The platform features location mapping, interactive cultural timelines, and lodging recommendations.",
    problemStatement: "Regional heritage sites are often overshadowed by major global attractions, leaving local artisans, historic spots, and unique lodging providers invisible to travelers due to a lack of consolidated digital resources.",
    whyIBuiltIt: "As a team for SIH 2024, we set out to build a platform that could digitize the cultural index of regional landmarks, enabling micro-tourism and raising economic support for local communities.",
    systemArchitecture: {
      description: "Monolithic frontend layout communicating with mapping and government tourism APIs.",
      diagramSteps: [
        { title: "Map Rendering", desc: "Integrated Leaflet and Google Maps API for interactive geolocation pins." },
        { title: "Search Engine", desc: "Client-side state filtering based on site attributes, era, and regional specialty." },
        { title: "UI System", desc: "Highly responsive glassmorphic cards optimized for mobile viewports." }
      ]
    },
    features: [
      { title: "Geolocation Map", desc: "Geolocation markers for hidden heritage spots." },
      { title: "Cultural Timeline", desc: "Interactive timeline showing historical eras and site backgrounds." },
      { title: "Artisan Hub", desc: "Direct links and directions to local craft shops." }
    ],
    technicalChallenges: [
      {
        challenge: "Rendering hundreds of custom map markers smoothly on mobile browsers.",
        solution: "Implemented marker clustering and lazy-loading of popup details, reducing initial asset overhead by 65%."
      }
    ],
    lessonsLearned: [
      "Real-time API integrations require strong error fallbacks.",
      "Designing for travelers means prioritizing lightweight pages that load quickly even on weaker mobile connections."
    ],
    futureImprovements: [
      "Offline mode support using service worker cache.",
      "AI-based personalized itinerary planner.",
      "Multilingual support for international visitors."
    ],
    screenshots: [
      { src: "/images/projects/sih_heritage_map.jpg", caption: "Leaflet geospatial map rendering historical markers and locations dynamically." },
      { src: "/images/projects/sih_artisan_hub.jpg", caption: "Interactive artisan shop hubs connecting local craft sellers directly with travelers." }
    ],
    metrics: [
      { label: "Exploration Maps", value: "Leaflet Map", desc: "Geospatial marker pins clustering" },
      { label: "Regional Arts", value: "Artisan Hub", desc: "Local craft shops discoverability" },
      { label: "Target Audience", value: "Micro-Tourism", desc: "Connecting tourists to hidden regional landmarks" }
    ]
  }
];
