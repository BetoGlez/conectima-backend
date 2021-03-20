import { GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { Arg, Query, Resolver } from "type-graphql";

import { ApiConstants } from "../../../api.constants";
import { getCellNumber, getCellString, getNextCellInRow, getSheetDocument } from "../../../utils/google-sheets";
import { Issue } from "../../entities/Issue";
import { Sprint } from "../../entities/Sprint";
import { SprintStatistics } from "../../entities/SprintStatistics";

@Resolver()
export class SprintQueryResolver {
    @Query(() => [Sprint])
    public async getSprints(@Arg("sheetId") sheetId: string): Promise<Array<Sprint>> {
        const doc = await getSheetDocument(sheetId);
        const sprintsPromises = new Array<Promise<Sprint>>();
        for (let i = 0; i < doc.sheetCount; i++) {
            const sheet = doc.sheetsByIndex[i];
            sprintsPromises.push(this.composeSprint(sheet));
        }
        const sprints = await Promise.all(sprintsPromises);
        return sprints;
    }

    private async composeSprint(sheet: GoogleSpreadsheetWorksheet): Promise<Sprint> {
        const sprintStats = await this.composeSprintStats(sheet);
        const sprintIssues = await this.composeSprintIssues(sheet);
        return {
            version: sheet.title,
            statistics: sprintStats,
            issues: sprintIssues
        } as Sprint;
    }

    private async composeSprintStats(sheet: GoogleSpreadsheetWorksheet): Promise<SprintStatistics> {
        await sheet.loadCells(ApiConstants.trackingSheet.SPRINT_STATS_CELL_RANGE);
        return {
            originalEstimationSp: getCellNumber(sheet, ApiConstants.trackingSheet.ORIGINAL_ESTIMATION_SP_CELL),
            originalEstimationHours: getCellNumber(sheet, ApiConstants.trackingSheet.ORIGINAL_ESTIMATION_HOURS_CELL),
            devEstimationSp: getCellNumber(sheet, ApiConstants.trackingSheet.DEV_ESTIMATION_SP_CELL),
            devEstimationHours: getCellNumber(sheet, ApiConstants.trackingSheet.DEV_ESTIMATION_HOURS_CELL),
            startDate: getCellString(sheet, ApiConstants.trackingSheet.START_DATE_CELL),
            releaseDate: getCellString(sheet, ApiConstants.trackingSheet.RELEASE_DATE_CELL),
            workHoursPerDay: getCellNumber(sheet, ApiConstants.trackingSheet.WORK_HOURS_PER_DAY_CELL),
            remainingWorkDays: getCellNumber(sheet, ApiConstants.trackingSheet.WORK_DAYS_UNTIL_FINISH_CELL),
            originalDeviationPercentage: getCellNumber(sheet, ApiConstants.trackingSheet.ORIGINAL_DEVIATION_CELL),
            devDeviationPercentage: getCellNumber(sheet, ApiConstants.trackingSheet.DEV_DEVIATION_CELL),
            originalProgressPercentage: getCellNumber(sheet, ApiConstants.trackingSheet.ORIGINAL_PROGRESS_CELL),
            devProgressPercentage: getCellNumber(sheet, ApiConstants.trackingSheet.DEV_PROGRESS_CELL)
        } as SprintStatistics;
    }

    private async composeSprintIssues(sheet: GoogleSpreadsheetWorksheet): Promise<Array<Issue>> {
        await sheet.loadCells(ApiConstants.trackingSheet.SPRINT_ISSUES_CELL_RANGE);
        const sprintIssues = new Array<Issue>();
        let issueTitleCell = ApiConstants.trackingSheet.FIRST_ISSUE_TITLE_CELL;
        let issueOpEstimationCell = ApiConstants.trackingSheet.FIRST_ISSUE_O_CELL;
        let issuePeEstimationCell = ApiConstants.trackingSheet.FIRST_ISSUE_P_CELL;
        let issueMlEstimationCell = ApiConstants.trackingSheet.FIRST_ISSUE_ML_CELL;
        let issueOrEstimationCell = ApiConstants.trackingSheet.FIRST_ISSUE_OE_CELL;
        let issueProgressCell = ApiConstants.trackingSheet.FIRST_ISSUE_PROGRESS_CELL;
        let issueResponsibleCell = ApiConstants.trackingSheet.FIRST_ISSUE_RESPONSIBLE_CELL;
        let issueClientValueCell = ApiConstants.trackingSheet.FIRST_ISSUE_CLIENT_VALUE_CELL;
        let issuePriorityCell = ApiConstants.trackingSheet.FIRST_ISSUE_PRIORITY_CELL;
        let isValidIssue = true;
        do {
            issueTitleCell = getNextCellInRow(issueTitleCell);
            const issueTitle = getCellString(sheet, issueTitleCell);
            isValidIssue = !!issueTitle && issueTitle !== ApiConstants.trackingSheet.LAST_ISSUE_TITLE;
            if (isValidIssue) {
                issueOpEstimationCell = getNextCellInRow(issueOpEstimationCell);
                issuePeEstimationCell = getNextCellInRow(issuePeEstimationCell);
                issueMlEstimationCell = getNextCellInRow(issueMlEstimationCell);
                issueOrEstimationCell = getNextCellInRow(issueOrEstimationCell);
                issueProgressCell = getNextCellInRow(issueProgressCell);
                issueResponsibleCell = getNextCellInRow(issueResponsibleCell);
                issueClientValueCell = getNextCellInRow(issueClientValueCell);
                issuePriorityCell = getNextCellInRow(issuePriorityCell);
                sprintIssues.push({
                    title: issueTitle,
                    estimation: {
                        optimistic: getCellNumber(sheet, issueOpEstimationCell),
                        pesimistic: getCellNumber(sheet, issuePeEstimationCell),
                        mostLikely: getCellNumber(sheet, issueMlEstimationCell),
                        originalEstimation: getCellNumber(sheet, issueOrEstimationCell)
                    },
                    progress: getCellNumber(sheet, issueProgressCell),
                    responsible: getCellString(sheet, issueResponsibleCell),
                    clientValue: getCellNumber(sheet, issueClientValueCell),
                    priority: getCellNumber(sheet, issuePriorityCell),
                });
            }
        } while (isValidIssue && sprintIssues.length < ApiConstants.MAX_ISSUES_PER_SPRINT);
        return sprintIssues;
    }
}