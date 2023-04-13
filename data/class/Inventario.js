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
        allowNull:false,
    },
    observacion:{
        type: DataTypes.STRING(200),
        allowNull:false,
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

Cerveceria.hasMany(Item,{foreignKey:'id_cerveceria'});
Item.belongsTo(Cerveceria,{foreignKey:'id_cerveceria'});

Cliente.hasMany(Item,{foreignKey:'id_cliente'});
Item.belongsTo(Cliente,{foreignKey:'id_cliente'});

Estado.hasMany(Item,{foreignKey:'id_estado'});
Item.belongsTo(Estado,{foreignKey:'id_estado'});

Categoria.hasMany(Item,{foreignKey:'id_categoria'});
Item.belongsTo(Categoria,{foreignKey:'id_categoria'});