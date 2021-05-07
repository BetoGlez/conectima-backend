import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from "google-spreadsheet";

import { ApiConstants } from "../api.constants";
import { parseCommaNumber } from "./common-functions";

export const isValidSheetId = async (sheetId: string): Promise<boolean> => {
    return !!(await getSheetDocument(sheetId));
};

export const getSheetDocument = async (sheetId: string): Promise<GoogleSpreadsheet> => {
    const doc = new GoogleSpreadsheet(sheetId);
    await doc.useServiceAccountAuth(ApiConstants.SHEETS_CONFIG);
    await doc.loadInfo();
    return doc;
};

export const getCellNumber = (sheet: GoogleSpreadsheetWorksheet, cell: string): number => {
    const cellValue = sheet.getCellByA1(cell).value;
    let cellNumber = -1;
    if (typeof cellValue === "number") {
        cellNumber = parseFloat(cellValue.toFixed(2));
    } else if (typeof cellValue === "string") {
        if (cellValue.indexOf(ApiConstants.PERCENT_CHAR) > -1) {
            const numberWithoutPercentChar = cellValue.slice(0, cellValue.indexOf(ApiConstants.PERCENT_CHAR) - 1);
            cellNumber = parseCommaNumber(numberWithoutPercentChar) / 100;
        } else {
            cellNumber = parseCommaNumber(cellValue);
        }
    }
    return cellNumber;
};

export const getCellString = (sheet: GoogleSpreadsheetWorksheet, cell: string): string => {
    return sheet.getCellByA1(cell).value as string;
};

export const getNextCellInRow = (cell: string): string => {
    let nextCellInRow = "";
    const cellRow = cell.match(/\d+/g)?.map(Number)[0];
    if (cellRow) {
        const cellColumn = cell.slice(0, cell.indexOf(cellRow.toString()));
        nextCellInRow = cellColumn + (cellRow + 1);
    }
    return nextCellInRow;
};