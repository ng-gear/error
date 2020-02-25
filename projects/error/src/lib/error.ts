export class NggError {
  readonly type: string;
  readonly message: string;
  readonly data: any;

  constructor(type: string, message: string, data: any) {
    this.type = type;
    this.message = message;
    this.data = data;
  }
}
