import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { InputDatePickerComponent } from './src/input-datepicker/input-datepicker.component';

export { InputDatePickerComponent } from './src/input-datepicker/input-datepicker.component';

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
export class Angular2DatepickerModule { }