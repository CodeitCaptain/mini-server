const express = require('express');
const router = express.Router();
const controller = require('./controller');

//GET
// router.get('/:id', controller.show);
router.get('/logout', controller.logout);
router.get('/fetch', controller.fetch);

// //POST
// router.post('/', controller.create);
router.post('/login', controller.login);
router.post('/register', controller.register);

// //PATCH
// router.patch('/:id', controller.update);
router.patch('/:id/theme', controller.theme);

// //DELETE
// router.delete('/:id', controller.destroy)

module.exports = router;