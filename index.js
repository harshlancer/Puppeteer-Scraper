import puppeteer from 'puppeteer';

async function scrapeQuotes() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://quotes.toscrape.com/', { waitUntil: 'domcontentloaded' });

  const quotes = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.quote')).map(quote => ({
      text: quote.querySelector('.text').innerText,
      author: quote.querySelector('.author').innerText,
      tags: Array.from(quote.querySelectorAll('.tag')).map(tag => tag.innerText),
    }));
  });

  await browser.close();
  return quotes;
}

scrapeQuotes()
  .then(quotes => console.log(quotes))
  .catch(error => console.error('Error:', error));
