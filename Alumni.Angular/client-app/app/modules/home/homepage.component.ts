import { Component, Injector, AfterViewInit, OnInit } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import {
    PostDetailDto,
    PostServiceProxy,
    PageServiceProxy,
    PageDetailDto,
    UserTimelinePostRequest
} from "@shared/service-proxies/service-proxies";
import { HeaderProfileComponent } from "@app/components/layout/header-profile.component";
import { ActivatedRoute, Router } from "@angular/router";
import { PageService } from "@app/modules/page/page.service";

@Component({
    templateUrl: "./homepage.component.html",
    styles: [""],
    animations: [appModuleAnimation()]
})
export class HomePageComponent extends AppComponentBase implements OnInit {
    page: PageDetailDto = new PageDetailDto();
    posts: PostDetailDto[];

    request: UserTimelinePostRequest = new UserTimelinePostRequest();
    constructor(
        injector: Injector,
        private activeRoute: ActivatedRoute,
        private router: Router,
        private pageService: PageService,
        private postService: PostServiceProxy,
        private remotePageService: PageServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        var activePage = this.activeRoute.snapshot.data["homePage"];
        if (!activePage) {
            this.router.navigate(["/"]);
        }
        this.pageService.setActivePage(activePage);
        this.page = this.pageService.activePage;

        this.request.maxResultCount = 10;
        this.refresh();
    }
    refresh() {
        abp.ui.setBusy("#no-post");
        this.postService
            .getHomepagePosts()
            .finally(abp.ui.clearBusy)
            .subscribe(ps => {
                this.posts = ps.items;
            });
    }
}
