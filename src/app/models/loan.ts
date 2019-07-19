import { LoanStatus } from './enums/loan-status';

import { Vehicle } from './vehicle';
import { Client } from './client';


export class Loan {
  public loanStatus: LoanStatus;
  public borrowDate: Date;
  public expiryDate: Date;
  public costPerKilometer: number;
  public costPerAdditionalDay: number;
  public insuranceCost: number;
  public vehicle: Vehicle;
  public client: Client;
  public notes: string;
}
