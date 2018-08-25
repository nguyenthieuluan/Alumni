import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Injector, inject } from "@angular/core";
import { UserProfileServiceProxy, UserProfileDto, ChangePasswordInput, PageDetailDto } from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";

@Component({
    selector: '',
    templateUrl: './page-setting.component.html',
})
export class PageSettingComponent extends AppComponentBase implements OnInit, AfterViewInit {

    constructor(
        injector: Injector,

    ) {
        super(injector);
    }

    ngOnInit() {
    }
    ngAfterViewInit() {
    }
}