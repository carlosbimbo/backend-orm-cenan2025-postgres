const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
const attributes = {
ID: { type: 'int', allowNull: false, primaryKey: true, },
CODCCPP: { type: 'char(4)', allowNull: false, primaryKey: true, },
TIPO: { type: 'int', allowNull: true,  },
NOMCCPP: { type: 'varchar(100)', allowNull: false,  },
NOMCCPP_ANTERIOR: { type: 'varchar(100)', allowNull: true,  },
TOTAL_VIVIENDAS: { type: 'int', allowNull: true,  },
TOTAL_VIVIENDAS_MARCO: { type: 'int', allowNull: true,  },
CONGLOMERADO: { type: 'varchar(5)', allowNull: true,  },
CATEGORIA: { type: 'int', allowNull: true,  },
CATEGORIA_O: { type: 'varchar(100)', allowNull: true,  },
ESTADO: { type: 'int', allowNull: true,  },
ESTADO_ANT: { type: 'int', allowNull: true,  },
LONGX_CARTO: { type: 'varchar(100)', allowNull: true,  },
LATY_CARTO: { type: 'varchar(100)', allowNull: true,  },
ID_AER_INI: { type: 'int', allowNull: true,  },
AER_INI: { type: 'char(3)', allowNull: true,  },
AER_FIN: { type: 'char(3)', allowNull: true,  },
INTOCABLE: { type: 'int', allowNull: true,  },
DNI_INI: { type: 'varchar(8)', allowNull: true,  },
DNI_FIN: { type: 'varchar(8)', allowNull: true,  },
FECHA_EMP: { type: 'varchar(35)', allowNull: true,  },
OBSERVACION: { type: 'varchar(3000)', allowNull: true,  },
USUCRE: { type: 'int', allowNull: true,  },
FECCRE: { type: 'varchar(35)', allowNull: true,  },
USUREG: { type: 'int', allowNull: true,  },
FECREG: { type: 'varchar(35)', allowNull: true,  },
FECENV: { type: 'varchar(35)', allowNull: true,  },
};

  /* by default it pluralize the model, so it will tread it as 'CCCP' and query will be like
     select * from CCCP  (if you have pre existing table MZA, then it won't get records)
  */
  const options = {
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  };
  return sequelize.define("T_CENTRO_POBLADO", attributes, options);
}