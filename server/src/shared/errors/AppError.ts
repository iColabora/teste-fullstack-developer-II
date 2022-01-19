interface IAppError {
  message: string;
  statusCode?: number;
  code?: string;
  params?: any;
}

class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  public readonly code?: string;

  public readonly params?: any;

  constructor({ message, statusCode = 400, code, params }: IAppError) {
    this.message = message;
    this.statusCode = statusCode;
    this.code = code;
    this.params = params;
  }
}

export default AppError;
