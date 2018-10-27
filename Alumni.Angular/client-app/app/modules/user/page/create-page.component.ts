import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Injector, inject } from "@angular/core";
import { UserProfileServiceProxy, UserProfileDto, ChangePasswordInput, PageDetailDto, PageServiceProxy, PageCreateCredit } from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";
import { Router } from "@angular/router";
//import { UserService } from "@app/modules/admin/user.service";

@Component({
    selector: '',
    templateUrl: './create-page.component.html',
})
export class UserCreatePageComponent  extends AppComponentBase implements OnInit, AfterViewInit{
    model: PageDetailDto = new PageDetailDto();
    constructor(
        injector: Injector,
        private router: Router,
        private _userProfileService: UserProfileServiceProxy,
        private _pageServiceProxy: PageServiceProxy,
        //private _userService: UserService,
    ) {
        super(injector);
    }

    ngOnInit() {
    }
    ngAfterViewInit() {
        
    }
    save() {
        this._userProfileService.createPage(this.model).subscribe(r => {
            this.notify.success("Trang của bạn đã được tạo.", "", { positionClass: 'toast-top-right' });
            this.router.navigate(['app/user',this.appSession.user.userName,'pages']);
        });
    }
}