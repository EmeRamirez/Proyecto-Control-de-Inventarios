import {sequelize} from '../bd.js';
import {DataTypes, Model} from 'sequelize';

export class Cerveceria extends Model{}

Cerveceria.init({

    id_cerveceria:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    nombre_cerveceria:{
        type: DataTypes.STRING(45),
        allowNull:false,
    },
    razonsocial:{
        type: DataTypes.STRING(100),
        allowNull:false,
    },
    rut_empresa:{
        type: DataTypes.STRING(20),
        allowNull:false,
    },
    direccion:{
        type: DataTypes.STRING(100),
        allowNull:false,
    },
    comuna:{
        type: DataTypes.STRING(30),
        allowNull:false,
    }
},
{
    sequelize,
    tableName: 'cervecerias',
    name:{
        singular: 'cerveceria',
        plural:'cervecerias'
    }
});