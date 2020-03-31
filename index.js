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

let entry = process.argv[2]
let e = {}

e.raw = entry
e.projects = arrayReplace(entry.match(/@\S+/g), '@', '')
e.tasks = arrayReplace(entry.match(/\+\S+/g), '+', '')
e.tags = arrayReplace(entry.match(/#\S+/g), '#', '')
e.time = new Date().toLocaleTimeString()

let json = {}
try {
  let jsonFile = fs.readFileSync(config.file, 'utf8')
  json = JSON.parse(jsonFile)
} catch (error) {
}

let day = new Date().toLocaleDateString()

if (!json[day]) {
  json[day] = []
}
json[day].push(e)

fs.writeFileSync(config.file, JSON.stringify(json, null, 2))

function arrayReplace (array, search, replace) {
  if (array === null) return []
  for (let index = 0; index < array.length; index++) {
    array[index] = array[index].replace(search, replace)  
  }
  return array
}