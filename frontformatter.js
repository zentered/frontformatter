const fs = require('fs')
const matter = require('gray-matter')
const toml = require('toml')
const { join } = require('path')
const prettier = require('prettier')
const markdownlint = require('markdownlint')

module.exports = exports = transform

function transform(path, addProps, removeProps, markdownOptions) {
  const linterErrors = {}

  fs.readdirSync(join(process.cwd(), path))
    .filter((f) => f.endsWith('.md'))
    .forEach((file) => {
      const raw = fs.readFileSync(`${path}/${file}`, 'utf8')
      let options = {}
      if (raw.startsWith('+++')) {
        options = {
          delimiters: '+++',
          language: 'toml',
          engines: {
            toml: toml.parse.bind(toml)
          }
        }
      }
      const fm = matter(raw, options)

      removeProps.forEach((prop) => {
        delete fm.data[prop]
      })

      const preFormat = fm.stringify(addProps, {
        language: 'yaml'
      })

      const postFormat = prettier.format(preFormat, {
        printWidth: 80,
        proseWrap: 'always',
        parser: 'markdown'
      })

      if (markdownOptions) {
        markdownOptions.strings = {
          content: postFormat
        }
        const linterResults = markdownlint.sync(markdownOptions)
        linterErrors[file] = linterResults
      }
      fs.writeFileSync(`out/${file}`, postFormat)
    })

  if (markdownOptions) {
    fs.writeFileSync(`src/errors.json`, JSON.stringify(linterErrors, null, 2))
  }
}
