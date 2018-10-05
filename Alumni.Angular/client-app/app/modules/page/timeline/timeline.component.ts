import { Component, OnInit } from "@angular/core";
import {
  PostDetailDto,
  PostServiceProxy,
  PagedPostRequest,
  PageDetailDto
} from "@shared/service-proxies/service-proxies";
import { PageService } from "@app/modules/page/page.service";

@Component({
  selector: "",
  templateUrl: "./timeline.component.html"
})
export class PageTimelineComponent implements OnInit {
  posts: PostDetailDto[] = [];
  page: PageDetailDto;
  request: PagedPostRequest = new PagedPostRequest();
  isLoading = false;
  totalLoaded = false;
  constructor(
    private _postService: PostServiceProxy,
    public pageService: PageService
  ) {}

  ngOnInit(): void {
    this.request.skipCount = 0;
    this.request.maxResultCount = 10;
    this.posts = [];
    
    this.isLoading = false;
    this.totalLoaded = false; console.log(this.pageService.activePage);
    this.refresh(this.pageService.activePage);

    this.pageService.onSetPage(p => this.refresh(p));
  }
  refresh(r: PageDetailDto) {
    if (this.totalLoaded) {
      return;
    }
    this.page = r;
    this.isLoading = true;
    this.request.pageId = r.id;
    this._postService.getPageTimelinePosts(this.request).subscribe(ps => {
      this.posts = this.posts.concat(ps.items);
      this.request.skipCount += ps.items.length;
      this.isLoading = false;
      if (this.request.skipCount >= ps.totalCount) {
        this.totalLoaded = true;
      }
    });
  }
  loadMore() {
    this.refresh(this.pageService.activePage);
  }
  addPost(p: PostDetailDto) {
    this.posts.unshift(p);
  }
}
