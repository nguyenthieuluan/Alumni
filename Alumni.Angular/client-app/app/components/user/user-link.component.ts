import {
  Component,
  OnInit,
  ViewEncapsulation,
  Injector,
  Input,
  SimpleChanges,
  OnChanges
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AppComponentBase } from "@shared/app-component-base";
import { AppAuthService } from "@shared/auth/app-auth.service";
import {
  ConfigurationServiceProxy,
  PageDetailDto,
  UserProfileDto
} from "@shared/service-proxies/service-proxies";

import "rxjs/add/observable/interval";
import "rxjs/add/operator/takeWhile";
import { interval } from "rxjs";
@Component({
  selector: "user-link",
  templateUrl: "./user-link.component.html",

  encapsulation: ViewEncapsulation.None
})
export class UserLinkComponent extends AppComponentBase
  implements OnInit, OnChanges {
  @Input()
  user?: UserProfileDto;
  @Input()
  page?: PageDetailDto;
  @Input()
  linkClass?: string;
  model: any = {};
  delayPop;
  popHide;
  isHoverPop = false;
  constructor(
    injector: Injector,
    private _authService: AppAuthService,
    private _configurationService: ConfigurationServiceProxy,
    private activeRoute: ActivatedRoute
  ) {
    super(injector);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.user) {
      this.user = changes.user.currentValue;
    }
    if (changes.page) {
      this.page = changes.page.currentValue;
    }

    if (changes.linkClass) {
      this.linkClass = changes.linkClass.currentValue;
    }

    if (this.user) {
      this.model.url = ["/app/user", this.user.userName];
      this.model.title = this.user.name;
      this.model.picture = this.user.pictureUrl;
      this.model.cover = this.user.coverUrl;
      this.model.isVerified = false;
    }
    if (this.page) {
      this.model.url = ["/app/page", this.page.userName];
      this.model.title = this.page.name;
      this.model.picture = this.page.pictureUrl;
      this.model.cover = this.page.coverUrl;
      this.model.isVerified = this.page.isVerified;
    }
  }
  ngOnInit(): void {}
  hoverPop(isHover: boolean) {
    this.isHoverPop = isHover;
  }
  showProfile(pop: any) {
    this.delayPop = setTimeout(() => {
      pop.show();

      this.isHoverPop = true;
    }, 1000);
  }
  hideProfile(pop: any) {
    let stopCondition = false;
    this.isHoverPop = false;
    interval(500)
      .takeWhile(() => !stopCondition)
      .subscribe(i => {
        if (!this.isHoverPop) {
          this.popHide = setTimeout(() => {
            pop.hide();
          }, 1000);
          clearTimeout(this.delayPop);
          stopCondition = true;
        }
      });
  }
}
