import { Injectable } from "@angular/core";
import {
  SessionServiceProxy,
  UserLoginInfoDto,
  TenantLoginInfoDto,
  ApplicationInfoDto,
  GetCurrentLoginInformationsOutput,
  PostDetailDto,
  PageDetailDto,
  UserProfileDto,
  UserServiceProxy,
  UserProfileServiceProxy
} from "@shared/service-proxies/service-proxies";
import { AbpMultiTenancyService } from "@abp/multi-tenancy/abp-multi-tenancy.service";
import { setTimeout } from "timers";

import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import "rxjs/add/observable/interval";
import "rxjs/add/operator/takeWhile";
import "rxjs/add/observable/interval";
import "rxjs/add/operator/takeWhile";
import { interval, Subject, Observable } from "rxjs";
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
    console.log("uer service resolve ", model.userName);
    return this.remoteUserService.userPublicProfile(model);
  }
}
