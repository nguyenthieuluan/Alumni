
import { Component, OnInit, Injector, AfterViewInit } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import { UserPagesDto, UserProfileServiceProxy } from "@shared/service-proxies/service-proxies";

@Component({
  selector: "",
  templateUrl: "./admin-pages.component.html"
})
export class AdminPagesComponent extends AppComponentBase implements OnInit, AfterViewInit {
    model: UserPagesDto = new UserPagesDto();
    constructor(
        injector: Injector,
        private _userProfileService: UserProfileServiceProxy
    ) {
        super(injector);
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        this._userProfileService.getUserPagesDto().subscribe(r => {
            this.model = r;
        });
    }
}
