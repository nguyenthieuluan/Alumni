
import { Component,Injector, OnInit } from "@angular/core";
import { UserProfileServiceProxy } from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";
import { ActivatedRoute, Router } from "@angular/router";
import { PageDetailDto } from "@shared/service-proxies/service-proxies";
import { PageService } from "@app/modules/page/page.service";
@Component({
    selector: '',
    templateUrl: './page-setting.component.html',
})
export class PageSettingComponent  extends AppComponentBase implements OnInit {
    page: PageDetailDto;
    constructor(
        injector: Injector,
        private activeRoute: ActivatedRoute,
        private router: Router,
        private _userProfileService: UserProfileServiceProxy,
        private pageService: PageService,

    ) {
        super(injector);
    }
    ngOnInit(): void {
        this.reload();
    }
    reload() {
        this.activeRoute.data.subscribe(d => {
            var activePage = d["activePage"];
            console.log(d);
            if (!activePage) {
                this.router.navigate(["/app/admin/pages"]);
            }
            this.pageService.setActivePage(activePage);
            this.page = this.pageService.activePage;
            this.pageService.onSetPage(p => (this.page = p));
        });
    }
}