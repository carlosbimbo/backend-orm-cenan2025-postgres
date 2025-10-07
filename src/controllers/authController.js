/** @format */
const personService = require("../services/person.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { StatusMessage } = require("../utils/statusMessage");
const config = require("config");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const signup = async (req, res) => {
	/* 	#swagger.tags = ['Auth']
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
		const user = await personService.findPersonByName(username);		
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
	console.log('Hola Peru');
	console.log(req.body);
	/* 	#swagger.tags = ['Auth']
        #swagger.description = 'Endpoint to signin a specific user' */
	const { username, password } = req.body;
	try {
		
		const response = await findUserWithPassword(username, password);
		await validateResponse(response, res);
	
	} catch (error) {
		res.status(500).json({ error: StatusMessage.INTERNAL_SERVER_ERROR });
	}
};

const findUserWithPassword = async (username, password) => {
	
	const user = await personService.findPersonByUserandPassword(username,password);

	if (user) {
		return user;
	}
	return false;
	
};

const setCookies = (res, token) => {
	// Set the token as a cookie
	res.cookie("accesstoken", token, {
		httpOnly: true,
		// Add other cookie options as needed
	});
};


const validateResponse = (result, res) => {

		const token = jwt.sign({ userId: result.Id }, process.env.JWT_SECRET, {
		expiresIn: config.get("security.tokenexperiation"), 
		
	});

	console.log('Hola result.Id : ' + result.Id);
			if(result.Id){
			setCookies(res, token);
			res.status(200).json({ message: StatusMessage.SUCCESS, token });
			}else{
				return res.status(401).json({ error: StatusMessage.INVALID_CREDENTIALS });
			}
};


const simpleUserauthentication = async (username, password) => {
	
	const user = await personService.findPersonByUserandPassword(username,password);

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

module.exports = { signin, signup, simpleUserauthentication, findUserWithPassword, verify };
