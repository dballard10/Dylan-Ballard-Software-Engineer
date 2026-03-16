import type { ProfileData } from "./types";

export const profile: ProfileData = {
  name: "Dylan Ballard",
  title: "Full-Stack Software Engineer",
  profileImage: "/assets/profile-pic.webp",

  contact: {
    phone: "(703) 848-5998",
    email: "dylanballard.builds@gmail.com",
    location: "Reston, VA",
    github: { url: "https://github.com/dballard10", label: "github.com/dballard10" },
    linkedin: { url: "https://linkedin.com/in/dballard55", label: "linkedin.com/in/dballard55" },
  },

  skills: [
    {
      name: "Frontend Development",
      skills: [
        { name: "React", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/react.svg", colorIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "TypeScript", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/typescript.svg", colorIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        { name: "Next.js", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nextdotjs.svg" },
        { name: "Vite", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/vite.svg", colorIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" },
        { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tailwindcss.svg", colorIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
        { name: "HTML5", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/html5.svg", colorIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        { name: "CSS3", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/css3.svg", colorIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      ],
    },
    {
      name: "Backend Development",
      skills: [
        { name: "Python", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/python.svg", colorIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "FastAPI", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/fastapi.svg", colorIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
        { name: "SQL", icon: "/assets/technologies/sql-database.svg" },
        { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/postgresql.svg", colorIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
        { name: "RESTful APIs", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/fastapi.svg" },
        { name: "Auth (JWT, OAuth)", icon: "/assets/technologies/auth-shield.svg" },
        { name: "Async Processing", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/python.svg", colorIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "Pandas", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/pandas.svg", colorIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
        { name: "Database Design", icon: "/assets/technologies/sql-database.svg" },
      ],
    },
    {
      name: "Cloud & DevOps",
      skills: [
        { name: "AWS (S3, EC2, RDS, Lambda)", icon: "/assets/technologies/aws.svg" },
        { name: "Vercel", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/vercel.svg" },
        { name: "Railway", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/railway.svg" },
        { name: "Fly.io", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/flydotio.svg", colorIcon: "https://www.vectorlogo.zone/logos/flyio/flyio-icon.svg" },
        { name: "Docker", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/docker.svg", colorIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { name: "Bash / Shell Scripting", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/gnubash.svg" },
        { name: "CI/CD (GitHub Actions)", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/githubactions.svg" },
      ],
    },
    {
      name: "Tools & Collaboration",
      skills: [
        { name: "Cursor", icon: "/assets/technologies/cursor.svg" },
        { name: "VS Code", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/visualstudiocode.svg", colorIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
        { name: "Git", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/git.svg", colorIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
        { name: "GitHub", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/github.svg" },
        { name: "Node.js", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nodedotjs.svg", colorIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "NPM", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/npm.svg", colorIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" },
        { name: "Postman", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/postman.svg", colorIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
        { name: "Figma (UI/UX)", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/figma.svg", colorIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
        { name: "Agile", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/jira.svg", colorIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg" },
        { name: "Testing (Jest, Pytest, Vitest)", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/jest.svg", colorIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" },
        { name: "Technical Writing & Documentation", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/markdown.svg" },
      ],
    },
    {
      name: "AI & Agentic Development",
      skills: [
        { name: "Agentic development workflows", icon: "/assets/technologies/ai.svg" },
        { name: "0-to-1 rapid prototyping with AI agents", icon: "/assets/technologies/ai.svg" },
        { name: "Prompt engineering & LLM integration", icon: "/assets/technologies/ai.svg" },
        { name: "Claude Code, Cursor, Codex, Gemini", icon: "/assets/technologies/ai.svg" },
      ],
    },
  ],

  currentProjects: [
    {
      title: "Shipkitty",
      image: "/assets/projects/shipkitty/shipkitty-landing.webp",
      images: [
        "/assets/projects/shipkitty/shipkitty-landing.webp",
        "/assets/projects/shipkitty/shipkitty-dashboard.webp",
        "/assets/projects/shipkitty/shipkitty-session-events.webp",
      ],
      tech: [
        { name: "React", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/react.svg" },
        { name: "TypeScript", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/typescript.svg" },
        { name: "Hono", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/hono.svg" },
        { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/postgresql.svg" },
        { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tailwindcss.svg" },
      ],
      description: "AI agent observability dashboard for monitoring, replaying, and analyzing autonomous coding agent sessions. Track costs and token usage across all your projects. View a history of all your projects, each session and even the.",
      shortDescription: "AI agent observability dashboard.",
    },
  ],

  pastProjects: [
    {
      title: "Cinetik",
      image: "/assets/projects/cinetik/cinetik-trending.webp",
      images: [
        "/assets/projects/cinetik/cinetik-trending.webp",
        "/assets/projects/cinetik/cinetik-movies.webp",
        "/assets/projects/cinetik/cinetik-series.webp",
        "/assets/projects/cinetik/cinetik-details.webp",
      ],
      tech: [
        { name: "React", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/react.svg" },
        { name: "TypeScript", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/typescript.svg" },
        { name: "FastAPI", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/fastapi.svg" },
        { name: "Python", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/python.svg" },
      ],
      description: "Full-stack media tracking and social app for movies and TV shows. Users track favorites and manage watchlists.",
      shortDescription: "Track movies and shows.",
      url: "https://cinetik.app",
    },
    {
      title: "Chess Opening Guide",
      image: "/assets/projects/chess-opening-guide/chess-opening-guide-landing.webp",
      images: [
        "/assets/projects/chess-opening-guide/chess-opening-guide-landing.webp",
        "/assets/projects/chess-opening-guide/chess-opening-guide-opening.webp",
        "/assets/projects/chess-opening-guide/chess-opening-guide-help.webp",
      ],
      tech: [
        { name: "Next.js", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nextdotjs.svg" },
        { name: "TypeScript", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/typescript.svg" },
        { name: "Shadcn UI", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/shadcn.svg" },
        { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tailwindcss.svg" },
      ],
      description: "Chess opening guide for beginners. Users can learn about chess openings and practice them.",
      shortDescription: "Chess opening guide for beginners.",
      url: "https://chess-opening-guide.vercel.app",
    },
  ],
};
