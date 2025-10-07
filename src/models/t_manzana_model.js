const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {  

    ID: { type: 'int', allowNull: false,primaryKey: true, },
    CODCCPP: { type: 'char(4)', allowNull: false,primaryKey: true, },
    ZONA_ID: { type: 'char(5)', allowNull: false,primaryKey: true, },
    MANZANA_ID: { type: 'varchar(4)', allowNull: false,primaryKey: true, },
    ESTADO: { type: 'int', allowNull: false },
    FOTO: { type: 'int', allowNull: true },
    CONGLOMERADO: { type: 'varchar(5)', allowNull: true },
    FRENTES_SISFOH: { type: 'int', allowNull: true },
    TOTAL_VIVIENDAS: { type: 'int', allowNull: true },
    TOTAL_VIVIENDAS_MARCO: { type: 'int', allowNull: true },
    TIPO: { type: 'int', allowNull: true },
    TOTAL_VIVIENDAS_GESTOR: { type: 'int', allowNull: true },                       
    PRE_ESTADO: { type: 'int', allowNull: true },
    OBSERVACION: { type: 'varchar(3000)', allowNull: true },
    REAJUSTADA: { type: 'int', allowNull: true },
    AGREGADA: { type: 'int', allowNull: true },
    ACTCART: { type: 'int', allowNull: true },
    CANT: { type: 'int', allowNull: true },
    USU_ID: { type: 'int', allowNull: true },
    COD_OPER: { type: 'char(3)', allowNull: true },
    TIPO_SEG: { type: 'int', allowNull: true },
    PERIODO: { type: 'int', allowNull: true },
    UBIGEO_C: { type: 'varchar(7)', allowNull: true },
    TOTALESTA: { type: 'int', allowNull: true },
    TOTCOM: { type: 'int', allowNull: true },
    TOTINCOM: { type: 'int', allowNull: true },
    TOTAUSE: { type: 'int', allowNull: true },
    TOTRECHA: { type: 'int', allowNull: true },
    TOTNOIVI: { type: 'int', allowNull: true },
    TOTOTRO: { type: 'int', allowNull: true },
    TOTESTCONC: { type: 'int', allowNull: true }, 
    DNI_INI: { type: 'varchar(8)', allowNull: true },
    DNI_FIN: { type: 'varchar(8)', allowNull: true },
    FECHA_EMP: { type: 'varchar(35)', allowNull: true },
    USUCRE: { type: 'int', allowNull: true },
    FECCRE: { type: 'varchar(35)', allowNull: true },
    USUREG: { type: 'int', allowNull: true },
    FECREG: { type: 'varchar(35)', allowNull: true },
    FECENV: { type: 'varchar(35)', allowNull: true },
};

  /* by default it pluralize the model, so it will tread it as 'MZA' and query will be like
     select * from MZA  (if you have pre existing table MZA, then it won't get records)
  */
  const options = {
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  };
  return sequelize.define("T_MANZANA", attributes, options);
}