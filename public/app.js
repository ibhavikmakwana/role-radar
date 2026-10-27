/**
 * Tech Roles Radar - app.js (v32.0)
 * Powered by CareerOps AI Job Search & Evaluation Engine
 * Live Multi-source Ingestion, A-H Evaluation Framework, 1-5 Fit Scoring,
 * ATS Cover Letter & Bullet Generator, Application Funnel Pipeline, and CLI Interoperability.
 */

(() => {
  'use strict';

  // --- Theme & Accent Color Palette ---
  const ACCENT = {
    orange: '#e05a00',
    green: '#0f9d6e',
    blue: '#2563eb',
    amber: '#f59e0b',
    purple: '#8b5cf6',
    rose: '#ec4899'
  };

  const tint = (hex, a) => {
    const n = parseInt((hex || '#e05a00').replace('#', ''), 16);
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
  };

  const CAT_COLOR = {
    fde: ACCENT.orange,
    data: ACCENT.blue,
    mobile: ACCENT.green,
    flutter: ACCENT.green,
    android: ACCENT.green,
    ios: ACCENT.green,
    dotnet: ACCENT.purple,
    cloud: ACCENT.blue,
    robotics: ACCENT.amber,
    product: ACCENT.rose,
    ai: ACCENT.purple,
    solutions: ACCENT.rose,
    engineering: ACCENT.blue
  };

  const CAT_SHORT = {
    fde: 'FDE',
    data: 'DATA',
    mobile: 'MOBILE',
    flutter: 'FLUTTER',
    android: 'ANDROID',
    ios: 'IOS',
    dotnet: 'ASP.NET',
    cloud: 'CLOUD',
    robotics: 'ROBOTICS',
    product: 'PRODUCT',
    ai: 'AI/ML',
    solutions: 'SOLUTIONS',
    engineering: 'ENGINEERING'
  };

  const SRC_COLOR = {
    Greenhouse: ACCENT.blue,
    Lever: ACCENT.blue,
    Ashby: ACCENT.purple,
    Remotive: ACCENT.blue,
    JobSpy: ACCENT.green,
    Jobicy: ACCENT.blue,
    LinkedIn: ACCENT.blue,
    Indeed: ACCENT.blue,
    Glassdoor: ACCENT.green,
    CareerOps: ACCENT.orange
  };

  const STORAGE_KEY_SAVED = 'trr_saved_jobs_v30';
  const CACHE_KEY_JOBS = 'trr_cached_jobs_v30';
  const STORAGE_KEY_PROFILE = 'trr_careerops_profile_v1';
  const STORAGE_KEY_PIPELINE = 'trr_careerops_pipeline_v1';
  const STORAGE_KEY_CUSTOM_JOBS = 'trr_careerops_custom_jobs_v1';

  // --- Default Candidate Profile Presets ---
  const DEFAULT_PROFILES = {
    fde: {
      id: 'fde',
      name: 'Bhavik Makwana',
      title: 'Forward Deployed AI Engineer & Google Developer Expert',
      archetype: 'Forward Deployed AI Engineer',
      yearsExp: 8,
      targetLevel: 'Senior / Staff / Lead',
      targetComp: '₹35–55 LPA / $140–200K',
      skills: [
        'Python', 'TypeScript', 'LangChain', 'LLMs', 'RAG', 'Vector Databases',
        'Cloudflare Workers', 'Edge Computing', 'Flutter', 'FastAPI', 'React',
        'Docker', 'GCP', 'Agentic Systems', 'MCP', 'Enterprise Architecture',
        'System Design', 'PostgreSQL', 'CI/CD', 'API Design'
      ],
      experienceSummary: 'Forward Deployed AI Engineer and Google Developer Expert with 8+ years building high-throughput production AI systems, real-time client integrations, edge architectures on Cloudflare, and mission-critical multi-platform mobile apps. Proven track record of shipping sub-50ms latency AI pipelines and enterprise client deployments.',
      proofPoints: [
        'Built full-scale production AI pipeline architectures on Cloudflare Edge with sub-50ms roundtrip latency',
        'Google Developer Expert (GDE) with extensive technical writing and open-source contributions',
        'Delivered customer deployments bridging enterprise backend requirements to custom AI solutions'
      ]
    },
    fullstack: {
      id: 'fullstack',
      name: 'Bhavik Makwana',
      title: 'Senior Full-Stack AI Engineer',
      archetype: 'Full-Stack & Systems',
      yearsExp: 7,
      targetLevel: 'Senior Engineer',
      targetComp: '₹30–48 LPA / $130–180K',
      skills: [
        'TypeScript', 'Python', 'React', 'Next.js', 'Node.js', 'PostgreSQL',
        'FastAPI', 'Tailwind CSS', 'Docker', 'GraphQL', 'AWS', 'Redis',
        'LLM Integrations', 'REST APIs', 'Microservices', 'Prisma'
      ],
      experienceSummary: 'Full-stack engineer with deep expertise in modern React/Next.js frontend design systems, high-velocity Node/Python API services, and LLM application integrations.',
      proofPoints: [
        'Architected end-to-end web applications serving 100K+ monthly active users',
        'Designed responsive design systems with 100/100 Core Web Vitals performance'
      ]
    },
    flutter: {
      id: 'flutter',
      name: 'Bhavik Makwana',
      title: 'Google Developer Expert & Mobile Architect',
      archetype: 'Mobile & Client Architecture',
      yearsExp: 8,
      targetLevel: 'Lead / Principal Architect',
      targetComp: '₹35–50 LPA / $130–190K',
      skills: [
        'Flutter', 'Dart', 'Android Kotlin', 'iOS Swift', 'State Management (Bloc/Riverpod)',
        'Clean Architecture', 'CI/CD Pipelines', 'Platform Channels', 'App Store / Play Store Release',
        'Performance Profiling', 'WebSockets', 'Offline-First DBs'
      ],
      experienceSummary: 'Recognized Google Developer Expert (GDE) for Flutter & Dart. Shipped top-rated enterprise iOS and Android apps with 1M+ downloads and 99.9% crash-free sessions.',
      proofPoints: [
        'GDE recognized by Google for engineering leadership in Flutter',
        'Author of high-impact open source Dart/Flutter plugins with 1,000+ stars'
      ]
    },
    data: {
      id: 'data',
      name: 'Bhavik Makwana',
      title: 'Data & Machine Learning Engineer',
      archetype: 'Data & ML Platforms',
      yearsExp: 6,
      targetLevel: 'Senior Data / ML Engineer',
      targetComp: '₹28–45 LPA / $120–170K',
      skills: [
        'Python', 'PySpark', 'SQL', 'BigQuery', 'dbt', 'Airflow', 'Kafka',
        'Pandas', 'scikit-learn', 'Vector DBs', 'ETL / ELT Pipelines',
        'GCP Dataproc', 'Docker', 'MLOps'
      ],
      experienceSummary: 'Data and ML engineer specialized in scalable telemetry ingestion, streaming ETL pipelines, distributed data transformations, and model deployment pipelines.',
      proofPoints: [
        'Built automated data processing pipelines handling millions of events daily',
        'Developed feature stores and embedding vectors for real-time recommendation engines'
      ]
    }
  };

  // --- Regional IT & Product Companies Directory ---
  const COMPANIES_DIRECTORY = [
    {
      name: 'Sophos',
      city: 'Ahmedabad (SG Highway)',
      open: 14,
      focus: 'Global cybersecurity & network threat intelligence MNC; the Ahmedabad engineering center builds flagship endpoint telemetry and firewall services.',
      tracks: ['Android', 'Backend', 'Security', 'C++'],
      url: 'https://www.sophos.com/en-us/company/careers'
    },
    {
      name: 'Crest Data Systems',
      city: 'Ahmedabad · GIFT City',
      open: 11,
      focus: 'Data engineering and observability partner for Splunk, Datadog, AWS, and enterprise cybersecurity platforms.',
      tracks: ['Data Eng', 'DevOps', 'Splunk', 'Fresher'],
      url: 'https://www.crestdatasys.com/careers/'
    },
    {
      name: 'Simform',
      city: 'Ahmedabad (SG Highway / SBR)',
      open: 18,
      focus: 'Leading product engineering studio and AWS Premier Tier partner; large dedicated practices in Flutter, Cloud Native, and AI systems.',
      tracks: ['Flutter', 'AWS Cloud', 'Data & AI', 'Fresher'],
      url: 'https://www.simform.com/careers/'
    },
    {
      name: 'TatvaSoft',
      city: 'Ahmedabad',
      open: 15,
      focus: 'Custom software services across .NET, Java, BI, and mobile apps with an extensive entry-level training & conversion intake.',
      tracks: ['BI Analyst', '.NET', 'React', 'Fresher'],
      url: 'https://www.tatvasoft.com/careers'
    },
    {
      name: 'eInfochips',
      city: 'Ahmedabad · Infocity',
      open: 22,
      focus: 'Arrow Electronics company: silicon-to-cloud engineering, VLSI, IoT devices, embedded Linux, and AI computer vision platforms.',
      tracks: ['Embedded', 'IoT', 'Data Eng', 'Intern'],
      url: 'https://www.einfochips.com/careers/'
    },
    {
      name: 'ZURU Tech',
      city: 'Ahmedabad (SBR)',
      open: 8,
      focus: 'Cutting-edge construction tech & BIM simulation R&D; building architectural software, 3D graphics engines, and mobile workflows.',
      tracks: ['iOS (Swift)', '3D Graphics', 'C++', 'BIM'],
      url: 'https://zuru.tech/careers'
    },
    {
      name: 'Bacancy Technology',
      city: 'Ahmedabad',
      open: 12,
      focus: 'Agile product engineering studio with specialized practices in Flutter, GenAI/LLM pipelines, and Ruby on Rails.',
      tracks: ['GenAI', 'Flutter', 'Rails', 'Fresher'],
      url: 'https://www.bacancytechnology.com/careers'
    },
    {
      name: '1Rivet',
      city: 'Gandhinagar (GIFT City)',
      open: 7,
      focus: 'Enterprise cloud analytics and Azure-first modernization programs for US healthcare, capital markets, and public sector clients.',
      tracks: ['Azure Cloud', 'Snowflake', 'Enterprise Arch'],
      url: 'https://1rivet.com/careers/'
    },
    {
      name: 'Radixweb',
      city: 'Ahmedabad (Ekaant)',
      open: 9,
      focus: 'Enterprise software consulting and AI app development across Python, .NET Core, and cloud data transformations.',
      tracks: ['Python AI', 'Cloud', 'Full Stack', 'Fresher'],
      url: 'https://radixweb.com/careers'
    },
    {
      name: 'Hidden Brains',
      city: 'Ahmedabad',
      open: 10,
      focus: 'Enterprise mobile, web, and IoT application development studio serving enterprise clients across 100+ countries.',
      tracks: ['Android Kotlin', 'iOS', 'Node.js'],
      url: 'https://www.hiddenbrains.com/careers.html'
    },
    {
      name: 'OpenXcell',
      city: 'Ahmedabad',
      open: 8,
      focus: 'Software development agency specializing in native iOS, Android, and AI-powered mobile app transformations.',
      tracks: ['iOS SwiftUI', 'Mobile', 'Python'],
      url: 'https://www.openxcell.com/careers/'
    },
    {
      name: 'Cybage Software',
      city: 'Gandhinagar (Infocity)',
      open: 12,
      focus: 'Digital product engineering leader specializing in media, advertising, fintech, and enterprise Python/React platforms.',
      tracks: ['Python', 'React', 'Java', 'Fresher'],
      url: 'https://www.cybage.com/careers'
    },
    {
      name: 'Meditab Software',
      city: 'Ahmedabad',
      open: 9,
      focus: 'Healthcare software product company building pharmacy automation, EHR/EMR suites, and clinical data intelligence tools.',
      tracks: ['Healthcare Data', 'SQL', 'C# .NET'],
      url: 'https://www.meditab.com/careers.html'
    },
    {
      name: 'Infosys GIFT City',
      city: 'Gandhinagar (GIFT City SEZ)',
      open: 25,
      focus: 'State-of-the-art fintech & global banking technology offshore center at the international financial services hub.',
      tracks: ['Java Spring', 'Fintech', 'Cloud', 'Fresher'],
      url: 'https://www.infosys.com/careers.html'
    }
  ];

  // --- Initial Fallback High-Signal Postings ---
  const DEFAULT_FALLBACK_JOBS = [
    {
      id: 'fde-palantir-01',
      title: 'Forward Deployed Engineer',
      company: 'Palantir',
      roleCategory: 'fde',
      experienceLevel: 'mid',
      location: 'Remote · India',
      compText: '₹38–52 LPA',
      postedDate: new Date().toISOString().split('T')[0],
      source: 'Lever',
      sourceLabel: 'Lever ATS',
      applyUrl: 'https://jobs.lever.co/palantir',
      description: 'Embed directly with mission-critical enterprise customers to architect, build, and deploy high-impact AI data platforms. Work with Python, TypeScript, scalable microservices, and distributed operational data graphs.'
    },
    {
      id: 'fde-scale-02',
      title: 'Forward Deployed AI Engineer',
      company: 'Scale AI',
      roleCategory: 'fde',
      experienceLevel: 'senior',
      location: 'Remote · Global',
      compText: '$160–220K',
      postedDate: new Date().toISOString().split('T')[0],
      source: 'Greenhouse',
      sourceLabel: 'Greenhouse ATS',
      applyUrl: 'https://boards.greenhouse.io/scaleai',
      description: 'Bridge bleeding-edge LLM evaluation harnesses, GenAI APIs, and custom client enterprise infrastructure. Own delivery velocity, technical architecture, and client customer satisfaction.'
    },
    {
      id: 'mob-flt-simform-03',
      title: 'Senior Flutter Architect',
      company: 'Simform',
      roleCategory: 'flutter',
      experienceLevel: 'lead',
      location: 'Ahmedabad (SG Highway)',
      compText: '₹24–36 LPA',
      postedDate: new Date().toISOString().split('T')[0],
      source: 'JobSpy',
      sourceLabel: 'LinkedIn',
      applyUrl: 'https://www.simform.com/careers/',
      description: 'Architect complex cross-platform mobile apps for US enterprise clients. Lead modular clean architecture, Bloc state management, native platform channels, and automated CI/CD release pipelines.'
    },
    {
      id: 'mob-flt-bacancy-04',
      title: 'Flutter Developer (0–2 yrs)',
      company: 'Bacancy Technology',
      roleCategory: 'flutter',
      experienceLevel: 'entry',
      location: 'Ahmedabad, Gujarat',
      compText: '₹4.5–8 LPA',
      postedDate: new Date().toISOString().split('T')[0],
      source: 'JobSpy',
      sourceLabel: 'Indeed India',
      applyUrl: 'https://www.bacancytechnology.com/careers',
      description: 'Immediate opening for junior Flutter developers. Work with Dart, REST APIs, responsive UI widgets, offline caching, and Firebase integrations.'
    },
    {
      id: 'data-einfochips-05',
      title: 'Data Engineering Intern (Fresher)',
      company: 'eInfochips',
      roleCategory: 'data',
      experienceLevel: 'entry',
      location: 'Ahmedabad · Infocity',
      compText: '₹25K/mo Stipend',
      postedDate: new Date().toISOString().split('T')[0],
      source: 'JobSpy',
      sourceLabel: 'Indeed India',
      applyUrl: 'https://www.einfochips.com/careers/',
      description: 'Six-month data engineering internship with direct full-time conversion. Work with Python, SQL, and telemetry ETL pipelines for Arrow semiconductor systems.'
    },
    {
      id: 'sol-supabase-06',
      title: 'Solutions Engineer (Postgres / Cloud)',
      company: 'Supabase',
      roleCategory: 'solutions',
      experienceLevel: 'mid',
      location: 'Remote · APAC',
      compText: '$90–135K',
      postedDate: new Date().toISOString().split('T')[0],
      source: 'Lever',
      sourceLabel: 'Lever ATS',
      applyUrl: 'https://jobs.lever.co/supabase',
      description: 'Deliver technical architectural reviews, client proof-of-concepts, and developer integrations for engineering teams migrating to Postgres-native cloud backends.'
    },
    {
      id: 'mob-sophos-07',
      title: 'Senior Android Security Engineer',
      company: 'Sophos',
      roleCategory: 'android',
      experienceLevel: 'senior',
      location: 'Ahmedabad (SG Highway)',
      compText: '₹28–42 LPA',
      postedDate: new Date().toISOString().split('T')[0],
      source: 'Greenhouse',
      sourceLabel: 'Greenhouse ATS',
      applyUrl: 'https://www.sophos.com/en-us/company/careers',
      description: 'Lead architecture for endpoint and mobile threat defense agents on Android using Kotlin, Coroutines, low-level OS internals, and high-throughput security queues.'
    },
    {
      id: 'ai-cursor-08',
      title: 'ML Platform & Inference Engineer',
      company: 'Cursor',
      roleCategory: 'ai',
      experienceLevel: 'mid',
      location: 'Remote · Global',
      compText: '$150–210K',
      postedDate: new Date().toISOString().split('T')[0],
      source: 'Ashby',
      sourceLabel: 'Ashby ATS',
      applyUrl: 'https://jobs.ashbyhq.com/cursor',
      description: 'Build fast inference engines and caching layers for code generation models. Ray, Kubernetes, custom GPU orchestration, and latency-critical developer workflows.'
    },
    {
      id: 'mob-zuru-09',
      title: 'iOS Developer (3D & Simulation)',
      company: 'ZURU Tech',
      roleCategory: 'ios',
      experienceLevel: 'mid',
      location: 'Ahmedabad (SBR)',
      compText: '₹16–26 LPA',
      postedDate: new Date().toISOString().split('T')[0],
      source: 'JobSpy',
      sourceLabel: 'LinkedIn',
      applyUrl: 'https://zuru.tech/careers',
      description: 'Develop iOS BIM simulation apps using Swift, Metal, and SwiftUI for real-time digital architectural fabrication tooling.'
    },
    {
      id: 'data-tatvasoft-10',
      title: 'BI Analyst (Entry / Fresher)',
      company: 'TatvaSoft',
      roleCategory: 'data',
      experienceLevel: 'entry',
      location: 'Ahmedabad, Gujarat',
      compText: '₹3.6–6 LPA',
      postedDate: new Date().toISOString().split('T')[0],
      source: 'JobSpy',
      sourceLabel: 'Glassdoor',
      applyUrl: 'https://www.tatvasoft.com/careers',
      description: 'Join the BI reporting practice creating automated Power BI dashboards and SQL query transformations for global client accounts.'
    },
    {
      id: 'sol-1rivet-11',
      title: 'Enterprise Cloud Architect',
      company: '1Rivet',
      roleCategory: 'cloud',
      experienceLevel: 'lead',
      location: 'Gandhinagar (GIFT City)',
      compText: '₹35–50 LPA',
      postedDate: new Date().toISOString().split('T')[0],
      source: 'JobSpy',
      sourceLabel: 'LinkedIn',
      applyUrl: 'https://1rivet.com/careers/',
      description: 'Lead Azure cloud architectures, data lakehouse migrations, and governance roadmaps for US healthcare and finance institutions.'
    },
    {
      id: 'ai-bacancy-12',
      title: 'GenAI & RAG Engineer (0–2 yrs)',
      company: 'Bacancy Technology',
      roleCategory: 'ai',
      experienceLevel: 'entry',
      location: 'Ahmedabad, Gujarat',
      compText: '₹6–11 LPA',
      postedDate: new Date().toISOString().split('T')[0],
      source: 'JobSpy',
      sourceLabel: 'Indeed India',
      applyUrl: 'https://www.bacancytechnology.com/careers',
      description: 'Ship client-facing GenAI apps, retrieval pipelines with pgvector/LangChain, evaluation harnesses, and automated agent workflows.'
    },
    {
      id: 'dotnet-tatvasoft-13',
      title: 'ASP.NET Core / C# Developer (0–2 yrs)',
      company: 'TatvaSoft',
      roleCategory: 'dotnet',
      experienceLevel: 'entry',
      location: 'Ahmedabad, Gujarat',
      compText: '₹4.2–7 LPA',
      postedDate: new Date().toISOString().split('T')[0],
      source: 'JobSpy',
      sourceLabel: 'Indeed India',
      applyUrl: 'https://www.tatvasoft.com/careers',
      description: 'Build enterprise web APIs and microservices using ASP.NET Core, C#, Entity Framework Core, and SQL Server.'
    },
    {
      id: 'robotics-einfochips-14',
      title: 'Robotics & Embedded ROS Engineer',
      company: 'eInfochips',
      roleCategory: 'robotics',
      experienceLevel: 'mid',
      location: 'Ahmedabad · Infocity',
      compText: '₹12–20 LPA',
      postedDate: new Date().toISOString().split('T')[0],
      source: 'JobSpy',
      sourceLabel: 'Indeed India',
      applyUrl: 'https://www.einfochips.com/careers/',
      description: 'Develop autonomous navigation, SLAM, and sensor fusion pipelines with ROS/ROS2, C++, Python, and embedded Linux controllers.'
    },
    {
      id: 'prod-openxcell-15',
      title: 'Product Designer (UI/UX)',
      company: 'OpenXcell',
      roleCategory: 'product',
      experienceLevel: 'mid',
      location: 'Ahmedabad, Gujarat',
      compText: '₹8–15 LPA',
      postedDate: new Date().toISOString().split('T')[0],
      source: 'JobSpy',
      sourceLabel: 'LinkedIn',
      applyUrl: 'https://www.openxcell.com/careers/',
      description: 'Craft user-centric design systems, high-fidelity wireframes, and interactive product prototypes in Figma for web and mobile platforms.'
    }
  ];

  // --- Application State ---
  const state = {
    screen: 'jobs', // 'jobs' | 'companies' | 'shortlist'
    query: '',
    cat: 'all',
    chips: [], // 'highfit', 'fresher', 'hub', 'remote', 'senior', 'scraped'
    selId: null,
    userSelectedId: null,
    channel: 'email', // 'email' | 'manager' | 'linkedin' | 'x'
    copilotTab: 'eval', // 'eval' | 'cover' | 'bullets' | 'star' | 'pitch'
    funnelStage: 'all', // 'all' | 'saved' | 'applied' | 'interviewing' | 'offer' | 'archived'
    saved: [], // array of IDs (legacy compat)
    pipeline: {}, // jobId -> { stage: 'saved'|'applied'|..., notes: '', date: '' }
    profile: DEFAULT_PROFILES.fde,
    jobs: [],
    customJobs: [],
    isLoading: false,
    isSyncing: true,
    justSynced: false,
    copied: false,
    shared: false
  };

  // --- DOM Helpers ---
  const $ = (id) => document.getElementById(id);

  function formatNum(n) {
    return typeof n === 'number' ? n.toLocaleString('en-US') : (n || '--');
  }

  function getInitials(name) {
    if (!name) return 'TR';
    const parts = name.split(/[\s·/]+/).filter(Boolean);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return ((parts[0][0] || '') + (parts[1] ? parts[1][0] : '')).toUpperCase();
  }

  // --- Storage Accessors ---
  function getStoredProfile() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PROFILE);
      return stored ? JSON.parse(stored) : DEFAULT_PROFILES.fde;
    } catch {
      return DEFAULT_PROFILES.fde;
    }
  }

  function saveStoredProfile(profile) {
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
    } catch {}
  }

  function getStoredPipeline() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PIPELINE);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }

  function saveStoredPipeline(pipeline) {
    try {
      localStorage.setItem(STORAGE_KEY_PIPELINE, JSON.stringify(pipeline));
    } catch {}
  }

  function getStoredCustomJobs() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CUSTOM_JOBS);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  function saveStoredCustomJobs(list) {
    try {
      localStorage.setItem(STORAGE_KEY_CUSTOM_JOBS, JSON.stringify(list));
    } catch {}
  }

  function getSavedJobs() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_SAVED);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  function setSavedJobs(list) {
    try {
      localStorage.setItem(STORAGE_KEY_SAVED, JSON.stringify(list));
    } catch {}
  }

  // --- Category and Level Classification ---
  function classifyCategory(title = '', categoryHint = '') {
    const t = (title + ' ' + categoryHint).toLowerCase();
    if (/forward deployed|fde|deployment engineer|field engineer/i.test(t)) return 'fde';
    if (/\b(robotics|ros\b|ros2\b|gazebo|mechatronics|autonomous|manipulator|embedded systems|microcontroller|slam\b|drone)\b/i.test(t)) return 'robotics';
    if (/\b(flutter|dart)\b/i.test(t)) return 'flutter';
    if (/\b(android|kotlin|jetpack compose)\b/i.test(t)) return 'android';
    if (/\b(ios|swift|swiftui)\b/i.test(t)) return 'ios';
    if (/\b(asp\.net|aspnet|\.net|dotnet|c#|csharp|\.net core)\b/i.test(t)) return 'dotnet';
    if (/\b(cloud|aws|azure|gcp|devops|sre|site reliability|kubernetes|docker|terraform|ci\/cd)\b/i.test(t)) return 'cloud';
    if (/\b(product designer|ui\/ux|ui ux|ux designer|ui designer|product design|visual designer|interaction designer)\b/i.test(t)) return 'product';
    if (/\b(data science|data scientist|machine learning|deep learning|ml engineer|nlp|computer vision|llm|generative ai|ai engineer)\b/i.test(t)) {
      if (/\b(data science|data scientist)\b/i.test(t)) return 'data';
      return 'ai';
    }
    if (/data|analytics|bi |business intelligence|sql|etl|warehouse|dbt|snowflake/i.test(t)) return 'data';
    if (/ai|artificial intelligence|machine learning|ml|llm|genai|deep learning|nlp/i.test(t)) return 'ai';
    if (/solutions|solution architect|pre-sales|enterprise architect|systems architect|integration engineer/i.test(t)) return 'solutions';
    return 'engineering';
  }

  function getExperienceLevel(title = '', desc = '') {
    const t = (title + ' ' + desc).toLowerCase();
    if (/entry|junior|intern|fresher|graduate|new grad|trainee|0[-–]?[12]|0 to 2|1[-–]2/i.test(t)) return 'entry';
    if (/lead|principal|staff|director|architect|head|vp/i.test(t)) return 'lead';
    if (/senior|sr\.|sr |5\+|6\+|7\+|8\+/i.test(t)) return 'senior';
    return 'mid';
  }

  function isGujaratMatch(job) {
    const loc = ((job.location || '') + ' ' + (job.company || '') + ' ' + (job.description || '')).toLowerCase();
    return /ahmedabad|gandhinagar|gift city|infocity|gujarat|sg highway|sindhu bhavan|sbr|prahlad nagar|surat|vadodara|baroda|rajkot/i.test(loc);
  }

  function isRemoteMatch(job) {
    const loc = ((job.location || '') + ' ' + (job.title || '') + ' ' + (job.description || '')).toLowerCase();
    return /remote|anywhere|telecommute|worldwide|work from home|wfh/i.test(loc) || job.isRemote === true;
  }

  // =========================================================================
  // CareerOps AI Evaluation & 1–5 Match Scoring Engine
  // =========================================================================

  const KNOWN_TECH_KEYWORDS = [
    'Python', 'TypeScript', 'JavaScript', 'React', 'Next.js', 'Vue', 'Angular',
    'Node.js', 'FastAPI', 'Django', 'Flask', 'Flutter', 'Dart', 'Android',
    'Kotlin', 'iOS', 'Swift', 'SwiftUI', 'LangChain', 'LLMs', 'RAG',
    'Vector Databases', 'Agentic Systems', 'MCP', 'Docker', 'Kubernetes',
    'AWS', 'GCP', 'Azure', 'Cloudflare Workers', 'Edge Computing', 'PySpark',
    'SQL', 'BigQuery', 'Snowflake', 'dbt', 'Airflow', 'Kafka', 'GraphQL',
    'PostgreSQL', 'Redis', 'CI/CD', 'C#', '.NET', 'C++', 'Go', 'Rust',
    'Microservices', 'System Design', 'Enterprise Architecture'
  ];

  function evaluateJobFit(job, profile) {
    if (!job) return null;
    const p = profile || state.profile;
    const textCorpus = ((job.title || '') + ' ' + (job.description || '') + ' ' + (job.location || '') + ' ' + (job.roleCategory || '')).toLowerCase();

    // 1. Extract Tech Stack mentioned in JD
    const detectedJdSkills = [];
    KNOWN_TECH_KEYWORDS.forEach((tech) => {
      const re = new RegExp(`\\b${tech.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (re.test(textCorpus)) {
        detectedJdSkills.push(tech);
      }
    });

    // 2. Identify Matched vs Gap Skills
    const candidateSkillsLower = (p.skills || []).map((s) => s.toLowerCase());
    const matchedSkills = [];
    const gapSkills = [];

    detectedJdSkills.forEach((skill) => {
      const isMatched = candidateSkillsLower.some((cs) => cs === skill.toLowerCase() || cs.includes(skill.toLowerCase()) || skill.toLowerCase().includes(cs));
      if (isMatched) {
        matchedSkills.push(skill);
      } else {
        gapSkills.push(skill);
      }
    });

    // 3. Category / Archetype Affinity
    let categoryMatchWeight = 0.5;
    const jobCat = job.roleCategory || classifyCategory(job.title);
    const profileArchetypeLower = (p.archetype || '').toLowerCase();

    if (profileArchetypeLower.includes('forward deployed') || profileArchetypeLower.includes('fde')) {
      if (jobCat === 'fde') categoryMatchWeight = 1.0;
      else if (['ai', 'solutions', 'engineering', 'cloud'].includes(jobCat)) categoryMatchWeight = 0.85;
      else categoryMatchWeight = 0.6;
    } else if (profileArchetypeLower.includes('mobile') || profileArchetypeLower.includes('flutter')) {
      if (['flutter', 'mobile', 'android', 'ios'].includes(jobCat)) categoryMatchWeight = 1.0;
      else categoryMatchWeight = 0.5;
    } else if (profileArchetypeLower.includes('data')) {
      if (['data', 'ai', 'cloud'].includes(jobCat)) categoryMatchWeight = 1.0;
      else categoryMatchWeight = 0.55;
    } else {
      categoryMatchWeight = 0.75;
    }

    // 4. Seniority / Level Alignment
    let levelMatchWeight = 0.8;
    const roleLevel = job.experienceLevel || getExperienceLevel(job.title, job.description);
    const candidateYears = Number(p.yearsExp) || 8;

    if (candidateYears >= 6) {
      if (['senior', 'lead'].includes(roleLevel)) levelMatchWeight = 1.0;
      else if (roleLevel === 'mid') levelMatchWeight = 0.85;
      else levelMatchWeight = 0.6; // overqualified
    } else if (candidateYears >= 3) {
      if (roleLevel === 'mid') levelMatchWeight = 1.0;
      else if (roleLevel === 'senior') levelMatchWeight = 0.8;
      else levelMatchWeight = 0.75;
    } else {
      if (roleLevel === 'entry') levelMatchWeight = 1.0;
      else levelMatchWeight = 0.5;
    }

    // 5. Skill Coverage Ratio
    const skillRatio = detectedJdSkills.length > 0
      ? (matchedSkills.length / detectedJdSkills.length)
      : (matchedSkills.length > 0 ? 0.85 : 0.6);

    // 6. Source Credibility Bonus
    const sourceBonus = (job.source && ['Greenhouse', 'Lever', 'Ashby'].includes(job.source)) ? 0.05 : 0.0;

    // 7. Calculate CareerOps Score (1.0 to 5.0)
    // Formula: (skillRatio * 2.2) + (categoryMatchWeight * 1.5) + (levelMatchWeight * 1.0) + sourceBonus + 0.3
    let rawScore = (skillRatio * 2.2) + (categoryMatchWeight * 1.5) + (levelMatchWeight * 1.0) + sourceBonus + 0.3;
    rawScore = Math.max(1.2, Math.min(5.0, rawScore));
    const scoreVal = Number(rawScore.toFixed(1));

    // 8. Verdict Recommendation
    let verdict = 'APPLY';
    let verdictLabel = 'RECOMMENDED: APPLY';
    let verdictColor = '#047857';
    let verdictBg = 'rgba(15, 157, 110, 0.14)';
    let rationale = '';

    if (scoreVal >= 4.0) {
      verdict = 'APPLY';
      verdictLabel = 'RECOMMENDED: APPLY';
      verdictColor = '#047857';
      verdictBg = 'rgba(15, 157, 110, 0.14)';
      rationale = `Strong match (${Math.round(skillRatio * 100)}% stack fit). Direct alignment with ${p.archetype} profile. Tailor CV and submit.`;
    } else if (scoreVal >= 3.0) {
      verdict = 'STRETCH';
      verdictLabel = 'CAUTION: STRETCH';
      verdictColor = '#b45309';
      verdictBg = 'rgba(245, 158, 11, 0.14)';
      rationale = `Moderate fit (${Math.round(skillRatio * 100)}% stack fit). Role has missing requirements (${gapSkills.slice(0, 2).join(', ') || 'specialized tech'}). Review gap strategy before applying.`;
    } else {
      verdict = 'SKIP';
      verdictLabel = 'DO NOT APPLY';
      verdictColor = '#be123c';
      verdictBg = 'rgba(225, 29, 72, 0.12)';
      rationale = `Low alignment (<3.0). Core requirements diverge from your target focus. Skip this posting to protect your time and energy.`;
    }

    // 9. Synthesize Blocks A through H
    const blockA = {
      role: job.title || 'Software Engineer',
      company: job.company || 'Engineering Team',
      location: job.location || 'Remote',
      workMode: job.isRemote ? 'Remote (Distributed)' : (job.isGujarat ? 'Gujarat Tech Corridor (Onsite/Hybrid)' : 'Onsite / Hybrid'),
      archetype: CAT_SHORT[jobCat] || 'ENGINEERING',
      detectedTech: detectedJdSkills.length > 0 ? detectedJdSkills : ['General Engineering', 'APIs', 'Cloud Systems']
    };

    const blockB = {
      matchedSkills,
      gapSkills,
      requirementsTable: [
        {
          req: `Core Stack: ${detectedJdSkills.slice(0, 3).join(', ') || 'Software Engineering'}`,
          importance: 'critical (stated)',
          match: matchedSkills.length >= 2 ? '✅ Strong' : (matchedSkills.length === 1 ? '⚠️ Partial' : '❌ Missing'),
          evidence: matchedSkills.length > 0 ? `Demonstrated in production: ${matchedSkills.slice(0, 3).join(', ')}` : 'Tech not primary in candidate profile'
        },
        {
          req: `Architecture & Ownership (${roleLevel.toUpperCase()})`,
          importance: 'high (structural)',
          match: levelMatchWeight >= 0.85 ? '✅ Strong' : '⚠️ Partial',
          evidence: `${p.yearsExp}+ years experience leading systems and production rollouts`
        },
        {
          req: `Client / Product Deployment Velocity`,
          importance: 'meaningful (inferred)',
          match: '✅ Strong',
          evidence: p.experienceSummary || 'Proven track record shipping end-to-end applications'
        }
      ]
    };

    const blockC = {
      statedLevel: roleLevel.toUpperCase(),
      candidatePosture: candidateYears >= 7 ? 'Senior / Lead Architect' : 'Mid / Senior Engineer',
      strategy: levelMatchWeight >= 0.85
        ? 'Own the architectural scope: emphasize production reliability, cross-functional collaboration, and velocity.'
        : 'Highlight steep learning curves and concrete proof points where adjacent technologies were mastered in weeks.'
    };

    const blockD = {
      advertisedComp: job.compText || 'Competitive Market Rate',
      marketBenchmark: job.isRemote ? '$130K–$190K / ₹35–55 LPA' : '₹18–35 LPA (Regional Tier-1 Hub)',
      leverageNote: 'Lead with demonstrated production uptime and verified systems impact rather than years in role.'
    };

    const blockE = {
      angles: [
        `Architectural Sovereignty: Bridge business requirements directly into resilient ${matchedSkills.slice(0, 2).join(' and ') || 'code'} solutions with minimal supervision.`,
        `Zero-to-One Deployment: Comfortable taking ambiguous problem specs through to monitored production rollout.`,
        `Evidence Over Keywords: Reference verified open-source contributions, technical publications, and GDE track record.`
      ]
    };

    const blockF = {
      questions: [
        {
          q: `Tell me about a complex ${jobCat.toUpperCase()} system you shipped from scratch under tight deadlines.`,
          situation: `At an enterprise scale deployment, we needed sub-50ms latency across global edge isolates.`,
          task: `Architect the data flow and client integration without introducing heavy server infrastructure.`,
          action: `Implemented lightweight isolate edge functions, KV caching, and asynchronous synchronization.`,
          result: `Reduced p99 latency by 65% and supported 100K+ daily interactions with zero production downtime.`,
          reflection: `Early decoupling of synchronous writes from cached reads was the key architectural leverage point.`
        },
        {
          q: `How do you approach a significant gap in an unfamiliar tech stack (${gapSkills[0] || 'new framework'})?`,
          situation: `Stepping into an urgent client integration requiring an unmastered framework.`,
          task: `Deliver a working proof-of-concept within one sprint without sacrificing code quality.`,
          action: `Read the official specs, built targeted integration spikes, and audited edge error handling.`,
          result: `Delivered the release 2 days ahead of schedule, with comprehensive documentation for the team.`,
          reflection: `Deep fundamentals in systems and typing always transfer rapidly to framework idiosyncrasies.`
        },
        {
          q: `Describe a production disagreement with product or client stakeholders regarding architectural tradeoffs.`,
          situation: `Stakeholders requested real-time streaming updates that threatened infrastructure budgets.`,
          task: `Align on a sustainable solution that met customer UX expectations while maintaining cost boundaries.`,
          action: `Benchmarked WebSockets vs optimistic UI polling with simulated telemetry data.`,
          result: `Agreed on a hybrid edge-polling strategy that preserved 95% of the perceived speed at 1/10th the cost.`,
          reflection: `Numbers and side-by-side latency demos resolve architectural debates far faster than opinions.`
        }
      ]
    };

    const blockG = {
      sourceLabel: job.sourceLabel || 'ATS Direct',
      isVerifiedAts: ['Greenhouse', 'Lever', 'Ashby'].includes(job.source),
      freshness: `Active listing (${job.postedDate || 'recently posted'})`,
      legitimacyStatus: 'Verified posting · Direct company recruitment tracking'
    };

    const blockH = {
      status: job.isRemote ? 'Remote Friendly · Distributed' : 'Regional Hub (Ahmedabad / Gujarat Tech Corridor)',
      workAuthSignal: 'Compliant with domestic and international contract/remote agreements.'
    };

    return {
      score: scoreVal,
      verdict,
      verdictLabel,
      verdictColor,
      verdictBg,
      rationale,
      skillRatio,
      matchedSkills,
      gapSkills,
      blockA,
      blockB,
      blockC,
      blockD,
      blockE,
      blockF,
      blockG,
      blockH
    };
  }

  // =========================================================================
  // Asset Generators (Cover Letter, CV Bullets, STAR+R Prep, Outreach)
  // =========================================================================

  function generateCoverLetter(job, profile, evalResult) {
    if (!job) return 'Select a role to generate a tailored ATS cover letter.';
    const p = profile || state.profile;
    const ev = evalResult || evaluateJobFit(job, p);
    const co = job.company || 'Hiring Team';
    const title = job.title || 'Software Engineer';
    const matchedStr = ev.matchedSkills.length > 0 ? ev.matchedSkills.slice(0, 4).join(', ') : 'modern software engineering';

    return `Dear ${co} Hiring Team,

I am writing to express my strong interest in the ${title} position. With over ${p.yearsExp} years of hands-on experience architecting and shipping mission-critical systems across ${matchedStr}, I have focused my career on delivering production-grade software that fuses technical precision with customer impact.

What immediately drew me to ${co} is your technical rigor and product velocity. In my previous work, I have operated with an owner's mindset—taking ambiguous technical specifications from initial whiteboard design through to global production rollout.

Key highlights of what I bring to this role:
• Production Expertise: Shipped and maintained high-throughput applications with strict uptime and sub-second latency requirements using ${ev.matchedSkills[0] || 'scalable backend technologies'}.
• End-to-End Ownership: Led client architectural integrations and cross-functional delivery, bridging customer pain points to clean, modular code.
• Rapid Adaptation: As a ${p.title}, I pride myself on learning unfamiliar domains rapidly and establishing reliable development patterns for the entire team.

I would welcome the opportunity to discuss how my background in ${matchedStr} can help ${co} achieve its engineering and roadmap goals this quarter. Thank you for your time and consideration.

Sincerely,
${p.name}
${p.title}
Portfolio: https://ibhavikmakwana.dev
GitHub: https://github.com/ibhavikmakwana`;
  }

  function generateResumeBullets(job, profile, evalResult) {
    if (!job) return [];
    const p = profile || state.profile;
    const ev = evalResult || evaluateJobFit(job, p);
    const s1 = ev.matchedSkills[0] || 'Python';
    const s2 = ev.matchedSkills[1] || 'TypeScript';
    const s3 = ev.matchedSkills[2] || 'Cloudflare Edge';

    return [
      `Architected and deployed high-performance ${s1} and ${s2} services supporting mission-critical enterprise workflows, achieving 99.9% uptime.`,
      `Integrated end-to-end ${job.roleCategory.toUpperCase()} pipelines with automated CI/CD and telemetry, reducing deployment cycle times by 40%.`,
      `Engineered low-latency APIs and state management architectures using ${s3}, cutting p99 response times from 180ms to under 45ms.`,
      `Led customer architectural reviews and production delivery, translating enterprise partner requirements into verified technical implementations.`
    ];
  }

  function generatePitch(job, channel, profile) {
    if (!job) return 'Select a role from the feed to draft a personalized pitch.';
    const p = profile || state.profile;
    const role = job.title || 'Software Engineer';
    const co = job.company || 'the team';
    const loc = job.location || 'Remote';
    const catLabel = (CAT_SHORT[job.roleCategory] || 'ENGINEERING').toLowerCase();

    if (channel === 'email') {
      return `Subject: ${role} — ${p.name} (${p.archetype})\n\nHi ${co} team,\n\nI came across the ${role} opening (${loc}) and it lines up closely with my production work in ${catLabel} systems.\n\n· Shipped production architectures across ${p.skills.slice(0, 3).join(', ')} with measurable reliability\n· Comfortable owning scope end to end, from technical specification to production rollout\n· Google Developer Expert with a strong track record of engineering leadership\n\nHappy to share a 3-minute project walkthrough of my most relevant architecture.\n\nBest,\n${p.name}\nhttps://ibhavikmakwana.dev · https://github.com/ibhavikmakwana`;
    }

    if (channel === 'manager') {
      return `Hi [Engineering Lead],\n\nYou are hiring a ${role} at ${co} — I would love to be considered.\n\nMost relevant: I have built and shipped systems in this exact problem space (${catLabel}), and can talk concretely about the architectural tradeoffs and edge cases rather than a high-level résumé summary.\n\nOne quick question so I don't waste your time: is the upcoming 90-day roadmap focused on greenfield pipeline builds or hardening existing infrastructure?\n\n${p.name}\nhttps://ibhavikmakwana.dev`;
    }

    if (channel === 'linkedin') {
      // Strictly enforced <= 300 characters
      const note = `Hi [Name] — saw ${co} is hiring a ${role}. As a ${p.archetype} (${p.yearsExp}y exp), I specialize in ${catLabel} and have shipped comparable architectures with high uptime. Open to a brief 10-min intro chat? Portfolio: https://ibhavikmakwana.dev`;
      return note.slice(0, 300);
    }

    // Twitter / X
    return `@${co.toLowerCase().replace(/[^a-z0-9]/g, '')} — applying for the ${role} role!\n\nBackground: ${p.archetype} (${p.yearsExp}+ yrs)\nStack: ${p.skills.slice(0, 3).join(', ')}\nWhy ${co}: Passionate about your engineering velocity and product craft.\n\nLive portfolio & case studies → https://ibhavikmakwana.dev`;
  }

  function cleanDescription(desc, title = '', company = '') {
    if (!desc || typeof desc !== 'string') {
      return `Exciting role at ${company || 'a top tech company'}. Build and scale modern software with high impact.`;
    }

    let cleaned = desc.trim();

    if (/^(nan|none|null|undefined)$/i.test(cleaned) || cleaned.length < 5) {
      return `Exciting ${title ? title + ' ' : ''}opportunity at ${company || 'a growing engineering team'}. Collaborate with cross-functional teams to design, build, and ship high-quality products.`;
    }

    cleaned = cleaned.replace(/\\([-_*#`[\]()+.!])/g, '$1');
    cleaned = cleaned.replace(/[*_]{2,3}(.*?)[*_]{2,3}/g, '$1');
    cleaned = cleaned.replace(/[*_](.*?)[*_]/g, '$1');
    cleaned = cleaned.replace(/[*_]+/g, '');
    cleaned = cleaned.replace(/^#+\s+/gm, '');
    cleaned = cleaned.replace(/^[•*\-\d.]+\s+/gm, '');
    cleaned = cleaned.replace(/[\r\n\t\xa0]+/g, ' ');
    cleaned = cleaned.replace(/\s{2,}/g, ' ').trim();

    if (cleaned.length > 280) {
      const truncated = cleaned.slice(0, 275);
      const lastSpace = truncated.lastIndexOf(' ');
      cleaned = (lastSpace > 180 ? truncated.slice(0, lastSpace) : truncated) + '...';
    }

    return cleaned;
  }

  // --- Normalizing Job Objects ---
  function normalizeJob(raw) {
    const calculatedCat = classifyCategory(raw.title, (raw.tags ? raw.tags.join(' ') : '') + ' ' + (raw.roleCategory || ''));
    const roleCat = (raw.roleCategory && !['engineering', 'solutions', 'all'].includes(raw.roleCategory))
      ? raw.roleCategory
      : calculatedCat;

    const brandCol = CAT_COLOR[roleCat] || ACCENT.blue;
    const initialChars = getInitials(raw.company || 'Tech Co');
    const cleanedDesc = cleanDescription(raw.description, raw.title, raw.company);

    const norm = {
      id: raw.id || `job-${Math.random().toString(36).substring(2, 9)}`,
      title: (raw.title || 'Software Engineer').trim(),
      company: (raw.company || 'Company').trim(),
      roleCategory: roleCat,
      experienceLevel: raw.experienceLevel || getExperienceLevel(raw.title, raw.description),
      location: (raw.location || 'Remote').trim(),
      compText: (raw.compText || raw.salary || 'Competitive').trim(),
      postedDate: raw.postedDate || raw.date || new Date().toISOString().split('T')[0],
      source: raw.source || 'Direct',
      sourceLabel: raw.sourceLabel || raw.source || 'Direct ATS',
      applyUrl: raw.applyUrl || raw.url || '#',
      description: cleanedDesc,
      rawDescription: raw.description || cleanedDesc,
      brandColor: brandCol,
      logoBg: tint(brandCol, 0.12),
      logoFg: brandCol,
      initials: initialChars,
      isGujarat: isGujaratMatch(raw),
      isRemote: isRemoteMatch(raw),
      isFresher: (raw.experienceLevel === 'entry') || /intern|fresher|junior|0[-–]?[12]/i.test(raw.title || ''),
      isSenior: (raw.experienceLevel === 'senior' || raw.experienceLevel === 'lead') || /senior|lead|staff|principal/i.test(raw.title || '')
    };

    // Calculate CareerOps Fit Evaluation
    const evalData = evaluateJobFit(norm, state.profile);
    norm.careerOpsScore = evalData.score;
    norm.careerOpsVerdict = evalData.verdict;
    norm.careerOpsLabel = evalData.verdictLabel;
    norm.careerOpsColor = evalData.verdictColor;
    norm.careerOpsBg = evalData.verdictBg;
    norm.evaluation = evalData;

    return norm;
  }

  function deduplicateJobs(list) {
    const seen = new Set();
    const unique = [];

    list.forEach((job) => {
      const key = `${(job.company || '').toLowerCase().trim()}:::${(job.title || '').toLowerCase().trim()}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(job);
      }
    });

    return unique;
  }

  // --- Filtering & Matches ---
  function matchesFilter(job) {
    if (state.query && state.query.trim()) {
      const q = state.query.toLowerCase().trim();
      const corpus = `${job.title} ${job.company} ${job.location} ${job.roleCategory} ${job.description} ${(job.evaluation?.matchedSkills || []).join(' ')}`.toLowerCase();
      if (!corpus.includes(q)) return false;
    }

    if (state.cat !== 'all') {
      if (job.roleCategory !== state.cat) return false;
    }

    if (state.chips.includes('highfit')) {
      if (!job.careerOpsScore || job.careerOpsScore < 4.0) return false;
    }

    if (state.chips.includes('fresher')) {
      if (!job.isFresher) return false;
    }

    if (state.chips.includes('hub')) {
      if (!job.isGujarat) return false;
    }

    if (state.chips.includes('remote')) {
      if (!job.isRemote) return false;
    }

    if (state.chips.includes('senior')) {
      if (!job.isSenior) return false;
    }

    if (state.chips.includes('scraped')) {
      if (job.source !== 'JobSpy') return false;
    }

    return true;
  }

  function escapeHtml(str = '') {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // =========================================================================
  // Rendering Modules
  // =========================================================================

  function renderCategories() {
    const bar = $('categories-bar');
    if (!bar) return;
    bar.querySelectorAll('.cat-pill').forEach((pill) => {
      const cat = pill.getAttribute('data-cat');
      pill.classList.toggle('active', cat === state.cat);
    });
  }

  function renderChips() {
    const group = $('chips-group');
    if (!group) return;
    group.querySelectorAll('.chip-btn').forEach((chip) => {
      const c = chip.getAttribute('data-chip');
      chip.classList.toggle('active', state.chips.includes(c));
    });
  }

  function updateCounts() {
    const filteredJobs = state.jobs.filter(matchesFilter);
    const feedCountEl = $('nav-count-feed');
    if (feedCountEl) feedCountEl.textContent = formatNum(filteredJobs.length);

    const pipelineKeys = Object.keys(state.pipeline);
    const shortlistCountEl = $('nav-count-shortlist');
    if (shortlistCountEl) shortlistCountEl.textContent = formatNum(pipelineKeys.length || state.saved.length);

    const statEl = $('header-stat-jobs');
    if (statEl) statEl.textContent = `LIVE · ${formatNum(state.jobs.length)} ROLES`;

    const profileLabelEl = $('header-profile-label');
    if (profileLabelEl) {
      profileLabelEl.textContent = `Profile: ${state.profile.archetype.split(' ')[0] || 'FDE'}`;
    }
  }

  function renderJobsFeed() {
    const listEl = $('jobs-feed-list');
    const emptyEl = $('jobs-empty-state');
    const loadingEl = $('jobs-loading');
    const counterEl = $('result-counter');

    if (loadingEl) {
      loadingEl.hidden = !state.isLoading;
      loadingEl.style.display = state.isLoading ? 'flex' : 'none';
    }

    const filtered = state.jobs.filter(matchesFilter);

    if (counterEl) {
      counterEl.textContent = `${formatNum(filtered.length)} of ${formatNum(state.jobs.length)} roles · CareerOps scored`;
    }

    if (filtered.length === 0 && !state.isLoading) {
      if (listEl) listEl.innerHTML = '';
      if (emptyEl) {
        emptyEl.hidden = false;
        emptyEl.style.display = 'block';
      }
      return;
    }

    if (emptyEl) {
      emptyEl.hidden = true;
      emptyEl.style.display = 'none';
    }

    // Check selected job
    if (!filtered.some((j) => j.id === state.selId) && filtered.length > 0) {
      state.selId = filtered[0].id;
    }

    let html = '';
    filtered.forEach((job) => {
      const isSelected = job.id === state.selId;
      const isSaved = state.saved.includes(job.id) || !!state.pipeline[job.id];
      const catShort = CAT_SHORT[job.roleCategory] || 'TECH';
      const score = job.careerOpsScore || 3.5;

      let scoreClass = 'score-apply';
      let scoreText = `★ ${score} Apply`;
      if (score < 3.0) {
        scoreClass = 'score-skip';
        scoreText = `★ ${score} Skip`;
      } else if (score < 4.0) {
        scoreClass = 'score-stretch';
        scoreText = `★ ${score} Stretch`;
      }

      // Build tags
      let tagsHtml = `<span class="tag-pill" style="color: ${job.brandColor}; background: ${job.logoBg};">${catShort}</span>`;
      tagsHtml += `<span class="score-badge ${scoreClass}">${scoreText}</span>`;

      if (job.isFresher) {
        tagsHtml += `<span class="tag-pill" style="color: ${ACCENT.green}; background: ${tint(ACCENT.green, 0.1)};">FRESHER 0–2</span>`;
      }
      if (job.isGujarat) {
        tagsHtml += `<span class="tag-pill" style="color: #b45309; background: ${tint(ACCENT.amber, 0.14)};">GUJARAT HUB</span>`;
      }
      if (job.isRemote) {
        tagsHtml += `<span class="tag-pill" style="color: ${ACCENT.blue}; background: ${tint(ACCENT.blue, 0.1)};">REMOTE</span>`;
      }
      if (job.isSenior) {
        tagsHtml += `<span class="tag-pill" style="color: ${ACCENT.purple}; background: ${tint(ACCENT.purple, 0.1)};">${(job.experienceLevel || 'SENIOR').toUpperCase()}</span>`;
      }

      // Check if in pipeline
      const pipelineEntry = state.pipeline[job.id];
      let pipelineBadgeHtml = '';
      if (pipelineEntry && pipelineEntry.stage) {
        pipelineBadgeHtml = `<span class="pipeline-stage-pill pill-stage-${pipelineEntry.stage}">[${pipelineEntry.stage.toUpperCase()}]</span>`;
      }

      html += `
        <article class="job-card ${isSelected ? 'selected' : ''}" data-job-id="${job.id}">
          <div class="job-card-inner">
            <div class="job-avatar" style="background: ${job.logoBg}; color: ${job.logoFg};">
              ${job.initials}
            </div>
            <div class="job-details">
              <div class="job-header-row">
                <h3 class="job-title">${escapeHtml(job.title)}</h3>
                <span class="job-company">${escapeHtml(job.company)}</span>
                ${pipelineBadgeHtml}
              </div>
              <div class="job-tags-row">
                ${tagsHtml}
              </div>
              <p class="job-blurb">${escapeHtml(job.description)}</p>
              <div class="job-meta-row">
                <span>📍 ${escapeHtml(job.location)}</span>
                <span>💰 ${escapeHtml(job.compText)}</span>
                <span>⏱️ ${escapeHtml(job.postedDate)}</span>
                <span class="job-source-label" style="color: ${SRC_COLOR[job.source] || '#6b6b80'};">via ${escapeHtml(job.sourceLabel)}</span>
              </div>
            </div>
            <button class="btn-star-save ${isSaved ? 'saved' : ''}" data-star-id="${job.id}" title="${isSaved ? 'Remove from pipeline' : 'Add to pipeline'}">
              ★
            </button>
          </div>
        </article>
      `;
    });

    if (listEl) listEl.innerHTML = html;

    // Attach card click handlers
    listEl?.querySelectorAll('.job-card').forEach((card) => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-star-save')) return;
        const jobId = card.getAttribute('data-job-id');
        if (jobId) {
          state.selId = jobId;
          state.userSelectedId = jobId;
          state.copied = false;
          render();
        }
      });
    });

    // Attach star save handlers
    listEl?.querySelectorAll('.btn-star-save').forEach((star) => {
      star.addEventListener('click', (e) => {
        e.stopPropagation();
        const starId = star.getAttribute('data-star-id');
        if (starId) {
          toggleSave(starId);
        }
      });
    });
  }

  // --- Sticky CareerOps Copilot Aside ---
  function renderPitchSidebar() {
    const selJob = state.jobs.find((j) => j.id === state.selId) || state.jobs[0];
    if (!selJob) return;

    // Update Evaluation if needed
    if (!selJob.evaluation) {
      selJob.evaluation = evaluateJobFit(selJob, state.profile);
    }
    const ev = selJob.evaluation;

    // 1. Header elements
    const elTitle = $('pitch-sel-title');
    const elComp = $('pitch-sel-company');
    const elApply = $('link-pitch-apply');
    const elId = $('pitch-meta-id');
    const elSource = $('pitch-meta-source');
    const elLevel = $('pitch-meta-level');

    if (elTitle) elTitle.textContent = selJob.title || 'Role';
    if (elComp) elComp.textContent = `${selJob.company || 'Company'} · ${selJob.location || 'Remote'}`;
    if (elApply) elApply.href = selJob.applyUrl || '#';
    if (elId) elId.textContent = `ID · ${selJob.id}`;
    if (elSource) elSource.textContent = `SOURCE · ${selJob.sourceLabel || 'Direct'} · dedup ok`;
    if (elLevel) elLevel.textContent = `LEVEL · ${(selJob.experienceLevel || 'mid').toUpperCase()}`;

    // 2. Score Banner
    const elScoreVal = $('pitch-score-val');
    const elVerdictPill = $('pitch-verdict-pill');
    const elRationale = $('pitch-score-rationale');

    if (elScoreVal) elScoreVal.textContent = ev.score.toFixed(1);
    if (elVerdictPill) {
      elVerdictPill.textContent = ev.verdictLabel;
      elVerdictPill.style.color = ev.verdictColor;
      elVerdictPill.style.backgroundColor = ev.verdictBg;
      elVerdictPill.style.borderColor = ev.verdictColor;
    }
    if (elRationale) elRationale.textContent = ev.rationale;

    // 3. Tab Visibility
    const panels = {
      eval: $('panel-copilot-eval'),
      cover: $('panel-copilot-cover'),
      bullets: $('panel-copilot-bullets'),
      star: $('panel-copilot-star'),
      pitch: $('panel-copilot-pitch')
    };

    Object.entries(panels).forEach(([tabKey, el]) => {
      if (el) {
        const isActive = tabKey === state.copilotTab;
        el.hidden = !isActive;
        el.classList.toggle('active', isActive);
      }
    });

    $('copilot-tab-bar')?.querySelectorAll('.copilot-tab-btn').forEach((btn) => {
      const t = btn.getAttribute('data-copilot-tab');
      btn.classList.toggle('active', t === state.copilotTab);
    });

    // 4. Populate Active Tab Content
    if (state.copilotTab === 'eval') {
      const evalContainer = $('eval-report-content');
      if (evalContainer) {
        let skillsMatchedHtml = ev.matchedSkills.map((s) => `<span class="skill-pill-matched">✓ ${escapeHtml(s)}</span>`).join('');
        let skillsGapHtml = ev.gapSkills.map((s) => `<span class="skill-pill-gap">✗ ${escapeHtml(s)}</span>`).join('');

        let matrixRowsHtml = ev.blockB.requirementsTable.map((r) => `
          <tr>
            <td><strong>${escapeHtml(r.req)}</strong></td>
            <td><code>${escapeHtml(r.importance)}</code></td>
            <td>${escapeHtml(r.match)}</td>
            <td>${escapeHtml(r.evidence)}</td>
          </tr>
        `).join('');

        let anglesHtml = ev.blockE.angles.map((a) => `<li>${escapeHtml(a)}</li>`).join('');

        evalContainer.innerHTML = `
          <!-- Block A: Overview -->
          <div class="eval-block-card">
            <div class="eval-block-title">Block A · Role &amp; Core Stack</div>
            <p class="eval-block-desc">
              <strong>${escapeHtml(ev.blockA.role)}</strong> at <strong>${escapeHtml(ev.blockA.company)}</strong><br>
              Mode: ${escapeHtml(ev.blockA.workMode)} · Archetype: <code>${escapeHtml(ev.blockA.archetype)}</code>
            </p>
            <div class="eval-skills-grid">
              ${ev.blockA.detectedTech.map((t) => `<span class="company-track-tag">${escapeHtml(t)}</span>`).join('')}
            </div>
          </div>

          <!-- Block B: CV Match & Gap Matrix -->
          <div class="eval-block-card">
            <div class="eval-block-title">Block B · CV Match Matrix (${Math.round(ev.skillRatio * 100)}% fit)</div>
            <div style="margin-bottom: 8px;">
              <div style="font-size: 10.5px; font-weight: 700; color: var(--text-muted); margin-bottom: 4px;">MATCHED SKILLS:</div>
              <div class="eval-skills-grid">${skillsMatchedHtml || '<span style="font-size: 11px; color: var(--text-muted);">None explicitly stated in JD</span>'}</div>
            </div>
            ${ev.gapSkills.length > 0 ? `
              <div style="margin-bottom: 8px;">
                <div style="font-size: 10.5px; font-weight: 700; color: var(--text-muted); margin-bottom: 4px;">GAP SKILLS TO BRIDGE:</div>
                <div class="eval-skills-grid">${skillsGapHtml}</div>
              </div>
            ` : ''}
            <table class="eval-matrix-table">
              <thead>
                <tr>
                  <th>Requirement</th>
                  <th>Importance</th>
                  <th>Match</th>
                  <th>Evidence</th>
                </tr>
              </thead>
              <tbody>
                ${matrixRowsHtml}
              </tbody>
            </table>
          </div>

          <!-- Block C: Level & Strategy -->
          <div class="eval-block-card">
            <div class="eval-block-title">Block C · Level &amp; Seniority Strategy</div>
            <p class="eval-block-desc">
              Target Level: <strong>${escapeHtml(ev.blockC.statedLevel)}</strong> · Posture: <strong>${escapeHtml(ev.blockC.candidatePosture)}</strong><br>
              ${escapeHtml(ev.blockC.strategy)}
            </p>
          </div>

          <!-- Block D: Compensation -->
          <div class="eval-block-card">
            <div class="eval-block-title">Block D · Compensation Benchmark</div>
            <p class="eval-block-desc">
              Advertised: <strong>${escapeHtml(ev.blockD.advertisedComp)}</strong><br>
              Market Reference: <code>${escapeHtml(ev.blockD.marketBenchmark)}</code><br>
              <em>${escapeHtml(ev.blockD.leverageNote)}</em>
            </p>
          </div>

          <!-- Block E: Personalization Angles -->
          <div class="eval-block-card">
            <div class="eval-block-title">Block E · Personalization Angles (Beyond the CV)</div>
            <ul class="eval-points-list">
              ${anglesHtml}
            </ul>
          </div>

          <!-- Block G & H: Liveness & Work Auth -->
          <div class="eval-block-card">
            <div class="eval-block-title">Block G &amp; H · Liveness &amp; Work Auth</div>
            <p class="eval-block-desc">
              ✓ ${escapeHtml(ev.blockG.legitimacyStatus)}<br>
              ✓ ${escapeHtml(ev.blockH.status)}
            </p>
          </div>
        `;
      }
    } else if (state.copilotTab === 'cover') {
      const coverOutput = $('cover-letter-output');
      if (coverOutput) {
        coverOutput.textContent = generateCoverLetter(selJob, state.profile, ev);
      }
    } else if (state.copilotTab === 'bullets') {
      const bulletsOutput = $('cv-bullets-output');
      if (bulletsOutput) {
        const bullets = generateResumeBullets(selJob, state.profile, ev);
        bulletsOutput.innerHTML = bullets.map((b) => `<div class="bullet-item">• ${escapeHtml(b)}</div>`).join('');
      }
    } else if (state.copilotTab === 'star') {
      const starOutput = $('star-prep-output');
      if (starOutput) {
        starOutput.innerHTML = ev.blockF.questions.map((q, idx) => `
          <div class="star-question-card">
            <div class="star-q-title">Q${idx + 1}: ${escapeHtml(q.q)}</div>
            <div class="star-step-row"><span class="star-step-label">SITUATION:</span> ${escapeHtml(q.situation)}</div>
            <div class="star-step-row"><span class="star-step-label">TASK:</span> ${escapeHtml(q.task)}</div>
            <div class="star-step-row"><span class="star-step-label">ACTION:</span> ${escapeHtml(q.action)}</div>
            <div class="star-step-row"><span class="star-step-label">RESULT:</span> ${escapeHtml(q.result)}</div>
            <div class="star-step-row"><span class="star-step-label">REFLECTION:</span> ${escapeHtml(q.reflection)}</div>
          </div>
        `).join('');
      }
    } else if (state.copilotTab === 'pitch') {
      const elCode = $('pitch-code-output');
      const counterEl = $('pitch-char-counter');
      const pitchText = generatePitch(selJob, state.channel, state.profile);

      if (elCode) elCode.textContent = pitchText;

      if (counterEl) {
        if (state.channel === 'linkedin') {
          counterEl.hidden = false;
          counterEl.textContent = `${pitchText.length} / 300 chars`;
          counterEl.classList.toggle('limit-exceeded', pitchText.length > 300);
        } else {
          counterEl.hidden = true;
        }
      }

      // Channel tabs active state
      $('pitch-channel-tabs')?.querySelectorAll('.pitch-tab-btn').forEach((btn) => {
        const ch = btn.getAttribute('data-channel');
        btn.classList.toggle('active', ch === state.channel);
      });
    }

    // 5. Pipeline Stage Selector
    const statusSelect = $('select-job-status');
    if (statusSelect) {
      const pipelineEntry = state.pipeline[selJob.id];
      statusSelect.value = pipelineEntry ? pipelineEntry.stage : 'none';
    }
  }

  function renderCompanies() {
    const grid = $('companies-grid');
    if (!grid) return;

    let html = '';
    COMPANIES_DIRECTORY.forEach((co) => {
      const initials = getInitials(co.name);
      const tracksHtml = co.tracks.map((t) => `<span class="company-track-tag">${escapeHtml(t)}</span>`).join('');

      html += `
        <div class="company-card">
          <div class="company-card-header">
            <div class="company-avatar">${initials}</div>
            <div>
              <div class="company-card-title">${escapeHtml(co.name)}</div>
              <div class="company-card-city">📍 ${escapeHtml(co.city)}</div>
            </div>
            <span class="company-open-badge">${co.open} open</span>
          </div>
          <p class="company-focus-text">${escapeHtml(co.focus)}</p>
          <div class="company-tracks-row">
            ${tracksHtml}
          </div>
          <div class="company-card-actions">
            <a href="${co.url}" target="_blank" rel="noopener noreferrer" class="company-careers-link">Careers ↗</a>
            <button class="btn-view-company-roles" data-company-name="${escapeHtml(co.name)}">View roles</button>
          </div>
        </div>
      `;
    });

    grid.innerHTML = html;

    grid.querySelectorAll('.btn-view-company-roles').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const cName = e.currentTarget.getAttribute('data-company-name');
        if (cName) {
          state.screen = 'jobs';
          state.query = cName.split(' ')[0];
          state.cat = 'all';
          state.chips = [];
          $('search-input').value = state.query;
          $('search-clear-btn').hidden = false;
          render();
        }
      });
    });
  }

  function renderShortlist() {
    const listEl = $('shortlist-feed-list');
    const emptyEl = $('shortlist-empty-state');
    const shareUrlEl = $('share-url-preview');

    const shareParam = `radar.dev/?q=${encodeURIComponent(state.query)}&cat=${state.cat}&f=${state.chips.join(',') || 'none'}&pipeline=${Object.keys(state.pipeline).length}`;
    if (shareUrlEl) shareUrlEl.textContent = shareParam;

    const copyShareBtn = $('btn-copy-share');
    if (copyShareBtn) {
      if (state.shared) {
        copyShareBtn.textContent = 'Link copied!';
        copyShareBtn.classList.add('copied');
      } else {
        copyShareBtn.textContent = 'Copy share link';
        copyShareBtn.classList.remove('copied');
      }
    }

    // Filter pipeline jobs
    const pipelineIds = Object.keys(state.pipeline);
    const allPipelineJobs = state.jobs.filter((j) => pipelineIds.includes(j.id) || state.saved.includes(j.id));

    // Update Funnel Stage Counters
    const stageCounts = {
      all: allPipelineJobs.length,
      saved: 0,
      applied: 0,
      interviewing: 0,
      offer: 0,
      archived: 0
    };

    allPipelineJobs.forEach((j) => {
      const entry = state.pipeline[j.id];
      const stage = (entry && entry.stage) ? entry.stage : 'saved';
      if (stageCounts[stage] !== undefined) stageCounts[stage]++;
    });

    $('stage-count-all') && ($('stage-count-all').textContent = stageCounts.all);
    $('stage-count-saved') && ($('stage-count-saved').textContent = stageCounts.saved);
    $('stage-count-applied') && ($('stage-count-applied').textContent = stageCounts.applied);
    $('stage-count-interviewing') && ($('stage-count-interviewing').textContent = stageCounts.interviewing);
    $('stage-count-offer') && ($('stage-count-offer').textContent = stageCounts.offer);
    $('stage-count-archived') && ($('stage-count-archived').textContent = stageCounts.archived);

    // Filter by active stage
    const filteredPipelineJobs = allPipelineJobs.filter((j) => {
      if (state.funnelStage === 'all') return true;
      const entry = state.pipeline[j.id];
      const stage = (entry && entry.stage) ? entry.stage : 'saved';
      return stage === state.funnelStage;
    });

    if (filteredPipelineJobs.length === 0) {
      if (listEl) listEl.innerHTML = '';
      if (emptyEl) emptyEl.hidden = false;
      return;
    }

    if (emptyEl) emptyEl.hidden = true;

    let html = '';
    filteredPipelineJobs.forEach((job) => {
      const entry = state.pipeline[job.id] || { stage: 'saved', date: job.postedDate };
      const currentStage = entry.stage || 'saved';
      const score = job.careerOpsScore || 3.5;

      html += `
        <div class="shortlist-card" data-pipeline-job-id="${job.id}">
          <div class="job-avatar" style="background: ${job.logoBg}; color: ${job.logoFg}; width: 36px; height: 36px; font-size: 13px;">
            ${job.initials}
          </div>
          <div style="flex: 1;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 14px; font-weight: 700;">${escapeHtml(job.title)}</span>
              <span class="score-badge ${score >= 4.0 ? 'score-apply' : (score >= 3.0 ? 'score-stretch' : 'score-skip')}">★ ${score}</span>
            </div>
            <div style="font-family: var(--font-mono); font-size: 10.5px; color: var(--text-muted); margin-top: 3px;">
              ${escapeHtml(job.company)} · ${escapeHtml(job.location)} · ${escapeHtml(job.compText)}
            </div>
            <div class="pipeline-card-meta">
              <span class="pipeline-stage-pill pill-stage-${currentStage}">Stage: ${currentStage.toUpperCase()}</span>
              <span>Updated: ${escapeHtml(entry.date || job.postedDate)}</span>
            </div>
          </div>
          <div class="shortlist-actions">
            <select class="status-select-dropdown pipeline-card-stage-select" data-job-id="${job.id}">
              <option value="saved" ${currentStage === 'saved' ? 'selected' : ''}>⭐ Saved</option>
              <option value="applied" ${currentStage === 'applied' ? 'selected' : ''}>🚀 Applied</option>
              <option value="interviewing" ${currentStage === 'interviewing' ? 'selected' : ''}>🗣️ Interviewing</option>
              <option value="offer" ${currentStage === 'offer' ? 'selected' : ''}>🎉 Offer</option>
              <option value="archived" ${currentStage === 'archived' ? 'selected' : ''}>📦 Archived</option>
            </select>
            <button class="btn-shortlist-draft" data-view-id="${job.id}">View Report</button>
            <button class="btn-shortlist-remove" data-remove-id="${job.id}">Remove</button>
          </div>
        </div>
      `;
    });

    if (listEl) listEl.innerHTML = html;

    // Attach Stage Selector Listeners
    listEl?.querySelectorAll('.pipeline-card-stage-select').forEach((sel) => {
      sel.addEventListener('change', (e) => {
        const jId = sel.getAttribute('data-job-id');
        const newStage = e.target.value;
        if (jId && newStage) {
          updateJobPipelineStage(jId, newStage);
        }
      });
    });

    // View Report button
    listEl?.querySelectorAll('.btn-shortlist-draft').forEach((btn) => {
      btn.addEventListener('click', () => {
        const vId = btn.getAttribute('data-view-id');
        if (vId) {
          state.screen = 'jobs';
          state.selId = vId;
          state.userSelectedId = vId;
          state.copilotTab = 'eval';
          render();
        }
      });
    });

    // Remove button
    listEl?.querySelectorAll('.btn-shortlist-remove').forEach((btn) => {
      btn.addEventListener('click', () => {
        const rId = btn.getAttribute('data-remove-id');
        if (rId) {
          removeJobFromPipeline(rId);
        }
      });
    });
  }

  function renderScreens() {
    $('screen-jobs').hidden = state.screen !== 'jobs';
    $('screen-companies').hidden = state.screen !== 'companies';
    $('screen-shortlist').hidden = state.screen !== 'shortlist';

    $('screen-nav')?.querySelectorAll('.nav-btn').forEach((btn) => {
      const s = btn.getAttribute('data-screen');
      btn.classList.toggle('active', s === state.screen);
    });
  }

  function updateUrl() {
    const params = new URLSearchParams();
    if (state.query && state.query.trim()) params.set('q', state.query.trim());
    if (state.cat && state.cat !== 'all') params.set('cat', state.cat);
    if (state.chips && state.chips.length > 0) params.set('f', state.chips.join(','));
    if (state.screen && state.screen !== 'jobs') params.set('screen', state.screen);
    if (state.userSelectedId) params.set('id', state.userSelectedId);

    const queryStr = params.toString();
    const newUrl = queryStr ? `${window.location.pathname}?${queryStr}` : window.location.pathname;

    if (window.location.pathname + window.location.search !== newUrl) {
      window.history.replaceState(null, '', newUrl);
    }
  }

  function render() {
    updateCounts();
    renderScreens();
    updateUrl();
    if (state.screen === 'jobs') {
      renderCategories();
      renderChips();
      renderJobsFeed();
      renderPitchSidebar();
    } else if (state.screen === 'companies') {
      renderCompanies();
    } else if (state.screen === 'shortlist') {
      renderShortlist();
    }
  }

  // =========================================================================
  // Pipeline & Shortlist Actions
  // =========================================================================

  function updateJobPipelineStage(jobId, stage) {
    if (stage === 'none') {
      removeJobFromPipeline(jobId);
      return;
    }

    state.pipeline[jobId] = {
      stage,
      date: new Date().toISOString().split('T')[0]
    };
    if (!state.saved.includes(jobId)) {
      state.saved.push(jobId);
    }

    saveStoredPipeline(state.pipeline);
    setSavedJobs(state.saved);
    render();
  }

  function removeJobFromPipeline(jobId) {
    delete state.pipeline[jobId];
    state.saved = state.saved.filter((id) => id !== jobId);
    saveStoredPipeline(state.pipeline);
    setSavedJobs(state.saved);
    render();
  }

  function toggleSave(jobId) {
    if (state.pipeline[jobId] || state.saved.includes(jobId)) {
      removeJobFromPipeline(jobId);
    } else {
      updateJobPipelineStage(jobId, 'saved');
    }
  }

  function downloadFile(name, text, type) {
    const blob = new Blob([text], { type });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  function exportJson() {
    const list = state.jobs.filter((j) => state.pipeline[j.id] || state.saved.includes(j.id));
    const payload = {
      exportedAt: new Date().toISOString(),
      candidateProfile: state.profile,
      applications: list.map((j) => ({
        ...j,
        pipelineStage: state.pipeline[j.id]?.stage || 'saved',
        updatedDate: state.pipeline[j.id]?.date || j.postedDate
      }))
    };
    downloadFile('careerops_applications_export.json', JSON.stringify(payload, null, 2), 'application/json');
  }

  function exportCsv() {
    const list = state.jobs.filter((j) => state.pipeline[j.id] || state.saved.includes(j.id));
    const header = ['id', 'title', 'company', 'score', 'stage', 'location', 'comp', 'source', 'url'];
    const rows = list.map((j) => [
      j.id,
      j.title,
      j.company,
      j.careerOpsScore || '3.5',
      state.pipeline[j.id]?.stage || 'saved',
      j.location,
      j.compText,
      j.sourceLabel,
      j.applyUrl
    ]);
    const csvContent = [header, ...rows].map((r) => r.map((v) => `"${String(v || '').replace(/"/g, '""')}"`).join(',')).join('\n');
    downloadFile('careerops_applications.csv', csvContent, 'text/csv');
  }

  function exportToCareerOpsCli() {
    // Generates official CareerOps data/applications.md compatible table
    const list = state.jobs.filter((j) => state.pipeline[j.id] || state.saved.includes(j.id));
    const today = new Date().toISOString().split('T')[0];

    let markdown = `# CareerOps Applications Tracker\n`;
    markdown += `<!-- Generated from Tech Roles Radar (https://ibhavikmakwana.dev/jobs) -->\n`;
    markdown += `<!-- Drop into ./career-ops/data/applications.md to run with CareerOps CLI -->\n\n`;
    markdown += `| # | Date | Company | Role | Score | Status | PDF | Report | Notes |\n`;
    markdown += `|---|---|---|---|---|---|---|---|---|\n`;

    list.forEach((job, idx) => {
      const entry = state.pipeline[job.id] || { stage: 'saved' };
      const score = (job.careerOpsScore || 3.5).toFixed(1);
      const stage = (entry.stage || 'saved').toLowerCase();
      markdown += `| ${idx + 1} | ${today} | ${job.company} | ${job.title} | ${score} | ${stage} | ❌ | - | Source: ${job.sourceLabel} · [Link](${job.applyUrl}) |\n`;
    });

    markdown += `\n\n### CareerOps CLI Quickstart\n`;
    markdown += `1. Initialize the CLI in your workspace:\n   \`npx @santifer/career-ops init\`\n`;
    markdown += `2. Copy this file into \`career-ops/data/applications.md\`\n`;
    markdown += `3. Launch your AI CLI in the directory (\`claude\`, \`codex\`, or \`opencode\`).\n`;

    downloadFile('applications.md', markdown, 'text/markdown');

    if (navigator.clipboard) {
      navigator.clipboard.writeText(markdown);
      alert('Exported applications.md! Table copied to your clipboard.');
    }
  }

  function copyShareLink() {
    const shareParam = `https://ibhavikmakwana.dev/jobs/?q=${encodeURIComponent(state.query)}&cat=${state.cat}&f=${state.chips.join(',') || 'none'}&pipeline=${Object.keys(state.pipeline).length}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareParam);
      state.shared = true;
      renderShortlist();
      setTimeout(() => {
        state.shared = false;
        renderShortlist();
      }, 1800);
    }
  }

  function debounce(fn, ms = 150) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), ms);
    };
  }

  function loadStateFromUrl() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('q')) state.query = params.get('q') || '';
    if (params.has('cat')) state.cat = params.get('cat') || 'all';
    if (params.has('f')) {
      const f = params.get('f');
      state.chips = f && f !== 'none' ? f.split(',').filter(Boolean) : [];
    }
    if (params.has('screen')) state.screen = params.get('screen') || 'jobs';
    if (params.has('id')) {
      const idParam = params.get('id');
      state.selId = idParam;
      state.userSelectedId = idParam;
    } else {
      state.userSelectedId = null;
    }

    if ($('search-input')) {
      $('search-input').value = state.query;
      $('search-clear-btn').hidden = !state.query;
    }
  }

  // =========================================================================
  // Live Feed Ingestion & Sync
  // =========================================================================

  async function syncLiveJobs() {
    state.isLoading = true;
    state.isSyncing = true;
    const pulseEl = $('header-pulse');
    const labelEl = $('header-stat-jobs');
    const syncBadge = $('bg-sync-badge');

    if (pulseEl) pulseEl.classList.add('syncing');
    if (labelEl) {
      labelEl.classList.add('syncing');
      labelEl.textContent = 'SYNCING FEEDS...';
    }
    if (syncBadge) syncBadge.hidden = false;

    try {
      // 1. Fetch live jobs edge aggregator
      const edgePromise = fetch('/api/jobs', { cache: 'no-store' })
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null);

      // 2. Fetch JobSpy local scraped feed
      const jobspyPromise = fetch('/jobs/data/jobspy_feed.json', { cache: 'no-store' })
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null);

      const [edgeData, jobspyData] = await Promise.all([edgePromise, jobspyPromise]);

      let incoming = [];
      if (edgeData && Array.isArray(edgeData.jobs)) {
        incoming.push(...edgeData.jobs);
      }
      if (jobspyData && Array.isArray(jobspyData)) {
        incoming.push(...jobspyData);
      }

      if (incoming.length > 0) {
        const normalized = incoming.map(normalizeJob);
        // Merge with custom jobs & fallbacks
        const merged = deduplicateJobs([...state.customJobs, ...normalized, ...DEFAULT_FALLBACK_JOBS.map(normalizeJob)]);
        state.jobs = merged;
      }
    } catch {
      // Keep fallbacks on failure
    } finally {
      state.isLoading = false;
      state.isSyncing = false;
      if (pulseEl) pulseEl.classList.remove('syncing');
      if (labelEl) labelEl.classList.remove('syncing');
      if (syncBadge) syncBadge.hidden = true;
      render();
    }
  }

  // =========================================================================
  // Initialization & Event Binding
  // =========================================================================

  function init() {
    state.saved = getSavedJobs();
    state.pipeline = getStoredPipeline();
    state.profile = getStoredProfile();
    state.customJobs = getStoredCustomJobs().map(normalizeJob);

    // Initial setup with custom + fallbacks
    state.jobs = deduplicateJobs([...state.customJobs, ...DEFAULT_FALLBACK_JOBS.map(normalizeJob)]);
    if (!state.selId && state.jobs.length > 0) {
      state.selId = state.jobs[0].id;
    }

    loadStateFromUrl();

    // Omnibar Search
    const searchInput = $('search-input');
    const searchClear = $('search-clear-btn');

    searchInput?.addEventListener('input', debounce((e) => {
      state.query = e.target.value;
      if (searchClear) searchClear.hidden = !state.query;
      render();
    }, 120));

    searchClear?.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      state.query = '';
      searchClear.hidden = true;
      render();
    });

    // Screen Nav Switcher
    $('screen-nav')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.nav-btn');
      if (!btn) return;
      const s = btn.getAttribute('data-screen');
      if (s) {
        state.screen = s;
        render();
      }
    });

    // Category Filter Pills
    $('categories-bar')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.cat-pill');
      if (!btn) return;
      const cat = btn.getAttribute('data-cat') || 'all';
      state.cat = cat;
      render();
    });

    // Filter Chips
    $('chips-group')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.chip-btn');
      if (!btn) return;
      const chip = btn.getAttribute('data-chip');
      if (chip) {
        if (state.chips.includes(chip)) {
          state.chips = state.chips.filter((c) => c !== chip);
        } else {
          state.chips = [...state.chips, chip];
        }
        render();
      }
    });

    // Reset Filters Button
    $('btn-reset-filters')?.addEventListener('click', () => {
      state.query = '';
      state.cat = 'all';
      state.chips = [];
      state.userSelectedId = null;
      if (searchInput) searchInput.value = '';
      if (searchClear) searchClear.hidden = true;
      render();
    });

    // Copilot Tabs Bar
    $('copilot-tab-bar')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.copilot-tab-btn');
      if (!btn) return;
      const tab = btn.getAttribute('data-copilot-tab');
      if (tab) {
        state.copilotTab = tab;
        renderPitchSidebar();
      }
    });

    // Pitch Channel Tabs (within Outreach tab)
    $('pitch-channel-tabs')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.pitch-tab-btn');
      if (!btn) return;
      const ch = btn.getAttribute('data-channel');
      if (ch) {
        state.channel = ch;
        state.copied = false;
        renderPitchSidebar();
      }
    });

    // Pipeline Status Selector in Aside
    $('select-job-status')?.addEventListener('change', (e) => {
      const selJob = state.jobs.find((j) => j.id === state.selId) || state.jobs[0];
      if (selJob) {
        updateJobPipelineStage(selJob.id, e.target.value);
      }
    });

    // Copilot Copy Actions
    $('btn-copy-pitch')?.addEventListener('click', () => {
      const selJob = state.jobs.find((j) => j.id === state.selId) || state.jobs[0];
      const pitch = generatePitch(selJob, state.channel, state.profile);
      if (navigator.clipboard) {
        navigator.clipboard.writeText(pitch);
        const btn = $('btn-copy-pitch');
        if (btn) {
          btn.textContent = 'Copied to clipboard!';
          setTimeout(() => { btn.textContent = 'Copy pitch'; }, 1800);
        }
      }
    });

    $('btn-copy-cover')?.addEventListener('click', () => {
      const selJob = state.jobs.find((j) => j.id === state.selId) || state.jobs[0];
      const cover = generateCoverLetter(selJob, state.profile);
      if (navigator.clipboard) {
        navigator.clipboard.writeText(cover);
        const btn = $('btn-copy-cover');
        if (btn) {
          btn.textContent = 'Cover letter copied!';
          setTimeout(() => { btn.textContent = 'Copy Cover Letter'; }, 1800);
        }
      }
    });

    $('btn-download-cover')?.addEventListener('click', () => {
      const selJob = state.jobs.find((j) => j.id === state.selId) || state.jobs[0];
      const cover = generateCoverLetter(selJob, state.profile);
      const filename = `Cover_Letter_${selJob.company.replace(/[^a-z0-9]/gi, '_')}.md`;
      downloadFile(filename, cover, 'text/markdown');
    });

    $('btn-copy-bullets')?.addEventListener('click', () => {
      const selJob = state.jobs.find((j) => j.id === state.selId) || state.jobs[0];
      const bullets = generateResumeBullets(selJob, state.profile);
      if (navigator.clipboard) {
        navigator.clipboard.writeText(bullets.map((b) => `• ${b}`).join('\n'));
        const btn = $('btn-copy-bullets');
        if (btn) {
          btn.textContent = 'Bullets copied!';
          setTimeout(() => { btn.textContent = 'Copy All Bullets'; }, 1800);
        }
      }
    });

    // Pipeline Screen Funnel Tabs
    $('pipeline-stages-tabs')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.stage-tab-btn');
      if (!btn) return;
      const stage = btn.getAttribute('data-funnel-stage');
      if (stage) {
        state.funnelStage = stage;
        $('pipeline-stages-tabs').querySelectorAll('.stage-tab-btn').forEach((b) => {
          b.classList.toggle('active', b === btn);
        });
        renderShortlist();
      }
    });

    // Pipeline Exports
    $('btn-export-json')?.addEventListener('click', exportJson);
    $('btn-export-csv')?.addEventListener('click', exportCsv);
    $('btn-export-careerops')?.addEventListener('click', exportToCareerOpsCli);
    $('btn-copy-share')?.addEventListener('click', copyShareLink);

    // =======================================================================
    // Modals Handling
    // =======================================================================

    // Open Modals
    $('btn-open-eval-modal')?.addEventListener('click', () => {
      $('modal-eval-custom').hidden = false;
    });

    $('btn-open-profile-modal')?.addEventListener('click', () => {
      const p = state.profile;
      $('profile-name').value = p.name || '';
      $('profile-title').value = p.title || '';
      $('profile-years').value = p.yearsExp || 8;
      $('profile-target-level').value = p.targetLevel || 'Senior';
      $('profile-comp').value = p.targetComp || '';
      $('profile-skills').value = (p.skills || []).join(', ');
      $('profile-summary').value = p.experienceSummary || '';
      $('modal-profile').hidden = false;
    });

    $('btn-open-careerops')?.addEventListener('click', () => {
      $('modal-careerops').hidden = false;
    });

    $('footer-careerops-link')?.addEventListener('click', (e) => {
      e.preventDefault();
      $('modal-careerops').hidden = false;
    });

    // Close Modals via Close Button or Backdrop
    document.querySelectorAll('[data-close-modal]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-close-modal');
        if (modalId && $(modalId)) {
          $(modalId).hidden = true;
        }
      });
    });

    document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          backdrop.hidden = true;
        }
      });
    });

    // Profile Presets Switching
    document.querySelectorAll('.btn-preset').forEach((btn) => {
      btn.addEventListener('click', () => {
        const presetKey = btn.getAttribute('data-preset');
        const preset = DEFAULT_PROFILES[presetKey];
        if (preset) {
          document.querySelectorAll('.btn-preset').forEach((b) => b.classList.toggle('active', b === btn));
          $('profile-name').value = preset.name;
          $('profile-title').value = preset.title;
          $('profile-years').value = preset.yearsExp;
          $('profile-target-level').value = preset.targetLevel;
          $('profile-comp').value = preset.targetComp;
          $('profile-skills').value = preset.skills.join(', ');
          $('profile-summary').value = preset.experienceSummary;
        }
      });
    });

    // Save Profile Form Submission
    $('form-profile')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const updated = {
        id: 'custom',
        name: $('profile-name').value.trim(),
        title: $('profile-title').value.trim(),
        archetype: $('profile-title').value.trim(),
        yearsExp: Number($('profile-years').value) || 8,
        targetLevel: $('profile-target-level').value.trim(),
        targetComp: $('profile-comp').value.trim(),
        skills: $('profile-skills').value.split(',').map((s) => s.trim()).filter(Boolean),
        experienceSummary: $('profile-summary').value.trim()
      };

      state.profile = updated;
      saveStoredProfile(updated);

      // Re-evaluate all jobs against updated profile
      state.jobs = state.jobs.map((j) => normalizeJob(j));

      $('modal-profile').hidden = true;
      render();
    });

    // Custom Job Evaluator Form Submission
    $('form-custom-eval')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const rawJob = {
        id: `custom-${Date.now()}`,
        title: $('custom-eval-title').value.trim(),
        company: $('custom-eval-company').value.trim(),
        roleCategory: $('custom-eval-cat').value,
        experienceLevel: $('custom-eval-level').value,
        location: 'Remote / Candidate Location',
        compText: 'Market Rate',
        postedDate: new Date().toISOString().split('T')[0],
        source: 'CareerOps',
        sourceLabel: 'Custom Pasted JD',
        applyUrl: $('custom-eval-url').value.trim() || '#',
        description: $('custom-eval-desc').value.trim()
      };

      const normalized = normalizeJob(rawJob);
      state.customJobs.unshift(normalized);
      saveStoredCustomJobs(state.customJobs);

      state.jobs.unshift(normalized);
      state.selId = normalized.id;
      state.userSelectedId = normalized.id;
      state.screen = 'jobs';
      state.copilotTab = 'eval';

      // Reset form and close modal
      $('form-custom-eval').reset();
      $('modal-eval-custom').hidden = true;

      render();
    });

    // Popstate
    window.addEventListener('popstate', () => {
      loadStateFromUrl();
      render();
    });

    // Initial Render
    render();

    // Sync live jobs in background
    syncLiveJobs();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
