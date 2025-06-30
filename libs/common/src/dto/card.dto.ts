import { Type } from 'class-transformer';
import {
  IsCreditCard,
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

type Preferred = 'cartes_bancaires' | 'mastercard' | 'visa';

class Network {
  @IsString()
  @IsNotEmpty()
  preferred: Preferred;
}

export class CardDto {
  /**
   * The card's CVC. It is highly recommended to always include this value.
   */
  @IsString()
  @IsNotEmpty()
  cvc: string;

  /**
   * Two-digit number representing the card's expiration month.
   */
  @IsNumber()
  @IsNotEmpty()
  exp_month: number;

  /**
   * Four-digit number representing the card's expiration year.
   */
  @IsNumber()
  @IsNotEmpty()
  exp_year: number;

  /**
   * Contains information about card networks used to process the payment.
   */
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Network)
  networks: Network;

  /**
   * The card number, as a string without any separators.
   */
  @IsCreditCard()
  @IsNotEmpty()
  number: string;
}
