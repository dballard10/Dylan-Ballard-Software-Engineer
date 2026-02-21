# Portfolio Research

## Trigger
User wants to find portfolio websites for design inspiration, study how other engineers present their work, or add new entries to the inspiration spreadsheet.

## Purpose
Build a curated collection of developer portfolios that demonstrate strong design, clear communication, and successful career outcomes. This informs the design and content strategy of Dylan's personal portfolio.

## Selection Criteria
When evaluating a portfolio for inclusion, consider:
- **Design quality**: Clean, modern, responsive, accessible
- **Career relevance**: Engineer at a notable company, successful startup founder, or respected independent
- **Tech alignment**: Uses modern web tech (React, Next.js, Tailwind, etc.) that's relevant to Dylan's stack
- **Content strategy**: How they present projects, experience, and skills
- **Uniqueness**: Something distinctive that sets them apart (animations, interactivity, storytelling)

## Workflow

### 1. Discover Portfolios
Use web search to find developer portfolios. Good search queries:
- `"best developer portfolio websites [year]"`
- `"software engineer portfolio inspiration"`
- `"developer portfolio landed job at [company]"`
- Browse curated lists: Awwwards portfolios, GitHub emmabostian/developer-portfolios

### 2. Research the Person
For each candidate portfolio, find:
- **Name**: Full name
- **Role**: Current job title
- **Company**: Where they work (or "Self-employed" for independents)
- **Portfolio URL**: Their personal website
- **Company URL**: Their employer's website
- **Notes**: What makes this portfolio notable (design choices, tech used, awards)

### 3. Add to Spreadsheet
Run the execution script to append:
```bash
python tools/scrape_portfolios.py --add \
  --name "First Last" \
  --role "Job Title" \
  --company "Company Name" \
  --portfolio-url "https://example.com" \
  --company-url "https://company.com" \
  --notes "What makes this notable"
```

### 4. Review Collection
View all collected portfolios:
```bash
python tools/scrape_portfolios.py --list    # detailed view
python tools/scrape_portfolios.py --export  # table view
```

## Data Location
- **Spreadsheet**: `data/portfolio-inspiration.csv`
- **Script**: `tools/scrape_portfolios.py`
- Opens natively in macOS Numbers, Excel, or Google Sheets

## Constraints
- Only add portfolios you've actually visited and reviewed
- Verify URLs are live before adding
- Avoid duplicates — check `--list` before adding
