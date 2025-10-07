/** @format */
/*
const express = require("express");
const router = express.Router();
const personService = require("../services/person.service");
*/
const personService = require("../services/person.service");
const { StatusMessage } = require("../utils/statusMessage");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

exports.fetchPersonales = async (req, res) => {
	/* 	#swagger.tags = ['Personas']
        #swagger.description = 'Endpoint to fetch all Personas' */

	/* #swagger.security = [{
            "bearerAuth": []
    }] */
	try {
		/** implement authenticate before fetching the personas */
		const people = await personService.getAll();
		console.log(people);
		res.status(200).json(people);
	} catch (error) {
		res.status(500).json({ error: StatusMessage.INTERNAL_SERVER_ERROR });
	}
};

exports.createPersonal = async (req, res) => {
	/* 	#swagger.tags = ['Personal']
        #swagger.description = 'Endpoint to crear Personal by nombre de usuario' */

	/* #swagger.security = [{
            "bearerAuth": []
    }] */

    const { Name,Email,username,password } = req.body;
    try {
      var createdPerson = await personService.createPerson(req.body);
      //res.status(201).json(createdPerson);
      return res
				.status(StatusCodes.OK)
				.json({ status: ReasonPhrases.OK, message: StatusMessage.SUCCESS, data: { createdPerson } });

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: StatusMessage.INTERNAL_SERVER_ERROR });
    }

  };


/*
router.get("/", async (req, res) => {
  try {
    var people = await personService.getAll();
    res.json(people);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

router.post("/", async (req, res) => {
  try {
    var createdPerson = await personService.createPerson(req.body);
    res.status(201).json(createdPerson);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

router.get("/findid/:id", async (req, res) => {
  try {
    var person = await personService.findPersonById(req.params.id);
    if (!person) {
      return res
        .status(404)
        .json({ statusCode: 404, error: "Person Does not exist" });
    }
    return res.json(person);
  } catch (error) {
    return res
      .statusCode(500)
      .json({ statusCode: 500, error: "Something went wrong" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    var exisitingPerson = await personService.findPersonById(req.params.id);
    console.log(exisitingPerson);
    if (!exisitingPerson) {
      return res
        .status(404)
        .json({ statusCode: 404, error: "Person Does not exist" });
    }
    var updatedPerson = await personService.updatePerson(req.body);
    return res.json(updatedPerson);
  } catch (error) {
    return res
      .statusCode(500)
      .json({ statusCode: 500, error: "Something went wrong" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    var exisitingPerson = await personService.findPersonById(req.params.id);
    if (!exisitingPerson) {
      return res
        .status(404)
        .json({ statusCode: 404, error: "Person Does not exist" });
    }

    await personService.deletePerson(req.params.id);
    return res.json({
      statusCode: 200,
      message: `person with id: ${req.params.id} is deleted successfully`,
    });
  } catch (error) {
    return res
      .statusCode(500)
      .json({ statusCode: 500, error: "Something went wrong" });
  }
});

router.get("/querys", async (req, res) => {
  try {
    var people = await personService.execquery();
    //console.log('Hola papa!!');
    console.log(people);
    res.json(people);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
 
});

module.exports = router;
*/

// route functions