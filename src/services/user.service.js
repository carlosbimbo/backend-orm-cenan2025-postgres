const db = require("../config/db");

const getAll = async () => {
  return await db.Person.findAll();
};

const findPersonById = async (id) => {
  return await db.Person.findByPk(id);
};

//aaa
const createPerson = async ({ Name, Email }) => {
  const newPerson = await db.Person.create({ Name, Email });
  return newPerson;
};

const updatePerson = async ({ Id, Name, Email }) => {
  await db.Person.update(
    { Name, Email },
    {
      where: {
        Id: Id,
      },
    }
  );
  return { Id, Name, Email };
};

const deletePerson = async (Id) => {              
  await db.Person.destroy({
    where: { Id: Id },
  });
};

const findPersonByName = async (username) => {
  console.log('username : ' + username )
  return await db.Person.findOne({
    where: {
      username: username,
    }
  });
};

const findPersonByUserandPassword = async (username,password) => {
  console.log('username : ' + username + ' - password : ' + password )
  return await db.Person.findOne({
    where: {
      username: username,
      password: password,
    }
  });
};

const execquery = async () => {
  //const newPerson = await db.sequelize.query("SELECT * FROM Person", { type: QueryTypes.SELECT });
  //return newPerson[0];
  //return await db.sequelize.query("SELECT * FROM Person", { type: QueryTypes.SELECT });

  //salioo 03022024
  //const newPerson = await db.sequelize.query("SELECT * FROM Person where Id = $Id", { bind: { Id: 3 },type: db.sequelize.QueryTypes.SELECT });
  //return newPerson;

  const newPerson = await db.sequelize.query("exec SP_AUTH_LOGIN_USER_01 $Id,$name ", { bind: { Id: 3,name: 'Wilder Chaveta22' },type: db.sequelize.QueryTypes.SELECT });
  return newPerson;

};

module.exports = {
  getAll,
  findPersonById,
  createPerson,
  updatePerson,
  deletePerson,
  findPersonByName,
  findPersonByUserandPassword,
  execquery,
};