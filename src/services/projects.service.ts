import { Service } from "typedi";
import moment from "moment";

import { Project } from "../graphql/entities/Project";
import { SheetSprintsService } from "./sheet-sprints.service";
import { ApiConstants } from "../api.constants";
import { ProjectIdInput } from "../graphql/input/ProjectIdInput";

@Service()
export class ProjectsService {

    public projects = new Array<Project>();

    public constructor(private sheetSprintsSrv: SheetSprintsService) {}

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

    public async syncProject({ projectId }: ProjectIdInput): Promise<Project | null> {
        // TODO: verify in the database the project exists
        let projectToSync = this.projects.filter(project => project.id === projectId)[0];
        if (projectToSync) {
            const projectSprints = await this.sheetSprintsSrv.composeSprintsFromSheet(projectToSync.spreadSheetId);
            if (projectSprints && projectSprints.length > 0) {
                const sprintInCurrentDateRange = projectSprints.filter(
                    sprint => this.isDateCurrentDateInRange(sprint.statistics.startDate, sprint.statistics.releaseDate))[0];
                const activeSprint = sprintInCurrentDateRange || projectSprints[projectSprints.length - 1];
                projectToSync = {
                    ...projectToSync,
                    activeSprint,
                    sprints: projectSprints,
                    dedications: activeSprint.dedications
                }
            }
            // TODO: Update the project in database
            this.projects[this.projects.findIndex(project => project.id === projectToSync.id)] = projectToSync;
        }
        return projectToSync;
    }

    public async getProjects(): Promise<Array<Project> | null> {
        // TODO: return projects from the database
        return this.projects;
    }

    public async getProject({ projectId }: ProjectIdInput): Promise<Project | null> {
         // TODO: Do the search in the database
         return this.projects.filter(project => project.id === projectId)[0];
    }

    private isDateCurrentDateInRange(startDate: string, endDate: string): boolean {
        const currentDate = moment();
        const startingDate = moment(startDate, ApiConstants.DATE_FORMAT);
        const endingDate = moment(endDate, ApiConstants.DATE_FORMAT);
        return currentDate.isBetween(startingDate, endingDate, "days", "[]");
    }
}