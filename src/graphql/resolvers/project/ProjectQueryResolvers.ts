import { Arg, Mutation, Resolver } from "type-graphql";

import { Project } from "../../entities/Project";
import { CreateProjectInput } from "./input/CreateProjectInput";

@Resolver()
export class ProjectQueryResolvers {
    @Mutation(() => Project)
    public async createProject(
        @Arg("createProjectInput") { name, spreadSheetId, startDate }: CreateProjectInput
    ): Promise<Project> {
        const newProject = {
            id: (Math.random() * 100).toFixed(0).toString(),
            name,
            spreadSheetId,
            startDate
        } as Project;
        // TODO: Implement the logic to save in DB and use the real id
        return newProject;
    }
}