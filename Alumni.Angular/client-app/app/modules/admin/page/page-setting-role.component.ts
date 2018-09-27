
import {AfterViewInit, Component, Injector, OnInit} from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import { PageDetailDto, UserProfileDto, PagedPageRequest, PageServiceProxy } from "@shared/service-proxies/service-proxies";
import { PageService } from "@app/modules/page/page.service";
import {ActivatedRoute, Router} from "@node_modules/@angular/router";
import {ElementRef, EventEmitter, Output, ViewChild} from "@node_modules/@angular/core";
import {ModalDirective} from "@node_modules/ngx-bootstrap";
import index from "@node_modules/@angular/cli/lib/cli";
@Component({
    selector: '',
    templateUrl: './page-setting-role.component.html',
})
export class PageSettingRoleComponent  extends AppComponentBase implements OnInit, AfterViewInit {
    @ViewChild('createModal') modal: ModalDirective;
    @ViewChild('modalContent') modalContent: ElementRef;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    page: PageDetailDto;
    users: UserProfileDto[];
    admins: UserProfileDto[];
    editors: UserProfileDto[];
    adminIndex: number;
    editorIndex: number;
    
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
            this.admins = r.items;
            this.editors = r.items;
        });
    }
    ngAfterViewInit() {
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
    show() {
        // this.textChange = this.post.contentText;
        // this.active = true;
        this.modal.show();
    }
    close() {
        //this.active = false;
        this.modal.hide();
    }
    edit(index: number) {
        this.adminIndex = index;
        this.show();
    }
    saveEdit() {
        this.close();
    }
    removeEdit() {
        if (this.adminIndex >= 0) {
            this.admins.splice(this.adminIndex, 1);
        }
        this.close();
        console.log(this.users);
        console.log(this.admins);
        console.log(this.editors);
    }
}