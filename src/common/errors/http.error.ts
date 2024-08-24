import { BaseHttpError } from "./base.error";

export class BadRequestError extends BaseHttpError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class UnauthorizedError extends BaseHttpError {
  constructor(message: string) {
    super(message, 401);
  }
}

export class NotFoundError extends BaseHttpError {
  constructor(message: string) {
    super(message, 404);
  }
}
