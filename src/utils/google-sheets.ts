import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from "google-spreadsheet";

import sheetCredentials from "../keys/client_secret.json";
import { parseCommaNumber } from "./common-functions";

export const getSheetDocument = async (sheetId: string): Promise<GoogleSpreadsheet> => {
    const doc = new GoogleSpreadsheet(sheetId);
    await doc.useServiceAccountAuth(sheetCredentials);
    await doc.loadInfo();
    return doc;
};

export const getCellNumber = (sheet: GoogleSpreadsheetWorksheet, cell: string): number => {
    let cellValue = sheet.getCellByA1(cell).value;
    if (typeof cellValue === "number") {
        cellValue = cellValue.toFixed(2);
    }
    return cellValue ? parseCommaNumber(cellValue as string) : -1;
};

export const getCellString = (sheet: GoogleSpreadsheetWorksheet, cell: string): string => {
    return sheet.getCellByA1(cell).value as string;
};