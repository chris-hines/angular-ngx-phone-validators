import { Directive, Input, forwardRef, OnInit } from "@angular/core";
import {
  NG_VALIDATORS,
  Validator,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from "@angular/forms";

import { PhoneValidators } from "./phone-validators";

@Directive({
  selector:
    "[possiblePhone][formControlName],[possiblePhone][formControl],[possiblePhone][ngModel]",
  providers: [
    {
      provide: NG_VALIDATORS,
      // tslint:disable-next-line:no-forward-ref
      useExisting: forwardRef(() => PossiblePhoneValidatorDirective),
      multi: true,
    },
  ],
})
export class PossiblePhoneValidatorDirective implements Validator, OnInit {
  @Input() possiblePhone = "US";

  private validator: ValidatorFn;

  ngOnInit(): void {
    this.validator = PhoneValidators.isPossibleNumberWithReason(
      this.possiblePhone
    );
  }

  validate(c: AbstractControl): ValidationErrors {
    return this.validator(c);
  }
}

@Directive({
  selector: "[phone][formControlName],[phone][formControl],[phone][ngModel]",
  providers: [
    {
      provide: NG_VALIDATORS,
      // tslint:disable-next-line:no-forward-ref
      useExisting: forwardRef(() => PhoneValidatorDirective),
      multi: true,
    },
  ],
})
export class PhoneValidatorDirective implements Validator, OnInit {
  @Input() phone = "US";

  private validator: ValidatorFn;

  ngOnInit(): void {
    this.validator = PhoneValidators.isPhoneNumber(this.phone);
  }

  validate(c: AbstractControl): ValidationErrors {
    return this.validator(c);
  }
}

@Directive({
  selector:
    "[countryCode][formControlName],[countryCode][formControl],[countryCode][ngModel]",
  providers: [
    {
      provide: NG_VALIDATORS,
      // tslint:disable-next-line:no-forward-ref
      useExisting: forwardRef(() => CountryCodeValidatorDirective),
      multi: true,
    },
  ],
})
export class CountryCodeValidatorDirective implements Validator, OnInit {
  private validator: ValidatorFn;

  ngOnInit(): void {
    this.validator = PhoneValidators.isValidRegionCode;
  }

  validate(c: AbstractControl): ValidationErrors {
    return this.validator(c);
  }
}
