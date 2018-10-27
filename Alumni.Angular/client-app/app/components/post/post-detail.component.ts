import { Input, Component, EventEmitter, ElementRef, ViewChild, OnInit, Injector, Output } from "@angular/core";
import { UploadOutput, UploadInput, UploadFile, UploaderOptions } from 'ngx-uploader';
import { PostDetailDto, Picture, PostServiceProxy, PostStatInputStatType, PostStatInput, PostCommentDetailDto, UserProfileDto, UserProfileServiceProxy, UserServiceProxy } from "@shared/service-proxies/service-proxies";
import { AppConsts } from "@shared/AppConsts";
import { TokenService } from '@abp/auth/token.service';
import { AppComponentBase } from "@shared/app-component-base";
import { UserService } from "@app/modules/user/user.service";
import { ModalDirective } from 'ngx-bootstrap';
import {PageService} from "@app/modules/page/page.service";

@Component({
    selector: 'post-detail',
    templateUrl: './post-detail.component.html',
    styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent extends AppComponentBase implements OnInit {
    @ViewChild('createCategoryModal') modal: ModalDirective;
    @ViewChild('modalContent') modalContent: ElementRef;

    @Input() public post: PostDetailDto;
    @Output() removePost: EventEmitter<boolean> = new EventEmitter<boolean>();
    postImageCount: number;
    pictures: Picture[];
    model: UserProfileDto;
    isShowEdit: boolean = false;
    files: UploadFile[];
    uploadInput: EventEmitter<UploadInput>;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active: boolean = false;
    saving: boolean = false;
    uploadRemains = 0;
    options: UploaderOptions;

    textChange: string = '';

    quantityComment = 5;
    constructor(
        injector: Injector,
        private _postService: PostServiceProxy,
        private _tokenService: TokenService,
        private _userService: UserService,
        private _pageService: PageService,
        private _userPageService: UserProfileServiceProxy,
    ) {
        super(injector);
        this.options = { concurrency: 8, maxUploads: 30 };
        this.files = []; // local uploading files array
        this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    }
    ngOnInit() {
        this.pictures = this.post.postData.pictures;
        this.post.contentText = this.post.contentText.replace(/\n/g, "<br />");
        this.postImageCount = this.post.postData.pictures.length;
        
        if(this._userService.activeUserProfile && this._userService.activeUserProfile.userId == this.appSession.userId)
            this.isShowEdit = true;
        if (this.appSession.user) {
            this._userPageService.getUserPagesDto().subscribe(r=> {
                if (r.pages.length > 0 && this._pageService.activePage && r.pages.map(p=>p.id).indexOf(this._pageService.activePage.id) >= 0)
                    this.isShowEdit = true;     
            });
        }
        this.textChange = this.post.contentText;
    }

    updateStat(statType: PostStatInputStatType) {
        var model = new PostStatInput();
        model.postId = this.post.id;
        model.statType = statType;
        model.statReactType = 1;
        this._postService.updateStat(model).subscribe(r=>this.post.stats = r);
    }

    addParentComment(comment: PostCommentDetailDto) {
        this.post.comments.push(comment);
    }

    

    submitPost() {
        this.post.contentText = this.textChange;
        if (!this.post.contentText) {
            if (!this.post.postData || !this.post.postData.pictures) {
              this.notify.error("Vui lòng nhập nội dung bài đăng");
              return;
            }
            this.post.contentText = "";
          }
        this._postService.editPost(this.post).subscribe( r=> { 
            this.post = r;
            this.notify.success("Thành công.", "", {
                positionClass: "toast-top-right"
            });
            }
        )
    }
    show() {
        this.textChange = this.post.contentText;
        this.active = true;
        this.modal.show();
    }
    close() {
        this.active = false;
        this.modal.hide();
    }

    removePostPicture(pi: Picture) {
        this.post.postData.pictures.filter(
          (p: Picture) => p.seoFilename !== pi.seoFilename
        );
    }
    removeFile(index: number) {
        if ( index !== -1) {
            this.post.postData.pictures.splice(index, 1);
        }
    }

    onUploadOutput(output: UploadOutput): void {
    const pi = new Picture();
    if (output.type === "allAddedToQueue") {
      // when all files added in queue
      // uncomment this if you want to auto upload files when added

      const token = this._tokenService.getToken();
      const event: UploadInput = {
        type: "uploadAll",
        url: AppConsts.remoteServiceBaseUrl + "/api/Upload/UploadFile",
        method: "POST",
        headers: {
          Authorization: "Bearer " + token
        }
        // data: { id: output.file.id }
      };
      this.uploadInput.emit(event);
    } else if (
      output.type === "addedToQueue" &&
      typeof output.file !== "undefined"
    ) {
      if (output.file.type.startsWith("image/")) {
        this.files.push(output.file);
      }
    } else if (output.type === "removed") {
      // remove file from array when removed
      this.files = this.files.filter(
        (file: UploadFile) => file !== output.file
      );
    } else if (output.type === "start") {
      // remove file from array when removed
      this.uploadRemains++;
      pi.seoFilename = output.file.id;
      pi.isNew = true;
      pi.thumbUrl = "/theme/img/ajax-loader.gif";
      this.addPostPicture(pi);
    } else if (output.type === "done") {
      // remove file from array when removed
      if (output.file.response.success) {
        // debugger;
        this.post.postData.pictures.filter(
          (p: Picture) => p.seoFilename === output.file.id
        )[0].guid = output.file.response.result.guid;
        this.post.postData.pictures.filter(
          (p: Picture) => p.seoFilename === output.file.id
        )[0].thumbUrl = output.file.response.result.thumbUrl;
        this.post.postData.pictures.filter(
          (p: Picture) => p.seoFilename === output.file.id
        )[0].pictureUrl = output.file.response.result.pictureUrl;
      } else {
        this.removePostPicture(pi);
      }
      this.uploadRemains--;
    }
  }
    addPostPicture(pi: Picture) {
        if (!this.post.postData.pictures) {
        this.post.postData.pictures = [];
        }
        this.post.postData.pictures.push(pi);
    }
    
    onDeletePost() {
        this._postService.deletePost(this.post).subscribe( r=> { 
            this.emitRemovePost();
            this.notify.success("Xóa thành công!.", "", {
                positionClass: "toast-top-right"
            });
        })
    }

    onRemoveComment(index) {
        if (index != -1) {
            this.post.comments.splice(index, 1);
        }
    }

    emitRemovePost() {
        this.removePost.emit();
    }
}
