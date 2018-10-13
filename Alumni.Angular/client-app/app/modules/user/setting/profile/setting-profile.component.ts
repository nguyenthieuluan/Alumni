import { UserService } from "@app/modules/user/user.service";
import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    AfterViewInit,
    Injector,
    inject
} from "@angular/core";
import {
    UserProfileServiceProxy,
    UserProfileDto
} from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";

@Component({
    selector: "",
    templateUrl: "./setting-profile.component.html"
})
export class UserSettingProfileComponent extends AppComponentBase
    implements OnInit, AfterViewInit {
    @ViewChild("doBPicker")
    doBDatePicker: ElementRef;
    profile: UserProfileDto = new UserProfileDto();

    constructor(
        injector: Injector,
        private _userProfileService: UserProfileServiceProxy,
        private userService: UserService
    ) {
        super(injector);
    }

    ngOnInit() {
        //this.setProfile(this.userService.activeUserProfile.clone());
    }
    ngAfterViewInit() {
        this._userProfileService.getCurrentProfile().subscribe(r => {
            this.setProfile(r);
        });
    }
    save() {
        let dateInput = $(this.doBDatePicker.nativeElement).data(
            "daterangepicker"
        ).startDate;
        this.profile.doB = dateInput;
        this._userProfileService
            .updateUserProfile(this.profile)
            .subscribe(r => {
                this.setProfile(r);

                this.notify.success(
                    "Cập nhật thông tin thành công.",
                    "",
                    { positionClass: "toast-top-right" }
                );
            });
    }
    setProfile(p: UserProfileDto) {
        this.profile = p;
        this.userService.setActiveProfile(p);
        this.appSession.user.name = p.name;
        this.appSession.user.profile = p;
        let dateInput = $(this.doBDatePicker.nativeElement).data(
            "daterangepicker"
        ).startDate;
        dateInput = this.profile.doB;
        this.doBDatePicker.nativeElement.value = this.profile.doB.format(
            "DD/MM/YYYY"
        );
    }
}
