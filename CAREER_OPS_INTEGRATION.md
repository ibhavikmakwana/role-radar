# CareerOps AI Integration Guide - ibhavikmakwana.dev

This document outlines the implementation of the **CareerOps methodology** ([career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops)) within **Tech Roles Radar** (`https://ibhavikmakwana.dev/jobs`) and the open-source repository `ibhavikmakwana/ibhavikmakwana.dev`.

---

## 🧭 Core Philosophy & Manifesto

> *"Apply better to fewer. Signal over volume. Evidence over keywords. A human decides. Local-first. Dignity on both sides of the table."*
> — [The CareerOps Manifesto](https://career-ops.org/manifesto)

CareerOps flips the traditional job hunt: while companies use AI to filter candidates, candidates use AI to evaluate companies, score job fit (1–5) before applying, tailor evidence-backed ATS materials, and manage an active application pipeline.

---

## 🎯 Architecture & Capabilities

```
+-----------------------------------------------------------------------------------+
|                           Tech Roles Radar (Web Portal)                           |
|       (https://ibhavikmakwana.dev/jobs · 35+ ATS Feeds + JobSpy Ingestion)        |
+-----------------------------------------------------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                       CareerOps Client-Side Matching Engine                       |
|                   (100% Local-First · Stored in localStorage)                      |
|                                                                                   |
|  [ Candidate Profile ]      [ Job Posting / Pasted JD ]                           |
|         |                                |                                        |
|         +----------------+---------------+                                        |
|                          |                                                        |
|                          v                                                        |
|              [ 1–5 Match Scoring & A–H Evaluation ]                               |
+-----------------------------------------------------------------------------------+
       |                    |                    |                   |
       v                    v                    v                   v
[ Block A–H Eval ]  [ ATS Cover Letter ]  [ CV Bullets ]  [ Pipeline Tracker ]
  - Role & Stack      - 3 Impact Bullets    - JD Mirroring  - Saved / Applied /
  - CV Match Matrix   - Tailored Narrative    - Action Verbs    Interview / Offer
  - Level Strategy    - Direct CTA            - Metrics     - 1-Click CLI Export
  - Comp & Liveness
```

---

## 📊 The 1–5 Fit Scoring Discipline

Every job in the feed (and every custom pasted JD) is scored on a **1.0 to 5.0 scale** evaluated directly against the candidate's active profile:

| Score Band | Recommendation | Meaning |
|---|---|---|
| **4.0 – 5.0** | **RECOMMENDED: APPLY** | Strong technical and seniority alignment ($\ge 75\%$ stack match). Worth the investment to tailor materials and apply. |
| **3.0 – 3.9** | **CAUTION: STRETCH** | Moderate fit. Clear skill gaps exist. Candidate must prepare explicit bridge stories for missing requirements. |
| **1.0 – 2.9** | **DO NOT APPLY** | Weak alignment. Fundamental mismatch with target archetype or required core languages. Skip to save your night. |

---

## 🧱 Block A–H Evaluation Framework

1. **Block A — Role Summary & Core Stack**: Detects core languages, infrastructure, work format (Remote / Hybrid / Onsite), and primary archetype.
2. **Block B — CV Match Matrix**: Compares JD requirements against candidate skills with Importance tiers (`critical (stated)`, `high (structural)`, `meaningful (inferred)`) and evidence provenance.
3. **Block C — Level & Seniority Strategy**: Formulates candidate posture (Senior / Lead / Architect) and ownership narrative.
4. **Block D — Compensation Research**: Compares advertised pay against market benchmarks for regional tech corridors and global remote rates.
5. **Block E — Personalization Angles (Beyond the CV)**: 3 high-leverage angles to stand out to hiring managers and engineering leads.
6. **Block F — STAR+R Interview Framework**: Anticipates top technical and behavioral interview questions with structured Situation, Task, Action, Result, and Reflection frameworks.
7. **Block G — Posting Freshness & Legitimacy**: Verifies ATS direct sources (Greenhouse, Lever, Ashby) to protect candidates from ghost jobs and stale listings.
8. **Block H — Work Authorization Signal**: Evaluates geographical constraints, remote contract viability, and sponsorship compatibility.

---

## 🔒 Local-First Privacy Guarantee

Adhering strictly to CareerOps principles:
- **Zero Resume Uploads**: Candidate profiles, custom pasted JDs, and CV text are stored exclusively in your browser's `localStorage` (`trr_careerops_profile_v1` and `trr_careerops_pipeline_v1`).
- **No Telemetry Tracking**: Evaluations run synchronously on your device without transmitting personal data to external servers.

---

## 🔄 Two-Way Interoperability with CareerOps CLI

Candidates can transition seamlessly between the web portal and the local **CareerOps AI coding CLI**:

### 1. Exporting from the Web Portal
In **Screen 3 (Application Pipeline)**, click **"Export to CareerOps CLI"**. This generates `data/applications.md` formatted strictly to the CareerOps Data Contract:

```markdown
| # | Date | Company | Role | Score | Status | PDF | Report | Notes |
|---|---|---|---|---|---|---|---|---|
| 1 | 2026-10-27 | Anthropic | Forward Deployed Engineer | 4.8 | applied | ❌ | - | Source: Greenhouse · [Link](...) |
```

### 2. CLI Adapter Script
Run the included repository adapter script to export the live job feed directly into CareerOps inbox:

```bash
# Export feed to CareerOps pipeline inbox (data/pipeline.md)
node scripts/career_ops_adapter.mjs export-pipeline

# Export sample applications tracker (data/applications.md)
node scripts/career_ops_adapter.mjs export-tracker
```

### 3. Running CareerOps CLI Locally
To run the full terminal agent locally:
```bash
npx @santifer/career-ops init
cd career-ops
claude   # or codex, opencode, agy
```

---

## 🤝 Upstream Credits & Links

- **Upstream Repository**: [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops)
- **Creator**: Santiago Fernández de Valderrama Aparicio ([@santifer](https://github.com/santifer))
- **The CareerOps Manifesto**: [career-ops.org/manifesto](https://career-ops.org/manifesto)
