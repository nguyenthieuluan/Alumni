import { Component, Injector, OnInit } from "@angular/core";
import {
    UserProfileDto,
    UserProfileServiceProxy
} from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "@app/modules/user/user.service";

@Component({
    selector: "",
    templateUrl: "./user.component.html"
})
export class UserComponent extends AppComponentBase implements OnInit {
    model: UserProfileDto;
    constructor(
        injector: Injector,
        private activeRoute: ActivatedRoute,
        private router: Router,
        private _userProfileService: UserProfileServiceProxy,
        public userService: UserService
    ) {
        super(injector);
    }

    ngOnInit(): void {
        var activeProfile = this.activeRoute.snapshot.data["activeProfile"];
        if (!activeProfile) {
            this.router.navigate(["/app/newsfeed"]);
        }
        this.userService.setActiveProfile(activeProfile);

        this.model = activeProfile;
        this.userService.onSetUser(u => (this.model = u));
    }
}
