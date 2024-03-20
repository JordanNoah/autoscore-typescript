import {DataTypes, Model} from "sequelize";
import {sequelize} from "../sequelize";

interface GradeReceiverRow {
    id: number,
    uuid: string,
    firedAt: Date,
    assigment: string,
    institutionAbbreviation: string,
    modality: string,
    createdAt?: Date,
    updatedAt?: Date
}

export class GradeReceiverSequelize extends Model<GradeReceiverRow,Omit<GradeReceiverRow, 'id'>> {
    declare id: number
    declare uuid: string
    declare firedAt: Date
    declare assigment: string
    declare institutionAbbreviation: string
    declare modality: string
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
}

GradeReceiverSequelize.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    uuid:{
        type: DataTypes.UUIDV4,
        allowNull:false
    },
    firedAt:{
        type: DataTypes.DATE,
        allowNull:false
    },
    assigment:{
        type: DataTypes.STRING,
        allowNull: false
    },
    institutionAbbreviation:{
        type: DataTypes.STRING,
        allowNull: false
    },
    modality:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize,
    timestamps:true,
    tableName:'grade_receiver'
})