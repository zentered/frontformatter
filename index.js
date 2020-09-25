const frontformatter = require('./frontformatter')

const addProperties = {
  add: 'this'
}
const removeProperties = ['remove']

frontformatter('src', addProperties, removeProperties)
