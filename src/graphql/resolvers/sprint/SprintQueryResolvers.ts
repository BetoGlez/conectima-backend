import { GoogleSpreadsheetRow, GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { Arg, Query, Resolver } from "type-graphql";

import { ApiConstants } from "../../../api.constants";
import { TrackingSheetIssue } from "../../../models/tracking-sheet.model";
import { calculateWorkDays, getValueAfterColon, parseCommaNumber } from "../../../utils/common-functions";
import { getSheetDocument } from "../../../utils/google-sheets";
import { Sprint } from "../../entities/Sprint";

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
        const rows = await sheet.getRows();

        const startDateCell = `A${rows.length}`;
        const releaseDateCell = `A${rows.length + 1}`;
        await sheet.loadCells(`${startDateCell}:${releaseDateCell}`);
        const startDate = getValueAfterColon(sheet.getCellByA1(startDateCell).value as string);
        const releaseDate = getValueAfterColon(sheet.getCellByA1(releaseDateCell).value as string);

        const duration = calculateWorkDays(startDate, releaseDate);
        const originalEstimation = rows.filter(
            (row: GoogleSpreadsheetRow | TrackingSheetIssue) => row.Issue === ApiConstants.RESULT_ISSUE_TEXT
        )[0].OE as string;

        return {
            version: sheet.title,
            startDate,
            releaseDate,
            duration,
            storyPoints: parseCommaNumber(originalEstimation)
        } as Sprint;
    }
}