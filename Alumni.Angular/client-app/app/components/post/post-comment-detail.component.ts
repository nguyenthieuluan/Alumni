import { Input, Component, OnInit, Injector, Output, EventEmitter } from "@angular/core";
import { PostDetailDto, Picture, PostServiceProxy, PostStatInputStatType, PostStatInput, PostCommentDetailDto } from "@shared/service-proxies/service-proxies";
import { TokenService } from '@abp/auth/token.service';
import { AppComponentBase } from "@shared/app-component-base";

@Component({
    selector: 'post-comment-detail',
    templateUrl: './post-comment-detail.component.html',
    styles: [`
        .reply-more {
            opacity: 0;
        }
        .hover-more:hover .reply-more {
            opacity: 1;
        }
    `]
})
export class PostCommentDetailComponent extends AppComponentBase  implements OnInit {
    @Input() public post: PostDetailDto;
    @Input() public comment: PostCommentDetailDto;

    @Output() removeComment: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() hideReplyEditor: EventEmitter<any> = new EventEmitter<boolean>();
    
    postImageCount: number;
    pictures: Picture[];
    //editor: any = {};
    
    isShowUpdate = false; // show editor comment
    selectedComment: PostCommentDetailDto; // comment được chọn chỉnh sửa

    @Input() editor: any;
    constructor(
        injector: Injector,
        private _postService: PostServiceProxy,
        private _tokenService: TokenService
    ) {
        super(injector);
    }
    ngOnInit() {
        this.comment.commentText = this.comment.commentText.replace(/\n/g, "<br />");
    }
    updateStat(statType: PostStatInputStatType) {
        var model = new PostStatInput();
        model.postId = this.post.id;
        model.statType = statType;
        model.statReactType = 1;
        this._postService.updateStat(model).subscribe(r=>this.post.stats = r);
    }
    
    addParentComment(comment: PostCommentDetailDto) {
        this.comment.children.push(comment);
    }
    showEditor(id: number) {
        this.isShowUpdate = false;
        if (!this.editor[id]) {
            this.editor[id] = true;
            this.hideReplyEditor.emit(id);
            return;
        }
        if(this.editor) {
            this.editor[id] = false;
        }
        // if(this.editor) {
        //     this.editor[id] = false;
        // }
    }
    onDeleteComment(comment) {
        this._postService.deletePostComment(comment).subscribe(() => {
            this.emitRemoveComment();
        },error => console.log(error) );
    }
    onDeleteChildComment(comment: PostCommentDetailDto, index: number) {
        this._postService.deletePostComment(comment).subscribe(() => {
            if (index != -1) {
                this.comment.children.splice(index, 1);
            }
        },error => console.log(error) );
    }
    onEditComment(comment: PostCommentDetailDto, id: number) {
        this.selectedComment = comment.clone();
        //this.selectedComment = comment;
        this.isShowUpdate = true;
        if (!this.editor[id]) {
            this.editor[id] = true;
        }
        // if (this.editor) {
        //     this.editor[id] = false;
        // }
    }
    emitRemoveComment() {
        this.removeComment.emit();
    }
    cancelEdit() {
        this.isShowUpdate = false;
    }
    saveChangeEdit() {
        if(this.comment.id === this.selectedComment.id) {
            this.comment.commentText = this.selectedComment.commentText
        } else {
            for (let ccm of this.comment.children) {
                if (ccm.id === this.selectedComment.id) {
                    ccm.commentText = this.selectedComment.commentText
                }
            }
        }
        this.isShowUpdate = false;
    }
}
