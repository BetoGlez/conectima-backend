import { Arg, Query, Resolver, UseMiddleware } from "type-graphql";
import { Service } from "typedi";

import { SprintsService } from "../../services/sprints.service";
import { Sprint } from "../entities/Sprint";
import { GetSprintInput } from "../input/GetSprintInput";
import { ProjectIdInput } from "../input/ProjectIdInput";
import { isAuth } from "../../middleware/isAuth";

@Service()
@Resolver()
export class SprintResolvers {

    public constructor(private sprintsSrv: SprintsService) {}

    @Query(() => [Sprint])
    @UseMiddleware(isAuth)
    public async getSprints(@Arg("projectIdInput") projectIdInput: ProjectIdInput): Promise<Array<Sprint>> {
        return await this.sprintsSrv.getSprints(projectIdInput);
    }

    @Query(() => Sprint, { nullable: true })
    @UseMiddleware(isAuth)
    public async getSprint(@Arg("getSprintInput") getSprintInput: GetSprintInput): Promise<Sprint | null> {
        return await this.sprintsSrv.getSprint(getSprintInput);
    }
}