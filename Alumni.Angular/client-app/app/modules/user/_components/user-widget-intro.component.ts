import { Component, OnInit, ViewEncapsulation, Injector, Input } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponentBase } from "@shared/app-component-base";
import { AppAuthService } from "@shared/auth/app-auth.service";
import { ConfigurationServiceProxy, UserInfoDto, UserProfileDto } from "@shared/service-proxies/service-proxies";

@Component({
    selector: 'user-widget-intro',
    templateUrl: './user-widget-intro.component.html',
   
    encapsulation: ViewEncapsulation.None
})

export class UserWidgetIntroComponent extends AppComponentBase implements OnInit {
    @Input() user: UserProfileDto;

    constructor(
        injector: Injector,
        private _authService: AppAuthService,
        private _configurationService: ConfigurationServiceProxy,
        private activeRoute: ActivatedRoute,

    ) {
        super(injector);
    }

    ngOnInit(): void {
    }
}