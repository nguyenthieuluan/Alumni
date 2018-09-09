import { Injectable } from '@angular/core';
import { SessionServiceProxy, UserLoginInfoDto, TenantLoginInfoDto, ApplicationInfoDto, GetCurrentLoginInformationsOutput, PostDetailDto, PageDetailDto, UserProfileDto, UserInfoDto, UserServiceProxy, UserProfileServiceProxy } from '@shared/service-proxies/service-proxies'
import { AbpMultiTenancyService } from '@abp/multi-tenancy/abp-multi-tenancy.service'
import { setTimeout } from 'timers';

import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile'
import { interval } from "rxjs";

@Injectable()
export class UserService {
    private _activeUserProfile: UserProfileDto;
    //activeUser: UserInfoDto;
    get activeUserProfile(): UserProfileDto {

        //interval(500)
        //    .takeWhile(() => !this._activeUserProfile)
        //    .subscribe(i => {
              
        //    })
        return this._activeUserProfile;
    };
    setActiveProfile(profile: UserProfileDto) {
        this._activeUserProfile = profile;
    }
}

@Injectable()
export class ActiveUserResolver implements Resolve<UserProfileDto> {
    constructor(private remoteUserService: UserProfileServiceProxy) {}

    resolve(route: ActivatedRouteSnapshot) {
        var model: UserProfileDto = new UserProfileDto();
        
        model.userName = route.paramMap.get('userName');
        return this.remoteUserService.userPublicProfile(model);
    }
}