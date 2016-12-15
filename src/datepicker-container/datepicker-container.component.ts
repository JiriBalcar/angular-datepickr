import {
    Component, ElementRef, Output,
    EventEmitter, NgZone, OnDestroy,
    trigger, transition, style, animate
} from '@angular/core';
import { AngularDatepickerOptions } from '../datepicker-options';

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
    // moduleId: module.id,
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
                animate('300ms ease-out', style({ opacity: '0' }))
            ])
        ])
    ]
})
export class DatePickerContainerComponent implements OnDestroy {
    @Output() onDateSelected = new EventEmitter();

    public opened: boolean = false;
    public date: moment.Moment = moment();
    public inputDate: moment.Moment;
    public weeks: Array<Week>;
    public weekDayNames: Array<string>;
    public days: Array<any> = [];
    public mqMatches: boolean;
    private options: AngularDatepickerOptions = {};

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
        private zone: NgZone) {
    }

    mergeOptions(options: AngularDatepickerOptions) {
        Object.assign(this.options, options);
    }

    generateCalendar(selectedMonthFlag?: boolean) {
        this.weekDayNames = moment.weekdaysShort();
        if (!this.firstWeekdaySunday) {
            this.weekDayNames.splice(6, 0, this.weekDayNames.splice(0, 1)[0]);
        }
        this.date = selectedMonthFlag && this.inputDate ? this.inputDate.clone() : moment(this.date);
        let month = this.date.month();
        let firstDay = this.date.clone().startOf('month');
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
        let selectedDate = this.inputDate;

        for (let i = 1; i <= rows; i += 1) {
            let days = [];
            for (let i = 1; i <= 7; i += 1) {
                let today = (moment().isSame(currentDate, 'day') && moment().isSame(currentDate, 'month')) ? true : false;
                let weekend = (moment(currentDate).day() == 6) || (moment(currentDate).day() == 0);
                let selected = (selectedDate && selectedDate.isSame(currentDate, 'day')) ? true : false;
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
        this.inputDate = today;
        this.generateCalendar(true);
        this.onDateSelected.emit(this.inputDate);
    }

    selectDate(e: MouseEvent, d: CalendarDate) {
        e.preventDefault();

        this.inputDate = moment(`${d.day}.${d.month}.${d.year}`, 'DD.MM.YYYY');
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
        if (this.options.modalMediaQuery) {
            this.mq = window.matchMedia(`(${this.options.modalMediaQuery})`);
            this.mqMatches = this.mq.matches ? true : false;
            this.mq.addListener(this.watchMediaQuery);
        }
    }

    close() {
        this.opened = false;
        if (this.mq) {
            this.mq.removeListener(this.watchMediaQuery);
        }
    }

    ngOnDestroy() {
        if (this.mq) {
            this.mq.removeListener(this.watchMediaQuery);
        }
    }
}
