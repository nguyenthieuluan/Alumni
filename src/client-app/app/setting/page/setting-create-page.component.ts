import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Injector, inject } from "@angular/core";
import { UserProfileServiceProxy, UserProfileDto, ChangePasswordInput, PageDetailDto } from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";
import { Router } from "@angular/router";

@Component({
    selector: '',
    templateUrl: './setting-create-page.component.html',
})
export class SettingCreatePageComponent  extends AppComponentBase implements OnInit, AfterViewInit{
    
    model: PageDetailDto = new PageDetailDto();
    constructor(
        injector: Injector,
        private router: Router,
        private _userProfileService: UserProfileServiceProxy
    ) {
        super(injector);
    }

    ngOnInit() {
    }
    ngAfterViewInit() {
        
    }
    save() {
    
        this._userProfileService.createPage(this.model).subscribe(r => {
            this.notify.success("Your page has been created.", "", { positionClass: 'toast-top-right' });
            this.router.navigate(['app/setting/pages']);
        });
    }
}