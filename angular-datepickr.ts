import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { DatePickerComponent } from './src/datepicker/datepicker';
import { DatePickerContainerComponent } from './src/datepicker-container/datepicker-container.component';
import { InputDatePickerComponent } from './src/input-datepicker/input-datepicker.component';
import { TextDatePickerComponent } from './src/text-datepicker/text-datepicker.component';
import { Angular2DatepickerOptions } from './src/datepicker-options';

export { DatePickerComponent } from './src/datepicker/datepicker';
export { DatePickerContainerComponent } from './src/datepicker-container/datepicker-container.component';
export { InputDatePickerComponent } from './src/input-datepicker/input-datepicker.component';
export { TextDatePickerComponent } from './src/text-datepicker/text-datepicker.component';
export { AngularDatepickerOptions } from './src/datepicker-options';

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