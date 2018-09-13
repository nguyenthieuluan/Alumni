import { Component } from "@angular/core";
import {
  PostDetailDto,
  PostServiceProxy,
  PagedPostRequest
} from "@shared/service-proxies/service-proxies";

@Component({
  selector: "",
  templateUrl: "./page-posts.component.html"
})
export class PagePostsComponent {
  posts: PostDetailDto[];
  request: PagedPostRequest = new PagedPostRequest();

  constructor(_postService: PostServiceProxy) {
    this.request.maxResultCount = 10;

    abp.ui.setBusy("#no-post");
    _postService
      .getUserTimelinePosts(this.request)
      .finally(abp.ui.clearBusy)
      .subscribe(ps => {
        this.posts = ps.items;
      });
  }
}
