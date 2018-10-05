
import { Component, Injector, OnInit } from "@angular/core";
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
    likes: UserProfileDto[];
    followers: UserProfileDto[];
    selectedValue = 0;
    searchKey: string;
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
        const input = new PagedPageRequest();
        input.maxResultCount = 10;
        input.pageId = this.page.id;
        input.pageUserName = this.page.userName;
        this.remotePageService.getPageFollowers(input).subscribe(r => {
            this.followers = r.items;
        });
        this.remotePageService.getPageUserLikes(input).subscribe(r => {
           this.likes = r.items;
           this.users = this.likes;
        });
    }
    
    //list selected change
    filterChanged(value) {
        if (value == 0) {
            this.users = this.likes;
            this.selectedValue = 0;
        } else {
            this.users = this.followers;
            this.selectedValue = 1;
        }
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
    
    //remove member
    remove(model) {
        if (this.selectedValue == 0) {
            this.likes.splice(this.likes.indexOf(model), 1);
        } else {
            this.followers.splice(this.followers.indexOf(model), 1);
        }
    }
    trackByIndex(index: number, obj: any): any {
        return index;
    }
}