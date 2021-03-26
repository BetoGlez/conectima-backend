import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import moment from "moment";

import { ApiConstants } from "../api.constants";

@ValidatorConstraint()
export class IsDateFormatValidConstraint implements ValidatorConstraintInterface {
    public validate(date: string): boolean {
        return moment(date, ApiConstants.DATE_FORMAT, true).isValid();
    }
}

export const IsDateFormatValid = (validationOpts?: ValidationOptions) => {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOpts,
            constraints: [],
            validator: IsDateFormatValidConstraint
        });
    };
}