import { Service } from "typedi";
import { UserInputError } from "apollo-server-errors";
import mongoose from "mongoose";
import moment from "moment";

import { Project, ProjectModel } from "../graphql/entities/Project";
import { Sprint, SprintModel } from "../graphql/entities/Sprint";
import { Dedication } from "../graphql/entities/Dedication";
import { SheetSprintsService } from "./sheet-sprints.service";
import { ProjectIdInput } from "../graphql/input/ProjectIdInput";
import { isValidSheetId } from "../utils/google-sheets";
import { ApiConstants } from "../api.constants";

interface ProjectData {
    activeSprint: mongoose.Types.ObjectId;
    sprints: Array<mongoose.Types.ObjectId>;
    dedications: Array<Dedication>;
}

@Service()
export class ProjectsService {

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
        const projectToSync = await ProjectModel.findOne({ _id: projectId });
        if (projectToSync) {
            const projectSprints = await this.sheetSprintsSrv.composeSprintsFromSheet(projectToSync.spreadSheetId);
            if (projectSprints && projectSprints.length > 0) {
                const { activeSprint, sprints, dedications } = await this.composeProjectData(projectToSync.id, projectSprints);
                projectToSync.activeSprint = activeSprint;
                projectToSync.sprints = sprints;
                projectToSync.dedications = dedications;
            }
        } else {
            throw new UserInputError("There are no project for the selected id", {
                errorCodes: [ ApiConstants.errorCodes.NO_PROJECT_FOUND ]
            });
        }
        return await projectToSync.save();
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

    private async composeProjectData(projectId: string, projectSprints: Array<Sprint>): Promise<ProjectData> {
        await SprintModel.deleteMany({projectId});
        const newSprints = await SprintModel.insertMany(projectSprints.map(sprint => ({...sprint, projectId})));
        const sprintInCurrentDateRange = newSprints.filter(
            sprint => {
                let isSprintInCurrentDateRange = false;
                const startDate = sprint.statistics && sprint.statistics.startDate;
                const releaseDate = sprint.statistics && sprint.statistics.releaseDate;
                if (startDate && releaseDate) {
                    isSprintInCurrentDateRange = this.isDateCurrentDateInRange(startDate, releaseDate);
                }
                return isSprintInCurrentDateRange;
            })[0];
        const activeSprint = sprintInCurrentDateRange || newSprints[newSprints.length - 1];
        return {
            activeSprint: mongoose.Types.ObjectId(activeSprint.id),
            sprints: newSprints.map(sprint => mongoose.Types.ObjectId(sprint.id)),
            dedications: activeSprint.dedications
        } as ProjectData;
    }
}