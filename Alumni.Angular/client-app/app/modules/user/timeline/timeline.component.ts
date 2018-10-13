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
    this.user = this.userService.activeUserProfile;
    
    this.request.maxResultCount = 10;
    this.request.userId = this.user.userId;
    this.request.userName = this.user.userName;

    abp.ui.setBusy("#no-post");
    this._postService
      .getUserTimelinePosts(this.request)
      .finally(abp.ui.clearBusy)
      .subscribe(ps => {
        this.posts = ps.items.filter(p => p.author.id == this.userService.activeUserProfile.userId);
      });
  }
  onRemovePost(index) {
    if (index != -1) {
      this.posts.splice(index, 1);
    }
  }
}
