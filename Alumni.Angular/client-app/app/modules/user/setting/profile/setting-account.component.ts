import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Injector, inject } from "@angular/core";
import { UserProfileServiceProxy, UserProfileDto, ChangePasswordInput } from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";
import { UserService } from "../../user.service";

@Component({
    selector: '',
    templateUrl: './setting-account.component.html',
})
export class UserSettingAccountComponent  extends AppComponentBase implements OnInit, AfterViewInit{
    
    profile: UserProfileDto = new UserProfileDto();
    passwordRequest: ChangePasswordInput = new ChangePasswordInput();
    confirmNewPassword: string = "";
    constructor(
        injector: Injector,
        private _userProfileService: UserProfileServiceProxy,
        private userService: UserService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.setProfile(this.userService.activeUserProfile.clone());
    }
    ngAfterViewInit() {

        // this._userProfileService.getCurrentProfile().subscribe(r => {
        //     this.setProfile(r);
        // });
    }
    save() {
        if (this.passwordRequest.newPassword != this.confirmNewPassword) {
            this.message.error("Mật khẩu không khớp.");
            return;
        }
        this._userProfileService.changePassword(this.passwordRequest).subscribe(r => {
            this.notify.success("Cập nhật thông tin thành công.", "", { positionClass: 'toast-top-right' });
        });
    }
    setProfile(p: UserProfileDto) {
        this.profile = p;
    }
}