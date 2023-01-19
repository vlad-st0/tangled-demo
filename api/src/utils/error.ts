export class Error401 {
  message;
  status = 401;

  constructor(message?: string) {
    this.message = message ?? 'Unauthorized access';
  }
}

export class Error403 {
  message;
  status = 403;

  constructor(message?: string) {
    this.message = message ?? 'Forbidden access';
  }
}
