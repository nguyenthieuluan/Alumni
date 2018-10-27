import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Injector, inject } from "@angular/core";
import { UserProfileServiceProxy, UserProfileDto, ChangePasswordInput, UserPagesDto, PageServiceProxy } from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";

@Component({
    selector: '',
    templateUrl: './pages.component.html',
})
export class UserPagesComponent  extends AppComponentBase implements OnInit, AfterViewInit{
    
    model: UserPagesDto = new UserPagesDto();
    constructor(
        injector: Injector,
        private _userProfileService: UserProfileServiceProxy,
    ) {
        super(injector);
    }

    ngOnInit() {
    }
    ngAfterViewInit() {
        if (this.appSession.user) {    
            this._userProfileService.getUserPagesDto().subscribe(r => {
                this.setPages(r);
            });
        }
    }
  
    setPages(p: UserPagesDto) {
        this.model = p;
    }
}