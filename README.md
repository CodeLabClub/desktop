# TurboWarp Desktop

TurboWarp as a desktop app.

If you're looking for downloads, head to: https://desktop.turbowarp.org/

Licensed under the GPLv3.0. See LICENSE for more information.

Parts of this repository are based on [LLK/scratch-desktop](https://github.com/LLK/scratch-desktop).

## Building it yourself

Install these:

 - [Git](https://git-scm.com/)
 - [Node.js](https://nodejs.org/en/)

You'll need to open a terminal for the next steps.

Clone it:

```bash
git clone https://github.com/TurboWarp/desktop turbowarp-desktop
cd turbowarp-desktop
```

Install dependencies:

```bash
# This will take a while and it may seem to get stuck at some point. This is normal if your internet isn't the fastest.
npm ci
```

Download library files:

```
node download-library-files.js
```

Build:

```bash
# Development
npm run dev

# Production (output is in `dist` folder)
npm run dist
# If it crashes with "JavaScript heap out of memory", try:
NODE_OPTIONS=--max-old-space-size=4096 npm run compile
```

## Website

The website source code is in the `docs` folder.
