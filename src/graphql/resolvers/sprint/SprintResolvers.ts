import { Arg, Query, Resolver } from "type-graphql";

import { Sprint } from "../../entities/Sprint";

@Resolver()
export class SprintResolvers {
    @Query(() => [Sprint])
    public async getSprints(@Arg("projectId") projectId: string): Promise<Array<Sprint>> {
        // TODO: Implement sprint fetch
        console.log(projectId);
        return new Array<Sprint>();
    }
}