import {
  Input,
  Component,
  EventEmitter,
  ElementRef,
  ViewChild,
  Output,
  OnInit,
  Injector
} from "@angular/core";
import {
  UploadOutput,
  UploadInput,
  UploadFile,
  humanizeBytes,
  UploaderOptions
} from "ngx-uploader";
import {
  EventPlanDetailDto,
  EventPlanServiceProxy,
  EventCommentDetailDto
} from "@shared/service-proxies/service-proxies";
import { forEach } from "@angular/router/src/utils/collection";
import { identifierModuleUrl } from "@angular/compiler";
import { AppConsts } from "@shared/AppConsts";
import { TokenService } from "@abp/auth/token.service";
import { AppComponentBase } from "@shared/app-component-base";
@Component({
  selector: "event-comment-editor",
  templateUrl: "./event-comment-editor.component.html",
  styleUrls: ["./event-comment-editor.component.css"]
})
export class EventCommentEditorComponent extends AppComponentBase
  implements OnInit {
  @Input()
  event: EventPlanDetailDto;
  @Input()
  parentComment?: EventCommentDetailDto;
  comment: EventCommentDetailDto = new EventCommentDetailDto();
  @Output()
  onCommentAdded = new EventEmitter<EventCommentDetailDto>();
  isChildMode = false;

  @ViewChild("imgQueue")
  imgQueue: ElementRef;
  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  private isEditMode = false;
  uploadRemains = 0;
  private baseUrl: string;
  constructor(
    injector: Injector,
    private _eventService: EventPlanServiceProxy,
    private _tokenService: TokenService
  ) {
    super(injector);
    this.options = { concurrency: 8, maxUploads: 30 };
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }

  ngOnInit() {
    this.comment.eventId = this.event.id;
    this.comment.parentId = null;
    if (this.parentComment) {
      this.isChildMode = true;
      this.comment.parentId = this.parentComment.id;
    }
  }
  onEnter(evt: KeyboardEvent): void {
    evt.preventDefault();
    this.addComment();
  }
  onCtrlEnter(evt: KeyboardEvent): void {
    evt.preventDefault();

    const v = evt.srcElement as any;
    const startPos = v.selectionStart;
    const endPos = v.selectionEnd;
    v.value = v.value.substr(0, endPos) + "\n" + v.value.substr(endPos);
    v.setSelectionRange(endPos + 1, endPos + 1);
  }
  addComment() {
    this.comment.eventId = this.event.id;
    this.comment.parentId = null;
    if (this.parentComment) {
      this.isChildMode = true;
      this.comment.parentId = this.parentComment.id;
    }
    this._eventService
      .addEventComment(this.comment)
      .subscribe(r => (this.onCommentAdded.emit(r), this.resetEditor()));
  }
  resetEditor() {
    this.comment.commentText = "";
  }
}
