export interface ApiError {
  message: string;
  error: string;
  statusCode: number;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ErrorResponse {
  message: string;
  errors?: ValidationError[];
  statusCode: number;
}
