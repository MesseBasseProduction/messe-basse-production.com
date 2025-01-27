const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');

module.exports = (routes, callback) => {
  console.log(`${(new Date()).toISOString()} | messe-basse-production.com v${global['version']} | SiteMapGenerator summoned`);
  const xmlFolderPath = path.join(__dirname, '../../../assets/xml');
  // First create xml folder if not already exists
  if (!fs.existsSync(xmlFolderPath)) {
    console.log(`${(new Date()).toISOString()} | messe-basse-production.com v${global['version']} |   Creating folder assets/xml/`);
    fs.mkdirSync(xmlFolderPath);
  }
  // Then flush any of its previous content
  console.log(`${(new Date()).toISOString()} | messe-basse-production.com v${global['version']} |   Flushing any files previously in assets/xml/`);
  fsExtra.emptyDirSync(xmlFolderPath);
  // Create sitemap xml content and fill it with app urls
  console.log(`${(new Date()).toISOString()} | messe-basse-production.com v${global['version']} |   Parse website routes and build XML content with it`);
  let outputContentXML = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;
  const lastModified = (new Date()).toISOString();
  for (let i = 0; i < routes.length; ++i) {
    for (let j = 0; j < routes[i].stack.length; ++j) {
      if (routes[i].stack[j].route && routes[i].stack[j].route.path) {
        let priority = (routes[i].stack[j].route.path === '/') ? '1.00' : '0.80';
        outputContentXML += `
  <url>
    <loc>${global['url']}${routes[i].stack[j].route.path}</loc>
    <lastmod>${lastModified}</lastmod>
    <priority>${priority}</priority>
  </url>`;
      }
    }
  }
  //  console.log(routes);
  outputContentXML += `
</urlset>
`;
  // Write content into file
  console.log(`${(new Date()).toISOString()} | messe-basse-production.com v${global['version']} |   Write all website routes into XML file`);
  fs.writeFile(`${xmlFolderPath}/sitemap.xml`, outputContentXML, err => {
    if (err) {
      console.error(`${(new Date()).toISOString()} | messe-basse-production.com v${global['version']} |   Couldn't save routes into XML files`, err);
    } else {
      console.log(`${(new Date()).toISOString()} | messe-basse-production.com v${global['version']} |   Sitemap successfully created`);
    }
    callback();
  });
};
