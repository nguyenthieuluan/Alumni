
import { Component, OnInit, Injector, AfterViewInit } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import { UserPagesDto, UserProfileServiceProxy, PageDetailDto } from "@shared/service-proxies/service-proxies";
import { ActivatedRoute, Router } from "@angular/router";
import { PageService } from "@app/modules/page/page.service";

@Component({
  selector: "",
  templateUrl: "./admin-pages.component.html"
})
export class AdminPagesComponent extends AppComponentBase implements OnInit, AfterViewInit {
    model: UserPagesDto = new UserPagesDto();
    page: PageDetailDto = new PageDetailDto();

    constructor(
        injector: Injector,
        private _userProfileService: UserProfileServiceProxy,
        private pageService: PageService,
        private router: Router,
        private activeRoute: ActivatedRoute
    ) {
        super(injector);
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        if (this.appSession.user) {
            this._userProfileService.getUserPagesDto().subscribe(r => {
                this.model = r;
            });
        }
    }
    reload() {
        this.activeRoute.data.subscribe(d => {
            var activePage = d["activePage"];
            if (!activePage) {
                this.router.navigate(["/app/home"]);
            }
            this.pageService.setActivePage(activePage);
            this.page = this.pageService.activePage;
            this.pageService.onSetPage(p => (this.page = p));
        });
    }
}
