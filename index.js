const port = 8000;
const cheerio = require("cheerio");
const axios = require("axios");
const express = require("express");

const app = express();

const newspapers = [
  {
    name: "AajTak",
    address: "https://www.aajtak.in/india", //will add more newspapers
  },
];

async function getNews(city) {
  const articles = [];
  try {
    await Promise.all(
      newspapers.map(async (newspaper) => {
        const response = await axios.get(newspaper.address + city);
        const html = response.data;
        const $ = cheerio.load(html);
        $("div.widget-listing-thumb a", html).each(function () {
          const title = $(this).attr("title");
          const url = $(this).attr("href");
          articles.push({
            title,
            url,
          });
        });
      })
    );
  } catch (error) {
    console.error("Error fetching news:", error);
  }
  return articles;
}

function createRegionRoute(regionData) {
  app.get(regionData.endpoint, async (req, res) => {
    const articles = await getNews(regionData.endpoint);
    res.json(articles);
  });
}

const regions = [
  {
    region: "Jharkhand",
    endpoint: "/jharkhand",
    description: "Retrieves news articles related to Jharkhand.",
  },
  {
    region: "Delhi",
    endpoint: "/delhi",
    description: "Retrieves news articles related to Delhi.",
  },
  {
    region: "Haryana",
    endpoint: "/haryana",
    description: "Retrieves news articles related to Haryana.",
  },
  {
    region: "UP",
    endpoint: "/uttar-pradesh",
    description: "Retrieves news articles related to UP.",
  },
  {
    region: "Punjab",
    endpoint: "/punjab",
    description: "Retrieves news articles related to Punjab.",
  },
  {
    region: "MP",
    endpoint: "/madhya-pradesh",
    description: "Retrieves news articles related to MP.",
  },
  {
    region: "Maharashtra",
    endpoint: "maharashtra",
    description: "Retrieves news articles related to Maharashtra.",
  },
];

regions.forEach(createRegionRoute);

app.get("/", (req, res) => {
  res.json({
    greeting: "Welcome to the AajTak-Statewise-News-Scraper(Live)",
    instructions:
      "Edit address and add /<State Name> to get news for a perticular state except bihar and rajasthan for now",
    regions,
  });
});

app.listen(process.env.PORT || port, () => {
  console.log(`Server is running on port ${port}`);
});
