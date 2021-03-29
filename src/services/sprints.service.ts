import { Service } from "typedi";

import { Sprint } from "../graphql/entities/Sprint";

@Service()
export class SprintsService {
    public async getSprints(projectId: string): Promise<Array<Sprint>> {
        console.log("Getting sprints from project: ", projectId);
        // TODO: Get sprints from database
        return new Array<Sprint>();
    }
}