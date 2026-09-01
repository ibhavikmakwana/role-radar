# 🛰️ RoleRadar

> **The open-source real-time career discovery radar.** Discover every role across engineering, design, product, AI, operations, and emerging fields — even the ones not defined yet.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Deploy to GitHub Pages](https://img.shields.io/badge/Deploy-GitHub_Pages-black?logo=github)](https://github.com/)
[![Deploy to Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare_Pages-orange?logo=cloudflare)](https://pages.cloudflare.com/)

---

## ✨ Features

- 🔍 **Universal Deep Search**: Full-text search across raw job descriptions, requirements, and responsibilities (not just titles).
- 🧠 **Semantic Role Expander**: Finds adjacent and emerging roles even when titles haven't been standardized yet.
- ⚡ **Direct ATS Connectors**: Queries Greenhouse, Lever, Ashby, and Remotive with zero intermediaries.
- 🌐 **100% Free Hosting (GitHub Pages First)**: Zero server costs, zero database maintenance, zero API keys required.
- 💾 **URL-Hash Shortlist Sync**: Bookmark and share shortlists with a single link using compressed URL fragments.
- ⌨️ **Keyboard-First Navigation**: Blazing fast `/` search, `J`/`K` navigation, and `S` bookmark shortcuts.
- 🌓 **Space Black & Clean Paper Themes**: High-contrast, accessibility-tested WCAG AAA pro interface.

---

## 🚀 1-Minute Quick Start (Fork & Deploy)

### Deploy to GitHub Pages (100% Free)

1. **Fork** this repository.
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
git clone https://github.com/<your-username>/role-radar.git
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
