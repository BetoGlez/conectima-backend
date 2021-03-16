import { ApiConstants } from "../api.constants";

export const parseCommaNumber = (rawNumber: string): number => {
    return rawNumber ? parseFloat(rawNumber.replace(ApiConstants.COMMA_CHAR, ApiConstants.DOT_CHAR)) : -1;
};

export const getValueAfterColon = (rawValue: string): string => {
    return rawValue ? rawValue.split(`${ApiConstants.COLON_CHAR} `)[1] : rawValue;
};