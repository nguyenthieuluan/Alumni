
import { Component,Injector, OnInit } from "@angular/core";
import {PageServiceProxy, UserProfileServiceProxy} from "@shared/service-proxies/service-proxies";
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
        private remotePageService: PageServiceProxy,
    ) {
        super(injector);
    }
    ngOnInit(): void {
        this.reload();
        //this.remotePageService.getMembers(this.page).subscribe( r => console.log(r));
        
    }
    reload() {
        this.activeRoute.data.subscribe(d => {
            var activePage = d["activePage"];
            if (!activePage) {
                this.router.navigate(["/app/admin/pages"]);
            }
            this.pageService.setActivePage(activePage);
            this.page = this.pageService.activePage;
            this.pageService.onSetPage(p => (this.page = p));
        });
    }
    save() {
        this.remotePageService.updatePage(this.page).subscribe(r => {
            this.setPage(r);
            this.notify.success("Lưu thành công.", "", {
                positionClass: "toast-top-right"
            });
        });
    }
    setPage(p: PageDetailDto) {
        this.pageService.setActivePage(p);
    }
}