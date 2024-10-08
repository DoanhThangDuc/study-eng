import { BadRequestException } from "@nestjs/common";

export class ErrorFormatter {
  execute(exception: any) {
    if (exception instanceof BadRequestException) {
      const errorResponse = (exception.getResponse() as any).message;

      return {
        debugMessage:
          "You have an error in your request's body. Check 'fieldErrors' field for more details!",
        status: "ERROR",
        type: exception.message,
        fieldErrors: errorResponse,
      };
    }

    return {
      debugMessage: exception.getResponse().message,
      options: exception.stack,
      status: "ERROR",
      type: exception.getResponse().error,
    };
  }
}
