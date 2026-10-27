#!/usr/bin/env node
/**
 * scripts/career_ops_adapter.mjs
 * Bridge adapter between Tech Roles Radar (ibhavikmakwana.dev/jobs)
 * and the open-source career-ops agent (github.com/career-ops-hq/career-ops).
 *
 * Usage:
 *   node scripts/career_ops_adapter.mjs export-pipeline [--out <path>]
 *   node scripts/career_ops_adapter.mjs export-tracker [--out <path>]
 *   node scripts/career_ops_adapter.mjs eval "<job-title>" "<company>" "<skills...>"
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = resolve(__dirname, '..');

const DEFAULT_FEED_PATH = resolve(REPO_ROOT, 'public/jobs/data/jobspy_feed.json');

function loadFeed(path = DEFAULT_FEED_PATH) {
  if (!existsSync(path)) {
    console.error(`Error: Job feed not found at ${path}`);
    return [];
  }
  try {
    const raw = readFileSync(path, 'utf-8');
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : (data.jobs || []);
  } catch (err) {
    console.error(`Failed to parse job feed: ${err.message}`);
    return [];
  }
}

function exportPipeline(feed, outPath) {
  const target = outPath || resolve(REPO_ROOT, 'career_ops_pipeline.md');
  let md = `# CareerOps Pipeline Inbox\n`;
  md += `<!-- Exported from Tech Roles Radar (https://ibhavikmakwana.dev/jobs) -->\n`;
  md += `<!-- Compatible with career-ops: data/pipeline.md -->\n\n`;

  feed.forEach((job) => {
    const title = job.title || 'Role';
    const company = job.company || 'Company';
    const url = job.applyUrl || job.url || '#';
    const loc = job.location || 'Remote';
    md += `- [${title} — ${company}](${url}) · ${loc}\n`;
  });

  writeFileSync(target, md, 'utf-8');
  console.log(`✓ Exported ${feed.length} jobs to CareerOps pipeline inbox: ${target}`);
}

function exportTracker(feed, outPath) {
  const target = outPath || resolve(REPO_ROOT, 'career_ops_applications.md');
  const today = new Date().toISOString().split('T')[0];

  let md = `# Applications Tracker (CareerOps Data Contract)\n`;
  md += `<!-- Exported from Tech Roles Radar (https://ibhavikmakwana.dev/jobs) -->\n`;
  md += `<!-- Compatible with career-ops: data/applications.md -->\n\n`;
  md += `| # | Date | Company | Role | Score | Status | PDF | Report | Notes |\n`;
  md += `|---|---|---|---|---|---|---|---|---|\n`;

  feed.slice(0, 50).forEach((job, idx) => {
    const num = idx + 1;
    const company = (job.company || 'Unknown').replace(/\|/g, '-');
    const role = (job.title || 'Engineer').replace(/\|/g, '-');
    const url = job.applyUrl || job.url || '#';
    md += `| ${num} | ${today} | ${company} | ${role} | 4.2 | saved | ❌ | - | Source: ${job.sourceLabel || 'Radar'} · [Link](${url}) |\n`;
  });

  writeFileSync(target, md, 'utf-8');
  console.log(`✓ Exported ${Math.min(feed.length, 50)} sample rows to CareerOps tracker: ${target}`);
}

const command = process.argv[2] || 'export-pipeline';

if (command === 'export-pipeline') {
  const feed = loadFeed();
  exportPipeline(feed, process.argv[3]);
} else if (command === 'export-tracker') {
  const feed = loadFeed();
  exportTracker(feed, process.argv[3]);
} else {
  console.log(`CareerOps CLI Adapter for ibhavikmakwana.dev`);
  console.log(`Usage: node scripts/career_ops_adapter.mjs [export-pipeline | export-tracker]`);
}
