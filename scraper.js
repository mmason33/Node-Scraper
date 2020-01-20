const fetch = require('node-fetch');
const cheerio = require('cheerio');
const jsonFile = require('jsonfile');
const colors = require('colors');
const fs = require('fs');
const bulldogScraper = require('./functions/bulldog');

console.log(`
▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄
▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀█░▌
▐░▌          ▐░▌          ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌       ▐░▌▐░▌          ▐░▌       ▐░▌
▐░█▄▄▄▄▄▄▄▄▄ ▐░▌          ▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄█░▌
▐░░░░░░░░░░░▌▐░▌          ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
 ▀▀▀▀▀▀▀▀▀█░▌▐░▌          ▐░█▀▀▀▀█░█▀▀ ▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀█░█▀▀
          ▐░▌▐░▌          ▐░▌     ▐░▌  ▐░▌       ▐░▌▐░▌          ▐░▌          ▐░▌     ▐░▌
 ▄▄▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄▄▄ ▐░▌      ▐░▌ ▐░▌       ▐░▌▐░▌          ▐░█▄▄▄▄▄▄▄▄▄ ▐░▌      ▐░▌
▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░▌       ▐░▌▐░▌          ▐░░░░░░░░░░░▌▐░▌       ▐░▌
 ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀         ▀  ▀         ▀  ▀            ▀▀▀▀▀▀▀▀▀▀▀  ▀         ▀
`);

/**
 * @function delay - A Promise based solution to delay an iteration of a for loop
 * @param {number} time - Time in MS to delay
 * @param {number} i - The iteration of the loop
 * @returns {Promise}
 */
function delay(time, i) {
     return new Promise((resolve, reject) => {
         setTimeout(() => {
            resolve(i)
         }, time);
     })
};

/**
 * @function scrap - Scrap content from given urls
 * @param {object} - A require module.exports from a given implementation for a specific website
 * @returns void
 */
async function scrap({site_url, file, traverse, urls}) {

    fs.truncate(file, 0, () => {
        console.log(`${site_url.magenta.bold} 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥`)
        console.log('============================================================================');
        console.log(`Deleted ${file} 🔥🔥🔥`.magenta);
        console.log('============================================================================');
    });

    for (let i = 0; i < urls.length; i++) {
        if (urls[i].indexOf('/blog/filter/') !== -1) continue;
        if (urls[i].indexOf('/blog/principle/') !== -1) continue;
        await delay(100);
        let contentArray = [];
        const url = urls[i];
        const slug = url.replace(site_url, '');
        const request = await fetch(url);
        const response = await request.text();
        const timer = String(request.status).red.bold + ' Wrote '.cyan + slug.green.bold + ' 👍👌🎆 ';

        // Bail if status code isn't correct
        if (!(request.status >= 200 && request.status < 400)) return false;

        // Init cheerio
        let $ = cheerio.load(response);

        // Start timer
        console.time(timer);

        // Run dom traversal function
        contentArray.push(traverse($));

        // Write JSON
        jsonFile.writeFileSync(file, contentArray);

        // End Timer
        console.timeEnd(timer);
        console.log('============================================================================');
    }
}

scrap(bulldogScraper);