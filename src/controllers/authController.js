/** @format */
const usuarioService = require("../services/user.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { StatusMessage } = require("../utils/statusMessage");
const config = require("config");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const signup = async (req, res) => {
	/* 	#swagger.tags = ['AUTH']
        #swagger.description = 'Endpoint to signup a specific user' */
	console.log(req.body);
	const { /*fullname,*/ username, password/*, confirmPassword*/ } = req.body;
	//console.log(fullname);
	console.log(username);
	if (
		//fullname == null ||
		username == null ||
		password == null ||
		//confirmPassword == null ||
		//fullname.length === 0 ||
		username.length === 0 ||
		password.length === 0 /*||
		confirmPassword.length === 0*/
	) {
		return res.status(StatusCodes.NO_CONTENT).json({ message: StatusMessage.NO_CONTENT });
	}

	try {
		const user = await usuarioService.findUserByName(username);		
		if (user) {		
			res.status(201).json({ message: StatusMessage.SUCCESS });
		}else {
			res.status(401).json({ message: StatusMessage.INVALID_CREDENTIALS });
		}	
		
	} catch (error) {
		res.status(500).json({ error: StatusMessage.INTERNAL_SERVER_ERROR });
	}
};

const signin = async (req, res) => {
	//console.log('Hola Peru');
	console.log(req.body);
	/* 	#swagger.tags = ['AUTH']
        #swagger.description = 'Endpoint to signin a specific user' */
	const { username, password } = req.body;
	try {
		
		const response = await findUserWithPassword(username, password);
		await validateResponse(response, res);
	
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: StatusMessage.INTERNAL_SERVER_ERROR });
	}
};

const findUserWithPassword = async (username, password) => {
	
	const user = await usuarioService.findUserByUserandPassword(username,password);

	if (user) {
		return user;
	}
	return false;
	
};

const createUserapp = async (req, res) => {
	/* 	#swagger.tags = ['USUARIO']
	#swagger.description = 'Endpoint para crear un usuario de la app movil' */

	/* #swagger.security = [{
            "bearerAuth": []
    }] */

    try {
      var createdPerson = await usuarioService.createUser(req.body);
      //res.status(201).json(createdPerson);
      return res
				.status(StatusCodes.OK)
				.json({ status: ReasonPhrases.OK, message: StatusMessage.SUCCESS, data: { createdPerson } });

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: StatusMessage.INTERNAL_SERVER_ERROR });
    }

  };

  const udpUserapp = async (req, res) => {
	/* 	#swagger.tags = ['USUARIO']
	#swagger.description = 'Endpoint para actualizar los datos de un usuario de la app movil' */

/* #swagger.security = [{
	   "bearerAuth": []
}] */

try {
 var createdPerson = await usuarioService.updateUser(req.body);
 //res.status(201).json(createdPerson);
 return res
		   .status(StatusCodes.OK)
		   .json({ status: ReasonPhrases.OK, message: StatusMessage.SUCCESS, data: { createdPerson } });

} catch (error) {
 console.log(error);
 res.status(500).json({ error: StatusMessage.INTERNAL_SERVER_ERROR });
}

};

const saveOrupdUserapp = async (req, res) => {
	/* 	#swagger.tags = ['USUARIO']
	#swagger.description = 'Endpoint para crear o actualizar los datos de un usuario de la app movil' */

/* #swagger.security = [{
	   "bearerAuth": []
}] */

try {
 var createdPerson = await usuarioService.saveOrUpdateUser(req.body);
 //res.status(201).json(createdPerson);
 return res
		   .status(StatusCodes.OK)
		   .json({ status: ReasonPhrases.OK, message: StatusMessage.SUCCESS, data: { createdPerson } });

} catch (error) {
 console.log(error);
 res.status(500).json({ error: StatusMessage.INTERNAL_SERVER_ERROR });
}

};

const saveOrupdUserSync = async (req, res) => {
	/* 	#swagger.tags = ['USUARIO']
	#swagger.description = 'Endpoint para crear o actualizar los datos de los usuarios de la app movil' */

/* #swagger.security = [{
	   "bearerAuth": []
}] */

try {
 var createdUser = await usuarioService.saveOrUpdateUserArray(req.body);
 //res.status(201).json(createdUser);
 return res
		   .status(StatusCodes.OK)
		   .json({ status: ReasonPhrases.OK, message: StatusMessage.SUCCESS, data: { createdUser } });

} catch (error) {
 console.log(error);
 res.status(500).json({ error: StatusMessage.INTERNAL_SERVER_ERROR });
}

};

const setCookies = (res, token) => {
	// Set the token as a cookie
	res.cookie("accesstoken", token, {
		httpOnly: true,
		// Add other cookie options as needed
	});
};


const validateResponse = (result, res) => {

		const token = jwt.sign({ userid: result.id }, process.env.JWT_SECRET, {
		expiresIn: config.get("security.tokenexperiation"), 
		
	});

	console.log('Hola result.id : ' + result.id);
			if(result.id){
			setCookies(res, token);
			res.status(200).json({ message: StatusMessage.SUCCESS, token });
			}else{
				return res.status(401).json({ error: StatusMessage.INVALID_CREDENTIALS });
			}
};


const simpleUserauthentication = async (username, password) => {
	
	const user = await usuarioService.findUserByUserandPassword(username,password);

	if (user) {
			return true;	
	}
	return false;
};


const verify = async (req, res) => {
	/* #swagger.ignore = true */
	const { token } = req.query;
	try {
		const decoded = await verifyToken(token);		
		res.json({ message: "Verification successful", user: decoded });
	} catch (error) {
		res.status(401).json({ error: "Invalid or expired token" });
	}
};

const getUserFullData = async (req, res) => {
	/* #swagger.tags = ['USUARIO']
	   #swagger.description = 'Endpoint para recuperar toda la información completa de un usuario por username y su importacion den el app movil' */
  	
	try {
		const { username } = req.body; // o req.body, según cómo lo envíes
	  console.log('getUserFullData datosall : ',username);	
	  const userData = await usuarioService.getUserDataByUsername(username);
  
	  if (!userData) {
		return res.status(404).json({ message: "Usuario no encontrado" });
	  }
  
	  return res.status(200).json(userData);
  
	} catch (error) {
	  console.error("❌ Error en getUserFullData:", error);
	  return res.status(500).json({
		message: "Error interno del servidor",
		error: error.message,
	  });
	}
  };

  const saveExpoPushToken = async (req, res) => {
	/* #swagger.tags = ['USUARIO']
	   #swagger.description = 'Endpoint para guardar el token para las notificaciones por usuario' */

	try {
	  const { userId, expoPushToken } = req.body;
  
	  const user = await usuarioService.updateExpoPushTokenById(userId, expoPushToken);
  
	  return res.status(200).json({
		message: "Token actualizado",
		user,
	  });
	} catch (error) {
	  return res.status(400).json({
		error: error.message,
	  });
	}
  };
  
  

module.exports = { signin, signup, simpleUserauthentication, findUserWithPassword, verify,createUserapp,udpUserapp,saveOrupdUserapp,getUserFullData,saveOrupdUserSync,saveExpoPushToken };
