import { Arg, Query, Resolver } from "type-graphql";
import { Service } from "typedi";

import { SprintsService } from "../../services/sprints.service";
import { Sprint } from "../entities/Sprint";

@Service()
@Resolver()
export class SprintResolvers {

    public constructor(private sprintsSrv: SprintsService) {}

    @Query(() => [Sprint])
    public async getSprints(@Arg("projectId") projectId: string): Promise<Array<Sprint>> {
        return await this.sprintsSrv.getSprints(projectId);
    }
}