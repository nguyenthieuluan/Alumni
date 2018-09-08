import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Injector, inject } from "@angular/core";
import { UserProfileServiceProxy, UserProfileDto, PageDetailDto, PageServiceProxy } from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";

import { ImageCropperComponent, CropperSettings, Bounds } from "ngx-img-cropper";
import { PageService } from "@app/modules/page/page.service";
@Component({
    selector: '',
    templateUrl: './page-setting-picture.component.html',
})
export class PageSettingPictureComponent extends AppComponentBase implements OnInit, AfterViewInit {
    page : PageDetailDto;
    dP:any;
    dC:any;
    csP:CropperSettings;
    csC:CropperSettings;
    
    @ViewChild('cropperP', undefined) cropperP:ImageCropperComponent;
    @ViewChild('cropperC', undefined) cropperC:ImageCropperComponent;

    constructor(
        injector: Injector,
        private pageService: PageService,
        private _remotePageService: PageServiceProxy
    ) {
        super(injector);
        this.getPictureSettings();
        this.getCoverSettings();
        this.dC = {};
        this.dP = {};
    }

    ngOnInit() {
        this.page = this.pageService.activePage;
    }
    getPictureSettings() {
        this.csP = new CropperSettings();
        this.csP.width = 180;
        this.csP.height = 180;

        this.csP.croppedWidth = 180;
        this.csP.croppedHeight = 180;

        this.csP.canvasWidth = 240;
        this.csP.canvasHeight = 240;


        this.csP.rounded = false;
        this.csP.minWithRelativeToResolution  = false;
        this.csP.keepAspect = true;

        this.csP.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        this.csP.cropperDrawSettings.strokeWidth = 1;


    }
    getCoverSettings() {
        this.csC = new CropperSettings();
        this.csC.width = 1010;
        this.csC.height = 386;

        this.csC.croppedWidth = 1010;
        this.csC.croppedHeight = 386;

        this.csC.canvasWidth = 416;
        this.csC.canvasHeight = 159;


        this.csC.rounded = false;
        this.csC.minWithRelativeToResolution  = false;
        this.csC.keepAspect = true;

        this.csC.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        this.csC.cropperDrawSettings.strokeWidth = 1;

    }
    croppedP(bounds:Bounds) {
        this.page.pictureUrl = this.cropperP.image.image;
    }
    
    croppedC(bounds: Bounds) {
        this.page.coverUrl = this.cropperC.image.image;
    }
    

    ngAfterViewInit() {

    }
    save() {
        this._remotePageService.updatePage(this.page).subscribe(r => {
            this.setPage(r);
            this.notify.success("Your information is successfuly saved.", "", { positionClass: 'toast-top-right' });
        });
    }
    setPage(p: PageDetailDto) {
        this.page = p;
        this.dP = {
            image: { image: p.pictureUrl }
        };
        this.dC = {
            image: { image: p.coverUrl }
        };
        this.pageService.setActivePage(p);
    }
}