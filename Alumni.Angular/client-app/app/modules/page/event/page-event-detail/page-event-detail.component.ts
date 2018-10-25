import {
  EventListInput,
  EventMemberInput
} from "./../../../../../shared/service-proxies/service-proxies";
import { ActivatedRoute } from "@angular/router";
import {
  EventPlanDetailDto,
  EventPlanServiceProxy,
  UserProfileDto
} from "@shared/service-proxies/service-proxies";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "page-event-detail",
  templateUrl: "./page-event-detail.component.html"
})
export class PageEventDetailComponent implements OnInit {
  model: EventPlanDetailDto = new EventPlanDetailDto();
  interestList: UserProfileDto[] = [];
  participantList: UserProfileDto[] = [];
  constructor(
    private remoteEventService: EventPlanServiceProxy,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const guid = this.activeRoute.snapshot.params["id"];
    this.model.guid = guid;
    this.remoteEventService.getEventDetail(this.model).subscribe(r => {
      this.model = r;
      this.getInterestList(r);
      this.getParticipantList(r);
    });
  }
  getInterestList(evt: EventPlanDetailDto) {
    const input = new EventMemberInput();
    input.eventId = evt.id;
    input.maxResultCount = 20;
    this.remoteEventService.getEventInterestList(input).subscribe(r => {
      this.interestList = r.map(ev => {
        return ev.participant;
      });
    });
  }

  getParticipantList(evt: EventPlanDetailDto) {
    const input = new EventMemberInput();
    input.eventId = evt.id;
    input.maxResultCount = 20;
    this.remoteEventService.getEventUserList(input).subscribe(r => {
      this.participantList = r.map(ev => {
        return ev.participant;
      });
      //console.log(this.participantList);
    });
  }
  processAction(evt) {
    if (evt) {
      if (evt.type == "join" || evt.type == "notJoin") {
        this.getParticipantList(this.model);
      }
      if (evt.type == "interest" || evt.type == "notInterest") {
        this.getInterestList(this.model);
      }
    }
  }
}
