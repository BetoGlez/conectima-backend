import { GoogleSpreadsheetRow } from "google-spreadsheet";
import { Arg, Query, Resolver } from "type-graphql";

import { TrackingSheetIssue } from "../../../models/tracking-sheet.model";
import { parseCommaNumber } from "../../../utils/common-functions";
import { getSheetDocument } from "../../../utils/google-sheets";
import { Issue } from "../../entities/Issue";
import { GetIssuesInput } from "./input/GetIssuesInput";
import { ApiConstants } from "../../../api.constants";

@Resolver()
export class IssueQueryResolver {
    @Query(() => [Issue])
    public async getIssues(
        @Arg("getIssuesInput") { sheetId, sprintVersion }: GetIssuesInput
    ): Promise<Array<Issue>> {
        const issues = new Array<Issue>();
        const doc = await getSheetDocument(sheetId);
        const sheet = doc.sheetsByTitle[sprintVersion];
        if (sheet) {
            const rows = await sheet.getRows();
            for (let i = 0; i < rows.length; i++) {
                const row = rows[i] as GoogleSpreadsheetRow | TrackingSheetIssue;
                if (row.Issue !== ApiConstants.RESULT_ISSUE_TEXT) {
                    const issue = {
                        title: row.Issue,
                        estimation: {
                            optimistic: parseCommaNumber(row.O),
                            mostLikely: parseCommaNumber(row.ML),
                            pesimistic: parseCommaNumber(row.P),
                            originalEstimation: parseCommaNumber(row.OE)
                        },
                        progress: parseCommaNumber(row.Progress),
                        responsible: row.Responsible,
                        clientValue: parseCommaNumber(row.ClientValue),
                        priority: parseCommaNumber(row.Priority)
                    } as Issue;
                    issues.push(issue);
                } else {
                    break;
                }
            }
        }

        return issues;
    }
}