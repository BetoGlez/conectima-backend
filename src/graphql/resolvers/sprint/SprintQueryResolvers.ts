import { GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { Arg, Query, Resolver } from "type-graphql";

import { ApiConstants } from "../../../api.constants";
import { getCellNumber, getCellString, getSheetDocument } from "../../../utils/google-sheets";
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
        return {
            version: sheet.title,
            statistics: sprintStats
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
}