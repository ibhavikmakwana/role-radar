# Contributing to RoleRadar

Thank you for your interest in contributing to **RoleRadar**! We welcome contributions from developers, designers, and job seekers worldwide.

---

## 🚀 How to Add a Company's Job Board (1-Line Contribution)

Adding a company board to RoleRadar takes less than 60 seconds and requires no complex code!

1. Fork this repository.
2. Open `config/sources.json`.
3. Add your company under the appropriate ATS section:

### Greenhouse Example:
```json
{
  "slug": "anthropic",
  "company": "Anthropic",
  "logo": "🧠"
}
```

### Lever Example:
```json
{
  "slug": "spotify",
  "company": "Spotify",
  "logo": "🟢"
}
```

### Ashby Example:
```json
{
  "slug": "linear",
  "company": "Linear",
  "logo": "📐"
}
```

4. Test locally by running:
   ```bash
   python scripts/scraper.py
   ```
5. Submit a Pull Request with the title: `feat(source): add <Company Name> job board`.

---

## 🛠️ Local Development Setup

### Option 1: Static / GitHub Pages Mode
```bash
# Clone the repository
git clone https://github.com/<your-username>/role-radar.git
cd role-radar

# Run the local python scraper to populate feed.json
pip install -r scripts/requirements.txt
python scripts/scraper.py

# Open public/index.html in your browser or run a simple local server
npx serve public
```

### Option 2: Cloudflare Edge Functions Mode
```bash
# Test with Cloudflare local edge isolate
npx wrangler pages dev public
```

---

## 📜 Pull Request Checklist
- [ ] No API keys, passwords, or personal credentials committed.
- [ ] JSON syntax in `config/sources.json` is valid.
- [ ] Verified that the company ATS endpoint responds with HTTP 200.
