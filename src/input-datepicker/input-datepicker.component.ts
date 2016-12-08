import {
    Component, ElementRef, forwardRef, Optional, ViewChild, Input
} from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { Angular2DatepickerOptions } from '../datepicker-options';
import { DatePickerComponent } from '../datepicker/datepicker';
import { DatePickerContainerComponent } from '../datepicker-container/datepicker-container.component';


export const CALENDAR_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputDatePickerComponent),
    multi: true
};

@Component({
    // moduleId: module.id,
    selector: 'jb-input-datepicker',
    templateUrl: './input-datepicker.component.html',
    styleUrls: ['./input-datepicker.component.css'],
    providers: [CALENDAR_VALUE_ACCESSOR]
})
export class InputDatePickerComponent extends DatePickerComponent {
    @ViewChild(DatePickerContainerComponent) datePicker: DatePickerContainerComponent;
    @ViewChild('input') inputEl: ElementRef;
    @Input() options: any;

    constructor(protected elRef: ElementRef,
        @Optional() protected opts: Angular2DatepickerOptions) {
        super(elRef, opts);
    }

    viewDateChanged(event) {
        if (event && event.length > 0) {
            this.onChangeCallback(event);
        } else {
            this.onChangeCallback(null);
        }
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
            // this.close();
        }
    }

}
