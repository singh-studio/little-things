# Little Things Website

Static public website for Little Things.

## Where it lives

- **Source of truth:** this folder, in the app repo (`singh-studio/little-things-app`).
- **Published copy:** the `singh-studio/little-things-site` repo, served by GitHub Pages at `www.getlittlethings.app` (apex 301s to `www.`). `main` there is protected — publish via PR; a `Website PR Check` runs before merge.
- `reference/` is design research and is **not** published — it stays out of the site repo.

To publish: copy the changed files across to a branch of `little-things-site`, open a PR, merge. See `../docs/release/GITHUB_PUBLISHING_WORKFLOW.md`.

## Store-facing URLs (these are cited in App Store Connect / Play Console — don't break them)

| Page | URL |
|---|---|
| Privacy policy | `https://getlittlethings.app/docs/privacy.html` |
| Terms | `https://getlittlethings.app/docs/terms.html` |
| Support | `https://getlittlethings.app/support.html` |
| Marketing | `https://getlittlethings.app/` |

## History

The beta-intake form (Cloudflare Worker → Notion), its `beta-thanks.html` acknowledgement, `docs/beta-faq.html`, and `docs/data-promises.html` were all retired for the 1.0 launch (2026-07-15). The form was already removed in the 1.0 redesign; the orphaned pages were deleted alongside it. The app's in-app feedback feature was replaced by a store-review prompt at the same time, so the privacy policy and terms no longer describe a feedback channel.
