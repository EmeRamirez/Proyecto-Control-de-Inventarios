import {sequelize} from '../bd.js';
import {DataTypes, Model} from 'sequelize';

export class Item extends Model{}

import { Cliente } from './Cliente.js';
import { Cerveceria } from './Cerveceria.js';
import { Categoria } from './Categoria.js';
import { Estado } from './Estado.js';

Item.init({
    id_item:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    qr_code:{
        type: DataTypes.STRING(45),
        allowNull:false,
    },
    tipo:{
        type: DataTypes.STRING(45),
        allowNull:false,
    },
    capacidad:{
        type: DataTypes.STRING(45),
        allowNull:true,
    },
    observacion:{
        type: DataTypes.STRING(200),
        allowNull:true,
    }
},
{
    sequelize,
    tableName: 'inventario',
    name:{
        singular: 'iten',
        plural: 'items'
    }
});

Cliente.hasMany(Item,{foreignKey:{name:'id_cliente',allowNull: true}});
Item.belongsTo(Cliente,{foreignKey:'id_cliente'});

Estado.hasMany(Item,{foreignKey:'id_estado'});
Item.belongsTo(Estado,{foreignKey:'id_estado'});

Categoria.hasMany(Item,{foreignKey:'id_categoria'});
Item.belongsTo(Categoria,{foreignKey:'id_categoria'});