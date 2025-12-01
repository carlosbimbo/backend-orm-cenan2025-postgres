/** @format */

const jwt = require("jsonwebtoken");
//const User = require("../models/User");
const authController = require("../controllers/authController");
const { StatusMessage } = require("../utils/statusMessage");
const userService = require("../services/user.service");

/** Middleware to verify JWT token */
exports.verifyToken = async (req, res, next) => {
  	/* 	#swagger.tags = ['AUTH']
        #swagger.description = 'Endpoint to signin a specific user' */
  const token = req.headers.authorization;
  console.log('mira este tokenn');
  console.log(token);
  
  if (token == null || token == undefined || token == "") {
    return res.status(401).json({ error: StatusMessage.UNAUTHORIZED });
  }

  const authorizationArray = token.split(" ");

  if (authorizationArray.length == 2 && authorizationArray[0] == "Bearer") {
    const result = await verifyBearerToken(authorizationArray[1], req);
    console.log(result);

    if (result == StatusMessage.UNAUTHORIZED) {
      return res.status(401).json({ error: StatusMessage.UNAUTHORIZED });
    } else if (result == StatusMessage.SUCCESS) {
      await this.isAuthenticated(req, res, next);
    }
    /** isAuthenticated function here is required to validate incase if access token is malformed. */
  } else if (authorizationArray[0] == "Basic") {
    const userCredentials = atob(authorizationArray[1]).split(":");
    const username = userCredentials[0];
    const password = userCredentials[1];
    const response = await authController.simpleUserauthentication(username, password);
    if (response) {
      next();
    } else {
      res.status(401).json({ error: StatusMessage.UNAUTHORIZED });
    }
  }

  console.log('mira est termine');

};

const verifyBearerToken = async (token, req) => {
  if (!token) {
    return StatusMessage.UNAUTHORIZED;
  }

  await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return StatusMessage.UNAUTHORIZED;
    }
    req.userid = decoded.userid;                  
    req.accessToken = token;
  });

  return StatusMessage.SUCCESS;
};

/** Middleware to check if a user is authenticated */
exports.isAuthenticated = async (req, res, next) => {
  try {
    console.log('Es isAuthenticated mira esto JIJI');
    //console.log(req);

    console.log('mIRA isAuthenticated ES VALOR JUJUJU : ' + req.userid);

    //const user = await User.findById(req.userId);
    const user = await userService.findUserById(req.userid);    
    if (!user) {
      return res.status(401).json({ error: StatusMessage.UNAUTHORIZED });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: StatusMessage.INTERNAL_SERVER_ERROR });
  }
};

//Give me a documentaion for below function along with params
