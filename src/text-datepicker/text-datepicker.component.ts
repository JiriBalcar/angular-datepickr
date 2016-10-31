import {
  Component, ElementRef, forwardRef, Optional,
  trigger, transition, style, animate, state
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Angular2DatepickerOptions } from '../datepicker-options';
import { DatePicker } from '../datepicker/datepicker';

export const CALENDAR_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextDatePickerComponent),
  multi: true
};

@Component({
  moduleId: module.id,
  selector: 'jb-text-datepicker',
  templateUrl: './text-datepicker.component.html',
  styleUrls: ['./text-datepicker.component.css'],
  providers: [CALENDAR_VALUE_ACCESSOR]
})
export class TextDatePickerComponent extends DatePicker {

  constructor(protected elRef: ElementRef,
    @Optional() protected opts: Angular2DatepickerOptions) {
    super(elRef, opts);
  }

  toggle() {
    if (!this.datePicker.opened) {
      this.open();
    } else {
      //this.close();
    }
  }

}
