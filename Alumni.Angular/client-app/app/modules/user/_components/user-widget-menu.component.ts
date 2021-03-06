﻿import {
  Component,
  OnInit,
  ViewEncapsulation,
  Injector,
  Input
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AppComponentBase } from "@shared/app-component-base";
import { AppAuthService } from "@shared/auth/app-auth.service";
import {
  ConfigurationServiceProxy,
  UserProfileDto,
  UserProfileServiceProxy,
  UserPagesDto
} from "@shared/service-proxies/service-proxies";

@Component({
  selector: "user-widget-menu",
  templateUrl: "./user-widget-menu.component.html",

  encapsulation: ViewEncapsulation.None
})
export class UserWidgetMenuComponent extends AppComponentBase
  implements OnInit {
  @Input()
  user: UserProfileDto;
  isActive = false;
  userPage: UserPagesDto = new UserPagesDto();
  constructor(
    injector: Injector,
    private _authService: AppAuthService,
    private _configurationService: ConfigurationServiceProxy,
    private activeRoute: ActivatedRoute,
    private _userProfileService: UserProfileServiceProxy,
    private router: Router
  ) {
    super(injector);
  }

  ngOnInit(): void {
    if (this.user.isMine && this.appSession.user) {
      this._userProfileService.getUserPagesDto().subscribe(r => {
        this.setPages(r);
      });
    }
  }
  setPages(p: UserPagesDto) {
    this.userPage = p;
  }
}
