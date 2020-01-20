# Node Scraper

1. Scraper was built originally to scrap blog post from a given site
2. The functions directory holds specific webiste DOM traversal functions, site url's
3. Generic `for loop` was used because of the problems with `async/await` in `forEach` implementations
4. Add your write file to the directory
5. Add your specific DOM traversal for the website to be scraped.
6. Require you traversal file, making sure your file exports the site_url, write file name, urls and the traversal function.
7. Run `node scraper.js` in the working directory.
