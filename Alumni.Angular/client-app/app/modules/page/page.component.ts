import { Component, OnInit, Injector, OnChanges } from "@angular/core";
import { PageService } from "@app/modules/page/page.service";
import {
    PageDetailDto,
    PageServiceProxy
} from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "",
    templateUrl: "./page.component.html",
    styleUrls: ["./_styles/page.component.css"]
})
export class PageComponent extends AppComponentBase implements OnInit {
    model: PageDetailDto = new PageDetailDto();
    constructor(
        injector: Injector,
        private activeRoute: ActivatedRoute,
        private router: Router,
        private pageService: PageService,
        private remotePageService: PageServiceProxy,
    ) {
        super(injector);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false; // force route reload whenever params change;
    }
    ngOnInit(): void {
        this.reload();
    }

    reload() {
        this.activeRoute.data.subscribe(d => {
            var activePage = d["activePage"];
            if (!activePage) {
                this.router.navigate(["/app/home"]);
            }
            this.pageService.setActivePage(activePage);
            this.model = this.pageService.activePage;
            this.pageService.onSetPage(p => (this.model = p));
        });
    }
}
