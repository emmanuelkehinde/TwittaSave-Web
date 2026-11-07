[![Made in Nigeria](https://img.shields.io/badge/made%20in-nigeria-008751.svg?style=flat-square)](https://github.com/acekyd/made-in-nigeria)

# TwittaSave

## (TwittaSave app implementation for web.)

Download Twitter videos and GIFs directly to your device, on a PC or a phone.

### Status

Downloading doesn't work at the moment (#5). The app uses the Twitter API v1.1 `statuses/show` endpoint with app-only auth, which X no longer offers on its free access. See [ROADMAP.md](ROADMAP.md) for the plan to bring it back.

### Who it's for

Anyone who wants to save a video or GIF from a tweet without installing an app. It's the web version of TwittaSave, alongside the mobile apps and Chrome extension.

### How to use

- Copy the link to the tweet (tweet url), paste it and tap the download button.

### Built with

- Plain HTML, CSS and JavaScript, with jQuery 3.1.1
- [Bootstrap](https://getbootstrap.com/) and Tether for the layout
- [Codebird](https://github.com/jublo/codebird-js) for calls to the Twitter API
- Hosted on Firebase Hosting, which serves the Firebase scripts referenced in `index.html`

### Running it locally

1. Create an app on the [X Developer Portal](https://developer.x.com/) and get its consumer key and secret.
2. In `js/app.js`, replace the `"KEY"` and `"SECRET"` placeholders in `cb.setConsumerKey(...)` with your own values. Don't commit them.
3. Serve the folder with any static file server, for example `python3 -m http.server 8000`, then open http://localhost:8000.

The Firebase scripts in `index.html` only load when the site is served by Firebase Hosting, so they'll fail locally. That doesn't affect the download form.

Because this is a browser-only app, the key and secret are visible to anyone who opens the page. Moving the API calls to a small backend is on the [roadmap](ROADMAP.md).

### Other Distros:
- Mobile: https://github.com/emmanuelkehinde/TwittaSave-Mobile
- Chrome Extension: https://github.com/emmanuelkehinde/TwittaSave-Chrome

### Love this work? Show your love :heart: by putting a :star: on this project :v:; or you can buy me a coffee <a href='https://ko-fi.com/P5P0GMV2' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://az743702.vo.msecnd.net/cdn/kofi2.png?v=0' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

### License
```
   Copyright (C) 2017 Emmanuel Kehinde

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
```
