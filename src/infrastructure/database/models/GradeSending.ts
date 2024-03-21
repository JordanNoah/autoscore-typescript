import {DataTypes, Model} from "sequelize";
import {sequelize} from "../sequelize";
import {GradeReceiverSequelize} from "./GradeReceiver";
import {InstitutionSequelize} from "./Institution";
import {ProcessStatusSequelize} from "./ProcessStatus";

interface GradeSendingRow {
    id: number,
    uuid: string,
    userId: number,
    courseId: number,
    contextId: string,
    source: string,
    component: string,
    activityId: number,
    instanceId: number,
    scoreToAssign: number,
    dateToGrade: string,
    itemNumber: number,
    gradeReceiverId: number,
    institutionId: number,
    processStatusId: number,
    createdAt?: Date,
    updatedAt?: Date
}

export class GradeSendingSequelize extends Model<GradeSendingRow,Omit<GradeSendingRow, 'id'>> {
    declare id: number
    declare uuid: string
    declare userId: number
    declare courseId: number
    declare contextId: string
    declare source: string
    declare component: string
    declare activityId: number
    declare instanceId: number
    declare scoreToAssign: number
    declare dateToGrade: string
    declare itemNumber: number
    declare gradeReceiverId: number
    declare institutionId: number
    declare processStatusId: number
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
}

GradeSendingSequelize.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    uuid:{
        type: DataTypes.UUID,
        allowNull:false
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    courseId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    contextId:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    source:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    component:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    activityId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    instanceId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    scoreToAssign:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    dateToGrade:{
        type: DataTypes.TEXT,
        allowNull:false
    },
    itemNumber:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    gradeReceiverId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: GradeReceiverSequelize,
            key: 'id'
        }
    },
    institutionId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: InstitutionSequelize,
            key: 'id'
        }
    },
    processStatusId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ProcessStatusSequelize,
            key: 'id'
        }
    }
},{
    sequelize,
    timestamps:true,
    tableName:'grade_sending'
})

GradeSendingSequelize.belongsTo(GradeReceiverSequelize,{foreignKey:'gradeReceiverId',as:'gradeReceiver'})
GradeSendingSequelize.belongsTo(InstitutionSequelize,{foreignKey:'institutionId',as:'institution'})
GradeSendingSequelize.belongsTo(ProcessStatusSequelize,{foreignKey:'processStatusId',as:'processStatus'})