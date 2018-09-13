import { Component, Injector, AfterViewInit, OnInit } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import {
  PostDetailDto,
  PostServiceProxy,
  PageServiceProxy,
  PageDetailDto,
  PagedPostRequest
} from "@shared/service-proxies/service-proxies";
import { HeaderProfileComponent } from "@app/components/layout/header-profile.component";
import { ActivatedRoute, Router } from "@angular/router";
import { PageService } from "@app/modules/page/page.service";

@Component({
  templateUrl: "./homepage.component.html",
  styles: [""],
  animations: [appModuleAnimation()]
})
export class HomePageComponent extends AppComponentBase implements OnInit {
  page: PageDetailDto = new PageDetailDto();
  posts: PostDetailDto[];

  request: PagedPostRequest = new PagedPostRequest();
  isLoading = false;
  totalLoaded = false;
  constructor(
    injector: Injector,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private pageService: PageService,
    private postService: PostServiceProxy,
    private remotePageService: PageServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    const activePage = this.activeRoute.snapshot.data["homePage"];
    if (!activePage) {
      this.router.navigate(["/"]);
    }
    this.pageService.setActivePage(activePage);
    this.page = this.pageService.activePage;

    this.request.skipCount = 0;
    this.request.maxResultCount = 10;
    this.posts = [];

    this.isLoading = false;
    this.totalLoaded = false;
    this.refresh();
  }
  refresh() {
    if (this.totalLoaded) {
      return;
    }
    this.isLoading = true;
    this.request.pageId = this.page.id;
    this.postService.getPageTimelinePosts(this.request).subscribe(ps => {
      this.posts = this.posts.concat(ps.items);
      this.request.skipCount += ps.items.length;
      this.isLoading = false;
      if (this.request.skipCount >= ps.totalCount) {
        this.totalLoaded = true;
      }
    });
  }
  loadMore() {
    this.refresh();
  }
}
