import { Input, Component, EventEmitter, ElementRef, ViewChild, Output, OnInit, Injector } from "@angular/core";
import { UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { PostDetailDto, Picture, PostData, PostServiceProxy, PostCommentDetailDto } from "@shared/service-proxies/service-proxies";
import { TokenService } from '@abp/auth/token.service';
import { AppComponentBase } from "@shared/app-component-base";

@Component({
    selector: 'post-comment-update',
    templateUrl: './post-comment-update.component.html',
})
export class PostCommentUpdateComponent extends AppComponentBase implements OnInit {
    @Input() post: PostDetailDto;
    @Input() parentComment?: PostCommentDetailDto;
  
    @Input() comment: PostCommentDetailDto = new PostCommentDetailDto();
    
    @Output() cancelEdit: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() saveChangeEdit: EventEmitter<boolean> = new EventEmitter<boolean>();
    isChildMode: boolean = false;

    tempComment: PostCommentDetailDto; //
    isShow = true;

    @ViewChild('imgQueue') imgQueue: ElementRef;
    options: UploaderOptions;
    formData: FormData;
    files: UploadFile[];
    uploadInput: EventEmitter<UploadInput>;
    humanizeBytes: Function;
    dragOver: boolean;
    private isEditMode: boolean = false;
    uploadRemains: number = 0;
    private baseUrl: string;
    constructor(
        
        injector: Injector,
        private _postService: PostServiceProxy,
        private _tokenService: TokenService
    ) {
        super(injector);
        this.options = { concurrency: 8, maxUploads: 30 };
        this.files = []; // local uploading files array
        this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
        this.humanizeBytes = humanizeBytes;
    }

    ngOnInit() {
        this.tempComment = this.comment.clone();

        // this.comment.postId = this.post.id;
        // this.comment.parentId = null;
        // if (this.parentComment) {
        //     this.isChildMode = true;
        //     this.comment.parentId = this.parentComment.id;
        // }
    }
    onEnter(evt: KeyboardEvent ): void {
        evt.preventDefault();
        //this.addComment();
    }
    onCtrlEnter(evt: KeyboardEvent ): void {
        evt.preventDefault();

        var v = evt.srcElement as any;
        var startPos = v.selectionStart;
        var endPos = v.selectionEnd;
        v.value = v.value.substr(0, endPos) + '\n' + v.value.substr(endPos);
        v.setSelectionRange(endPos + 1, endPos + 1);
    }
    // addComment() {
    //     this._postService.addPostComment(this.comment).subscribe(r=>(this.onPostCommentAdded.emit(r),this.resetEditor()));
    // }
    resetEditor() {
        this.comment.commentText = "";
    }
    saveChange() {
        if (this.comment.commentText.trim() === "") return;
        this._postService.editPostComment(this.comment).subscribe(r => {
            //console.log(r);
            this.saveChangeEdit.emit();
        })
    }
    cancel() {
        this.cancelEdit.emit();
        // console.dir(this.tempComment);
        //this.comment = this.tempComment;
        
    }
}
