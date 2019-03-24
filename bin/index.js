#!/usr/bin/env node

const Fs = require('fs')
const chalk = require('chalk')
const slugify = require('slugify')
const program = require('commander')
const CreateFolder = require('mkdirp')
const GE = require('@adonisjs/generic-exceptions')
const {
  getConfig,
  getSupportedEngines,
  getEnginesExtensionsMap
} = require('../src/helpers')

const config = getConfig()

program
  .command('generate')
  .alias('g')
  .arguments('<name>')
  .description('Helpful command to rapidly generate email templates.')
  .action(name => {
    const cwd = process.cwd()
    const { views, viewEngine } = config

    if (!views || !viewEngine) {
      throw GE.RuntimeException.missingConfig(
        `Make sure to define views and viewEngine inside configuration file.`
      )
    }

    if (!getSupportedEngines().includes(viewEngine)) {
      throw GE.RuntimeException.missingConfig(
        `The view engine defined in configuration file is not supported.`
      )
    }

    name = slugify(name)

    if (Fs.existsSync(`${cwd}/${views}/${name}`)) {
      return console.log(`
      ❌   ${chalk.red('Mail directory already exists.')}
      `)
    }

    CreateFolder.sync(`${cwd}/${views}/${name}`)

    const extension = getEnginesExtensionsMap()[viewEngine]

    Fs.writeFileSync(`${cwd}/${views}/${name}/${name}.html.${extension}`, '')
    Fs.writeFileSync(`${cwd}/${views}/${name}/${name}.text.${extension}`, '')
    Fs.writeFileSync(`${cwd}/${views}/${name}/${name}.watchHtml.${extension}`, '')

    console.log(`
    ✅   ${chalk.green('Mail generated successfully.')}
    `)
  })

program.parse(process.argv)
