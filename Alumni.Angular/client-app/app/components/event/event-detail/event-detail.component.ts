import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';

@Component({
	moduleId: module.id,
	selector: 'event-detail',
	templateUrl: './event-detail.component.html',
	styleUrls: ['./event-detail.component.css']
})

export class EventDetailComponent implements OnInit {
    evdate: Date;
    today: Date = new Date();
	constructor() { }

	ngOnInit() {
        this.evdate = new Date(2018,9,5);
     }
}