/*
 * @fullstackjs/mail
 *
 * (c) Kati Frantz <frantz@fullstackjs.online>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Fs = require('fs')
const Path = require('path')
const GE = require('@adonisjs/generic-exceptions')

/**
 * This class is the base for all render engines. Contains
 * helpful methods used in all the render engines.
 *
 * @class BaseRenderEngine
 * @constructor
 */
class BaseRenderEngine {
  /**
   * Initialize the base render engine.
   *
   * @return {Null}
   */
  constructor(config) {
    this.Config = config

    const supportedViewEngines = ['handlebars', 'edge']

    if (!supportedViewEngines.includes(this.Config.viewEngine)) {
      throw GE.RuntimeException.missingConfig(
        `The View engine to be used for sending mails is not defined.`
      )
    }

    this.enginesExtensionsMap = {
      edge: 'edge',
      handlebars: 'hbs'
    }
  }

  /**
   * This method gets the content of the view we want to render
   *
   * @param {String} path the name of the view
   * @return {any} content
   */
  _getContent(view) {
    const engine = this.Config.viewEngine

    return {
      html: Fs.readFileSync(
        this._getViewsPath(
          `${view}/${view}.html.${this.enginesExtensionsMap[engine]}`
        ),
        'utf8'
      ),
      text: Fs.readFileSync(
        this._getViewsPath(
          `${view}/${view}.text.${this.enginesExtensionsMap[engine]}`
        ),
        'utf8'
      ),
      watchHtml: Fs.readFileSync(
        this._getViewsPath(
          `${view}/${view}.watch-html.${this.enginesExtensionsMap[engine]}`
        ),
        'utf8'
      )
    }
  }

  /**
   * This method resolves the path to the where all mails are stored.
   * It uses the default which is a folder called mails.
   *
   * @param {String} view
   * @return
   */
  _getViewsPath(view) {
    const currentWorkingDirectory = process.cwd()

    return Path.resolve(
      currentWorkingDirectory,
      this.Config.views || 'mails',
      view
    )
  }
}

module.exports = BaseRenderEngine
