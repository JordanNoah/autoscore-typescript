import {GradeSendingDatasourceImpl} from "../infrastructure/datasources/gradeSending.datasource.impl";
import {GradeSendingRepositoryImpl} from "../infrastructure/repositories/gradeSending.repository.impl";

describe("GradeSending", () => {
    const datasource = new GradeSendingDatasourceImpl()
    const gradeSendingRepository = new GradeSendingRepositoryImpl(datasource)
    it('should return GradeSendingEntity',  async () => {
        const gradeSending = await gradeSendingRepository.getById(1)
        expect(gradeSending).toBeDefined()
    });

    it('should return null if not exist', async () => {
        const gradeSending = await gradeSendingRepository.getById(90000000)
        await expect(gradeSending).rejects.toThrowError("Grade sending not found");
    })
})