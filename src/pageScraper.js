const scraperObject = {
    url: 'https://www.njlottery.com/en-us/drawgames/pick4.html#tab-winningNumbers',
    async scraper(browser){
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);
        await page.waitForSelector('.table-winning-numbers-pick')

        const data = await page.$$eval('tbody tr', tds => tds.map((td) => {
            const tmpData = td.innerText.split("\n")
            const result = {
                date: Date.parse(tmpData[0]),
                drawTime: tmpData[1],
                numbers: tmpData[2]?.split(" ").splice(0, 4).join("")
            }
            if (tmpData[1] == "EVENING") return
            return result 
          }));
          
        console.log(data.filter(Boolean))
    }
}

module.exports = scraperObject;