# Getting Started

This guide helps you get up and running quickly.

## Prerequisites
- Git
- A supported runtime (Node.js or Python depending on your stack)
- Optional: Docker

## Installation
```bash
# Clone the repository
git clone <YOUR_REPO_URL>
cd <YOUR_REPO_DIR>

# (Optional) Create and activate a virtual environment for Python
# python -m venv .venv && source .venv/bin/activate

# (Optional) Install docs tooling (MkDocs Material)
pip install mkdocs-material
```

## Running the documentation locally
```bash
# From repo root
mkdocs serve
# Then open the URL shown in the terminal, typically http://127.0.0.1:8000/
```

## Project layout
```
.
├── docs/                # Documentation source
│   ├── api/             # API reference docs
│   ├── components.md    # UI/Service components
│   ├── examples.md      # End-to-end examples
│   ├── getting-started.md
│   ├── index.md
│   ├── usage.md
│   └── ...
└── mkdocs.yml           # Documentation site configuration
```