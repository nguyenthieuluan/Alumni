﻿import { Component, OnInit, Injector } from "@angular/core";
import { PageService } from "@app/modules/page/page.service";
import { PageDetailDto, PageServiceProxy } from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: '',
    templateUrl: './page.component.html',
    styleUrls: ['./_styles/page.component.css'],
})
export class PageComponent extends AppComponentBase implements OnInit {
    model: PageDetailDto = new PageDetailDto();
    ps: PageService;
    constructor(
        injector: Injector,
        private activeRoute: ActivatedRoute,
        private router: Router,
        private pageService: PageService,
        private remotePageService: PageServiceProxy
    ) {
        super(injector);
    }
    ngOnInit(): void {
        var activePage = this.activeRoute.snapshot.data['activePage'];
        if (!activePage) {
            this.router.navigate(['/app/home']);
        }
        this.ps = this.pageService;
        this.pageService.setActivePage(activePage);
        this.model = this.pageService.activePage;

    }
}