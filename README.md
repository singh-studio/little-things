# Little Things Website

Static public website for Little Things.

Published with GitHub Pages from `main`.

Beta interest submissions post to the private `little-things-intake` Cloudflare Worker, which writes to the private Little Things Beta Candidates Notion database.

The website acknowledgement is deliberately controlled:

- The form does not expose TestFlight public links.
- After a successful Notion write, the form redirects to `beta-thanks.html`.
- Candidate acknowledgement email is disabled by default.
- Kris receives an admin notification to review the candidate, assign a beta testing group, and add them to TestFlight manually.
- Apple sends the install email when Kris adds the tester in App Store Connect/TestFlight.
- A warm TestFlight onboarding email is reserved for cases where a tester needs extra context or support.
