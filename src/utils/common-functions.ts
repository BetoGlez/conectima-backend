export const parseCommaNumber = (rawNumber: string): number => {
    return rawNumber ? parseFloat(rawNumber.replace(",", ".")) : -1;
};