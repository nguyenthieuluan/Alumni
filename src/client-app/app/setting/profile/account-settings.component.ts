import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Injector, inject } from "@angular/core";
import { UserProfileServiceProxy, UserProfileDto, ChangePasswordInput } from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";

@Component({
    selector: '',
    templateUrl: './account-settings.component.html',
})
export class AccountSettingsComponent  extends AppComponentBase implements OnInit, AfterViewInit{
    
    profile: UserProfileDto = new UserProfileDto();
    passwordRequest: ChangePasswordInput = new ChangePasswordInput();
    confirmNewPassword: string = "";
    constructor(
        injector: Injector,
        private _userProfileService: UserProfileServiceProxy
    ) {
        super(injector);
    }

    ngOnInit() {
    }
    ngAfterViewInit() {

        this._userProfileService.getCurrentProfile().subscribe(r => {
            this.setProfile(r);
        });
    }
    save() {
        if (this.passwordRequest.newPassword != this.confirmNewPassword) {
            this.message.error("Password and Confirm password don't match");
            return;
        }
        this._userProfileService.changePassword(this.passwordRequest).subscribe(r => {
            this.notify.success("Your password is successfuly changed.", "", { positionClass: 'toast-top-right' });
        });
    }
    setProfile(p: UserProfileDto) {
        this.profile = p;
    }
}