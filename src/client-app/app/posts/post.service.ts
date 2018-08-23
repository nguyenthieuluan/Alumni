import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PostServiceProxy, PostDetailDto } from '@shared/service-proxies/service-proxies';

import { MessageService } from '@abp/message/message.service';
import { LogService } from '@abp/log/log.service';
import { TokenService } from '@abp/auth/token.service';
import { UtilsService } from '@abp/utils/utils.service';

@Injectable()
export class PostService {


    constructor(
        private _postService: PostServiceProxy,
        private _router: Router,
        private _utilsService: UtilsService,
        private _messageService: MessageService,
        private _tokenService: TokenService,
        private _logService: LogService
    ) {
    }

    addPost(postDetail: PostDetailDto) {
        this._postService.addPost(postDetail).finally(() => {}).subscribe((result: PostDetailDto) => {});
    }

    updatePost(postDetail: PostDetailDto) {

    }

    deletePost(postDetail: PostDetailDto) {


    }
}
