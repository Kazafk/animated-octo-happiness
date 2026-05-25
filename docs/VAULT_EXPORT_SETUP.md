# Automated Obsidian Vault Export Setup

This guide explains how to set up automated exports from your Obsidian vault to your portfolio site.

## Local Setup

### 1. Enable Obsidian Local REST API

1. Open Obsidian settings
2. Go to **Community Plugins**
3. Search for and install "Local REST API"
4. Enable the plugin
5. Go to the plugin settings and note your **auth token**

### 2. Create `.env.local`

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
OBSIDIAN_API_URL=https://127.0.0.1:27124
OBSIDIAN_AUTH_TOKEN=your_token_here
PROJECTS_LIST=Project 1,Project 2,Project 3
GIT_AUTO_COMMIT=false
```

### 3. Run Export Manually

```bash
# Load environment from .env.local and run export
node scripts/auto-export-vault.js
```

This will:
- Export README.md files from your Obsidian projects
- Create/update `meta.json` files with project metadata
- Not commit changes (since GIT_AUTO_COMMIT=false locally)

## GitHub Actions Setup

⚠️ **Important:** The Obsidian API runs locally on your machine (`127.0.0.1:27124`) and is not accessible from GitHub Actions cloud runners.

### Recommended: Local Export + Auto-Deploy

The practical workflow is:

1. **Run export locally when needed:**
   ```bash
   OBSIDIAN_AUTH_TOKEN=your_token npm run export-vault:auto
   ```

2. **The script automatically:**
   - Exports projects from your vault
   - Commits changes to git
   - Pushes to GitHub

3. **GitHub Actions then:**
   - Builds the static site
   - Deploys to GitHub Pages

### Optional: Enable GitHub Actions Workflow

If you set up a **self-hosted runner** on your machine (advanced):

1. Go to **Settings → Secrets and variables → Actions**
2. Add secrets:
   - `OBSIDIAN_API_URL` → `https://127.0.0.1:27124`
   - `OBSIDIAN_AUTH_TOKEN` → Your auth token

3. Configure self-hosted runner in **Settings → Actions → Runners**

Otherwise, the workflow will still build and deploy the site (just without live Obsidian export).

## Customizing Export Frequency

Edit `.github/workflows/export-vault.yml` to change the schedule:

```yaml
schedule:
  # Run daily at 2:00 AM UTC
  - cron: '0 2 * * *'
  
  # Run daily at 12:00 PM UTC
  - cron: '0 12 * * *'
  
  # Run every 6 hours
  - cron: '0 */6 * * *'
  
  # Run on every Monday at 9:00 AM UTC
  - cron: '0 9 * * 1'
```

See [cron syntax docs](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#schedule) for more options.

## Troubleshooting

### "OBSIDIAN_AUTH_TOKEN is not set"

Make sure you've added the secret to GitHub repository settings.

### Export fails with "connection refused"

The Obsidian API runs locally on your machine. GitHub Actions can't access it.

**Solution:** Only use local exports, or set up a relay service to expose your Obsidian API.

### Changes not appearing after workflow runs

1. Check the **Actions** tab for workflow run status
2. Check the **Commits** tab for auto-commit message
3. Verify GitHub Pages is configured to deploy from the master branch

## API Response Codes

| Status | Meaning |
|--------|---------|
| 200 | Success - project exported |
| 404 | Project not found in vault |
| 401 | Auth token invalid |
| 500 | Obsidian API error |

The export script logs warnings for 404 responses but continues with other projects.

## Security Notes

- Never commit `.env.local` to git (it's in `.gitignore`)
- GitHub Secrets are encrypted and only accessible during workflow runs
- The auth token is a long string from your Local REST API plugin
- Protect your auth token like a password
