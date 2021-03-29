import { Arg, Query, Resolver } from "type-graphql";
import { Service } from "typedi";

import { SprintsService } from "../../services/sprints.service";
import { Sprint } from "../entities/Sprint";
import { GetSprintInput } from "../input/GetSprintInput";
import { ProjectIdInput } from "../input/ProjectIdInput";

@Service()
@Resolver()
export class SprintResolvers {

    public constructor(private sprintsSrv: SprintsService) {}

    @Query(() => [Sprint])
    public async getSprints(@Arg("projectIdInput") projectIdInput: ProjectIdInput): Promise<Array<Sprint>> {
        return await this.sprintsSrv.getSprints(projectIdInput);
    }

    @Query(() => Sprint, { nullable: true })
    public async getSprint(@Arg("getSprintInput") getSprintInput: GetSprintInput): Promise<Sprint | null> {
        return await this.sprintsSrv.getSprint(getSprintInput);
    }
}