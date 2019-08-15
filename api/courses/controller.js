const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const courses = db.get('courses')
const products = db.get('products')

exports.index = (req, res) => {
  return res.json(courses.value())
};

exports.show = (req, res) => {
  const courseId = req.params.id
  const course = courses.find(c => {
    return c.id == courseId
  }).value()
  return res.json(course)
};

exports.product = (req, res) => {
  const courseId = req.params.id
  const product = products.find(p => {
    return p.type == "Course" && p.status == "Published" && p.target_id == courseId
  }).value()
  return res.json(product)
}