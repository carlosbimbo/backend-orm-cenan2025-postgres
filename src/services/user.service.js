const db = require("../config/db");

const getAll = async () => {
  return await db.User.findAll();
};

const findUserById = async (id) => {
  return await db.User.findByPk(id);
};

//aaa
const createUser = async ({ Name, Email }) => {
  const newUser = await db.User.create({ Name, Email });
  return newUser;
};

const updateUser = async ({ id, Name, Email }) => {
  await db.User.update(
    { Name, Email },
    {
      where: {
        id: id,
      },
    }
  );
  return { id, Name, Email };
};

const deleteUser = async (id) => {              
  await db.User.destroy({
    where: { id: id },
  });
};

const findUserByName = async (username) => {
  console.log('username : ' + username )
  return await db.User.findOne({
    where: {
      username: username,
    }
  });
};

const findUserByUserandPassword = async (username,password) => {
  console.log('username : ' + username + ' - password : ' + password )
  return await db.User.findOne({
    where: {
      username: username,
      password: password,
    }
  });
};

const execquery = async () => {
  //const newUser = await db.sequelize.query("SELECT * FROM User", { type: QueryTypes.SELECT });
  //return newUser[0];
  //return await db.sequelize.query("SELECT * FROM User", { type: QueryTypes.SELECT });

  //salioo 03022024
  //const newUser = await db.sequelize.query("SELECT * FROM User where Id = $Id", { bind: { Id: 3 },type: db.sequelize.QueryTypes.SELECT });
  //return newUser;

  const newUser = await db.sequelize.query("exec SP_AUTH_LOGIN_USER_01 $Id,$name ", { bind: { id: 3,name: 'Wilder Chaveta22' },type: db.sequelize.QueryTypes.SELECT });
  return newUser;

};

module.exports = {
  getAll,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
  findUserByName,
  findUserByUserandPassword,
  execquery,
};