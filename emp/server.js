//server.js
//////////////////////
//Config
//////////////////////
//Variables de recursos necesarias express y mongoose
var express 	= require('express');
var app 		= express();
var mongoose 	= require('mongoose');

// El modelo de datos escogido será un modelo genérico con un campo string que representará en este caso el nombre de un empleado
var Empleado = mongoose.model('Empleado', {
	text: String
});

// Parametros de conexión con la base de datos
mongoose.connect('mongodb://localhost:27017/angular-empleado');
app.configure(function() {	
	app.use(express.logger('dev'));						
	app.use(express.bodyParser());						
	app.use(express.methodOverride());
	app.use(express.static(__dirname + '/src'));		
					
});
//Escucha y ejecuta el servidor
app.listen(8080, function() {
	console.log('App listening on port 8080');
});

//////////////////////
//Métodos
//////////////////////

//GET
app.get('/api/empleados', function(req, res) {				
	Empleado.find(function(err, empleados) {
		//Si existe algun error, lo devolvemos
		if(err) {
			res.send(err);
		}
		//Devuelvo el valor usando json
		res.json(empleados);
	});
});
app.get('*', function(req, res) {						
	res.sendFile('./public/index.html');				
});
//POST
app.post('/api/empleados', function(req, res) {		
	//Creamos la isntancia correspondiente
	Empleado.create({
		text: req.body.text,
		done: false
	}, function(err, empleado){
		if(err) {
			res.send(err);
		}
	//Buscamos y devolvemos el objeto correspondiente
		Empleado.find(function(err, empleados) {
			if(err){
				res.send(err);
			}
			res.json(empleados);
		});
	});
});
//Delete
app.delete('/api/empleados/:empleado', function(req, res) {		
	Empleado.remove({
		_id: req.params.empleado
	}, function(err, empleado) {
		if(err){
			res.send(err);
		}

		Empleado.find(function(err, empleados) {
			if(err){
				res.send(err);
			}
			res.json(empleados);
		});

	})
});



