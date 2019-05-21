const controller = {};

controller.index = (req, res) =>{
    req.getConnection((err, conn) =>{
        conn.query('SELECT * FROM emprestimo INNER JOIN cliente ON emprestimo.idcliente = cliente.idcliente INNER JOIN livro ON emprestimo.idlivro = livro.idlivro', (err, emprestimos) => {                            
            if(err){
                console.log(err);
            }  
            console.log(emprestimos);
            
            res.render('emprestimo/index', {
                data: emprestimos,
            });
        });
    });
}

controller.create = (req, res) =>{
    req.getConnection((err, conn) => {
        conn.query('SELECT *  FROM cliente', (err, clientes)=>{
            conn.query('SELECT * FROM livro', (err, livros) =>{
                if(err) console.log(err);            
                res.render('emprestimo/create', {
                    data: clientes,
                    livros: livros,
                });        
            });
        });
    });     
}

controller.save = (req, res) =>{
    var data = req.body;
    console.log(data);
    
    var codigo = data.codigo;
    //console.log(data);
    
    req.getConnection((err, conn) =>{
        conn.query('SELECT idcliente FROM cliente WHERE codigo = ?', [codigo], (err, cliente) => {
            console.log(cliente[0].idcliente);            
            if(!err){
                data.idcliente = cliente[0].idcliente;
                conn.query('INSERT INTO emprestimo SET ?',[data], (err, emprestimos) => {
                    if(err){
                        console.log(err);                
                    }
                    res.redirect('/emprestimo');
                });
            }
        });
    });
}

controller.devolucao = (req, res) =>{    
    var id = req.params.idemprestimo;    
    var campo = {entregue:1};
    console.log(id);

    req.getConnection((err, conn) =>{
        conn.query('UPDATE emprestimo SET ? WHERE idemprestimo = ?',[campo, id], (err, emprestimos) => {
            if(err){
                console.log(err);                
            }            
            res.redirect('/emprestimo');
        });
    });
}


module.exports = controller;