import {
  Component, ElementRef, forwardRef, OnInit, Optional, Input, ViewChild,
  trigger, transition, style, animate, state
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Angular2DatepickerOptions } from '../datepicker-options';

import * as moment from 'moment';

export interface CalendarDate {
  day: number;
  month: number;
  year: number;
  differentMonth: boolean;
  enabled: boolean;
  today: boolean;
  weekend: boolean;
  selected: boolean;
}

export const CALENDAR_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputDatePickerComponent),
  multi: true
};

@Component({
  moduleId: module.id,
  selector: 'jb-input-datepicker',
  templateUrl: './input-datepicker.component.html',
  styleUrls: ['./input-datepicker.component.css'],
  providers: [CALENDAR_VALUE_ACCESSOR],
  animations: [
    trigger('contentAnimation', [
      state('true', style({ opacity: '1' })),
      state('false', style({ opacity: '0' })),
      transition('0 => 1', [
        animate('200ms ease-in')
      ]),
      transition('1 => 0', [
        animate('200ms ease-out')
      ])
    ])
  ]
})
export class InputDatePickerComponent implements ControlValueAccessor, OnInit {
  @Input() class: string;
  @Input() opened: boolean;
  @Input() format: string;
  @Input() viewFormat: string;
  @Input() firstWeekdaySunday: boolean;
  @Input() todayString: string;
  @Input() todayButtonEnabled: boolean;
  @Input() todayHighlight: boolean;
  @Input() weekendHighlight: boolean;
  @ViewChild('input') inputEl: ElementRef;

  public date: any = moment();
  private onChange: Function;
  private onTouched: Function;
  private el: Element;
  public viewDate: string = null;
  public weeks: Array<{ rowId?: number; days?: Array<CalendarDate> }>;
  public weekDayNames: Array<string>;
  public days: Array<any> = [];

  private onTouchedCallback: () => void = () => { };
  private onChangeCallback: (_: any) => void = () => { };

  private closePickerOnOutsideClick = (event: MouseEvent) => this.close(event);
  private closePickerOnTab = (event: KeyboardEvent) => this.closeOnTab(event);

  constructor(private elRef: ElementRef,
    @Optional() private options: Angular2DatepickerOptions) {
    this.weekDayNames = moment.weekdaysShort();
  }

  get value(): any {
    return this.viewDate;
  }

  set value(value: any) {
    let date = (value instanceof moment) ? value : moment(value, this.format);
    this.viewDate = date.isValid() ? date.format(this.viewFormat) : value;
    this.onChangeCallback(this.value);
  }

  ngOnInit() {
    this.opened = this.opened || false;
    if (!this.firstWeekdaySunday) {
      this.weekDayNames.splice(6, 0, this.weekDayNames.splice(0, 1)[0]);
    }
    if (this.options) {
      if (typeof this.format === 'undefined') {
        this.format = this.options.format;
      }
      if (typeof this.viewFormat === 'undefined') {
        this.viewFormat = this.options.viewFormat;
      }
      if (typeof this.firstWeekdaySunday === 'undefined') {
        this.firstWeekdaySunday = this.options.firstWeekdaySunday;
      } else {
        this.firstWeekdaySunday = this.firstWeekdaySunday.toString() === 'true';
      }
      if (typeof this.todayString === 'undefined') {
        this.todayString = this.options.todayString;
      }
      if (typeof this.todayButtonEnabled === 'undefined') {
        this.todayButtonEnabled = this.options.todayButtonEnabled;
      } else {
        this.todayButtonEnabled = this.todayButtonEnabled.toString() === 'true';
      }
      if (typeof this.todayHighlight === 'undefined') {
        this.todayHighlight = this.options.todayHighlight;
      } else {
        this.todayHighlight = this.todayHighlight.toString() === 'true';
      }
      if (typeof this.weekendHighlight === 'undefined') {
        this.weekendHighlight = this.options.weekendHighlight;
      } else {
        this.weekendHighlight = this.weekendHighlight.toString() === 'true';
      }
    }
  }

  generateCalendar(selectedMonthFlag?: boolean) {
    this.date = selectedMonthFlag && this.value ? moment(this.value, this.format) : moment(this.date);
    let month = this.date.month();
    let year = this.date.year();
    let firstDay = moment(`01.${month + 1}.${year}`, 'DD.MM.YYYY');
    let offset = null;
    if (this.firstWeekdaySunday) {
      offset = firstDay.day() === 0 ? 7 : firstDay.day();
    } else {
      offset = firstDay.day() === 0 ? 6 : firstDay.day() - 1;
    }
    let daysInMonth = this.date.daysInMonth();
    let rows = Math.ceil((offset + daysInMonth) / 7);
    this.weeks = [];

    let currentDate = firstDay.subtract(offset, 'day');
    let selectedDate = moment(this.value, this.viewFormat);

    for (let i = 1; i <= rows; i += 1) {
      let days = [];
      for (let i = 1; i <= 7; i += 1) {
        let today = (moment().isSame(currentDate, 'day') && moment().isSame(currentDate, 'month')) ? true : false;
        let weekend = (moment(currentDate).day() == 6) || (moment(currentDate).day() == 0);
        let selected = (selectedDate.isSame(currentDate, 'day')) ? true : false;
        days.push({
          day: currentDate.date(),
          month: currentDate.month() + 1,
          year: currentDate.year(),
          enabled: true,
          differentMonth: month === currentDate.month(),
          today: today,
          weekend: weekend,
          selected: selected
        });
        currentDate.add(1, 'day');
      }
      this.weeks.push({ rowId: i, days: days });
    }
  }

  setToday() {
    let today = moment();
    this.value = today.format(this.format);
    this.viewDate = today.format(this.viewFormat);
    this.generateCalendar(true);
     this.opened = false;
  }

  selectDate(e: MouseEvent, d: CalendarDate) {
    e.preventDefault();

    let selectedDate = moment(`${d.day}.${d.month}.${d.year}`, 'DD.MM.YYYY');
    this.value = selectedDate.format(this.format);
    this.viewDate = selectedDate.format(this.viewFormat);
    this.opened = false;
  }

  prevMonth() {
    this.date = this.date.subtract(1, 'month');
    this.generateCalendar();
  }

  nextMonth() {
    this.date = this.date.add(1, 'month');
    this.generateCalendar();
  }

  writeValue(value: any) {
    this.viewDate = value;
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  toggle() {
    if (!this.opened) {
      this.inputEl.nativeElement.setSelectionRange(0, this.viewDate.length);
      this.open();
    } else {
      this.close();
    }
  }

  open() {
    this.opened = true;
    window.addEventListener('click', this.closePickerOnOutsideClick, true);
    window.addEventListener("keydown", this.closePickerOnTab, true);
    this.generateCalendar(true);
  }

  close(event?) {
    window.removeEventListener("keydown", this.closePickerOnTab, true);
    if (event && this.elRef.nativeElement.contains(event.target)) {
      return;
    }
    this.opened = false;
    this.value = this.viewDate;
    this.onTouchedCallback();
    window.removeEventListener('click', this.closePickerOnOutsideClick, true);
  }

  closeOnTab(event) {
    if (event.keyCode == 9) {
      if (this.viewDate) {
        this.value = this.viewDate;
      }
      this.onTouchedCallback();
      this.close();
    }
  }
}
