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
    UserInfoDto,
    PageDetailDto
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
    user?: UserInfoDto;
    @Input()
    page?: PageDetailDto;
    @Input()
    linkClass?: string;
    model: any = {};
    delayPop;
    popHide;
    isHoverPop: boolean = false;
    constructor(
        injector: Injector,
        private _authService: AppAuthService,
        private _configurationService: ConfigurationServiceProxy,
        private activeRoute: ActivatedRoute
    ) {
        super(injector);
    }
    ngOnChanges(changes: SimpleChanges): void {
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add '${implements OnChanges}' to the class.
        if (this.user) {
            this.model.url = ["/app/user", this.user.userName];
            this.model.title = this.user.fullName;
            this.model.picture = this.user.pictureUrl;
            this.model.cover = this.user.pictureCoverUrl;
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
        var stopCondition = false;
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
