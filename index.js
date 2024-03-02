const port = 8000;
const cheerio = require('cheerio');
const axios = require('axios');
const express = require('express');

const app = express();

const newspapers = [
    {
        name: 'AajTak',
        address: 'https://www.aajtak.in/india'
    },
];

async function getNews(city) {
    const articles = [];
    await Promise.all(newspapers.map(async newspaper => {
        const response = await axios.get(newspaper.address + city);
        const html = response.data;
        const $ = cheerio.load(html);
        $('div.widget-listing-thumb a', html).each(function() {
            const title = $(this).attr("title");
            const url = $(this).attr("href");
            articles.push({
                title,
                url,
                // source: newspaper.name
            });
        });
    }));
    return articles;
}

// app.get("/", (req, res) => {
//     res.json('Welcome to news API');
// });

app.get("/", (req, res) => {
    const regions = [
        {
            region: 'Jharkhand',
            endpoint: '/news/jharkhand',
            description: 'Retrieves news articles related to Uttar Pradesh.'
        },
        {
            region: 'Delhi',
            endpoint: '/news/delhi',
            description: 'Retrieves news articles related to Uttar Pradesh.'
        },
        {
            region: 'Bihar',
            endpoint: '/news/bihar',
            description: 'Retrieves news articles related to Uttar Pradesh.'
        },
        {
            region: 'Uttar Pradesh',
            endpoint: '/news/uttar-pradesh',
            description: 'Retrieves news articles related to Uttar Pradesh.'
        },
        {
            region: 'Rajasthan',
            endpoint: '/news/rajasthan',
            description: 'Retrieves news articles related to Rajasthan.'
        },
        {
            region: 'Haryana',
            endpoint: '/news/haryana',
            description: 'Retrieves news articles related to Haryana.'
        },
        {
            region: 'Maharashtra',
            endpoint: '/news/maharashtra',
            description: 'Retrieves news articles related to Maharashtra.'
        },
        {
            region: 'Uttarakhand',
            endpoint: '/news/uttarakhand',
            description: 'Retrieves news articles related to Uttarakhand.'
        },
        {
            region: 'Gujarat',
            endpoint: '/news/gujarat',
            description: 'Retrieves news articles related to Gujarat.'
        },
        {
            region: 'Telangana',
            endpoint: '/news/telangana',
            description: 'Retrieves news articles related to Telangana.'
        },
        {
            region: 'Madhya Pradesh',
            endpoint: '/news/madhya-pradesh',
            description: 'Retrieves news articles related to Madhya Pradesh.'
        },
        {
            region: 'Punjab',
            endpoint: '/news/punjab',
            description: 'Retrieves news articles related to Punjab.'
        },
        {
            region: 'Himachal Pradesh',
            endpoint: '/news/himachal-pradesh',
            description: 'Retrieves news articles related to Himachal Pradesh.'
        },
        {
            region: 'Chhattisgarh',
            endpoint: '/news/chhattisgarh',
            description: 'Retrieves news articles related to Chhattisgarh.'
        },
        {
            region: 'Jammu and Kashmir',
            endpoint: '/news/jammu-kashmir',
            description: 'Retrieves news articles related to Jammu and Kashmir.'
        },
    ];
    res.json({ greeting: 'Welcome to the AajTak-Statewise-News-Scraper', regions });
});


app.get("/news/jharkhand", async(req, res) => {
    const articles = await getNews("/jharkhand");
    res.json(articles);
});

app.get("/news/delhi", async(req, res) => {
    const articles = await getNews("/delhi");
    res.json(articles);
});

app.get("/news/bihar", async(req, res) => {
    const articles = await getNews("/bihar");
    res.json(articles);
});

app.get("/news/uttar-pradesh", async(req, res) => {
    const articles = await getNews("/uttar-pradesh");
    res.json(articles);
});

app.get("/news/rajasthan", async(req, res) => {
    const articles = await getNews("/rajasthan");
    res.json(articles);
});

app.get("/news/haryana", async(req, res) => {
    const articles = await getNews("/haryana");
    res.json(articles);
});

app.get("/news/maharashtra", async(req, res) => {
    const articles = await getNews("/maharashtra");
    res.json(articles);
});

app.get("/news/uttarakhand", async(req, res) => {
    const articles = await getNews("/uttarakhand");
    res.json(articles);
});

app.get("/news/gujarat", async(req, res) => {
    const articles = await getNews("/gujarat");
    res.json(articles);
});

app.get("/news/telangana", async(req, res) => {
    const articles = await getNews("/telangana");
    res.json(articles);
});

app.get("/news/madhya-pradesh", async(req, res) => {
    const articles = await getNews("/madhya-pradesh");
    res.json(articles);
});

app.get("/news/punjab", async(req, res) => {
    const articles = await getNews("/punjab");
    res.json(articles);
});

app.get("/news/himachal-pradesh", async(req, res) => {
    const articles = await getNews("/himachal-pradesh");
    res.json(articles);
});

app.get("/news/chhattisgarh", async(req, res) => {
    const articles = await getNews("/chhattisgarh");
    res.json(articles);
});

app.get("/news/jammu-kashmir", async(req, res) => {
    const articles = await getNews("/jammu-kashmir");
    res.json(articles);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
