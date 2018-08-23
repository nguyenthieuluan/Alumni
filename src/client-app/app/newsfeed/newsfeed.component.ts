import { Component, Injector, AfterViewInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PostDetailDto, PostServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
    templateUrl: './newsfeed.component.html',
    styles: [''],
    animations: [appModuleAnimation()]
})
export class NewsFeedComponent  {
    posts: PostDetailDto[];
    ad: Date = new Date();

    constructor(_postService: PostServiceProxy) {
        _postService.getNewsFeedPosts().subscribe(ps => {
            this.posts = ps;
        });
    }

    addPost(p : PostDetailDto) {
        this.posts.unshift(p);
    }
}
