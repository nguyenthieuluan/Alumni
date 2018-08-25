import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Injector, inject } from "@angular/core";
import { UserProfileServiceProxy, UserProfileDto, ChangePasswordInput, PageDetailDto } from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";

@Component({
    templateUrl: './page-setting-info.component.html',
})
export class PageSettingInfo extends AppComponentBase implements OnInit, AfterViewInit {
    model: PageDetailDto = new PageDetailDto();

    constructor(
        injector: Injector,
        //private _pageService: Page,

    ) {
        super(injector);
    }

    ngOnInit() {
    }
    ngAfterViewInit() {
        //this._pageService.getPage().subscribe(r => {
        //    this.setModel(r);
        //});
    }
    //save() {
    //    this._pageService.updatePage(this.model).subscribe(r => {
    //        this.setModel(r);

    //        this.notify.success("Your information is successfuly saved.", "", { positionClass: 'toast-top-right' });
    //    });
    //}
    
    //setModel(p: PageDetailDto) {
    //    this.model = p;
    //}
}