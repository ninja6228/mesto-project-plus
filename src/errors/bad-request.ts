class BadRequst extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 400;
  }
}

export default BadRequst;
