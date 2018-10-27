import { Component, Injector, OnInit } from "@angular/core";
import {
  UserProfileDto,
  UserProfileServiceProxy
} from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "@app/modules/user/user.service";

@Component({
  selector: "",
  templateUrl: "./user.component.html"
})
export class UserComponent extends AppComponentBase implements OnInit {
  model: UserProfileDto;
  constructor(
    injector: Injector,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private _userProfileService: UserProfileServiceProxy,
    public userService: UserService
  ) {
    super(injector);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false; // force route reload whenever params change;
  }

  ngOnInit(): void {
    this.reload();
  }

  reload() {
    this.activeRoute.data.subscribe(d => {
      const activeProfile = d["activeProfile"] as UserProfileDto;
      if (!activeProfile) {
        this.router.navigate(["/app/newsfeed"]);
      }
      if (this.appSession.userId == activeProfile.userId) {
        activeProfile.isMine = true;
      }
      this.userService.setActiveProfile(activeProfile);

      this.model = activeProfile;
      this.userService.onSetUser(u => {
        this.model = u;
      });
    });
  }
}
