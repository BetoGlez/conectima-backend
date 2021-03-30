import { Service } from "typedi";
import { UserInputError } from "apollo-server-errors";
import moment from "moment";

import { Project, ProjectModel } from "../graphql/entities/Project";
import { SheetSprintsService } from "./sheet-sprints.service";
import { ApiConstants } from "../api.constants";
import { ProjectIdInput } from "../graphql/input/ProjectIdInput";
import { isValidSheetId } from "../utils/google-sheets";

@Service()
export class ProjectsService {

    public projects = new Array<Project>();

    public constructor(private sheetSprintsSrv: SheetSprintsService) {}

    public async createProject(project: Project): Promise<Project> {
        const projectInDb = await ProjectModel.findOne({ name: project.name });
        if (projectInDb) {
            throw new UserInputError("A project with the same name already exists", {
                errorCodes: [ ApiConstants.errorCodes.DUPLICATED_PROJECT_NAME ]
            });
        }
        let isValidSheet = false;
        try {
            isValidSheet = await isValidSheetId(project.spreadSheetId);
        } catch (err) {
            console.error("Invalid sheet Id: ", err.message);
        }
        if (!isValidSheet) {
            throw new UserInputError("Could not link sheet using the specified id", {
                errorCodes: [ ApiConstants.errorCodes.ERROR_CONNECTING_SPREADSHEET ]
            });
        }
        const newProject = await ProjectModel.create(project);
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
        return await ProjectModel.find();
    }

    public async getProject({ projectId }: ProjectIdInput): Promise<Project | null> {
         return await ProjectModel.findById(projectId);
    }

    private isDateCurrentDateInRange(startDate: string, endDate: string): boolean {
        const currentDate = moment();
        const startingDate = moment(startDate, ApiConstants.DATE_FORMAT);
        const endingDate = moment(endDate, ApiConstants.DATE_FORMAT);
        return currentDate.isBetween(startingDate, endingDate, "days", "[]");
    }
}