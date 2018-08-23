import { Component, OnInit, Inject, Injector } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import { AppAuthService } from "@shared/auth/app-auth.service";
import { ConfigurationServiceProxy } from "@shared/service-proxies/service-proxies";

@Component({
    selector: '',
    templateUrl: './friends.component.html',
})
export class FriendsComponent extends AppComponentBase implements OnInit {
    showLoginName: string = "";

    constructor(
        injector: Injector,
        private _authService: AppAuthService,
        private _configurationService: ConfigurationServiceProxy

    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.showLoginName = this.appSession.getShownLoginName();
    }
}