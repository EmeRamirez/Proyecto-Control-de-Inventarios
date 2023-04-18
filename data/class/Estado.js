import {sequelize} from '../bd.js';
import {DataTypes, Model} from 'sequelize';

export class Estado extends Model{}

Estado.init({

    id_estado:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    descripcion:{
        type: DataTypes.STRING(45),
        allowNull:false,
    },
    
},
{
    sequelize,
    tableName: 'estados',
    createdAt: false,
    updatedAt: false,
    name:{
        singular: 'estado',
        plural: 'estados'
    }
});