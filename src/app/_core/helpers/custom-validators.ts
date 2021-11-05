import { FormControl } from '@angular/forms';
// import * as moment from 'moment';

export class CustomValidators {
  static mustMatch(matchingControlName: string) {
    return function (control: FormControl) {
      const formGroup = control ? control.parent : null;
      if (formGroup) {
        const matchingControl: any = formGroup.get(matchingControlName);
        if (control.value !== matchingControl.value) {
          return { mustMatch: true };
        }
      }
      return null;
    };
  }

  static isEmail() {
    return function (control: FormControl) {
      const regex = RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      if (control && control.value && control.value.match(regex)) {
        return null;
      } else {
        return { isEmail: { error: true } };
      }
    };
  }

  //   static validDate() {
  //     return function (control: FormControl) {
  //       if (control && control.value && moment(control.value, 'MM-DD-YYYY', true).isValid()) {
  //         return null;
  //       }else{
  //         return { 'validDate': true };
  //       }
  //     }
  //   }

  static isEmailArray() {
    return function (control: FormControl) {
      const regex = RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      if (!control.value) return null;
      if (control && control.value && control.value.pop().match(regex)) {
        return null;
      } else {
        return { isEmailArray: { error: true } };
      }
    };
  }

  static isUrl() {
    return function (control: FormControl) {
      const regex = RegExp(
        /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/
      );
      if (!control.value) return null;
      if (control && control.value.match(regex)) {
        return null;
      } else {
        return { isUrl: { error: true } };
      }
    };
  }

  static isMobile() {
    return function (control: FormControl) {
      const regex = RegExp(/^\d{10}$/g);
      if (
        (control && control.value && control.value.toString().match(regex)) ||
        !control.value
      ) {
        return null;
      } else {
        return { isMobile: { error: true } };
      }
    };
  }

  static isSecurityNumber() {
    return function (control: FormControl) {
      // const regex = RegExp(/^\d{3}-\d{2}-\d{4}$/);
      const regex = RegExp(/[0-9]{9}$/);
      if (control && control.value && control.value.match(regex)) {
        return null;
      } else {
        return { isSecurityNumber: { error: true } };
      }
    };
  }

  static isOTP() {
    return function (control: FormControl) {
      const regex = RegExp(/[0-9]{4}$/);
      if (control && control.value && control.value.match(regex)) {
        return null;
      } else {
        return { isOTP: { error: true } };
      }
    };
  }

  static isNotEmptyArray() {
    return function (control: FormControl) {
      if (control && control.value && control.value.length > 0) {
        return null;
      } else {
        return { isNotEmptyArray: { error: true } };
      }
    };
  }
}
