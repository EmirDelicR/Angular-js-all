export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  get token() {
    const isTokenNotValid =
      !this._tokenExpirationDate || new Date() > this._tokenExpirationDate;

    return isTokenNotValid ? null : this._token;
  }
}
