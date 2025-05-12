#!/bin/bash
mkdir -p /vercel/.cache/playwright/chrome
cd /vercel/.cache/playwright/chrome
wget https://storage.googleapis.com/chromium-browser-snapshots/Linux_x64/1176745/chrome-linux.zip
unzip chrome-linux.zip