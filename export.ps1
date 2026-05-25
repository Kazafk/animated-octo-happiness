# Quick export script - run from project root
# Usage: .\export.ps1

$env:OBSIDIAN_AUTH_TOKEN = "f21ef364ed898185fb06d8be5dbae8a4415218cdf3ee5e542c9f73df902e2be4"
npm run export-vault:auto
