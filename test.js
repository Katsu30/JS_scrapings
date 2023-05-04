const puppeteer = require('puppeteer');
 
const scrape = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250,
    defaultViewport: null
  });
 
  // Webサイトを開く
  const page = await browser.newPage();
  const url = 'https://tomcat.2ch.sc/test/read.cgi/livejupiter/1575500664/';
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  await page.bringToFront();

  // タイトル取得
  const element = await page.waitForSelector('')

  const titleDom = await page.$(element);
  console.log(titleDom);
  if (titleDom) {
    title = await page.$eval(selector, e => e.textContent);
    // 出力
    console.log(title);
  }
 
  // 本文取得
  // selector = '#mw-content-text > div > p';
  // const contentDom = await wikiPage.$$(selector);
  // if (contentDom.length > 0) {
  //   content = await wikiPage.$$eval(selector, elements => {
  //     let datas = [];
  //     for (e of elements) {
  //       datas.push(e.textContent);
  //     }
  //     return datas;
  //   });
  //   // 出力
  //   console.log(content);
  // }
  browser.close();
}
scrape();