# RoleRadar System Architecture

RoleRadar is designed with a **zero-dependency, dual-deployment architecture** that can run either 100% statically on GitHub Pages or dynamically on Cloudflare Pages Edge network.

---

## 🏛️ System Topology

```text
                                 ┌─────────────────────────────────────────┐
                                 │   Upstream Company ATS REST APIs        │
                                 │   (Greenhouse, Lever, Ashby, Remotive)  │
                                 └────────────────────┬────────────────────┘
                                                      │
                       ┌──────────────────────────────┴──────────────────────────────┐
                       │                                                             │
                       ▼                                                             ▼
        ┌──────────────────────────────┐                              ┌──────────────────────────────┐
        │  Static Mode (GitHub Pages)  │                              │  Edge Mode (Cloudflare Pages)│
        │  • GitHub Actions Cron       │                              │  • Edge Worker Function      │
        │  • Scrapes every 6 hours     │                              │  • Real-time parallel fetch  │
        │  • Generates feed.json       │                              │  • Edge caching (TTL 300s)   │
        └──────────────┬───────────────┘                              └──────────────┬───────────────┘
                       │                                                             │
                       └──────────────────────────────┬──────────────────────────────┘
                                                      │
                                                      ▼
                                       ┌──────────────────────────────┐
                                       │     RoleRadar Frontend       │
                                       │  • Universal Deep Search     │
                                       │  • Semantic Role Expansion   │
                                       │  • URL-Hash Shortlist Sync   │
                                       │  • Web Worker Fuzzy Index    │
                                       └──────────────────────────────┘
```

---

## 🔍 Key Architectural Principles

1. **Zero Runtime Secrets**: No private credentials or API keys are required to build, run, or host RoleRadar.
2. **Adapter Isolation**: Each ATS system (Greenhouse, Lever, Ashby) is contained within its own parsing logic. A breaking change in one ATS never crashes the aggregation of others.
3. **URL-Hash Shortlist Engine**: In static GitHub Pages mode, bookmarking and sharing shortlisted roles is encoded directly into compressed URL hash fragments (`#saved=...`), eliminating the need for a database.
4. **Offline Resilience**: Cached job feeds allow users to search, filter, and inspect postings even with intermittent network connectivity.
