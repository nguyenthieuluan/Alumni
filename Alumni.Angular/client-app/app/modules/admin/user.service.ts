import { Injectable } from "@angular/core";
import { UserProfileDto, UserProfileServiceProxy } from "@shared/service-proxies/service-proxies";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import "rxjs/add/observable/interval";
import "rxjs/add/operator/takeWhile";
import "rxjs/add/observable/interval";
import "rxjs/add/operator/takeWhile";
import { Subject } from "rxjs";
@Injectable()
export class UserService {
    private _activeUserProfile: UserProfileDto;
    private _observableActiveUser = new Subject<UserProfileDto>();
    get activeUserProfile(): UserProfileDto {
        return this._activeUserProfile;
    }
    setActiveProfile(profile: UserProfileDto) {
        this._activeUserProfile = profile;
        this._observableActiveUser.next(profile);
    }
    onSetUser(callback) {
        return this._observableActiveUser.asObservable().subscribe(callback);
    }
}

@Injectable()
export class ActiveUserResolver implements Resolve<UserProfileDto> {
    constructor(private remoteUserService: UserProfileServiceProxy) {}

    resolve(route: ActivatedRouteSnapshot) {
        let model: UserProfileDto = new UserProfileDto();

        model.userName = route.paramMap.get("userName");
        return this.remoteUserService.userPublicProfile(model);
    }
}
