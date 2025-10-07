const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {

    ID: { type: 'int', allowNull: false, primaryKey: true, },
    CODCCPP: { type: 'char(4)', allowNull: false, primaryKey: true, },
    ZONA_ID: { type: 'char(5)', allowNull: false, primaryKey: true, },
    MANZANA_ID: { type: 'varchar(4)', allowNull: false, primaryKey: true, },
    FRENTE_ID: { type: 'int', allowNull: false, primaryKey: true, },
    DNI: { type: 'varchar(8)', allowNull: false, primaryKey: true, },
    ID_REG: { type: 'int', allowNull: false, primaryKey: true, },
    ID_LLAVE: { type: 'varchar(32)', allowNull: false,  },
    FECHA: { type: 'varchar(10)', allowNull: true,  },
    PERIODO_ID: { type: 'int', allowNull: true,  },
    P12_A: { type: 'int', allowNull: true,  },
    P12_B: { type: 'varchar(2)', allowNull: true,  },
    P13_1: { type: 'varchar(50)', allowNull: true,  },
    P13_2: { type: 'varchar(50)', allowNull: true,  },
    P13_3: { type: 'varchar(50)', allowNull: true,  },
    P13A_1: { type: 'varchar(50)', allowNull: true,  },
    P13A_2: { type: 'varchar(50)', allowNull: true,  },
    P13A_3: { type: 'varchar(50)', allowNull: true,  },
    ULTIMA_EDIFICACION: { type: 'int', allowNull: true,  },
    P14: { type: 'int', allowNull: true,  },
    P14_A: { type: 'varchar(10)', allowNull: true,  },
    CATEGORIA_VIA_R: { type: 'int', allowNull: true,  },
    CATEGORIA_VIA_R_O: { type: 'varchar(50)', allowNull: true,  },
    NOM_VIA_R: { type: 'varchar(250)', allowNull: true,  },
    REFERENCIA: { type: 'varchar(500)', allowNull: true,  },
    P17: { type: 'varchar(4)', allowNull: true,  },
    P17_A: { type: 'varchar(2)', allowNull: true,  },
    P18: { type: 'varchar(4)', allowNull: true,  },
    P19: { type: 'varchar(4)', allowNull: true,  },
    P20: { type: 'varchar(4)', allowNull: true,  },
    P20_A: { type: 'varchar(4)', allowNull: true,  },
    P21: { type: 'varchar(4)', allowNull: true,  },
    P22: { type: 'varchar(4)', allowNull: true,  },
    P23_K: { type: 'varchar(4)', allowNull: true,  },
    P24: { type: 'int', allowNull: true,  },
    P25: { type: 'int', allowNull: true,  },
    P25_1_NOMBRE: { type: 'varchar(50)', allowNull: true,  },
    P25_2: { type: 'int', allowNull: true,  },
    C_MULTI: { type: 'int', allowNull: true,  },
    P26: { type: 'int', allowNull: true,  },
    P26_O: { type: 'varchar(50)', allowNull: true,  },
    P26_9_O: { type: 'varchar(50)', allowNull: true,  },
    P26_P: { type: 'varchar(50)', allowNull: true,  },
    TOTAL_M: { type: 'int', allowNull: true,  },
    TOTAL_H: { type: 'int', allowNull: true,  },
    SEGMENTO_ID: { type: 'int', allowNull: true,  },
    SEGMENTO: { type: 'int', allowNull: true,  },
    P12_A_BCK: { type: 'int', allowNull: true,  },
    P12_B_BCK: { type: 'varchar(2)', allowNull: true,  },
    RESFIN: { type: 'int', allowNull: true,  },
    RESFIN_O: { type: 'varchar(50)', allowNull: true,  },
    ID_TABLET: { type: 'varchar(20)', allowNull: true,  },
    DNI_INI: { type: 'varchar(8)', allowNull: true,  },
    DNI_FIN: { type: 'varchar(8)', allowNull: true,  },
    FECHA_EMP: { type: 'varchar(35)', allowNull: true,  },
    P26_B: { type: 'int', allowNull: true,  },
    P26_B_VIV: { type: 'int', allowNull: true,  },
    OBS_REGISTRO: { type: 'varchar(1000)', allowNull: true,  },
    FECHA_INICIO: { type: 'varchar(35)', allowNull: true,  },
    FECHA_FIN: { type: 'varchar(35)', allowNull: true,  },
    USUCRE: { type: 'int', allowNull: true,  },
    FECCRE: { type: 'varchar(35)', allowNull: true,  },
    USUREG: { type: 'int', allowNull: true,  },
    FECREG: { type: 'varchar(35)', allowNull: true,  },
    FECENV: { type: 'varchar(35)', allowNull: true,  },
    P14_RES: { type: 'int', allowNull: true,  },
    CATVIA_RES: { type: 'int', allowNull: true,  },
    CATVIA_RES_O: { type: 'varchar(50)', allowNull: true,  },
    NOMVIA_RES: { type: 'varchar(250)', allowNull: true,  },
    P26_9A: { type: 'int', allowNull: true,  },

};

  /* by default it pluralize the model, so it will tread it as 'MZA' and query will be like
     select * from MZA  (if you have pre existing table MZA, then it won't get records)
  */
  const options = {
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  };
  return sequelize.define("T_05_DIG_CPV0301_DET", attributes, options);
}