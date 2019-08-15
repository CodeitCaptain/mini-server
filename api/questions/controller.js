const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const questions = db.get('questions')

db.defaults({questions: []}).write()

exports.index = (req, res) => {
  return res.json(questions.value())
};

exports.show = (req, res) => {
  const questionId = req.params.id
  const question = questions.find(q => {
    return q.id == questionId
  }).value()
  return res.json(question)
};

exports.create = async (req, res) => {
  try{
    const newQuestion = {
      id: db.get("newQuestionId").value(),
      title: req.body.title,
      content: req.body.content
    }
    await questions.push(newQuestion).write()
    await db.update('newQuestionId', n => n + 1).write()
    return res.json(newQuestion)
  } 
  catch(err){
    return res.throw(err.status, err)
  }
}

exports.update = async (req, res) => {
  try{
    const editedQuestion = {
      id: Number(req.params.id),
      title: req.body.title,
      content: req.body.content
    }
    const targetQuestion = await questions.find(q => q.id == req.params.id)
    await targetQuestion.assign(editedQuestion).write()
    return res.json(editedQuestion)
  } 
  catch(err){
    return res.throw(err.status, err)
  }
}

exports.destroy = async (req, res) => {
  try{
    const targetQuestion = await questions.find(q => q.id == req.params.id)
    await questions.remove(q => q.id == req.params.id).write()
    return res.json()
  } 
  catch(err){
    return err
  }
}