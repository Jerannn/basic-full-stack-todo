export type ApiErrorDevelopment = {
  error: {
    statusCode: number;
    status: string;
    isOperational: boolean;
  };
  message: string;
  stack: string;
  status: string;
};

export type ApiErrorProduction = {
  status: string;
  message: string;
};
