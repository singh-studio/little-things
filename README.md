# Little Things Website

Static public website for Little Things.

Published with GitHub Pages from `main`.

Beta interest submissions post to the private `little-things-intake` Cloudflare Worker, which writes to the private Little Things Beta Candidates Notion database.

The website acknowledgement is deliberately controlled:

- The form does not expose TestFlight public links.
- The Worker sends only a "thanks for registering interest" acknowledgement after a successful Notion write.
- Kris receives an admin notification to review the candidate, assign a beta testing group, and add them to TestFlight manually.
- A warm TestFlight onboarding email is sent only after the candidate has actually been added in App Store Connect/TestFlight.
