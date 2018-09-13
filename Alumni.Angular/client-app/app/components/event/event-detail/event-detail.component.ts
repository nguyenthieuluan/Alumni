import {
  EventPlanServiceProxy,
  EventMemberInput,
  EventListInput
} from "@shared/service-proxies/service-proxies";
import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  Injector,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { Moment } from "moment";
import { EventPlanDetailDto } from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";

@Component({
  selector: "event-detail",
  templateUrl: "./event-detail.component.html",
  styleUrls: ["./event-detail.component.css"]
})
export class EventDetailComponent extends AppComponentBase
  implements OnInit, OnChanges {
  @Input()
  event: EventPlanDetailDto;
  @Output()
    onAction = new EventEmitter<any>();
  constructor(
    injector: Injector,
    private remoteEventService: EventPlanServiceProxy
  ) {
    super(injector);
  }

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.event) {
      this.loadComments();
    }
  }
    loadComments() {
     
    const input = new EventListInput();
    input.eventId = this.event.id;
    input.maxResultCount = 20;
    if (!input.eventId) {
      return;
    }
    this.remoteEventService.getEventComments(input).subscribe(r => {
      this.event.comments = r.items;
    });
  }
  addParentComment(evt) {
    this.loadComments();
  }
  interest() {
    const input = new EventMemberInput();
    input.eventId = this.event.id;
    this.remoteEventService.interestedInEvent(input).subscribe(r => {
      this.event.isInterested = true;
      this.onAction.emit({ type: "interest", event: r });
    });
  }
  join() {
    const input = new EventMemberInput();
    input.eventId = this.event.id;

    this.remoteEventService.joinEvent(input).subscribe(r => {
      this.event.isJoined = true;
      this.onAction.emit({ type: "join", member: r });
    });
  }
  notInterest() {
    const input = new EventMemberInput();
    input.eventId = this.event.id;
    this.remoteEventService.interestedInEvent(input).subscribe(r => {
      this.event.isInterested = r.isInterested;
      this.onAction.emit({ type: "interest", event: r });
    });
  }
  notJoin() {
    const input = new EventMemberInput();
    input.eventId = this.event.id;
    this.remoteEventService.leaveEvent(input).subscribe(r => {
      this.event.isJoined = false;
      this.onAction.emit({ type: "join", member: r });
    });
  }
}
