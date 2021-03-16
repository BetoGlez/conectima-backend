import moment from "moment";

import { ApiConstants } from "../api.constants";

export const parseCommaNumber = (rawNumber: string): number => {
    return rawNumber ? parseFloat(rawNumber.replace(ApiConstants.COMMA_CHAR, ApiConstants.DOT_CHAR)) : -1;
};

export const getValueAfterColon = (rawValue: string): string => {
    return rawValue ? rawValue.split(`${ApiConstants.COLON_CHAR} `)[1] : rawValue;
};

export const calculateWorkDays = (startDate: string, endDate: string): number => {
    const saturdayWeekNumber = 6;
    const sundayWeekNumber = 0;
    let day1 = moment(startDate, ApiConstants.DATE_FORMAT).startOf("day");
    let day2 = moment(endDate, ApiConstants.DATE_FORMAT).startOf("day");
    let adjust = 1;

    if (day1.dayOfYear() === day2.dayOfYear() && day1.year() === day2.year()) {
        return 0;
    }

    if (day2.isBefore(day1)) {
        const temp = day1;
        day1 = day2;
        day2 = temp;
    }

    //Check if dates start on weekends
    if (day1.day() === saturdayWeekNumber) {
        //Move date to next week monday
        day1.day(8);
    } else if (day1.day() === sundayWeekNumber) {
        //Move date to current week monday
        day1.day(1);
    }
    if (day2.day() === saturdayWeekNumber) {
        //Move date to current week friday
        day2.day(5);
    } else if (day2.day() === sundayWeekNumber) {
        //Move date to previous week friday
        day2.day(-2);
    }

    const day1Week = day1.week();
    let day2Week = day2.week();

    //Check if two dates are in different week of the year
    if (day1Week !== day2Week) {
        //Check if second date's year is different from first date's year
        if (day2Week < day1Week) {
            day2Week += day1Week;
        }
        //Calculate adjust value to be substracted from difference between two dates
        adjust += -2 * (day2Week - day1Week);
    }

    return day2.diff(day1, "days") + adjust;
};
