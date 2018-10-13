import { Component, Injector, AfterViewInit } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import {
  PostDetailDto,
  PostServiceProxy,
  UserProfileDto,
  PagedPostRequest
} from "@shared/service-proxies/service-proxies";
import { HeaderProfileComponent } from "@app/components/layout/header-profile.component";

@Component({
  templateUrl: "./newsfeed.component.html",
  styles: [""],
  animations: [appModuleAnimation()]
})
export class NewsFeedComponent extends AppComponentBase {
  posts: PostDetailDto[];
  user: UserProfileDto;
  request: PagedPostRequest = new PagedPostRequest();

  ad: Date = new Date();
  componentA = HeaderProfileComponent;
  constructor(injector: Injector, private postService: PostServiceProxy) {
    super(injector);
    this.user = this.appSession.user.profile;
    this.user.isMine = true;
    this.request.maxResultCount = 10;
    this.refresh();
  }

  refresh() {
    abp.ui.setBusy("#no-post");
    this.postService
      .getHomepagePosts()
      .finally(abp.ui.clearBusy)
      .subscribe(ps => {
        this.posts = ps.items;
      });
  }
  addPost(p: PostDetailDto) {
    this.posts.unshift(p);
  }
  onRemovePost(index) {
    if (index != -1) {
      this.posts.splice(index, 1);
    }
  }
}
