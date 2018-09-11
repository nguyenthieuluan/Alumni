import {
    Component,
    OnInit,
    ViewEncapsulation,
    Injector,
    Input,
    OnChanges,
    SimpleChanges,
    ChangeDetectionStrategy
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AppComponentBase } from "@shared/app-component-base";
import { AppAuthService } from "@shared/auth/app-auth.service";
import {
    UserProfileDto,
    UserProfileServiceProxy,
    PageDetailDto,
    PageServiceProxy
} from "@shared/service-proxies/service-proxies";
import { PageService } from "@app/modules/page/page.service";

@Component({
    selector: "page-header-profile",
    templateUrl: "./page-header-profile.component.html",

    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class PageHeaderProfileComponent extends AppComponentBase
    implements OnInit, OnChanges {
    @Input()
    page: PageDetailDto = new PageDetailDto();
    constructor(
        injector: Injector,
        public pageService: PageService,
        private _remotePageService: PageServiceProxy,
        private _userProfileService: UserProfileServiceProxy,
        private _activeRoute: ActivatedRoute,
        private _router: Router
    ) {
        super(injector);
    }

    ngOnInit(): void {}
    ngOnChanges(changes: SimpleChanges) {}
    like() {
        this._remotePageService.like(this.page).subscribe(r => {
            this.setPage(r);
            //this.notify.success("Liked", "", { positionClass: 'toast-top-right' });
        });
    }
    unLike() {
        this._remotePageService.unLike(this.page).subscribe(r => {
            this.setPage(r);
            //this.notify.success("Unliked", "", { positionClass: 'toast-top-right' });
        });
    }
    follow() {
        this._remotePageService.follow(this.page).subscribe(r => {
            this.setPage(r);
            // this.notify.success("following", "", { positionClass: 'toast-top-right' });
        });
    }
    unFollow() {
        this._remotePageService.unFollow(this.page).subscribe(r => {
            this.setPage(r);
            // this.notify.success("unfollow", "", { positionClass: 'toast-top-right' });
        });
    }

    setPage(p: PageDetailDto) {
        this.page = this.pageService.activePage;
        //this.page = p;
    }
}
