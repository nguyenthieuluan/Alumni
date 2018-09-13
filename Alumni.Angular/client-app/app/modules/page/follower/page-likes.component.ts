import { Component, OnInit, Injector } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  UserProfileServiceProxy,
  PageDetailDto,
  PageServiceProxy,
  UserProfileDto,
  PagedPageRequest
} from "@shared/service-proxies/service-proxies";
import { PageService } from "@app/modules/page/page.service";
import { retry } from "rxjs/operators";

@Component({
  selector: "",
  templateUrl: "./page-likes.component.html"
})
export class PageLikesComponent extends AppComponentBase implements OnInit {
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
    this._remotePageService.getPageUserLikes(input).subscribe(r => {
      this.users = r.items;
    });
  }
}
