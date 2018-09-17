import {Component, OnInit, Injector } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
    UserProfileServiceProxy,
    UserProfileDto,
} from "@shared/service-proxies/service-proxies";
import { UserService } from "@app/modules/user/user.service";

@Component({
    selector: "",
    templateUrl: "./friend.component.html"
})
export class UserFriendComponent extends AppComponentBase implements OnInit {

    friendList: UserProfileDto[];
    index: number;
    
    isFriend: boolean = false;
    isUnFriend: boolean = false;

    constructor(
        injector: Injector,
        private _userProfileService: UserProfileServiceProxy,
        private _userService: UserService,
    ) {
        super(injector);
    }

    ngOnInit(): void {
        if(this.appSession.userId == this._userService.activeUserProfile.userId) {
                this.isUnFriend = true;
        }
        else {
            this.isFriend = true;
        }

        this.getFriendList(this._userService.activeUserProfile)
    }

    getFriendList (p: UserProfileDto) {
        this._userProfileService.getFriendList(p).subscribe(r => {
            this.friendList = r.map(x => {
                if (x.sourceUser.userId !== p.userId)
                    return x.sourceUser;
                else return x.targetUser;
            });
        });
    }
    
    onRemoveFriend(index: number) {
        if (index !== -1) {
            this.friendList.splice(index, 1);
        }
    }
}
