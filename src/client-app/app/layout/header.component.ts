import { Component, Injector, ViewEncapsulation, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { ConfigurationServiceProxy, ChangeUiThemeInput } from '@shared/service-proxies/service-proxies';

import { AppAuthService } from '@shared/auth/app-auth.service';
@Component({
    templateUrl: './header.component.html',
    selector: 'header-top',
 
    encapsulation: ViewEncapsulation.None
})
export class HeaderComponent extends AppComponentBase implements OnInit {

    shownLoginName: string = "";
    searchModel: any = {};
    constructor(
        injector: Injector,
        private _authService: AppAuthService,
        private _configurationService: ConfigurationServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
   
        this.shownLoginName = this.appSession.getShownLoginName();
    }
    
    headerSearch(): void {
        alert(this.searchModel.keyword);
    }
    logout(): void {
        this._authService.logout();
    }

    isHomeLoggedin(): boolean {
        var a: boolean = this.isLoggedin();
        debugger;
        return a;
    }
}

class UiThemeInfo {
    constructor(
        public name: string,
        public cssClass: string
    ) { }
}