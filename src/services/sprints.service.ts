import { Service } from "typedi";

import { Sprint } from "../graphql/entities/Sprint";
import { GetSprintInput } from "../graphql/input/GetSprintInput";
import { ProjectIdInput } from "../graphql/input/ProjectIdInput";

@Service()
export class SprintsService {
    public async getSprints({ projectId }: ProjectIdInput): Promise<Array<Sprint>> {
        console.log("Getting sprints from project: ", projectId);
        // TODO: Get sprints from database
        return new Array<Sprint>();
    }

    public async getSprint({ projectId, sprintVersion }: GetSprintInput): Promise<Sprint | null> {
        console.log(`Getting sprint version ${sprintVersion} from project ${projectId}`);
        // TODO: Implement get sprint by project logic
        return null;
    }
}