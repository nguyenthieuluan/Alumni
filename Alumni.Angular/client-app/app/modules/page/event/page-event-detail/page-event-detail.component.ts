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
    templateUrl: "./page-event-detail.component.html",
    styleUrls: ["./page-event-detail.component.css"]
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
        let guid = this.activeRoute.snapshot.params["id"];
        this.model.guid = guid;
        this.remoteEventService.getEventDetail(this.model).subscribe(r => {
            this.model = r;
            this.getInterestList(r);
            this.getParticipantList(r);
        });
    }
    getInterestList(evt: EventPlanDetailDto) {
        var input = new EventMemberInput();
        input.eventId = evt.id;
        this.remoteEventService.getEventInterestList(input).subscribe(r => {
            this.interestList = r.map(ev => {
                return ev.participant;
            });
        });
    }

    getParticipantList(evt: EventPlanDetailDto) {
        var input = new EventMemberInput();
        input.eventId = evt.id;
        this.remoteEventService.getEventInterestList(input).subscribe(r => {
            this.participantList = r.map(ev => {
                return ev.participant;
            });
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
