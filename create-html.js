#!/usr/bin/env node
const homedir = require('os').homedir()
const config = require('./config.json')
const fs = require('fs')
const path = require('path')

try {
  fs.accessSync(path.join(homedir, '.logbook-config.json'), fs.constants.F_OK);
  const fileContents = fs.readFileSync(path.join(homedir, '.logbook-config.json'), 'utf8')
  const homeConfig = JSON.parse(fileContents)
  config.file = homeConfig.file
} catch (err) {
}

const jsonFile = fs.readFileSync(config.file, 'utf8')
const json = JSON.parse(jsonFile)

// TODO: sort json by date, reverse (newest first)

let html = `
<html>
  <head>
    <title>My LogBook - ${config.myName}</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" crossorigin="anonymous">
    <style>
      .project {color: purple;}
      .task {color: blue;}
      .tag {color: red;}
    </style>
  </head>
  <body>
    <div class="container">
      <h1>My LogBook - ${config.myName}</h1>
      <a href="${config.file}">JSON</a>
      <div class="my-xs"></div>
`

for (const [day, entries] of Object.entries(json)) {
  html += `<h2>${day}</h2>`

  for (let index = 0; index < entries.length; index++) {
    const element = entries[index]
    let entry = element.raw

    entry = entry.replace(/@\S+/g, '<span class="project">$&</span>')
    entry = entry.replace(/\+\S+/g, '<span class="task">$&</span>')
    entry = entry.replace(/#\S+/g, '<span class="tag">$&</span>')

    html += `<p><strong>${element.time}:</strong> ${entry}</p>`
  }

  html += '<hr/>'
}


html += `
    </div>
  </body>
</html>
`
fs.writeFileSync(config.results, html)


/* JSON

{
  "DD.M.YYYY": [
    {
      tags:
      projects:
      tasks:
      raw:
      time:
    }
  ]
}

*/