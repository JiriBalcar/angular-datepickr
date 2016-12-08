import {
  Component, ElementRef, forwardRef, Optional, ViewChild, Input
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Angular2DatepickerOptions } from '../datepicker-options';
import { DatePickerComponent } from '../datepicker/datepicker';
import { DatePickerContainerComponent } from '../datepicker-container/datepicker-container.component';

export const CALENDAR_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextDatePickerComponent),
  multi: true
};

@Component({
  // moduleId: module.id,
  selector: 'jb-text-datepicker',
  templateUrl: './text-datepicker.component.html',
  styleUrls: ['./text-datepicker.component.css'],
  providers: [CALENDAR_VALUE_ACCESSOR]
})
export class TextDatePickerComponent extends DatePickerComponent {
   @ViewChild(DatePickerContainerComponent) datePicker: DatePickerContainerComponent;
   @Input() options: any;

  constructor(protected elRef: ElementRef,
    @Optional() protected opts: Angular2DatepickerOptions) {
    super(elRef, opts);
  }
}
