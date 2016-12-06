import {
  Component, ElementRef, forwardRef, Optional, ViewChild, Input,
  trigger, transition, style, animate, state
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Angular2DatepickerOptions } from '../datepicker-options';
import { DatePicker } from '../datepicker/datepicker';
import { DatePickerContainerComponent } from '../datepicker-container/datepicker-container.component';


export const CALENDAR_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputDatePickerComponent),
  multi: true
};

@Component({
  //moduleId: module.id,
  selector: 'jb-input-datepicker',
  templateUrl: './input-datepicker.component.html',
  styleUrls: ['./input-datepicker.component.css'],
  providers: [CALENDAR_VALUE_ACCESSOR]
})
export class InputDatePickerComponent extends DatePicker {
  @ViewChild(DatePickerContainerComponent) datePicker: DatePickerContainerComponent;
  @ViewChild('input') inputEl: ElementRef;
  @Input() options: any;

  constructor(protected elRef: ElementRef,
    @Optional() protected opts: Angular2DatepickerOptions) {
    super(elRef, opts);
  }

  toggle(event?: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (!this.datePicker.opened) {
      if (this.viewDate) {
        this.inputEl.nativeElement.setSelectionRange(0, this.viewDate.length);
      }
      this.open(event);
    } else {
      //this.close();
    }
  }

}
