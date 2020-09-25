const fs = require('fs')
const matter = require('gray-matter')
const toml = require('toml')
const { join } = require('path')

module.exports = exports = transform

function transform(path, addProps, removeProps) {
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

      fs.writeFileSync(
        `out/${file}`,
        fm.stringify(addProps, {
          language: 'yaml'
        })
      )
    })
}
