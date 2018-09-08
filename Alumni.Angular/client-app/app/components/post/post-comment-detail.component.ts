import { Input, Component, EventEmitter, ElementRef, ViewChild, OnInit, Injector } from "@angular/core";
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { PostDetailDto, Picture, PostData, PostServiceProxy, PostStatInputStatType, PostStatInput, PostCommentDetailDto } from "@shared/service-proxies/service-proxies";
import { forEach } from "@angular/router/src/utils/collection";
import { identifierModuleUrl } from "@angular/compiler";
import { AppConsts } from "@shared/AppConsts";
import { TokenService } from '@abp/auth/token.service';
import { debug } from "util";
import { AppComponentBase } from "@shared/app-component-base";

@Component({
    selector: 'post-comment-detail',
    templateUrl: './post-comment-detail.component.html',
})
export class PostCommentDetailComponent extends AppComponentBase  implements OnInit {
    @Input() public post: PostDetailDto;
    @Input() public comment: PostCommentDetailDto;
    postImageCount: number;
    pictures: Picture[];
    editor: any = {};
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
        if (!this.editor[id]) {
            this.editor[id] = true;
        }
    }
}
