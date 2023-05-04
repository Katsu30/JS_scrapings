const puppeteer = require('puppeteer');
 
const scrape = async () => {
  const browser = await puppeteer.launch({
  headless: false,
  slowMo: 250,
  defaultViewport: null
  });
 
  // Webサイトを開く
  const page = await browser.newPage();
  const url = 'https://www.yahoo.co.jp/';
  await page.goto(url,{ waitUntil: 'domcontentloaded' });
 
  // タイトルを取得
  const title = await page.title();
 
  //出力
  console.log(title);
  browser.close();
}
scrape();