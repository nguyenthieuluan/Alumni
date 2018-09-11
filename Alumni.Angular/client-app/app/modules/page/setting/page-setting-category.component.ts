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
    PageServiceProxy,
    PageCategory
} from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";

import { PageService } from "@app/modules/page/page.service";
import { PageSettingCategoryCreateComponent } from "@app/modules/page/setting/page-setting-category-create.component";
import { ModalDirective } from "ngx-bootstrap";
@Component({
    selector: "",
    templateUrl: "./page-setting-category.component.html"
})
export class PageSettingCategoryComponent extends AppComponentBase
    implements OnInit, AfterViewInit {
    page: PageDetailDto;

    pageCategory: PageCategory = new PageCategory();
    pageCategoryOriginal: PageCategory = new PageCategory();
    @ViewChild("editModal")
    editModal: ModalDirective;
    isEdit: boolean = false;
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

    ngAfterViewInit() {}
    createCategory(pc?: PageCategory) {
        if (!pc) {
            this.pageCategory = new PageCategory();
            this.isEdit = false;
        } else {
            this.pageCategory = pc;
            this.pageCategoryOriginal = pc.clone();
            this.isEdit = true;
        }
        this.pageCategory.page = this.page.userName;
        this.editModal.show();
    }
    save() {
        if (this.isEdit) {
            abp.ui.setBusy();
            this._remotePageService
                .updatePageCategory(this.pageCategory)
                .subscribe(r => {
                    this.setPage(r);
                    this.editModal.hide();
                    abp.ui.clearBusy();
                    this.notify.success(
                        "Your information is successfuly saved.",
                        "",
                        { positionClass: "toast-top-right" }
                    );
                });
        } else {
            abp.ui.setBusy();
            this._remotePageService
                .createPageCategory(this.pageCategory)
                .subscribe(r => {
                    this.setPage(r);
                    this.editModal.hide();
                    abp.ui.clearBusy();
                    this.notify.success(
                        "Your information is successfuly saved.",
                        "",
                        { positionClass: "toast-top-right" }
                    );
                });
        }
    }

    close(): void {
        if (this.isEdit) {
            this.pageCategory.code = this.pageCategoryOriginal.code;
            this.pageCategory.name = this.pageCategoryOriginal.name;
            this.pageCategory.listOrder = this.pageCategoryOriginal.listOrder;
        }
        this.editModal.hide();
    }
    deleteCategory(pc: PageCategory): void {
        pc.page = this.page.userName;
        abp.message.confirm(
            "Delete category '" + pc.name + "'?",
            (result: boolean) => {
                if (result) {
                    abp.ui.setBusy();
                    this._remotePageService
                        .removePageCategory(pc)
                        .subscribe(r => {
                            if (r) {
                                this.page.categories = this.page.categories.filter(
                                    x => x.code !== pc.code
                                );

                                abp.ui.clearBusy();
                                abp.notify.info(
                                    "Deleted category: " + pc.name,
                                    "",
                                    { positionClass: "toast-top-right" }
                                );
                            }
                        });
                }
            }
        );
    }

    setPage(p: PageCategory) {
        if (!p) {
            return;
        }
        var existed = this.page.categories.find(x => x.guid === p.guid);
        if (existed) {
            existed.listOrder = p.listOrder;
            existed.name = p.name;
            existed.code = p.code;
        } else {
            this.page.categories.push(p);
        }
        this.page.categories.sort((l, r) => {
            return l.listOrder - r.listOrder;
        });
    }
}
