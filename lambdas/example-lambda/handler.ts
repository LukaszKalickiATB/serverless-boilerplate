/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable no-console */
import { Context } from "aws-lambda";
import joi from "joi";

import { awsLambdaResponse } from "../../shared/aws";
import { handleError } from "../../shared/error-handler";
import { winstonLogger } from "../../shared/logger";
import { exampleSchemaValidation } from "./schema-validation";

export async function handle(event: any, _: Context): Promise<any> {
  try {
    const query = event.queryStringParameters;
    const { exampleParam } = joi.attempt(query, exampleSchemaValidation, { abortEarly: false });

    winstonLogger.info(`Example param is: ${exampleParam}`);

    return awsLambdaResponse(200, {
      success: true,
    });
  } catch (e) {
    console.error(e);

    return handleError(e);
  }
}
