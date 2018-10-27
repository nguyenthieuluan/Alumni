import { Component, Injector, OnInit, ViewEncapsulation} from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
    PageDetailDto,
    UserProfileDto,
    PagedPageRequest,
    PageServiceProxy,
    PageMemberDto,
    UserInfoDto
} from "@shared/service-proxies/service-proxies";
import { PageDetailDto, PageMemberDto, UserInfoDto } from "@shared/service-proxies/service-proxies";
import { ActivatedRoute, Router } from "@node_modules/@angular/router";
import { ElementRef, EventEmitter, Output, ViewChild } from "@node_modules/@angular/core";
import { ModalDirective } from "@node_modules/ngx-bootstrap";
import { PageService } from "@app/modules/admin/page/page.service";

@Component({
    selector: '',
    templateUrl: './page-setting-role.component.html',
    styles: [`
        .ng-input input {
            padding: 0;
            margin-top: 4px;
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class PageSettingRoleComponent extends AppComponentBase implements OnInit {
    @ViewChild('createModal') modal: ModalDirective;
    @ViewChild('modalContent') modalContent: ElementRef;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    page: PageDetailDto;
    users: UserProfileDto[];
    admins: UserProfileDto[];
    editors: UserProfileDto[];


    pageMembers: PageMemberDto[];
    pageAdmins: UserInfoDto[];
    pageEditors: UserInfoDto[];

    adminIndex: number;
    editorIndex: number;
    selectedValueAdd = 1;
    selectedValueEdit: number;
    isAdmin: boolean;
    selectedUser: UserProfileDto;
    imageUrl: string;

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
        this.remotePageService.getPageUserLikes(input).subscribe(r => {
            this.users = r.items;
        });
        this.pageService.getPageAdmins(input).subscribe(r => {
            this.admins = r.items;
        });
        this.remotePageService.getMembers(this.pageService.activePage).subscribe(r => {
            this.pageMembers = r;
            this.pageAdmins = r.filter(x => x.role == 1).map(y => y.user);
            this.pageEditors = r.filter(x => x.role == 2).map(y => y.user);
        }
        );
        this.pageService.getPageEditors(input).subscribe(r => {
            this.editors = r.items;
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
    show() {
        this.modal.show();
    }
    close() {
        this.modal.hide();
    }

    //add role
    addRole() {
        //console.log(this.imageUrl)
        if (!this.selectedUser) return;
        const pageMember: PageMemberDto = new PageMemberDto();
        pageMember.user = this.selectedUser.user;
        pageMember.user.pictureUrl = this.selectedUser.pictureUrl;

        pageMember.pageUserName = this.pageService.activePage.userName;
        pageMember.role = this.selectedValueAdd;
        //add admins 
        if (this.selectedValueAdd == 1) {
            //check tồn tại user trong admin list
            if (this.pageAdmins.map(x => x.id).indexOf((this.selectedUser.user).id) == -1) {
                this.remotePageService.addMember(pageMember).subscribe( () => {
                    this.pageAdmins.push(this.selectedUser.user);
                }, error => console.log(error));
            } else {
                return;
            }
        } else { //add editor
            //check tồn tại user trong editor list
            if (this.pageEditors.map(x => x.id).indexOf((this.selectedUser.user).id) == -1) {
                this.remotePageService.addMember(pageMember).subscribe( () => {
                    this.pageEditors.push(this.selectedUser.user);
                }, error => console.log(error));
            } else {
                return;
            }
        }
    }
    editAdmin(index: number) {
        this.adminIndex = index;
        this.selectedValueEdit = 0;
        this.isAdmin = true;
        this.show();
    }
    editEditor(index: number) {
        this.editorIndex = index;
        this.selectedValueEdit = 1;
        this.isAdmin = false;
        this.show();
    }

    //change role
    saveEdit() {
        const pageMember: PageMemberDto = new PageMemberDto();
        pageMember.pageUserName = this.pageService.activePage.userName;
        if (this.isAdmin) {
            if (this.selectedValueEdit == 1) { //change role to editor
                //check tồn tại user trong editor list
                if (this.pageEditors.map(x => x.id).indexOf((this.pageAdmins[this.adminIndex]).id) == -1) {
                    this.pageEditors.push(this.pageAdmins[this.adminIndex]);
                    pageMember.role = 2;
                    pageMember.user = this.pageAdmins[this.adminIndex];
                    this.remotePageService.addMember(pageMember).subscribe(r => console.log(r), error => console.log(error));
                }
                this.remotePageService.removeMember(pageMember).subscribe(() => {
                    this.pageAdmins.splice(this.adminIndex, 1);
                });
            }
        } else {
            if (this.selectedValueEdit == 0) { //change role to admin
                //check tồn tại user trong admin list
                if (this.pageAdmins.map(x => x.id).indexOf((this.pageEditors[this.editorIndex]).id) == -1) {
                    pageMember.role = 1;
                    pageMember.user = this.pageEditors[this.editorIndex];
                    this.remotePageService.addMember(pageMember).subscribe(r => console.log(r), error => console.log(error));
                    this.pageAdmins.push(this.pageEditors[this.editorIndex]);
                }
                this.remotePageService.removeMember(pageMember).subscribe(() => {
                    this.pageEditors.splice(this.editorIndex, 1);
                });
            }
        }
        this.close();
    }

    //remove role
    removeRole() {
        const pageMember: PageMemberDto = new PageMemberDto();
        pageMember.pageUserName = this.pageService.activePage.userName;
        if (this.isAdmin) { //if user is admin
            pageMember.role = 1;
            pageMember.user = this.pageAdmins[this.adminIndex];
            this.remotePageService.removeMember(pageMember).subscribe(() => {
                this.pageAdmins.splice(this.adminIndex, 1);
            });
        } else { //if user is editor
            pageMember.role = 0;
            pageMember.user = this.pageEditors[this.editorIndex];
            this.remotePageService.removeMember(pageMember).subscribe(() => {
                this.pageEditors.splice(this.editorIndex, 1);
            });
        }
        this.close();
    }
}