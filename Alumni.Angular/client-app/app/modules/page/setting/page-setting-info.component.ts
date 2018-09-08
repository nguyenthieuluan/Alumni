import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Injector, inject } from "@angular/core";
import { UserProfileServiceProxy, UserProfileDto, PageDetailDto, PageServiceProxy } from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";

import { PageService } from "@app/modules/page/page.service";
@Component({
    selector: '',
    templateUrl: './page-setting-info.component.html',
})
export class PageSettingInfoComponent extends AppComponentBase implements OnInit, AfterViewInit {
    page : PageDetailDto;
   

    constructor(
        injector: Injector,
        private pageService: PageService,
        private _remotePageService: PageServiceProxy
    ) {
        super(injector);
     
    }

    ngOnInit() {
        this.page = this.pageService.activePage;
    }
   

    ngAfterViewInit() {

    }
    save() {
        this._remotePageService.updatePage(this.page).subscribe(r => {
            this.setPage(r);
            this.notify.success("Your information is successfuly saved.", "", { positionClass: 'toast-top-right' });
        });
    }
    setPage(p: PageDetailDto) {
        this.page = p;
        this.pageService.setActivePage(p);
    }
}