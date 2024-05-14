const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactController')
const validateToken = require('../middleware/validateTokenHandler')

router.use(validateToken)
router.get('/',contactController.getContact).post('/',contactController.createContact)

router.get('/:id',contactController.getOneContact).put('/:id',contactController.updateContact).delete('/:id',contactController.deleteContact)

module.exports = router