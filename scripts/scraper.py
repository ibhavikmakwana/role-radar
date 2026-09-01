#!/usr/bin/env python3
"""
RoleRadar - Universal Multi-Source Job Aggregator
Fetches jobs across direct ATS feeds (Greenhouse, Lever, Ashby, Remotive) + JobSpy boards.
Outputs a sanitized, deduped feed to public/data/feed.json.
"""

import os
import sys
import json
import re
import hashlib
import requests
from datetime import datetime

# Root paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONFIG_PATH = os.path.join(BASE_DIR, "config", "sources.json")
OUTPUT_PATH = os.path.join(BASE_DIR, "public", "data", "feed.json")

def load_sources():
    if os.path.exists(CONFIG_PATH):
        with open(CONFIG_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    return {"greenhouse": [], "lever": [], "ashby": [], "remoteApis": []}

def determine_experience(title: str) -> str:
    t = str(title).lower()
    if re.search(r'\b(intern|internship|trainee|fresher|graduate|entry|junior|associate|l1|sde 1|sde-1)\b', t):
        return "entry"
    if re.search(r'\b(staff|principal|director|head of|vp|architect|distinguished|engineering manager|tech lead)\b', t):
        return "lead"
    if re.search(r'\b(senior|sr|sr\.|l3|sde 3|sde-3|manager)\b', t):
        return "senior"
    return "mid"

def categorize_role(title: str, dept: str = "") -> str:
    combined = f"{title} {dept}".lower()
    if re.search(r'\b(forward deployed|fde|solutions engineer|deployment strategist)\b', combined):
        return "fde"
    if re.search(r'\b(ai\b|ml\b|machine learning|deep learning|llm|nlp|agent|computer vision|prompt)\b', combined):
        return "ai"
    if re.search(r'\b(flutter|dart|android|kotlin|ios|swift|swiftui|react native|mobile)\b', combined):
        return "mobile"
    if re.search(r'\b(data|analyst|analytics|bi\b|business intelligence|tableau|power bi|sql|looker|dbt)\b', combined):
        return "data"
    if re.search(r'\b(product|designer|ux|ui|design|growth|product manager|pm\b)\b', combined):
        return "product"
    return "engineering"

def fetch_greenhouse(board):
    slug = board.get("slug")
    company = board.get("company", slug)
    logo = board.get("logo", "💼")
    url = f"https://boards-api.greenhouse.io/v1/boards/{slug}/jobs?content=true"
    jobs = []

    try:
        res = requests.get(url, timeout=12)
        if res.status_code == 200:
            data = res.json()
            for item in data.get("jobs", []):
                title = item.get("title", "").strip()
                if not title:
                    continue
                loc = item.get("location", {}).get("name", "Remote / Global")
                dept = (item.get("departments") or [{}])[0].get("name", "")
                jobs.append({
                    "id": f"gh-{item.get('id')}",
                    "title": title,
                    "company": company,
                    "logo": logo,
                    "location": loc,
                    "category": categorize_role(title, dept),
                    "experienceLevel": determine_experience(title),
                    "atsType": "greenhouse",
                    "applyUrl": item.get("absolute_url"),
                    "updatedAt": item.get("updated_at") or datetime.now().isoformat(),
                    "source": "Direct ATS"
                })
    except Exception as e:
        print(f"[Warning] Greenhouse ({slug}) failed: {e}")
    return jobs

def fetch_lever(board):
    slug = board.get("slug")
    company = board.get("company", slug)
    logo = board.get("logo", "💼")
    url = f"https://api.lever.co/v0/postings/{slug}?mode=json"
    jobs = []

    try:
        res = requests.get(url, timeout=12)
        if res.status_code == 200:
            data = res.json()
            for item in data:
                title = item.get("text", "").strip()
                if not title:
                    continue
                cats = item.get("categories", {})
                loc = cats.get("location", "Remote / Global")
                dept = cats.get("department", "")
                jobs.append({
                    "id": f"lev-{item.get('id')}",
                    "title": title,
                    "company": company,
                    "logo": logo,
                    "location": loc,
                    "category": categorize_role(title, dept),
                    "experienceLevel": determine_experience(title),
                    "atsType": "lever",
                    "applyUrl": item.get("hostedUrl"),
                    "updatedAt": datetime.fromtimestamp(item.get("createdAt", 0)/1000).isoformat() if item.get("createdAt") else datetime.now().isoformat(),
                    "source": "Direct ATS"
                })
    except Exception as e:
        print(f"[Warning] Lever ({slug}) failed: {e}")
    return jobs

def run_scraper():
    sources = load_sources()
    all_jobs = []
    seen = set()

    print(f"[{datetime.now().isoformat()}] Starting RoleRadar Multi-ATS aggregation...")

    # 1. Fetch Greenhouse
    for gh in sources.get("greenhouse", []):
        for j in fetch_greenhouse(gh):
            if j["id"] not in seen:
                seen.add(j["id"])
                all_jobs.append(j)

    # 2. Fetch Lever
    for lev in sources.get("lever", []):
        for j in fetch_lever(lev):
            if j["id"] not in seen:
                seen.add(j["id"])
                all_jobs.append(j)

    # 3. Output Payload
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    payload = {
        "status": "ok",
        "generatedAt": datetime.now().isoformat(),
        "totalJobs": len(all_jobs),
        "jobs": all_jobs
    }

    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2)

    print(f"[RoleRadar] Successfully generated feed with {len(all_jobs)} jobs at {OUTPUT_PATH}")

if __name__ == "__main__":
    run_scraper()
