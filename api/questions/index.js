const express = require('express');
const router = express.Router();
const controller = require('./controller');

//GET
router.get('/', controller.index);
router.get('/:id', controller.show);

//POST
router.post('/', controller.create);

//PATCH
router.patch('/:id', controller.update);

//DELETE
router.delete('/:id', controller.destroy)

module.exports = router;