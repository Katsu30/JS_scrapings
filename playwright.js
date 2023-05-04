const playwright = require('@playwright/test');
const fs = require("fs");
const stringifySync = require("csv-stringify/sync");

(async () => {
    const browser = await playwright.chromium.launch({ 
        channel: 'chrome',
        headless: false,
        slowMo: 250,
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://tomcat.2ch.sc/test/read.cgi/livejupiter/1575500664/');

    const element = await page.locator('h1');
    const threadTitle = await element.innerText();

    const threadList = await page.$$("dd");
    const list = await Promise.all(threadList.map(async (item) => await item.innerText()))

    console.log(threadTitle)
    console.log(list)

    const data = [];
    data.push({ title: threadTitle, content: '' })
    list.forEach((item) => {
      data.push({ title: '', content: item })
    })

    const csvData = stringifySync.stringify(data, { header: true });
    fs.writeFileSync("./sample.csv", csvData);
    
    await browser.close();
})();