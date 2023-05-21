/** imports */
const express         = require("express"),
  path                = require("path"),
  fs                  = require("fs"),
  livereload          = require("livereload"),
  connectLivereload   = require("connect-livereload");

/** locals */
const server          = express(),
  hostname            = "localhost",
  port                = process.env.PORT || 8080,
  publicLocation      = express.static(path.join(__dirname, "./public")),
  entryTemplate       = path.join(__dirname, "./src/index.ejs");

/**
 * @description hardcoded route table. See below catch all endpoint
 * for further details on why this is done.
 */
let sectionTemplates = [
  { name: "Layout",         path: "/layout" },
  { name: "Flexbox",        path: "/flexbox" },
  { name: "Grid",           path: "/grid" },
  { name: "Spacing",        path: "/spacing" },
  { name: "Sizing",         path: "/sizing" },
  { name: "Typography",     path: "/typography" },
  { name: "Background",     path: "/background" },
  { name: "Border",         path: "/border" },
  { name: "Effects",        path: "/effects" },
  { name: "Filters",        path: "/filters" },
  { name: "Tables",         path: "/tables" },
  { name: "Transitions",    path: "/transitions" },
  { name: "Transforms",     path: "/transforms" },
  { name: "Interactivity",  path: "/interactivity" },
  { name: "SVG",            path: "/svg" }
].map(x => ({...x, sections: []}));

/**
 * @description a very dummy scanning and in-memory cache
 * of locations of templates to be passed to .ejs render
 * functions when including markup on the page being served.
 */
const scan = (location) => {
  const result = [];
  const sectionTemplatesPath = path.join(
    __dirname,
    "./src/sections",
    location.path
  );
  console.log("Scanning for sections: ", sectionTemplatesPath);

  fs.readdir(sectionTemplatesPath, function (err, files) {
    if (err) {
      return console.log("Unable to scan section templates: " + err);
    }

    files.forEach((x) => {
      const [name, ext] = x.split(/\.([^.]+)$/);

      if (ext === "ejs") {
        result.push(name);
      }
    });

    console.log(`${result.length} sections added.`);
    location.sections = [...result];
  });
};

const getSectionTemplates = () => {
  sectionTemplates.forEach((x) => scan(x));
};

getSectionTemplates();

if (process.env.NODE_ENV === "development") {
  console.log("Setting up live reload server...");

  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch([
    path.join(__dirname, "src/index.ejs"),
    path.join(__dirname, "src/sections"),
    path.join(__dirname, "public/index.css"),
  ]);
  liveReloadServer.server.once("connection", () => {
    getSectionTemplates();
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });

  server.use(connectLivereload());
}

/**
 * @description a pretty hacky solution for template resolution based
 * on hardcoded route table from above. This can optimized/rewritten in 
 * many different ways and is not the subject of this demo anyhow.
 */
server.get("/*", function (req, res, next) {
  if (req.url === "/") {
    console.log('route home')
    res.render(entryTemplate, { sections: sectionTemplates, current: null });
  } else {
    let route = undefined
    
    sectionTemplates.forEach(x => {
      x.sections.forEach(s => {
       if (`${x.path}/${s}` === req.url) {
        route = `${x.path}/${s}`
       }
      })
    });

    if (route) {
      res.render(entryTemplate, { sections: sectionTemplates, current: route });
    } else {
      return next();
    }
  }
});

server.use(publicLocation);

server.listen(port, () => {
  console.log("Service started successfully...");
  const url = `http://${hostname}:${port}`;
  console.log(`Browser session started at ${url}`);
});
