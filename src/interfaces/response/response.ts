interface Response {
  isSuccess: boolean;
  code: number;
  message: string;
}

export const response = ({ isSuccess, code, message }: Response, data: any) => {
  return {
    isSuccess: isSuccess,
    code: code,
    message: message,
    data: data,
  };
};

export const errResponse = ({ isSuccess, code, message }: Response) => {
  return {
    isSuccess: isSuccess,
    code: code,
    message: message,
  };
};
