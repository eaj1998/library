
const controller = {};

controller.index = (req, res) =>{
    req.getConnection((err, conn) =>{
        conn.query('SELECT * FROM livro INNER JOIN autor ON livro.idautor = autor.idautor', (err, livros) => {
                console.log(livros);                
            if(err){
                console.log(err);                
            }  
            res.render('livro/index', {
                data: livros,
            });
        });
    });
}

controller.create = (req, res) =>{
    req.getConnection((err, conn) => {
        conn.query('SELECT *  FROM autor', (err, autores)=>{
            if(err) console.log(err);            
            
            res.render('livro/create', {
                data: autores,
            });        
        });
    });     
}

controller.save = (req, res) =>{
    var data = req.body;
    console.log(data);
    
    req.getConnection((err, conn) =>{
        conn.query('INSERT INTO livro SET ?',[data], (err, livros) => {
            if(err){
                console.log(err);                
            }
            res.redirect('/livro');
        });
    });
}

controller.edit = (req, res) =>{
    req.getConnection((err, conn) =>{
        var id = req.params.idlivro;               
        conn.query('SELECT * FROM livro WHERE idlivro = ?',[id], (err, livro) => {
            conn.query('SELECT * FROM autor', (err, autores) => {
                if(err) console.log(err);      
                console.log(autores);                                      
                res.render('livro/update', {
                    data: livro[0],  
                    data_autores: autores,              
                });                        
            });                                                            
        });
    });
}

controller.update = (req, res) =>{    
    var id = req.params.idlivro;
    var data = req.body;

    req.getConnection((err, conn) =>{
        conn.query('UPDATE livro SET ? WHERE idlivro = ?',[data, id], (err, livros) => {
            if(err){
                console.log(err);                
            }            
            res.redirect('/livro');
        });
    });
}

controller.delete = (req, res) =>{    
    var id = req.params.idlivro;

    req.getConnection((err, conn) =>{
        conn.query('DELETE FROM livro WHERE idlivro = ?',[id], (err, livros) => {
            if(err){
                console.log(err);                
            } 
            req.flash({
                type: 'info',
                message: 'Livro removido com sucesso.',
                redirect: '/livro'
            });                    
        });
    });
}

module.exports = controller;