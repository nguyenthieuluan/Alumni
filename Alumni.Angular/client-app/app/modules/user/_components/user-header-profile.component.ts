import {
    Component,
    OnInit,
    ViewEncapsulation,
    Injector,
    Input
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AppComponentBase } from "@shared/app-component-base";
import { AppAuthService } from "@shared/auth/app-auth.service";
import {
    ConfigurationServiceProxy,
    UserInfoDto,
    UserProfileDto,
    UserProfileServiceProxy
} from "@shared/service-proxies/service-proxies";
import { worker } from "cluster";
import { UserService } from "@app/modules/user/user.service";

@Component({
    selector: "user-header-profile",
    templateUrl: "./user-header-profile.component.html",

    encapsulation: ViewEncapsulation.None
})
export class UserHeaderProfileComponent extends AppComponentBase
    implements OnInit {
    @Input()
    user: UserProfileDto;
    friendStatus: number = 0;
    currentUser: UserProfileDto;
    isCurrent: boolean = true;

    constructor(
        injector: Injector,
        private _authService: AppAuthService,
        private _userProfileService: UserProfileServiceProxy,
        private activeRoute: ActivatedRoute,
        private _userService: UserService,
        private router: Router
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.currentUser = this.user;
        this.checkFriend(this.currentUser);
        this._userService.onSetUser(u => {
            this.checkFriend(u);
        });
    }
    checkFriend(u: UserProfileDto) {
        this.currentUser = u;
        if (u && u.userId != this.appSession.user.id) {
            this._userProfileService.checkFriend(u).subscribe(r => {
                this.friendStatus = r;
            });
            this.isCurrent = false;
        }
    }
    addFriend() {
        this._userProfileService
            .requestFriend(this._userService.activeUserProfile)
            .subscribe(r => {
                if (r) this.friendStatus = 2;
            });
    }

    cancelRequest() {
        this.friendStatus = 0;
        //this.unFriend();
    }

    unFriend() {
        this._userProfileService
            .unFriendFriend(this._userService.activeUserProfile)
            .subscribe(r => {
                this.friendStatus = 0;
            });
    }
}
