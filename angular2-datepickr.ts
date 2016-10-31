import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { DatePicker } from './src/datepicker/datepicker';
import { DatePickerContainerComponent } from './src/datepicker-container/datepicker-container.component';
import { InputDatePickerComponent } from './src/input-datepicker/input-datepicker.component';
import { TextDatePickerComponent } from './src/text-datepicker/text-datepicker.component';
import { Angular2DatepickerOptions } from './src/datepicker-options';

export { DatePicker } from './src/datepicker/datepicker';
export { DatePickerContainerComponent } from './src/datepicker-container/datepicker-container.component';
export { InputDatePickerComponent } from './src/input-datepicker/input-datepicker.component';
export { TextDatePickerComponent } from './src/text-datepicker/text-datepicker.component';
export { Angular2DatepickerOptions } from './src/datepicker-options';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule
	],
	declarations: [
		DatePicker,
		DatePickerContainerComponent,
		InputDatePickerComponent,
		TextDatePickerComponent
	],
	providers: [],
	exports: [
		DatePicker,
		DatePickerContainerComponent,
		InputDatePickerComponent,
		TextDatePickerComponent
	]
})
export class Angular2DatepickerModule {
	static forRoot(config: Angular2DatepickerOptions): ModuleWithProviders {
		return {
			ngModule: Angular2DatepickerModule,
			providers: [
				{ provide: Angular2DatepickerOptions, useValue: config }
			]
		};
	}
}