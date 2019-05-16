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
router.get('/autor/create', autorController.create);
router.get('/autor/update/:id', autorController.update);


module.exports = router;


