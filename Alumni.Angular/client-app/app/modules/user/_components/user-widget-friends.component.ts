import {
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
  UserProfileDto
} from "@shared/service-proxies/service-proxies";

@Component({
  selector: "user-widget-friends",
  templateUrl: "./user-widget-friends.component.html",

  encapsulation: ViewEncapsulation.None
})
export class UserWidgetFriendsComponent extends AppComponentBase
  implements OnInit {
  @Input()
  user?: UserProfileDto = new UserProfileDto();
    model: UserProfileDto = new UserProfileDto();
  showLoginName = "";

  constructor(
    injector: Injector,
    private _authService: AppAuthService,
    private _configurationService: ConfigurationServiceProxy,
    private activeRoute: ActivatedRoute
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.showLoginName = this.appSession.user.name;
  }
}
