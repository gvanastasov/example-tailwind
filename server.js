const express = require("express");
const path = require("path");
const fs = require("fs");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");

const server = express();
const hostname = "localhost";
const port = process.env.PORT || 8080;
const publicLocation = express.static(path.join(__dirname, "./public"));
const entryTemplate = path.join(__dirname, "./src/index.ejs");

let sectionTemplates = [
  {
    name: "Layout",
    path: "/layout",
  },
  {
    name: "Flexbox",
    path: "/flexbox",
  },
  {
    name: "Grid",
    path: "/grid",
  },
  {
    name: "Spacing",
    path: "/spacing",
  },
  {
    name: "Sizing",
    path: "/sizing",
  },
  {
    name: "Typography",
    path: "/typography",
  },
  {
    name: "Background",
    path: "/background",
  },
  {
    name: "Border",
    path: "/border",
  },
  {
    name: "Effects",
    path: "/effects"
  },
  {
    name: "Filters",
    path: "/filters"
  },
  {
    name: "Tables",
    path: "/tables"
  },
  {
    name: "Transitions",
    path: "/transitions"
  },
  {
    name: "Transforms",
    path: "/transforms"
  }
].map(x => ({...x, sections: []}));

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

server.get("/", function (_req, res) {
  res.render(entryTemplate, { sections: sectionTemplates });
});

server.use(publicLocation);

server.listen(port, () => {
  console.log("Service started successfully...");
  const url = `http://${hostname}:${port}`;
  console.log(`Browser session started at ${url}`);
});
