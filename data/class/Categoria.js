import {sequelize} from '../bd.js';
import {DataTypes, Model} from 'sequelize';

export class Categoria extends Model{}

Categoria.init({

    id_categoria:{
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
    tableName: 'categorias',
    name:{
        singular: 'categoria',
        plural: 'categorias'
    }
});