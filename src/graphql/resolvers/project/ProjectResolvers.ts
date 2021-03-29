import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";

import { ProjectsService } from "../../../services/projects.service";
import { Project } from "../../entities/Project";
import { CreateProjectInput } from "./input/CreateProjectInput";

@Service()
@Resolver()
export class ProjectResolvers {

    public constructor(private projectsSrv: ProjectsService) {}

    @Query(() => [Project], { nullable: true })
    public async getProjects(): Promise<Array<Project> | null> {
        return await this.projectsSrv.getProjects();
    }

    @Query(() => Project, { nullable: true })
    public async getProject(@Arg("projectId") projectId: string): Promise<Project | null> {
        return await this.projectsSrv.getProject(projectId);
    }

    @Mutation(() => Project)
    public async createProject(
        @Arg("createProjectInput") { name, spreadSheetId, startDate }: CreateProjectInput
    ): Promise<Project> {
        return await this.projectsSrv.createProject({ name, spreadSheetId, startDate } as Project);
    }

    @Mutation(() => Project, { nullable: true })
    public async syncProject(@Arg("projectId") projectId: string): Promise<Project | null> {
        return await this.projectsSrv.syncProject(projectId);
    }
}