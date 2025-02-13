export class ResponseDto<T> {
    isError: boolean;
    message: string;
    data: T;
  
    constructor(isError: boolean, message: string, data: T) {
      this.isError = isError;
      this.message = message;
      this.data = data;
    }
  }
  