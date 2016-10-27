import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { InputDatePickerComponent } from './src/input-datepicker/input-datepicker.component';
import { Angular2DatepickerOptions } from './src/datepicker-options';

export { InputDatePickerComponent } from './src/input-datepicker/input-datepicker.component';
export { Angular2DatepickerOptions } from './src/datepicker-options';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule
	],
	declarations: [
		InputDatePickerComponent
	],
	providers: [],
	exports: [
		InputDatePickerComponent
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