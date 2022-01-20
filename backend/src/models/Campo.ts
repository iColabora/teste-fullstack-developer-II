import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/pg";


export interface CampoInstance extends Model {
    id: number;
    valor:string
}


export const Campo = sequelize.define<CampoInstance>("Campo",{
    id:{
        primaryKey:true,
        type:DataTypes.INTEGER,
        autoIncrement:true
    },
    valor:{
        type:DataTypes.STRING
    },
    
},{
    tableName: 'campos',
    timestamps: false
});

