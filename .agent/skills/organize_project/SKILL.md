---
name: prioritize_and_organize_projects
description: Organize project files into structured directories with YYMMDD_type_name format and push to GitHub.
---

# Organize Project Skill

This skill organizes project files into a structured directory format (`YYMMDD_type_name`) and handles Git operations.

## Usage

When the user asks to "organize folders", "save as portfolio", "upload to github", or similar commands implies structuring the workspace.

## Directory Structure Rules

1. **Root Directory**: The workspace root containing `.git`.
2. **Project Directories**: All project-related files (HTML, CSS, JS, Assets) must be moved into a subfolder.
3. **Naming Convention**:
   - Format: `YYMMDD_type_name`
   - `YYMMDD`: Current date (e.g., `260125` for Jan 25, 2026).
   - `type`: `site` (for websites) or `app` (for applications/tools).
   - `name`: Descriptive name (e.g., `portfolio`, `tetris`).
   - Example: `260125_site_portfolio`, `260125_app_tetris`

## Workflow Steps

1. **Identify Projects**: Look at the files in the root directory. Determine if they belong to a website or an app.
2. **Create Directory**: Create a new directory using the naming convention.
   ```powershell
   New-Item -ItemType Directory -Path "YYMMDD_type_name" -Force
   ```
3. **Move Files**: Move relevant files into the new directory.
   - Use `git mv` if the files are already tracked by Git.
   - Use `Move-Item` if they are new or untracked.
   ```powershell
   git mv index.html style.css script.js YYMMDD_type_name/
   ```
4. **Git Operations**:
   - Add changes: `git add .`
   - Commit: `git commit -m "Organize: Move files to YYMMDD_type_name structure"`
   - Push: `git push origin master` (or main)

## GitHub Setup (If needed)

If Git is not initialized:
1. `git init`
2. `gh repo create [repo_name] --public --source=. --push`

## Example

If the user has `index.html` and `style.css` for a tetris game on 2026-01-25:
1. Create folder `260125_app_tetris`
2. `git mv index.html style.css 260125_app_tetris/`
3. Commit and push.
