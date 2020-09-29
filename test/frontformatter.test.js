const transform = require('../frontformatter')
const fs = require('fs')

jest.mock('fs')

test('transform markdown with yaml', () => {
  const mdWithYml = `---
test: "true"
remove: me
---

Hello World!
`

  const expected = `---
test: "true"
add: this
---

Hello World!
`

  fs.readdirSync = jest
    .fn()
    .mockReturnValue(['.DS_Store', 'file.json', 'script.js', 'test.md'])
  fs.readFileSync = jest.fn().mockReturnValue(mdWithYml)
  jest.spyOn(fs, 'writeFileSync')

  const newProps = { add: 'this' }
  const removeProps = ['remove']

  transform('src', newProps, removeProps)
  expect(fs.writeFileSync.mock.calls[0][0]).toEqual('out/test.md')
  expect(fs.writeFileSync).toHaveBeenCalledWith('out/test.md', expected)
})

test('transform markdown with toml', () => {
  const mdWithYml = `+++
test = "true"
remove = "me"
+++

Hello World!
`

  const expected = `---
test: "true"
remove: me
---

Hello World!
`

  fs.readdirSync = jest.fn().mockReturnValue(['test.md'])
  fs.readFileSync = jest.fn().mockReturnValue(mdWithYml)
  jest.spyOn(fs, 'writeFileSync')

  const newProps = {}
  const removeProps = []

  transform('src', newProps, removeProps)

  expect(fs.writeFileSync).toHaveBeenCalledWith('out/test.md', expected)
})
