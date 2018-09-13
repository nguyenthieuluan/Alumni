import { Component, OnInit, Injector } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  UserProfileServiceProxy,
  PageDetailDto,
  PageServiceProxy,
  PagedPageRequest,
  UserDto,
  UserProfileDto
} from "@shared/service-proxies/service-proxies";
import { PageService } from "@app/modules/page/page.service";

@Component({
  selector: "",
  templateUrl: "./page-followers.component.html"
})
export class PageFollowersComponent extends AppComponentBase implements OnInit {
  page: PageDetailDto;
  users: UserProfileDto[];

  constructor(
    injector: Injector,
    private pageService: PageService,
    private _remotePageService: PageServiceProxy,
    private _userProfileService: UserProfileServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.users = [];
    this.page = this.pageService.activePage;
    const input = new PagedPageRequest();
    input.maxResultCount = 10;
    input.pageId = this.page.id;
    input.pageUserName = this.page.userName;
    this._remotePageService.getPageFollowers(input).subscribe(r => {
      this.users = r.items;
    });
  }
}
