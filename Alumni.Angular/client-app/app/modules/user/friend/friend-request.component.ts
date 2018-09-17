import { Component, OnInit, Injector, AfterViewInit } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import { UserProfileServiceProxy, UserProfileDto } from "@shared/service-proxies/service-proxies";
import { UserService } from "@app/modules/user/user.service";

@Component({
    selector: '',
    templateUrl: './friend-request.component.html',
})
export class UserFriendRequestComponent extends AppComponentBase implements OnInit {

    friendResquestList: UserProfileDto[]=[];

    index: number;

    isFriend: boolean = false;
    isAccept: boolean = false;
    isDeline: boolean = false;

    constructor(
        injector: Injector,
        private _userProfileService: UserProfileServiceProxy,
        private _userService: UserService,

    ) {
        super(injector);
    }

    ngOnInit(): void {

        if(this.appSession.userId == this._userService.activeUserProfile.userId) {
            this.getFriendRequestList(this._userService.activeUserProfile)
            this.isAccept = true;
            this.isDeline = true;
        }
        else {
            // this._userProfileService.getCurrentProfile().subscribe(
            //     r => {
            //         this.getFriendList(r);
            //     }
            // );
            this.isFriend = true;
        }
    }

    getFriendRequestList(p: UserProfileDto) {
        this._userProfileService.getFriendRequestList(p)
            .subscribe( r => {
                    this.friendResquestList = r.map(x => x.sourceUser);
                }
            );
    }
    getFriendList (p: UserProfileDto): UserProfileDto[] {
        this._userProfileService.getFriendList(p).subscribe(r => {
            let friends = r.map(x => {
                if (x.sourceUser.userId !== p.userId)
                    return x.sourceUser;
                else return x.targetUser;
            });
            return friends;
        });
        return;
    }
    onRemoveFriendRequest(index: number) {
        if (index != -1) {
            this.friendResquestList.splice(index, 1);
        }
    }
}