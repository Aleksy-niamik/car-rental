import { LicenseType } from './enums/license-type'


export class Client {
  public name: string;
  public surname: string;
  public age: number;
  public license: LicenseType;
  public trailerLicense: boolean;
  public yearsOfDriving: number;
}
