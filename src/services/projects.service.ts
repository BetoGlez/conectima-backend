import { Service } from "typedi";

import { Project } from "../graphql/entities/Project";

@Service()
export class ProjectsService {

    public projects = new Array<Project>();

    public async createProject(project: Project): Promise<Project> {
        const newProject = {
            id: (Math.random() * 100).toFixed(0).toString(),
            name: project.name,
            spreadSheetId: project.spreadSheetId,
            startDate: project.startDate
        } as Project;
        // TODO: Implement the logic to save in DB and use the real id
        this.projects.push(newProject);
        return newProject;
    }

    public async getProjects(): Promise<Array<Project> | null> {
        // TODO: return projects from the database
        return this.projects;
    }

    public async getProject(projectId: string): Promise<Project | null> {
         // TODO: Do the search in the database
         return this.projects.filter(project => project.id === projectId)[0];
    }
}