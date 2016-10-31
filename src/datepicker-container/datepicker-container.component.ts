import {
  Component, ElementRef, forwardRef, OnInit, Optional, Input, Output,
  EventEmitter, NgZone, OnDestroy,
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

export interface Week {
  rowId?: number;
  weekNumber?: number;
  days?: Array<CalendarDate>
}

@Component({
  moduleId: module.id,
  selector: 'jb-datepicker-container',
  templateUrl: './datepicker-container.component.html',
  styleUrls: ['./datepicker-container.component.css'],
  animations: [
    trigger('contentAnimation', [
      transition('void => *', [
        style({ opacity: '0' }),
        animate('200ms ease-in')
      ]),
      transition('* => void', [
        animate('300ms ease-out', style({opacity: '0'}))
      ])
    ])
  ]
})
export class DatePickerContainerComponent implements OnInit, OnDestroy {
  @Output() onDateSelected = new EventEmitter();

  public opened: boolean = false;
  public date: any = moment();
  private el: Element;
  private inputDate: string = null;
  public weeks: Array<Week>;
  public weekDayNames: Array<string>;
  public days: Array<any> = [];
  public mqMatches: boolean;
  private modalMediaQuery: string;

  public weekendHighlight: boolean;
  public todayHighlight: boolean;
  public todayString: boolean;

  private firstWeekdaySunday: boolean;

  private mq: MediaQueryList;

  private watchMediaQuery = (mql: MediaQueryList) => {
    this.zone.run(() => {
      this.mqMatches = this.mq.matches ? true : false;
    });
  }

  constructor(private elRef: ElementRef,
    private zone: NgZone,
    @Optional() private options: Angular2DatepickerOptions) {
    this.weekDayNames = moment.weekdaysShort();
  }

  get value(): any {
    return this.inputDate;
  }

  mergeOptions(options: Angular2DatepickerOptions) {
    Object.assign(this, options);
  }

  set value(value: any) {
    let date = (value instanceof moment) ? value : moment(value, 'DD.MM.YYYY');
    this.inputDate = date.isValid() ? date.format('DD.MM.YYYY') : value;
  }

  ngOnInit() {
    if (!this.firstWeekdaySunday) {
      this.weekDayNames.splice(6, 0, this.weekDayNames.splice(0, 1)[0]);
    }

    if (this.modalMediaQuery) {
      this.mq = window.matchMedia(`(${this.modalMediaQuery})`);
    }
  }

  generateCalendar(selectedMonthFlag?: boolean) {
    this.date = selectedMonthFlag && this.value ? moment(this.value, 'DD.MM.YYYY') : moment(this.date);
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
    let selectedDate = moment(this.value, 'DD.MM.YYYY');

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
    this.value = today;
    this.generateCalendar(true);
    this.onDateSelected.emit(today.format('DD.MM.YYYY'));
  }

  selectDate(e: MouseEvent, d: CalendarDate) {
    e.preventDefault();

    let selectedDate = moment(`${d.day}.${d.month}.${d.year}`, 'DD.MM.YYYY');
    this.value = selectedDate;
    this.generateCalendar(true);
    this.onDateSelected.emit(this.inputDate);
  }

  prevMonth() {
    this.date = this.date.subtract(1, 'month');
    this.generateCalendar();
  }

  nextMonth() {
    this.date = this.date.add(1, 'month');
    this.generateCalendar();
  }

  open() {
    this.opened = true;
    this.generateCalendar(true);
    if (this.mq) {
      this.mqMatches = this.mq.matches ? true : false;
      this.mq.addListener(this.watchMediaQuery);
    }
  }

  close() {
    this.opened = false;
    this.mq.removeListener(this.watchMediaQuery);
  }

  ngOnDestroy() {
    this.mq.removeListener(this.watchMediaQuery);
  }
}
