import { GraphQLError } from "graphql";
import { UserInputError } from "apollo-server";
import { ValidationError } from "class-validator";
import { ArgumentValidationError } from "type-graphql";

export interface IValidationErrorConstraint {
    [type: string]: string;
};

export const formatError = (err: GraphQLError) => {
    let errorThrown = err.originalError!;
    if (err.originalError instanceof ArgumentValidationError) {
        const validationErrors = err.originalError?.validationErrors?.map(
            (validationErr: ValidationError) => validationErr.constraints);
        if (validationErrors && validationErrors.length > 0) {
            const errorCodes = validationErrors.map((validationErr?: IValidationErrorConstraint) => {
                let errorCode = "";
                if (validationErr) {
                    errorCode = Object.values(validationErr)[0]
                }
                return errorCode;
            });
            errorThrown = new UserInputError(err.message, {
                errorCodes: [...new Set(errorCodes)].filter(errCode => errCode)
            });
        }
    }
    console.error(err.originalError);
    return errorThrown;
}