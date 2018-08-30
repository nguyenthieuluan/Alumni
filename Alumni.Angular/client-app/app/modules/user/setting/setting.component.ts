import { Component,Injector, OnInit } from "@angular/core";
import { UserProfileDto, UserProfileServiceProxy } from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "@app/modules/user/user.service";
@Component({
    selector: '',
    templateUrl: './setting.component.html',
})
export class UserSettingComponent extends AppComponentBase implements OnInit {
    model: UserProfileDto = new UserProfileDto();
    constructor(
        injector: Injector,
        private activeRoute: ActivatedRoute,
        private router: Router,
        private _userProfileService: UserProfileServiceProxy,
        private userService: UserService,

    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.model = this.userService.activeUserProfile;
    }
}