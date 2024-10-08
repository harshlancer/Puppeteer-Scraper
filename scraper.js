const puppeteer = require("puppeteer");

async function scrapeStockMarketNews() {
  const url = "https://www.livemint.com/market/stock-market-news/";
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  const news = await page.evaluate(() => {
    const articles = [];
    // Target each news article using the correct class names and structure
    document
      .querySelectorAll(".listingNew.clearfix.impression-candidate.ga-tracking")
      .forEach((item) => {
        const titleElement = item.querySelector(".headline a");
        const title = titleElement?.innerText || null;
        const articleUrl = titleElement?.href || null;
        const imageElement = item.querySelector(".thumbnail img");
        const imageUrl = imageElement?.src || null;
        const description =
          item.querySelector(".listtostory p")?.innerText || null; // Use this if there's a description

        if (title && articleUrl) {
          articles.push({
            title,
            url: `https://www.livemint.com${articleUrl}`,
            image: imageUrl,
            description,
          });
        }
      });
    return articles;
  });

  await browser.close();
  return news;
}

module.exports = { scrapeStockMarketNews };
