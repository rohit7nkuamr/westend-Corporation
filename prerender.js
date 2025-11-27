// Pre-render critical pages for instant Google indexing
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fetch product URLs from sitemap
async function getProductUrls() {
    return new Promise((resolve, reject) => {
        https.get('https://westendcorporation.in/sitemap.xml', (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                const urlMatches = data.match(/<loc>(.*?)<\/loc>/g) || [];
                const urls = urlMatches.map(match => match.replace(/<\/?loc>/g, ''));
                resolve(urls);
            });
        }).on('error', reject);
    });
}

async function prerender() {
    console.log('🚀 Starting pre-rendering process...\n');

    // Get all URLs from sitemap
    const allUrls = await getProductUrls();
    console.log(`📄 Found ${allUrls.length} URLs in sitemap\n`);

    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    let successCount = 0;
    let errorCount = 0;

    for (const url of allUrls) {
        try {
            // Extract path for filename
            const urlPath = new URL(url).pathname;
            const filename = urlPath === '/'
                ? 'index-prerendered.html'
                : `${urlPath.replace(/\//g, '-').substring(1)}-prerendered.html`;

            console.log(`⏳ Rendering: ${url}`);
            const page = await browser.newPage();

            // Set user agent to avoid bot detection
            await page.setUserAgent('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)');

            // Wait for network to be idle (all API calls complete)
            await page.goto(url, {
                waitUntil: 'networkidle0',
                timeout: 30000
            });

            // Wait for React to fully render
            await page.waitForTimeout(2000);

            // Get the fully rendered HTML
            const html = await page.content();

            // Save to dist folder
            const outputPath = path.join(__dirname, 'dist', filename);
            fs.writeFileSync(outputPath, html);

            console.log(`✅ Saved: ${filename}\n`);
            successCount++;

            await page.close();

        } catch (error) {
            console.error(`❌ Error rendering ${url}:`, error.message, '\n');
            errorCount++;
        }
    }

    await browser.close();

    console.log('━'.repeat(50));
    console.log(`✅ Pre-rendering complete!`);
    console.log(`📊 Success: ${successCount} | Errors: ${errorCount}`);
    console.log('━'.repeat(50));
}

prerender().catch(console.error);
