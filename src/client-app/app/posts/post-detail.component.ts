import { Input, Component, EventEmitter, ElementRef, ViewChild, OnInit } from "@angular/core";
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { PostDetailDto, Picture, PostData, PostServiceProxy, PostStatInputStatType, PostStatInput,PostCommentDetailDto } from "@shared/service-proxies/service-proxies";
import { forEach } from "@angular/router/src/utils/collection";
import { identifierModuleUrl } from "@angular/compiler";
import { AppConsts } from "@shared/AppConsts";
import { TokenService } from '@abp/auth/token.service';
import { debug } from "util";

@Component({
    selector: 'post-detail',
    templateUrl: './post-detail.component.html',
})
export class PostDetailComponent  implements OnInit {
    @Input() public post: PostDetailDto;
    postImageCount: number;
    pictures: Picture[];
    
    constructor(
        private _postService: PostServiceProxy,
        private _tokenService: TokenService
    ) {
      
    }
    ngOnInit() {
        this.pictures = this.post.postData.pictures;
        this.post.contentText = this.post.contentText.replace(/\n/g, "<br />");
        this.postImageCount = this.post.postData.pictures.length;
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
}
