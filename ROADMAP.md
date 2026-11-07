# Roadmap

TwittaSave for web has been quiet since 2022, and downloading no longer works (#5). This roadmap makes the project safe to run and easy to work on first, then restores downloading once the API question below is settled.

## 1. Keep the API keys off the page

The app calls the Twitter API from the browser, so the consumer key and secret are visible to every visitor.

- [ ] Add a small backend that holds the keys and fetches tweet media for the page
- [ ] Load the keys from environment variables, with a `.env.example` for setup
- [ ] Remove Codebird and the key placeholders from the front end
- [ ] Add basic rate limiting to the backend

## 2. Modern tooling

- [ ] Add a `package.json` with scripts to run, lint and test the project
- [ ] Replace the vendored copies of jQuery, Bootstrap and Tether in `lib/` with managed dependencies, or drop them where plain JavaScript is enough
- [ ] Add ESLint and Prettier
- [ ] Run lint and tests on every pull request with GitHub Actions

## 3. Support x.com links

The link check only accepts `twitter.com` and reads the tweet ID from a fixed position in the URL.

- [ ] Accept `x.com`, `twitter.com` and `mobile.twitter.com` links
- [ ] Handle `/i/status/` links, links with query parameters and `t.co` short links
- [ ] Cover every format with tests

## 4. Better downloads and errors

- [ ] Pick the highest-quality MP4 variant instead of the first one found
- [ ] Fix the variant loop, which can run past the end of the list when no MP4 exists
- [ ] Show clear messages for invalid links, deleted or private tweets, and rate limits
- [ ] Name downloaded files after the tweet instead of `video.mp4`

## 5. Hosting and docs

- [ ] Deploy again, since the old `twittasave.net` domain no longer resolves
- [ ] Fill in the empty `name` in `manifest.json`
- [ ] Keep the README's setup steps current

## Later: restore downloading (#5)

- [ ] Decide on tweet access through the official X API
- [ ] Use the chosen API from the backend in section 1
- [ ] Download images as well as videos and GIFs
