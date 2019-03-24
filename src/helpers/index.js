module.exports = {
  /**
   * Get extendtions map for all engines
   * supported.
   *
   * @return {Object}
   *
   */
  getEnginesExtensionsMap: () => ({
    edge: 'edge',
    handlebars: 'hbs'
  }),

  /**
   * Get all supported engines by package.
   *
   * @return {Array[String]}
   *
   */
  getSupportedEngines: () => ['handlebars', 'edge'],

  /**
   * Get the configuration file for package. Checks to see
   * if a custom file was defined in environment.
   *
   * @return {String}
   *
   */
  getConfig: () =>
    require(`${process.cwd()}/${process.env.MAIL_CONFIG_FILE_PATH ||
      'mail.config.js'}`)
}
