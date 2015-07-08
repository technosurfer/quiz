//GET login --crear formulario de login
exports.new=function(req,res){
	var errors=req.session.errors || {};
	req.session.errors={};

	res.render('sessions/new',{errors:errors});
};
 
//POST /login --crear sesion
exports.create=function(req,res){

	var login = req.body.login;
	var password = req.body.password;

	var userController = require('./user_controller');
	userController.autenticar(login,password,function(error,user){

		if (error){
			req.session.errors = [{"message": 'Se ha producido un error: '+error}];
			res.redirect("/login");
			return;	
		}

		req.session.user = {id:user.id,username:user.username};

		res.redirect(req.session.redir.toString());
	});
};

//DELETE /logout --destruir sesion
exports.destroy=function(req,res){
	delete req.session.user;
	res.redirect(req.session.redir.toString());
};