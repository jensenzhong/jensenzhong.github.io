# Zhengshen Zhong — Personal Website

Personal academic website for Zhengshen Zhong (钟政燊).

- Website: https://jensenzhong.github.io/
- English homepage: `/`
- Chinese homepage: `/zh/`

## Content

- `english.md` and `about.md`: English and Chinese homepage content.
- `_data/projects.yml`: project descriptions, figures, dates, and showcase links.
- `_config.yml`: identity, contact information, and navigation.
- `images/` and `assets/`: profile images, project figures, and CVs.
- The project directories contain standalone presentations and interactive demos.

## Local preview

Install Ruby and Bundler, then run:

```sh
bundle install
bundle exec jekyll serve --host 127.0.0.1
```

Build for production with `JEKYLL_ENV=production bundle exec jekyll build`.

## Deployment

Push to `main` to build and deploy with GitHub Actions and GitHub Pages.
The workflow publishes `_site`; local tools, screenshots, caches, and editor files are excluded.

## Credits

The site uses the AcademicPages / Minimal Mistakes Jekyll theme.
The bundled theme license is retained in `LICENSE`; third-party libraries retain their notices.

## GitHub activity updates

The Pages workflow refreshes the contribution chart on every deployment and daily at 00:23 UTC (08:23 China Standard Time). `scripts/update-github-activity.py` reads the public GitHub calendar and generates the last 32 weeks plus a real refresh timestamp. No personal access token or automated repository commits are needed. Failed fetches or invalid calendars stop deployment, keeping the last published site intact.

Run `python scripts/update-github-activity.py` before a local build to refresh the preview. To trigger a refresh manually, run the Pages workflow from Actions. GitHub can delay scheduled runs and disables scheduled workflows in public repositories after 60 days without repository activity; re-enable the workflow in Actions if that happens.
