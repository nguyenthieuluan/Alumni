import { Component, Injector, ViewEncapsulation, OnInit } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import { ConfigurationServiceProxy, RoleServiceProxy, EntityDtoOfInt32 } from "@shared/service-proxies/service-proxies";

import { AppAuthService } from "@shared/auth/app-auth.service";
import { UserService } from "@app/modules/user/user.service";
import { Router } from "@angular/router";
import { AppComponent } from "@app/app.component";

@Component({
    templateUrl: "./header-top.component.html",
    selector: "header-top",
    styleUrls: ["./styles/styles.scss"],
    providers: [UserService],
    encapsulation: ViewEncapsulation.None
})
export class HeaderTopComponent extends AppComponentBase implements OnInit {
    isLeftMenuCollapsed: boolean = true;
    shownLoginName: string = "";
    searchModel: any = {};
    entityDtoInt32: EntityDtoOfInt32 = new EntityDtoOfInt32;
    isCurrent = true;

    constructor(
        injector: Injector,
        private _authService: AppAuthService,
        private _configurationService: ConfigurationServiceProxy,
        private _roleServiceProxy: RoleServiceProxy,
        private _userService: UserService,
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.entityDtoInt32.id = this.appSession.userId;
        this.shownLoginName = this.appSession.getShownLoginName();
        //this._roleServiceProxy.get(this.entityDtoInt32).subscribe();
        // if(this._userService.activeUserProfile){
        //     if(this._userService.activeUserProfile.userId != this.appSession.userId)
        //         this.isCurrent = false;
        // }
        
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
    public _opened: boolean = false;
    public _modeNum: number = 0;
    public _positionNum: number = 1;
    public _dock: boolean = false;
    public _closeOnClickOutside: boolean = true;
    public _closeOnClickBackdrop: boolean = true;
    public _showBackdrop: boolean = false;
    public _animate: boolean = true;
    public _trapFocus: boolean = true;
    public _autoFocus: boolean = true;
    public _keyClose: boolean = true;
    public _autoCollapseHeight: number = null;
    public _autoCollapseWidth: number = null;
    public isClosing: boolean = false;
    public _MODES: Array<string> = ["over", "push", "slide"];
    public _POSITIONS: Array<string> = ["left", "right", "top", "bottom"];

    public _toggleOpened(): void {
        if (this.isClosing) {
            return;
        }
        this._opened = !this._opened;
    }

    public _onOpenStart(): void {
        // console.info('Sidebar opening');
    }

    public _onOpened(): void {
        //console.info('Sidebar opened');
    }

    public _onCloseStart(): void {
        this.isClosing = true;
        //console.info('Sidebar closing');
    }

    public _onClosed(): void {
        this._opened = false;

        this.isClosing = false;
        // console.info('Sidebar closed');
    }

    public _onTransitionEnd(): void {
        // console.info('Transition ended');
    }

    public _onBackdropClicked(): void {
        // console.info('Backdrop clicked');
    }
}
