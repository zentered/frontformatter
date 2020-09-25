![Test](https://github.com/zentered/frontformatter/workflows/Test/badge.svg)
![Semantic Release](https://github.com/zentered/frontformatter/workflows/Semantic%20Release/badge.svg?branch=main)
[![view on npm](https://img.shields.io/npm/v/fluent-schema.svg)](https://www.npmjs.org/package/frontformatter)

# Front Formatter

If you work with [hugo](https://gohugo.io), [11ty](https://www.11ty.dev) or any other static site generator, you'll likely end up with a lot of Markdown files after a while.

This script helps to migrate, add or remove properties from Markdwon frontmatter.

## Usage

Specify a source folder or copy your markdown files into `src`. You can define properties to add and remove, then run the transformation function:

    const frontformatter = require('frontformatter')

    const addProperties = {
      add: 'this'
    }
    const removeProperties = ['remove']

    frontformatter('src', addProperties, removeProperties)

## Acknowledgments

Thanks to [Jon Schlinkert](https://github.com/jonschlinkert) for [gray-matter](https://github.com/jonschlinkert/gray-matter)

## Licence

Licensed under [MIT](./LICENSE).
