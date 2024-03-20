import {DataTypes, Model} from "sequelize";
import {sequelize} from "../sequelize";

interface ProcessStatusRow {
    id: number,
    uuid: string,
    process: string,
    processAbbreviation: string,
    createdAt?: Date,
    updatedAt?: Date
}

export class ProcessStatusSequelize extends Model<ProcessStatusRow,Omit<ProcessStatusRow, 'id'>> {
    declare id: number
    declare uuid: string
    declare process: string
    declare processAbbreviation: string
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
}

ProcessStatusSequelize.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    uuid:{
        type: DataTypes.STRING,
        allowNull: false
    },
    process:{
        type: DataTypes.STRING,
        allowNull: false
    },
    processAbbreviation:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize,
    timestamps:true,
    tableName:'process_status'
})

