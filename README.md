# Angular-datepickr
Angular Datepicker Component

***angular-datepickr*** is a datepicker component for Angular 2.0.0+.

## Demo

Desktop
![Desktop](/images/desktop.jpg)

Modal
![Modal](/images/modal.jpg)

## Installation

Required libraries:
***moment.js***

Install angular-datepickr via `npm`

````shell
npm install angular-datepickr --save
````

## Usage
```javascript
import { AngularDatepickerModule } from 'angular-datepickr/angular-datepickr';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        AngularDatepickerModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
```

```html
<jb-input-datepicker formControlName="date"></jb-input-datepicker>
<jb-text-datepicker formControlName="date2"></jb-text-datepicker>
```


## Configuration
**Global configuration**

```javascript
AngularDatepickerModule.forRoot(new AngularDatepickerOptions({ todayString: 'DNES', modalMediaQuery: 'max-width: 750px' }))
```

**Local configuration**
```html
<jb-input-datepicker formControlName="date" [options]="{todayHighlight:'false'}"></jb-input-datepicker>
```

Option | Description | Default
------------ | ------------- | -------------
format: string | format for model value | 'DD.MM.YYYY'
viewFormat: string | format for view | 'DD.MM.YYYY'
firstWeekdaySunday: boolean | week in calendar starts with sunday | false;
todayString: string| text on the today button | TODAY
todayButtonEnabled: boolean | today button is shown | true
todayHighlight: boolean | today is highlighted | true
weekendHighlight: boolean | saturday and sunday is highlighted with color | true
modalMediaQuery: string | media query which will be matched to show calendar in modal | none


## Licence

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.

## Contributing

Filling issues and Pull requests are welcome

