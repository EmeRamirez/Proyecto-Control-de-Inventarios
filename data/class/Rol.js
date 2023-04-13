import {sequelize} from '../bd.js';
import {DataTypes, Model} from 'sequelize';

export class Rol extends Model{}

Rol.init({

    id_rol:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    descripcion:{
        type: DataTypes.STRING(45),
        allowNull:false,
    }
},
{
    sequelize,
    tableName: 'roles',
    createdAt: false,
    updatedAt: false
});