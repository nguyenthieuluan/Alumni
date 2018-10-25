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
  SimpleChanges,
  ViewChild,
  ElementRef,
  ViewEncapsulation
} from "@angular/core";
import { Moment } from "moment";
import { EventPlanDetailDto } from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";
import { Router } from "@angular/router";
import { ModalDirective } from "ngx-bootstrap";
import { UploadOutput } from "ngx-uploader";

@Component({
  selector: "event-detail",
  templateUrl: "./event-detail.component.html",
  styleUrls: ["./event-detail.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class EventDetailComponent extends AppComponentBase
  implements OnInit, OnChanges {

  @ViewChild('createModal') modal: ModalDirective;
  @ViewChild('modalContent') modalContent: ElementRef;
  @Input() event: EventPlanDetailDto;
  
  mediaFile: File;

  @Output()
    onAction = new EventEmitter<any>();
  constructor(
    injector: Injector,
    private remoteEventService: EventPlanServiceProxy,
    private router: Router
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
  deleteEvent() {
    const input = new EventMemberInput();
    input.eventId = this.event.id;
    input.userId = this.appSession.userId;

    this.remoteEventService.removeEventHosts(input).subscribe( () => {
      //this.onAction.emit({ type: "deleted", event: r });
      this.router.navigate(['./app/page',this.event.page.userName,'events'])
    }, error => console.log(error))
  }

  updateEvent() {
    this.remoteEventService.updateEvent(this.event).subscribe( () => {
      this.notify.success("Lưu thành công.","",{ positionClass: "toast-top-right" });
      this.close();
    })
  }
  show() {
    this.modal.show();
  }
  close() {
    this.modal.hide();
  }
  removeFile() {
    this.event.eventPhoto = "";
    this.mediaFile = null;
  }
  ///upload stuffs
  onUploadOutput(output: UploadOutput): void {
    if (output.type === "allAddedToQueue") {
    } else if (
      (output.type === "addedToQueue" || output.type === "rejected") &&
      typeof output.file !== "undefined"
    ) {
      if (output.file.type.startsWith("image/")) {
        this.mediaFile = output.file.nativeFile;
      }
    } else if (output.type === "removed") {
    } else if (output.type === "start") {
    } else if (output.type === "done") {
    }
  }
  
  setImgData(data: string): void {
    this.event.eventPhoto = data;
  }

}
