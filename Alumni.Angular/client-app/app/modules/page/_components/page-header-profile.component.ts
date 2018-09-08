import { Component, OnInit, ViewEncapsulation, Injector, Input } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponentBase } from "@shared/app-component-base";
import { AppAuthService } from "@shared/auth/app-auth.service";
import { ConfigurationServiceProxy, UserInfoDto, UserProfileDto, UserProfileServiceProxy, PageDetailDto } from "@shared/service-proxies/service-proxies";
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
        private _userProfileService: UserProfileServiceProxy,
        private activeRoute: ActivatedRoute,
        private router: Router,

    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.page = (this.pageService.activePage);
    }
}