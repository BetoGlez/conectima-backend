export class ApiConstants {
    public static readonly DEFAULT_API_PORT = 5000;
    public static readonly MONGO_DB_URI = process.env.MONGO_DB_URI || "";

    public static readonly DATE_FORMAT = "DD/MM/YYYY";

    public static readonly RESULT_ISSUE_TEXT = "Total";
    public static readonly COLON_CHAR = ":";
    public static readonly COMMA_CHAR = ",";
    public static readonly DOT_CHAR = ".";

    public static readonly MAX_ISSUES_PER_SPRINT = 50;
    public static readonly MAX_MEMBERS_PER_SPRINT = 20;

    public static readonly trackingSheet = {
        SPRINT_STATS_CELL_RANGE: "P1:R19",
        ORIGINAL_ESTIMATION_SP_CELL: "Q2",
        DEV_ESTIMATION_SP_CELL: "Q3",
        ORIGINAL_ESTIMATION_HOURS_CELL: "R2",
        DEV_ESTIMATION_HOURS_CELL: "R3",
        START_DATE_CELL: "Q5",
        RELEASE_DATE_CELL: "Q6",
        WORK_HOURS_PER_DAY_CELL: "Q12",
        WORK_DAYS_UNTIL_FINISH_CELL: "Q14",
        ORIGINAL_DEVIATION_CELL: "Q16",
        DEV_DEVIATION_CELL: "Q17",
        ORIGINAL_PROGRESS_CELL: "Q18",
        DEV_PROGRESS_CELL: "Q19",
        SPRINT_ISSUES_CELL_RANGE: `A1:N${ApiConstants.MAX_ISSUES_PER_SPRINT + 2}`,
        FIRST_ISSUE_TITLE_CELL: "A1",
        FIRST_ISSUE_O_CELL: "B1",
        FIRST_ISSUE_ML_CELL: "C1",
        FIRST_ISSUE_P_CELL: "D1",
        FIRST_ISSUE_OE_CELL: "G1",
        FIRST_ISSUE_PROGRESS_CELL: "I1",
        FIRST_ISSUE_RESPONSIBLE_CELL: "L1",
        FIRST_ISSUE_CLIENT_VALUE_CELL: "M1",
        FIRST_ISSUE_PRIORITY_CELL: "N1",
        LAST_ISSUE_TITLE: "Total",
        SPRINT_DEDICATIONS_CELL_RANGE: `T1:V${ApiConstants.MAX_MEMBERS_PER_SPRINT + 1}`,
        FIRST_DEDICATION_USER_CELL: "T1",
        FIRST_DEDICATION_CURRENT_HOURS_CELL: "U1",
        FIRST_DEDICATION_EXPECTED_HOURS_CELL: "V1",
    };

    public static readonly errorCodes = {
        EMPTY_FIELD: "emptyField",
        INVALID_DATE: "invalidDate"
    };
}
