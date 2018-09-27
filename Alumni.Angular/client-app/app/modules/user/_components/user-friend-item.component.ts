import { Component, Input, Injector, Output, EventEmitter, OnInit } from "@angular/core";
import { UserProfileServiceProxy, UserProfileDto } from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";

@Component({
    selector: 'app-user-friend-item',
    templateUrl: './user-friend-item.component.html',
})
export class UserFriendItemComponent extends AppComponentBase implements OnInit {
    @Input() model: UserProfileDto;
    
    @Input() isDeline: boolean = false;
    @Input() isAccept: boolean = false;
    @Input() isUnFriend: boolean = false;
    
    @Output() removeFriend: EventEmitter<boolean> = new EventEmitter<boolean>();
    
    isAdd: boolean = true;
    constructor(
        injector: Injector,
        private _userProfileService: UserProfileServiceProxy,
        
        ) {
            super(injector);
        }
        
    ngOnInit(): void {
    }

    acceptFriend() {
        this._userProfileService.acceptFriend(this.model).subscribe(r => {
            this.emitRemoveFriend();
        });
    }
    declineFriend() {
        this._userProfileService.declineFriend(this.model).subscribe(r => {
            this.emitRemoveFriend();
        });
    }
    unFriend() {
        this._userProfileService.unFriendFriend(this.model).subscribe(r => {
            this.emitRemoveFriend();
        });
    }
   

    emitRemoveFriend() {
        this.removeFriend.emit();
    }
}