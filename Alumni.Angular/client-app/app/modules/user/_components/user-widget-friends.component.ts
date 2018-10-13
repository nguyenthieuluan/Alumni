import {
  Component,
  OnInit,
  ViewEncapsulation,
  Injector,
  Input
} from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  UserProfileDto,
  UserProfileServiceProxy
} from "@shared/service-proxies/service-proxies";
import { UserService } from "@app/modules/user/user.service";

@Component({
  selector: "user-widget-friends",
  templateUrl: "./user-widget-friends.component.html",

  encapsulation: ViewEncapsulation.None
})
export class UserWidgetFriendsComponent extends AppComponentBase implements OnInit {
    
  friendList: UserProfileDto[];

    constructor(
        injector: Injector,
        private _userProfileService: UserProfileServiceProxy,
        private _userService: UserService,
    ) {
        super(injector);
    }

    ngOnInit(): void {
        if(this._userService.activeUserProfile) {
            this.getFriendList(this._userService.activeUserProfile);
        } else {
            this._userProfileService.getCurrentProfile().subscribe(r => {
                this.getFriendList(r);
            });
        }
    }

    getFriendList(p: UserProfileDto) {
        this._userProfileService.getFriendList(p).subscribe(r => {
            this.friendList = r.map(x => {
                if (x.sourceUser.userId != p.userId)
                    return x.sourceUser;
                else return x.targetUser;
            });
        });
    }
}


