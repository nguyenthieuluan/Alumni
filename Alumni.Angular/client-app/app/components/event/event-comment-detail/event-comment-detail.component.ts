import {
  EventCommentDetailDto,
  EventPlanServiceProxy
} from "./../../../../shared/service-proxies/service-proxies";
import {
  Input,
  Component,
  EventEmitter,
  ElementRef,
  ViewChild,
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
  PostDetailDto,
  Picture,
  PostData,
  PostServiceProxy,
  PostStatInputStatType,
  PostStatInput,
  PostCommentDetailDto,
  EventPlanDetailDto
} from "@shared/service-proxies/service-proxies";
import { forEach } from "@angular/router/src/utils/collection";
import { identifierModuleUrl } from "@angular/compiler";
import { AppConsts } from "@shared/AppConsts";
import { TokenService } from "@abp/auth/token.service";
import { debug } from "util";
import { AppComponentBase } from "@shared/app-component-base";

@Component({
  selector: "event-comment-detail",
  templateUrl: "./event-comment-detail.component.html",
  styleUrls: ["./event-comment-detail.component.css"]
})
export class EventCommentDetailComponent extends AppComponentBase
  implements OnInit {
  @Input()
  public event: EventPlanDetailDto;
  @Input()
  public comment: EventCommentDetailDto;
  postImageCount: number;
  pictures: Picture[];
  editor: any = {};
  constructor(
    injector: Injector,
    private _eventService: EventPlanServiceProxy,
    private _tokenService: TokenService
  ) {
    super(injector);
  }
  ngOnInit() {
    this.comment.commentText = this.comment.commentText.replace(
      /\n/g,
      "<br />"
    );
  }
  updateStat(statType: PostStatInputStatType) {
    let model = new PostStatInput();
    model.postId = this.event.id;
    model.statType = statType;
    model.statReactType = 1;
  }

  addParentComment(comment: EventCommentDetailDto) {
    this.comment.children.push(comment);
  }
  showEditor(id: number) {
    if (!this.editor[id]) {
      this.editor[id] = true;
    }
  }
}
