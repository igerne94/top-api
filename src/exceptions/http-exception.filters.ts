import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class TestHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // Extract detailed validation error messages if available
    const exceptionResponse = exception.getResponse();
    let validationErrors = [];
    if (typeof exceptionResponse === 'object') {
      const responseBody = exceptionResponse as Record<string, any>;
      if (responseBody.message && Array.isArray(responseBody.message)) {
        validationErrors = responseBody.message;
      }
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: 'Bad Request',
      validationErrors, // Include the detailed errors
    });
  }
}

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    console.log('exception', exception);
    response.status(404).json({
      statusCode: 404,
      timestamp: new Date().toISOString(),
      message: 'Not Found from exception filter',
      error: 'Not Found from exception filter',
    });
  }
}
