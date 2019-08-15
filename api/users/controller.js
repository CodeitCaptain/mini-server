
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const users = db.get('users')
const {generateToken, decodeToken} = require('../../token')

db.defaults({users: []}).write()

exports.login = async (req, res) => {
  const user = users.find(u => u.email === req.body.email).value()
  const isAvailable = user && user.pwd == req.body.pwd
  if(isAvailable) {
    const tokenData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }
    const token = await generateToken(tokenData)
    console.log("token", token)
    res.cookie('user', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 })
    res.json({
      token: token,
      user: user
    })
  } else {
    res.status(500).send({msg: '로그인에 실패했습니다.'})
  }
};

exports.register = async (req, res) => {
  const newUser = {
    id: db.get("newUserId").value(),
    name: req.body.name,
    email: req.body.email,
    pwd: req.body.pwd,
    role: "user",
    darkTheme: false
  }
  const isDuplicated = users.find(u => u.email == req.body.email).value()
  if(isDuplicated){
    res.status(500).send('duplicated email')
  } else {
    const tokenData = {
      id: db.get("newUserId").value(),
      name: req.body.name,
      email: req.body.email,
      role: "user"
    }
    const token = await generateToken(tokenData)
    console.log('token', token)
    await users.push(newUser).write()
    await db.update('newUserId', n => n + 1).write()
    res.cookie('user', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 })
    res.json({
      token: token,
      user: newUser
    })
  }
};

exports.logout = (req, res) => {
  console.log('logout')
  res.cookie('user', "", { httpOnly: true, maxAge: 0 })
  return res.json('')
}

exports.fetch = async (req, res) => {
  const token = req.cookies.user
  console.log("check token", token)
  if(token){
    const tokenData = await decodeToken(token)
    const user = await users.find(u => u.id == tokenData.id).value()
    return res.json({
      id: tokenData.id,
      email: tokenData.email,
      name: tokenData.name,
      role: tokenData.role,
      darkTheme: user.darkTheme,
    })
  }
}

exports.theme = async (req, res) => {
  const user = await users.find(u => u.id == req.params.id)
  await user.assign({darkTheme: !user.value().darkTheme}).write()
  return res.json()
}