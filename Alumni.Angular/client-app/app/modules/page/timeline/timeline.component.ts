import { Component, OnInit } from "@angular/core";
import {
    PostDetailDto,
    PostServiceProxy,
    UserTimelinePostRequest,
    PageDetailDto
} from "@shared/service-proxies/service-proxies";
import { PageService } from "@app/modules/page/page.service";

@Component({
    selector: "",
    templateUrl: "./timeline.component.html"
})
export class PageTimelineComponent implements OnInit {
    posts: PostDetailDto[];
    page: PageDetailDto;
    request: UserTimelinePostRequest = new UserTimelinePostRequest();

    constructor(
        private _postService: PostServiceProxy,
        public pageService: PageService
    ) {}

    ngOnInit(): void {
        this.refresh(this.pageService.activePage);
        this.pageService.onSetPage(p => this.refresh(p));
    }
    refresh(r: PageDetailDto) {
        this.page = r;
        this.request.maxResultCount = 10;
        abp.ui.setBusy("#no-post");
        this._postService
            .getUserTimelinePosts(this.request)
            .finally(abp.ui.clearBusy)
            .subscribe(ps => {
                this.posts = ps.items;
            });
    }
    addPost(p: PostDetailDto) {
        this.posts.unshift(p);
    }
}
