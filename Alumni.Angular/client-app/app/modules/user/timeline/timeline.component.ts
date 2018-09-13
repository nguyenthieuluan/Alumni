import { Component, OnInit } from "@angular/core";
import {
  PostDetailDto,
  PostServiceProxy,
  PagedPostRequest,
  UserProfileDto
} from "@shared/service-proxies/service-proxies";
import { UserService } from "@app/modules/user/user.service";

@Component({
  selector: "",
  templateUrl: "./timeline.component.html"
})
export class UserTimelineComponent implements OnInit {
  user: UserProfileDto;
  posts: PostDetailDto[];

  request: PagedPostRequest = new PagedPostRequest();

  constructor(
    private _postService: PostServiceProxy,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.request.maxResultCount = 10;

    abp.ui.setBusy("#no-post");
    this._postService
      .getUserTimelinePosts(this.request)
      .finally(abp.ui.clearBusy)
      .subscribe(ps => {
        this.posts = ps.items;
        this.user = this.userService.activeUserProfile;
      });
  }
}
