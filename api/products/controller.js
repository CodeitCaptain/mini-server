const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const products = db.get('products')

exports.index = (req, res) => {
  return res.json(products.value())
};

exports.show = (req, res) => {
  const productId = req.params.id
  const product = products.find(c => {
    return c.id == productId
  }).value()
  return res.json(product)
};