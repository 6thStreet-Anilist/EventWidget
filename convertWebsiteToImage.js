const puppeteer = require('puppeteer');
const path = require('path');

async function captureWebsiteAreaAsImage(url, x, y, width, height) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    // Open the webpage
    await page.goto(url);
  
    // Set the viewport size to match the desired area
    await page.setViewport({ width: width, height: height });
  
    // Capture the screenshot of the specified area
    const screenshotPath = path.join(__dirname, 'screenshot.png');
    await page.screenshot({ path: screenshotPath, clip: { x: x, y: y, width: width, height: height } });
  
    console.log(`Website screenshot saved at: ${screenshotPath}`);
  
    await browser.close();
  }

// Usage example
const websiteUrl = 'https://6thstreet-anilist.github.io/EventWidget/';
const x = 0;
const y = 0;
const width = 350;
const height = 250;
captureWebsiteAreaAsImage(websiteUrl, x, y, width, height);
