import {
  Component, ElementRef, forwardRef, OnInit, Input, ViewChild,
  trigger, transition, style, animate, state
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import * as moment from 'moment';

export interface CalendarDate {
  day: number;
  month: number;
  year: number;
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
  @ViewChild('input') inputEl: ElementRef;

  public date: any = moment();
  private onChange: Function;
  private onTouched: Function;
  private el: Element;
  public viewDate: string = null;
  public days: CalendarDate[] = [];
  public weekDayNames: Array<string>;

  private onTouchedCallback: () => void = () => { };
  private onChangeCallback: (_: any) => void = () => { };

  private closePickerOnOutsideClick = (event: MouseEvent) => this.close(event);
  private closePickerOnTab = (event: KeyboardEvent) => this.closeOnTab(event);

  constructor(private elRef: ElementRef) {
    this.weekDayNames = moment.weekdaysShort();
    console.log(moment.locale());
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
    this.format = this.format || 'DD.MM.YYYY';
    this.viewFormat = this.viewFormat || 'DD.MM.YYYY';
    this.firstWeekdaySunday = this.firstWeekdaySunday || false;
    if (!this.firstWeekdaySunday) {
      this.weekDayNames.splice(6, 0, this.weekDayNames.splice(0, 1)[0]);
    }
    this.generateCalendar(true);
  }

  generateCalendar(selectedMonthFlag?: boolean) {
    this.date = selectedMonthFlag && this.value ? moment(this.value, this.format) : moment(this.date);
    let month = this.date.month();
    let year = this.date.year();
    let n: number = 1;
    let firstWeekDay: number = (this.firstWeekdaySunday) ? this.date.date(2).day() : this.date.date(1).day();

    if (firstWeekDay !== 1) {
      n -= (firstWeekDay + 6) % 7;
    }

    this.days = [];
    let selectedDate = moment(this.value, this.viewFormat);
    for (let i = n; i <= this.date.endOf('month').date(); i += 1) {
      let currentDate = moment(`${i}.${month + 1}.${year}`, 'DD.MM.YYYY');
      let today = (moment().isSame(currentDate, 'day') && moment().isSame(currentDate, 'month')) ? true : false;
      let weekend = (moment(currentDate).day() == 6) || (moment(currentDate).day() == 0);
      let selected = (selectedDate.isSame(currentDate, 'day')) ? true : false;

      if (i > 0) {
        this.days.push({
          day: i,
          month: month + 1,
          year: year,
          enabled: true,
          today: today,
          weekend: weekend,
          selected: selected
        });
      } else {
        this.days.push({
          day: null,
          month: null,
          year: null,
          enabled: false,
          today: false,
          weekend: weekend,
          selected: false
        });
      }
    }
  }

  selectDate(e: MouseEvent, i: number) {
    e.preventDefault();

    let date: CalendarDate = this.days[i];
    let selectedDate = moment(`${date.day}.${date.month}.${date.year}`, 'DD.MM.YYYY');
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
