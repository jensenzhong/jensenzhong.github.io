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
