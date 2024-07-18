const processRepeat = require('./process-repeat')
const processAliases = require('./process-aliases')
const processImports = require('./process-imports')
const tests = require('./helpers')

module.exports = function htmlLoaderPipeline(content, loaderContext) {
  let result = content

  if (tests.imports.test(result)) {
    result = result.replace(tests.imports, processImports.bind(loaderContext))
  }
  if (tests.aliases.test(result)) {
    result = result.replace(tests.aliases, processAliases)
  }
  if (tests.repeats.test(result)) {
    result = result.replace(tests.repeats, processRepeat)
  }

  return result
}

