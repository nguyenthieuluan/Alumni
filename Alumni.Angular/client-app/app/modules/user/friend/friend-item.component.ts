import { Component, Input, Injector, OnInit, Output, EventEmitter } from "@angular/core";
import { UserProfileServiceProxy, UserProfileDto } from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";

@Component({
    selector: 'app-user-friend-item',
    templateUrl: './friend-item.component.html',
})
export class UserFriendItemComponent extends AppComponentBase implements OnInit {
    @Input() model: UserProfileDto;
    @Input() isRequest: boolean = false;
    @Input() isAllFriend: boolean = false;
    @Output() removeFriend: EventEmitter<boolean> = new EventEmitter<boolean>();


    constructor(
        injector: Injector,
        private _userProfileService: UserProfileServiceProxy,

    ) {
        super(injector);
    }

    ngOnInit(): void {
       
    }

    ngAfterViewInit() {
    }

    acceptFriend() {
        this._userProfileService.acceptFriend(this.model).subscribe(r => {
            //this.notify.success("successfuly", "", { positionClass: 'toast-top-right' });
            this.emitRemoveFriend();
        });
    }

    declineFriend() {
        this._userProfileService.declineFriend(this.model).subscribe(r => {
            //this.notify.success("successfuly", "", { positionClass: 'toast-top-right' });
            this.emitRemoveFriend();
        });
    }

    unFriend() {
        this._userProfileService.unFriendFriend(this.model).subscribe(r => {
            //this.notify.success("successfuly", "", { positionClass: 'toast-top-right' });
            this.emitRemoveFriend();
        });
    }
    emitRemoveFriend() {
        this.removeFriend.emit();
    }
}