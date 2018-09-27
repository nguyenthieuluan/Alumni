
import { Component,Injector, OnInit } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import { PageDetailDto, UserProfileDto, PagedPageRequest, PageServiceProxy } from "@shared/service-proxies/service-proxies";
import { PageService } from "@app/modules/page/page.service";
import {ActivatedRoute, Router} from "@node_modules/@angular/router";
@Component({
    selector: '',
    templateUrl: './page-setting-member.component.html',
})
export class PageSettingMemberComponent  extends AppComponentBase implements OnInit {
    page: PageDetailDto;
    users: UserProfileDto[];
    admins: UserProfileDto[] = [];
    editors: UserProfileDto[] = [];
    constructor(
        injector: Injector,
        private pageService: PageService,
        private router: Router,
        private activeRoute: ActivatedRoute,
        private remotePageService: PageServiceProxy,
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.reload();
        this.users = [];
        const input = new PagedPageRequest();
        input.maxResultCount = 10;
        input.pageId = this.page.id;
        input.pageUserName = this.page.userName;
        this.remotePageService.getPageFollowers(input).subscribe(r => {
        this.users = r.items;
        });
    }
    reload() {
        this.activeRoute.data.subscribe(d => {
            const activePage = d["activePage"];
            if (!activePage) {
                this.router.navigate(["/app/admin/pages"]);
            }
            this.pageService.setActivePage(activePage);
            this.page = this.pageService.activePage;
            this.pageService.onSetPage(p => (this.page = p));
        });
    }
    block() {
        alert("block");
    }
    edit() {
        alert("edit")
    }
}