# 🛰️ RoleRadar

> **The open-source real-time career discovery radar.** Discover every role across engineering, design, product, AI, operations, and emerging fields — even the ones not defined yet.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/ibhavikmakwana/role-radar?style=social)](https://github.com/ibhavikmakwana/role-radar)
[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-black?logo=github)](https://ibhavikmakwana.github.io/role-radar/)
[![Deploy to Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare_Pages-orange?logo=cloudflare)](https://pages.cloudflare.com/)

---

## 🧠 Powered by CareerOps AI Engine

RoleRadar incorporates the evaluation disciplines and methodology of **[career-ops](https://github.com/career-ops-hq/career-ops)**:

- 🎯 **1.0–5.0 Deterministic Fit Scoring**: Evaluates openings against your candidate profile and CV. Strictly recommends **Apply (≥4.0)**, **Targeted Stretch (3.0–3.9)**, or **Do Not Apply (<3.0)** to protect your time.
- 📋 **Block A–H Evaluation Suite**: In-depth inspection covering Role & Stack, Candidate CV Match Matrix, Level Strategy, Compensation Research, Personalization Angles, STAR+R Interview Prep, Liveness verification, and Work Auth.
- 📝 **Tailored ATS Application Materials**: Generate targeted cover letters with quantified metric achievements and impact-driven CV bullets ().
- ⚡ **Universal Job Evaluator**: Paste any external job posting URL or raw JD to run the full evaluation suite against your CV.
- 🔒 **100% Local-First Privacy**: Resumes, profiles, and pipeline stages live entirely in your browser's . Zero telemetry or resume data leaves your machine.
- 🚀 **1-Click CareerOps CLI Markdown Export**: Synchronize your pipeline directly into  compatible with the CareerOps terminal CLI.

## ✨ Features

- 🔍 **Universal Deep Search**: Full-text search across raw job descriptions, requirements, and responsibilities (not just titles).
- 🧠 **Semantic Role Expander**: Finds adjacent and emerging roles even when titles haven't been standardized yet.
- ⚡ **Direct ATS Connectors**: Queries Greenhouse, Lever, Ashby, and Remotive with zero intermediaries.
- ✉️ **Interactive Cold Pitch Drafter**: Generates tailored outreach for Email, Engineering Managers, LinkedIn, and X/Twitter in 1 click.
- 🏢 **Company Directory**: Curated tech and product firms with active hiring tracks.
- 💾 **Shortlist & Multi-Format Exporter**: Bookmark roles, export as JSON or CSV, and share state via URL fragments.
- 🌐 **100% Free Hosting (GitHub Pages First)**: Zero server costs, zero database maintenance, zero API keys required.
- ⌨️ **Keyboard-First Navigation**: Blazing fast `/` search, `Escape` clear, and quick navigation shortcuts.
- 🌓 **Space Black & Clean Paper Themes**: High-contrast, accessibility-tested WCAG AAA pro interface.

---

## 🚀 1-Minute Quick Start (Fork & Deploy)

### Deploy to GitHub Pages (100% Free)

1. **[Fork this repository](https://github.com/ibhavikmakwana/role-radar/fork)**.
2. Go to **Settings** > **Pages** > Set source to **GitHub Actions**.
3. Under the **Actions** tab, manually trigger the **`RoleRadar Multi-ATS Scraper & Publish`** workflow once.
4. Your personal live job radar is now live at `https://<your-username>.github.io/role-radar/`! It will automatically re-scrape every 6 hours.

---

## 🏢 Adding Your Company (1-Line JSON Contribution)

Anyone can add their company's job board to RoleRadar in under 60 seconds!

1. Open `config/sources.json`.
2. Add your company's ATS slug:
   ```json
   {
     "slug": "anthropic",
     "company": "Anthropic",
     "logo": "🧠"
   }
   ```
3. Open a Pull Request!

---

## 🛠️ Local Development

```bash
# Clone the repository
git clone https://github.com/ibhavikmakwana/role-radar.git
cd role-radar

# Install scraper dependencies
pip install -r scripts/requirements.txt

# Run the local multi-ATS aggregator to generate feed.json
python scripts/scraper.py

# Launch the local UI
npx serve public
```

---

## 🏛️ System Architecture

Read the [ARCHITECTURE.md](ARCHITECTURE.md) guide for details on the dual-mode static and edge engine.

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before submitting a pull request.

---

## ⚖️ License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for details.
