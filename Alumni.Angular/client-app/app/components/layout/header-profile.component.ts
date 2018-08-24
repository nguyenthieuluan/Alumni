import { Component, OnInit, ViewEncapsulation, Injector } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponentBase } from "@shared/app-component-base";
import { AppAuthService } from "@shared/auth/app-auth.service";
import { ConfigurationServiceProxy } from "@shared/service-proxies/service-proxies";

@Component({
    selector: 'app-header-profile',
    templateUrl: './header-profile.component.html',
    styles: [` 
        .active{
            color: #ff5e3a;
        }
    `],
    encapsulation: ViewEncapsulation.None
})

export class HeaderProfileComponent extends AppComponentBase implements OnInit {

    showLoginName: string = "";

    constructor(
        injector: Injector,
        private _authService: AppAuthService,
        private _configurationService: ConfigurationServiceProxy,
        private activeRoute: ActivatedRoute,


    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.showLoginName = this.appSession.user.name;
        console.log(this.activeRoute.snapshot.params);
    }
    test() {
       // alert("this is test");
    }
}