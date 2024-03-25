import {DataTypes, Model} from "sequelize";
import {sequelize} from "../sequelize";

interface InstitutionRow {
    id: number,
    uuid: string,
    name: string,
    fullName: string,
    abbreviation: string,
    domain: string,
    website: string,
    restPath: string,
    modality: string,
    translations: string,
    token: string,
    createdAt?: Date,
    updatedAt?: Date
}

export class InstitutionSequelize extends Model<InstitutionRow,Omit<InstitutionRow, 'id'>> {
    declare id: number
    declare uuid: string
    declare name: string
    declare fullName: string
    declare abbreviation: string
    declare domain: string
    declare website: string
    declare restPath: string
    declare modality: string
    declare translations: string
    declare token: string
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
}

InstitutionSequelize.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    uuid:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    name:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    fullName:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    abbreviation:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    domain:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    website:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    restPath:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    modality:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    translations:{
        type: DataTypes.JSON,
        allowNull: false
    },
    token:{
        type: DataTypes.TEXT,
        allowNull: false
    }
},{
    sequelize,
    timestamps:true,
    tableName:'institution'
})