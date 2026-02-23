#!/usr/bin/env python3
"""Extract resume content from React components and output as markdown."""

from __future__ import annotations

import argparse
import os
import re
import sys

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
COMPONENTS_DIR = os.path.join(PROJECT_ROOT, "src", "components")


def read_component(name: str) -> str:
    """Read a component file and return its content."""
    path = os.path.join(COMPONENTS_DIR, name)
    if not os.path.isfile(path):
        print(f"Warning: {name} not found", file=sys.stderr)
        return ""
    with open(path, "r") as f:
        return f.read()


def strip_jsx(text: str) -> str:
    """Remove JSX tags and clean up whitespace."""
    text = re.sub(r"<[^>]+>", "", text)
    text = re.sub(r"\{[^}]*\}", "", text)
    lines = [line.strip() for line in text.splitlines()]
    return "\n".join(line for line in lines if line)


def extract_about() -> str:
    """Extract About section."""
    content = read_component("About.tsx")
    # Find text inside <p> tags
    paragraphs = re.findall(r"<p[^>]*>(.*?)</p>", content, re.DOTALL)
    text = "\n".join(strip_jsx(p) for p in paragraphs)
    if text:
        return f"## Summary\n\n{text}"
    return ""


def extract_experience() -> str:
    """Extract Experience section."""
    content = read_component("Experience.tsx")
    output = ["## Experience"]

    # Split content by timeline-item markers to isolate each job
    items = re.split(r'<div className="timeline-item">', content)[1:]  # skip preamble

    for item in items:
        # Extract title
        title_match = re.search(r"<h3>(.*?)</h3>", item)
        company_match = re.search(r'className="company">(.*?)</span>', item)
        period_match = re.search(r'className="period">(.*?)</span>', item)

        title = strip_jsx(title_match.group(1)) if title_match else "Unknown Role"
        company = strip_jsx(company_match.group(1)) if company_match else ""
        period = strip_jsx(period_match.group(1)) if period_match else ""

        output.append(f"\n### {title} — {company}")
        if period:
            output.append(f"*{period}*")

        # Extract bullet points
        bullets = re.findall(r"<li>(.*?)</li>", item, re.DOTALL)
        for bullet in bullets:
            text = strip_jsx(bullet).strip()
            if text:
                output.append(f"- {text}")

    return "\n".join(output)


def extract_education() -> str:
    """Extract Education section."""
    content = read_component("Education.tsx")
    output = ["## Education"]

    # Find each education card
    degrees = re.findall(r"<h3>(.*?)</h3>", content)
    schools = re.findall(r'className="school">(.*?)</p>', content)

    for i in range(min(len(degrees), len(schools))):
        degree = strip_jsx(degrees[i])
        school = strip_jsx(schools[i])
        output.append(f"\n### {degree}")
        output.append(f"*{school}*")

    return "\n".join(output)


def extract_skills() -> str:
    """Extract Skills section."""
    content = read_component("Skills.tsx")
    output = ["## Skills"]

    # Find each skill category
    categories = re.findall(
        r'<div className="skill-category">\s*<h3>(.*?)</h3>(.*?)</div>\s*</div>',
        content,
        re.DOTALL,
    )

    for cat_name, cat_content in categories:
        name = strip_jsx(cat_name)
        output.append(f"\n### {name}")

        # Extract skill names from <span> tags inside skill-tag divs
        skills = re.findall(r"<span>(.*?)</span>", cat_content)
        skill_list = [strip_jsx(s) for s in skills if strip_jsx(s)]
        if skill_list:
            output.append(", ".join(skill_list))

    return "\n".join(output)


def generate_resume(role: str | None = None) -> str:
    """Generate full resume as markdown."""
    sections = []

    sections.append("# Dylan Ballard — Software Engineer\n")

    about = extract_about()
    if about:
        sections.append(about)

    experience = extract_experience()
    if experience:
        sections.append(experience)

    education = extract_education()
    if education:
        sections.append(education)

    skills = extract_skills()
    if skills:
        sections.append(skills)

    resume = "\n\n".join(sections)

    if role:
        resume += f"\n\n---\n*Tailored for: {role}*\n"
        # Basic keyword highlighting could be expanded here

    return resume


def main():
    parser = argparse.ArgumentParser(
        description="Extract resume content from portfolio components"
    )
    parser.add_argument(
        "--role",
        type=str,
        default=None,
        help='Target role for tailoring (e.g., "Frontend Engineer at Startup X")',
    )
    args = parser.parse_args()

    resume = generate_resume(args.role)
    print(resume)


if __name__ == "__main__":
    main()
