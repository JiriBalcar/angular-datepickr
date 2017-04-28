import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { DatePickerComponent } from './datepicker/datepicker';
import { DatePickerContainerComponent } from './datepicker-container/datepicker-container.component';
import { InputDatePickerComponent } from './input-datepicker/input-datepicker.component';
import { TextDatePickerComponent } from './text-datepicker/text-datepicker.component';
import { AngularDatepickerOptions } from './datepicker-options';

export { DatePickerComponent } from './datepicker/datepicker';
export { DatePickerContainerComponent } from './datepicker-container/datepicker-container.component';
export { InputDatePickerComponent } from './input-datepicker/input-datepicker.component';
export { TextDatePickerComponent } from './text-datepicker/text-datepicker.component';
export { AngularDatepickerOptions } from './datepicker-options';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        DatePickerComponent,
        DatePickerContainerComponent,
        InputDatePickerComponent,
        TextDatePickerComponent
    ],
    providers: [],
    exports: [
        DatePickerComponent,
        DatePickerContainerComponent,
        InputDatePickerComponent,
        TextDatePickerComponent
    ]
})
export class AngularDatepickerModule {
    static forRoot(config: AngularDatepickerOptions): ModuleWithProviders {
        return {
            ngModule: AngularDatepickerModule,
            providers: [
                { provide: AngularDatepickerOptions, useValue: config }
            ]
        };
    }
}