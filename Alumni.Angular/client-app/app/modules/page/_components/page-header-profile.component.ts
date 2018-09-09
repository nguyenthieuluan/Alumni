import { Component, OnInit, ViewEncapsulation, Injector, Input } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponentBase } from "@shared/app-component-base";
import { AppAuthService } from "@shared/auth/app-auth.service";
import { ConfigurationServiceProxy, UserInfoDto, UserProfileDto, UserProfileServiceProxy, PageDetailDto, PageServiceProxy } from "@shared/service-proxies/service-proxies";
import { PageService } from "@app/modules/page/page.service";

@Component({
    selector: 'page-header-profile',
    templateUrl: './page-header-profile.component.html',

    encapsulation: ViewEncapsulation.None
})

export class PageHeaderProfileComponent extends AppComponentBase implements OnInit {
    @Input() page: PageDetailDto;
    constructor(
        injector: Injector,
        private pageService: PageService,
        private _remotePageService: PageServiceProxy,

        private _userProfileService: UserProfileServiceProxy,
        private activeRoute: ActivatedRoute,
        private router: Router,

    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.page = (this.pageService.activePage);
        
    }
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
            //this.notify.success("following", "", { positionClass: 'toast-top-right' });
        });
    }
    unFollow() {
        this._remotePageService.unFollow(this.page).subscribe(r => {
            this.setPage(r);
            //this.notify.success("unfollow", "", { positionClass: 'toast-top-right' });
        });
    }

    setPage(p: PageDetailDto) {
        this.page = p;
        this.pageService.setActivePage(p);
    }
}