import { Injectable } from '@angular/core';

@Injectable()
export class Angular2DatepickerOptions {
  format?: string = 'DD.MM.YYYY';
  viewFormat?: string = 'DD.MM.YYYY';
  firstWeekdaySunday?: boolean = false;
  todayString?: string;
  todayButtonEnabled?: boolean = true;
  todayHighlight?: boolean = true;
  weekendHighlight?: boolean = true;
  closeOnSelect?: boolean = true;
  modalMediaQuery?: string;

  constructor(options?: Object) {
    if (options) {
      Object.assign(this, options);
    }
  }
}