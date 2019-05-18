
const controller = {};

controller.index = (req, res) =>{
    req.getConnection((err, conn) =>{
        conn.query('SELECT * FROM cliente', (err, clientes) => {
            if(err){
                console.log(err);                
            }  
            res.render('cliente/index', {
                data: clientes,
            });
        });
    });
}

controller.create = (req, res) =>{    
    res.render('cliente/create', {});        
}

controller.save = (req, res) =>{
    req.body.codigo = Math.floor(Math.random() * 65536);
    var data = req.body;
    req.getConnection((err, conn) =>{
        conn.query('INSERT INTO cliente SET ?',[data], (err, autores) => {
            if(err){
                console.log(err);                
            }
            req.flash({
                type: 'info',
                message: 'Cliente cadastrado com sucesso.',
                redirect: '/cliente'
            }); 
        });
    });
}

controller.edit = (req, res) =>{
    req.getConnection((err, conn) =>{
        var id = req.params.idcliente;                
        conn.query('SELECT * FROM cliente WHERE idcliente = ?',[id], (err, cliente) => {
            if(err){
                console.log(err);                
            }                          
                                    
            res.render('cliente/update', {
                data: cliente[0],
            });                        
        });
    });
}

controller.update = (req, res) =>{    
    var id = req.params.idcliente;
    var data = req.body;

    req.getConnection((err, conn) =>{
        conn.query('UPDATE cliente SET ? WHERE idcliente = ?',[data, id], (err, autores) => {
            if(err){
                console.log(err);                
            }            
            req.flash({
                type: 'info',
                message: 'Cliente removido com sucesso.',
                redirect: '/cliente'
            });   
        });
    });
}

controller.delete = (req, res) =>{    
    var id = req.params.idcliente;

    req.getConnection((err, conn) =>{
        conn.query('DELETE FROM cliente WHERE idcliente = ?',[id], (err, clientes) => {
            if(err){
                console.log(err);                
            } 
            req.flash({
                type: 'info',
                message: 'Auto removido com sucesso.',
                redirect: '/cliente'
            });                    
        });
    });
}

module.exports = controller;