const controller = {};

controller.index = (req, res) =>{
    req.getConnection((err, conn) =>{
        conn.query('SELECT * FROM autor', (err, autores) => {
            if(err){
                console.log(err);                
            }  
            res.render('../views/autor/index', {
                data: autores,
            });
        });
    });
}

controller.create = (req, res) =>{
    req.getConnection((err, conn) =>{
        conn.query('SELECT * FROM autor', (err, autores) => {
            if(err){
                console.log(err);                
            }  
            res.render('../views/autor/create', {
                data: autores,
            });
        });
    });
}

controller.update = (req, res) =>{
    req.getConnection((err, conn) =>{
        conn.query('SELECT * FROM autor', (err, autores) => {
            if(err){
                console.log(err);                
            }  
            res.render('../views/autor/update', {
                data: autores,
            });
        });
    });
}
module.exports = controller;