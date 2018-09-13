import { Component, OnInit, ViewEncapsulation, Injector, Input } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponentBase } from "@shared/app-component-base";
import { AppAuthService } from "@shared/auth/app-auth.service";
import { ConfigurationServiceProxy, UserProfileDto, UserProfileServiceProxy, PageDetailDto } from "@shared/service-proxies/service-proxies";
import { PageService } from "@app/modules/page/page.service";

@Component({
    selector: 'widget-page-intro',
    templateUrl: './widget-page-intro.component.html',
   
    encapsulation: ViewEncapsulation.None
})

export class WidgetPageIntroComponent extends AppComponentBase implements OnInit {
    page: PageDetailDto;
    constructor(
        injector: Injector,
        private activeRoute: ActivatedRoute,
        private router: Router,
        private _userProfileService: UserProfileServiceProxy,
        private pageService: PageService,
    ) {
        super(injector);
    }
    
    ngOnInit(): void {
        this.page = this.pageService.activePage;
    }
}