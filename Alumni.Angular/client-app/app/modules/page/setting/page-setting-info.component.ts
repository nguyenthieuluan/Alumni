import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    AfterViewInit,
    Injector,
    inject
} from "@angular/core";
import {
    UserProfileServiceProxy,
    UserProfileDto,
    PageDetailDto,
    PageServiceProxy
} from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";

import { PageService } from "@app/modules/page/page.service";
@Component({
    selector: "",
    templateUrl: "./page-setting-info.component.html"
})
export class PageSettingInfoComponent extends AppComponentBase
    implements OnInit, AfterViewInit {
    page: PageDetailDto = new PageDetailDto();

    constructor(
        injector: Injector,
        private pageService: PageService,
        private _remotePageService: PageServiceProxy
    ) {
        super(injector);
    }

    ngOnInit() {
        this.page = this.pageService.activePage.clone();
    }
    ngAfterViewInit() {
    }
    save() {
        this._remotePageService.updatePage(this.page).subscribe(r => {
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
