import { Component, OnInit, Injector, AfterViewInit } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import { UserProfileServiceProxy, UserProfileDto, UserRelationshipDto } from "@shared/service-proxies/service-proxies";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "@app/modules/user/user.service";

@Component({
    selector: '',
    templateUrl: './friend.component.html',
})
export class UserFriendComponent extends AppComponentBase implements OnInit, AfterViewInit {
    userRelationships: UserRelationshipDto[];

    friendResquestList: UserProfileDto[];
    friendList: UserProfileDto[];
    index: number;

    constructor(
        injector: Injector,
        private activeRoute: ActivatedRoute,
        private router: Router,
        private _userProfileService: UserProfileServiceProxy,

    ) {
        super(injector);
    }

    ngOnInit(): void {
        this._userProfileService.getCurrentProfile().subscribe(r => {
            this.getFriendRequestList(r);
            this.getFriendList(r)
        });
    }

    ngAfterViewInit() {

    }

    getFriendRequestList(p: UserProfileDto) {
        this._userProfileService.getFriendRequestList(p)
            .subscribe(
                r => {
                    this.userRelationships = r;
                   // console.log(r);
                    this.friendResquestList = r.map(x => x.sourceUser);
                }
            );
    }

    getFriendList(p: UserProfileDto) {
        this._userProfileService.getFriendList(p)
            .subscribe(
                r => {
                    this.userRelationships = r;
                    //console.log(r);
                    this.friendList = r.map(x => {
                        //x.sourceUser
                        if (x.sourceUser.userId != this.appSession.userId)
                            return x.sourceUser
                        else return x.targetUser;
                    }                    
                    );
                }

            );
    }

    onRemoveFriendRequest(index: number)
    {
        if (index != -1) {
            this.friendResquestList.splice(index, 1);
        }
    }

    onRemoveFriend(index: number) {
        if (index != -1) {
            this.friendList.splice(index, 1);
        }
    }
}