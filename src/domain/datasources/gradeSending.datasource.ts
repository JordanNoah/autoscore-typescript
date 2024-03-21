import {GradeSendingEntity} from "../entities/gradeSending.entity";

export abstract class GradeSendingDatasource {
    abstract register(): Promise<GradeSendingEntity|null>
}