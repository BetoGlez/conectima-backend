import { GoogleSpreadsheet } from "google-spreadsheet";
import sheetCredentials from "../keys/client_secret.json";

export const getSheetDocument = async (sheetId: string): Promise<GoogleSpreadsheet> => {
    const doc = new GoogleSpreadsheet(sheetId);
    await doc.useServiceAccountAuth(sheetCredentials);
    await doc.loadInfo();
    return doc;
};