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
    res.render('../views/autor/create', {});        
}

controller.save = (req, res) =>{
    var data = req.body;

    req.getConnection((err, conn) =>{
        conn.query('INSERT INTO autor SET ?',[data], (err, autores) => {
            if(err){
                console.log(err);                
            }
            res.redirect('/autor');
        });
    });
}

controller.edit = (req, res) =>{
    req.getConnection((err, conn) =>{
        var id = req.params.idautor;                
        conn.query('SELECT * FROM autor WHERE idautor = ?',[id], (err, autor) => {
            if(err){
                console.log(err);                
            }              
            console.log(autor);
                                    
            res.render('../views/autor/update', {
                data: autor[0],
            });                        
        });
    });
}

controller.update = (req, res) =>{    
    var id = req.params.idautor;
    var data = req.body;

    req.getConnection((err, conn) =>{
        conn.query('UPDATE autor SET ? WHERE idautor = ?',[data, id], (err, autores) => {
            if(err){
                console.log(err);                
            }            
            res.redirect('/autor');
        });
    });
}

controller.delete = (req, res) =>{    
    var id = req.params.idautor;    

    req.getConnection((err, conn) =>{
        conn.query('DELETE FROM autor WHERE idautor = ?',[id], (err, autores) => {
            if(err){
                console.log(err);                
            }            
            res.redirect('/autor');
        });
    });
}

module.exports = controller;