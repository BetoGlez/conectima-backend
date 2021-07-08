import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Service } from "typedi";

import { ProjectsService } from "../../services/projects.service";
import { Project } from "../entities/Project";
import { CreateProjectInput } from "../input/CreateProjectInput";
import { ProjectIdInput } from "../input/ProjectIdInput";
import { isAuth } from "../../middleware/isAuth";

@Service()
@Resolver()
export class ProjectResolvers {

    public constructor(private projectsSrv: ProjectsService) {}

    @Query(() => [Project], { nullable: true })
    @UseMiddleware(isAuth)
    public async getProjects(): Promise<Array<Project> | null> {
        return await this.projectsSrv.getProjects();
    }

    @Query(() => Project, { nullable: true })
    @UseMiddleware(isAuth)
    public async getProject(@Arg("projectIdInput") projectIdInput: ProjectIdInput): Promise<Project | null> {
        return await this.projectsSrv.getProject(projectIdInput);
    }

    @Mutation(() => Project, { nullable: true })
    @UseMiddleware(isAuth)
    public async createProject(
        @Arg("createProjectInput") { name, spreadSheetId, startDate }: CreateProjectInput
    ): Promise<Project | null> {
        let newProject: Project | null = await this.projectsSrv.createProject({ name, spreadSheetId, startDate } as Project);
        if (newProject.id) {
            newProject = await this.projectsSrv.syncProject({projectId: newProject.id});
        }
        return newProject;
    }

    @Mutation(() => Project, { nullable: true })
    @UseMiddleware(isAuth)
    public async syncProject(@Arg("projectIdInput") projectIdInput: ProjectIdInput): Promise<Project | null> {
        return await this.projectsSrv.syncProject(projectIdInput);
    }

    @Mutation(() => [Project], {nullable: true})
    @UseMiddleware(isAuth)
    public async syncAllProjects(): Promise<Array<Project>> {
        return await this.projectsSrv.syncAllProjects();
    }
}