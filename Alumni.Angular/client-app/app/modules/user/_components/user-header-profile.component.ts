import { Component, OnInit, ViewEncapsulation, Injector, Input } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponentBase } from "@shared/app-component-base";
import { AppAuthService } from "@shared/auth/app-auth.service";
import { ConfigurationServiceProxy, UserInfoDto, UserProfileDto, UserProfileServiceProxy } from "@shared/service-proxies/service-proxies";

@Component({
    selector: 'user-header-profile',
    templateUrl: './user-header-profile.component.html',
   
    encapsulation: ViewEncapsulation.None
})

export class UserHeaderProfileComponent extends AppComponentBase implements OnInit {
    @Input() user: UserProfileDto;
    constructor(
        injector: Injector,
        private _authService: AppAuthService,
        private _userProfileService: UserProfileServiceProxy,
        private activeRoute: ActivatedRoute,
        private router: Router,

    ) {
        super(injector);
    }

    ngOnInit(): void {
       
    }
}