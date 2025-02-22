export class APIError extends Error {
  code: string;
  statusCode?: number;
  details?: unknown;

  constructor(code: string, statusCode = 400, details?: unknown) {
    super(code);
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }
}
