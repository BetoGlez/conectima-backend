import { Service } from "typedi";

import { Sprint, SprintModel } from "../graphql/entities/Sprint";
import { GetSprintInput } from "../graphql/input/GetSprintInput";
import { ProjectIdInput } from "../graphql/input/ProjectIdInput";

@Service()
export class SprintsService {
    public async getSprints({ projectId }: ProjectIdInput): Promise<Array<Sprint>> {
        return await SprintModel.find({ projectId });
    }

    public async getSprint({ projectId, sprintVersion }: GetSprintInput): Promise<Sprint | null> {
        return await SprintModel.findOne({ projectId, version: sprintVersion });
    }
}