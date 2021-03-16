export class ApiConstants {
    public static readonly DEFAULT_API_PORT = 5000;

    public static readonly DATE_FORMAT = "DD/MM/YYY";

    public static readonly RESULT_ISSUE_TEXT = "Total";
    public static readonly COLON_CHAR = ":";
    public static readonly COMMA_CHAR = ",";
    public static readonly DOT_CHAR = ".";

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
        DEV_PROGRESS_CELL: "Q19"
    };
}
