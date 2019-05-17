const express = require('express');
const router = express.Router();

const autorController = require('../controllers/autorController');
const siteController = require('../controllers/siteController');

//Rotas Site
router.get('/', (req, res) =>{
    res.render('./layouts/index');
});

//Rotas Autor
router.get('/autor', autorController.index);
router.get('/autor/edit/:idautor', autorController.edit);
router.post('/autor/update/:idautor', autorController.update);
router.get('/autor/delete/:idautor', autorController.delete);
router.get('/autor/create', autorController.create);
router.post('/autor/save', autorController.save);


module.exports = router;


