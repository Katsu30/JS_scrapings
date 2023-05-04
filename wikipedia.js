const puppeteer = require('puppeteer');
 
const scrape = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250,
    defaultViewport: null
  });
 
  // Webサイトを開く
  const page = await browser.newPage();
  const url = 'https://ja.wikipedia.org/wiki/ウェブスクレイピング';
  await page.goto(url, { waitUntil: 'domcontentloaded' });
 
  // タブを移動
  const wikiPages = await browser.pages();
  const wikiPage = wikiPages[1];
  await wikiPage.bringToFront();
 
  // タイトル取得
  let selector = '#firstHeading';
  const titleDom = await wikiPage.$(selector);
  if (titleDom) {
    title = await wikiPage.$eval(selector, e => e.textContent);
    // 出力
    console.log(title);
  }
 
  // 本文取得
  selector = '#mw-content-text > div > p';
  const contentDom = await wikiPage.$$(selector);
  if (contentDom.length > 0) {
    content = await wikiPage.$$eval(selector, elements => {
      let datas = [];
      for (e of elements) {
        datas.push(e.textContent);
      }
      return datas;
    });
    // 出力
    console.log(content);
  }
  browser.close();
}
scrape();