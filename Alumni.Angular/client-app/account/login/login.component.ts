﻿import { Component, Injector, ElementRef, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { LoginService } from './login.service';
import { accountModuleAnimation } from '@shared/animations/routerTransition';
import { AbpSessionService } from '@abp/session/abp-session.service';

@Component({
    templateUrl: './login.component.html',
    styleUrls: [
        './login.component.less'
    ],
    animations: [accountModuleAnimation()]
})
export class LoginComponent extends AppComponentBase {
    
    submitting: boolean = false;

    constructor(
        injector: Injector,
        public loginService: LoginService,
        private _router: Router,
        private _sessionService: AbpSessionService
    ) {
        super(injector);
    }

    ngAfterViewInit(): void {
        //($ as any).ClientAppScripts.InitAll();
    }

    get multiTenancySideIsTeanant(): boolean {
        return this._sessionService.tenantId > 0;
    }

    get isSelfRegistrationAllowed(): boolean {
        if (!this._sessionService.tenantId) {
            return false;
        }
        return true;
    }

    login(): void {
        abp.ui.setBusy('#loginAction');
        this.submitting = true;
        this.loginService.authenticate(
            () => {
                this.submitting = false;
                
                abp.ui.clearBusy('#loginAction');
            }
        );
    }
}
