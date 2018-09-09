import { Component, OnInit, Injector } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import { UserProfileServiceProxy, PageDetailDto, PageServiceProxy, UserDto } from "@shared/service-proxies/service-proxies";
import { PageService } from "@app/modules/page/page.service";
import { retry } from "rxjs/operators";

@Component({
    selector: '',
    templateUrl: './follower.component.html',
})
export class PageFollowerComponent extends AppComponentBase implements OnInit {
    page: PageDetailDto;
    user: UserDto;

    constructor(
        injector: Injector,
        private pageService: PageService,
        private _remotePageService: PageServiceProxy,


        private _userProfileService: UserProfileServiceProxy,

    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.page = (this.pageService.activePage);
    }

    addFriend() {

    }

    getMembers() {
        
    }

    setPage(p: PageDetailDto) {
        this.page = p;
        this.pageService.setActivePage(p);
    }
}