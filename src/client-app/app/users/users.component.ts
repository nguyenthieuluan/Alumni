import { Component, Injector, ViewChild } from '@angular/core';
import { UserServiceProxy, UserDto, PagedResultDtoOfUserDto } from '@shared/service-proxies/service-proxies';
import { PagedListingComponentBase, PagedRequestDto } from "shared/paged-listing-component-base";

@Component({
    templateUrl: './users.component.html',
})
export class UsersComponent extends PagedListingComponentBase<UserDto> {
    
    protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
       // throw new Error("Method not implemented.");
    }
    protected delete(entity: UserDto): void {
        //throw new Error("Method not implemented.");
    }
    constructor(
        injector: Injector,
        private _userService: UserServiceProxy
    ) {
        super(injector);
    }
    
}