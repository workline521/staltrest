module.exports = {
  imports: / *?import +'?"?(.*?)'?"? *?;/gmi,
  repeats: / *?repeat +(\d\d?) +times:([\s\S]*?)end;/gmi,
  aliases: /(src|href|data-src|data-bg|srcset|poster)="(.*?)"/gmi,
}
