const express = require("express");
const app = express();
const cors = require("cors");

const dotenv = require("dotenv");

if (process.env.NODE_ENV === "development") {
  dotenv.config({ path: ".env.dev" });
} else {
  dotenv.config({ path: ".env.prod" });
}

const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const options = new chrome.Options();
options.addArguments("--headless");
let driver = new Builder()
  .forBrowser("chrome")
  .setChromeOptions(options)
  .build();


app.use(cors());
app.get("/api/email", async (req, res) => {
console.log("sadfsadfsa");
  try {
    // Navigate to the website you want to scrape
    await driver.get("https://claimfreecoins.io/bitcoin-faucet/");

    const table = await driver.findElement(
      By.xpath(
        '//table[@class="table table-sm table-striped mb-2 text-center text-dark"]//tbody'
      )
    );
    const rows = await table.findElements(By.css("tr"));
    let TableDatas = [];

    for (let row of rows) {
      const columns = await row.findElements(By.css("td"));
      let TableRow = [];
      for (let column of columns) {
        const text = await column.getText();
        await TableRow.push(text);
      }
      await TableDatas.push({
        email: TableRow[0],
        reward: TableRow[1],
        date: TableRow[2],
      });
    }
    res.json(TableDatas);
  } catch (e) {
    res.status(304).json({ msg: "The site is denided" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
