module.exports = function processAliases(match, attribute) {
  const attributesToMatch = [
    'href',
    'src',
    'data-src',
    'data-bg',
    'srcset',
    'poster',
  ]
  if (attributesToMatch.includes(attribute)) {
    match = match.replace(/(src|href|data-src|data-bg|srcset|poster)="src/gmi, attribute + '="../src')
  }
  return match
}
