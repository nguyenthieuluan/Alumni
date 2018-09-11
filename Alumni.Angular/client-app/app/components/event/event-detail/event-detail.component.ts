import {
    EventPlanServiceProxy,
    EventMemberInput
} from "./../../../../shared/service-proxies/service-proxies";
import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Moment } from "moment";
import { EventPlanDetailDto } from "@shared/service-proxies/service-proxies";

@Component({
    selector: "event-detail",
    templateUrl: "./event-detail.component.html",
    styleUrls: ["./event-detail.component.css"]
})
export class EventDetailComponent implements OnInit {
    @Input()
    event: EventPlanDetailDto;
    @Output()
    onAction = new EventEmitter<any>();
    constructor(private remoteEventService: EventPlanServiceProxy) {}

    ngOnInit() {}
    interest() {
        var input = new EventMemberInput();
        input.eventId = this.event.id;
        this.remoteEventService.interestedInEvent(input).subscribe(r => {
            this.onAction.emit({ type: "interest", event: r });
        });
    }
    join() {
        var input = new EventMemberInput();
        input.eventId = this.event.id;
        this.remoteEventService.joinEvent(input).subscribe(r => {
            this.onAction.emit({ type: "join", member: r });
        });
    }
    notInterest() {
        var input = new EventMemberInput();
        input.eventId = this.event.id;
        this.remoteEventService.interestedInEvent(input).subscribe(r => {
            this.onAction.emit({ type: "interest", event: r });
        });
    }
    notJoin() {
        var input = new EventMemberInput();
        input.eventId = this.event.id;
        this.remoteEventService.leaveEvent(input).subscribe(r => {
            this.onAction.emit({ type: "join", member: r });
        });
    }
}
