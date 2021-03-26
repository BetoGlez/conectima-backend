import { Arg, Mutation, Query, Resolver } from "type-graphql";

import { Project } from "../../entities/Project";
import { CreateProjectInput } from "./input/CreateProjectInput";

@Resolver()
export class ProjectQueryResolvers {

    private projects = new Array<Project>();

    @Query(() => [Project], { nullable: true })
    public async getProjects(): Promise<Array<Project> | null> {
        // TODO: return projects from the database
        return this.projects;
    }

    @Query(() => Project, { nullable: true })
    public async getProject(@Arg("projectId") projectId: string): Promise<Project | null> {
        // TODO: Do the search in the database
        return this.projects.filter(project => project.id === projectId)[0];
    }

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
        this.projects.push(newProject);
        return newProject;
    }
}