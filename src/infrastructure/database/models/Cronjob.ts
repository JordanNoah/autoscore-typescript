import {DataTypes, Model} from "sequelize";
import {sequelize} from "../sequelize";

interface CronJobRow {
    id: number,
    title: string,
    abbreviation: string,
    running: boolean,
    nextRun: string,
    icon: string,
    createdAt?: Date,
    updatedAt?: Date
}

export class CronJobSequelize extends Model<CronJobRow,Omit<CronJobRow, 'id'>> {
    declare id: number
    declare title: string
    declare abbreviation: string
    declare running: boolean
    declare nextRun: string
    declare icon: string
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
}

CronJobSequelize.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    title:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    abbreviation:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    running:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    nextRun:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    icon:{
        type: DataTypes.TEXT,
        allowNull: false
    }
},{
    sequelize,
    timestamps:true,
    tableName:'cronjob'
})