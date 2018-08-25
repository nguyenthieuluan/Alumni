import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Injector, inject } from "@angular/core";
import { UserProfileServiceProxy, UserProfileDto, PageDetailDto } from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";

import { ImageCropperComponent, CropperSettings, Bounds } from "ngx-img-cropper";
@Component({
    selector: '',
    templateUrl: './page-setting-picture.component.html',
})
export class PageSettingPictureComponent extends AppComponentBase implements OnInit, AfterViewInit{

    model: PageDetailDto = new PageDetailDto();

    dP: any;
    dC: any;
    csP: CropperSettings;
    csC: CropperSettings;

    @ViewChild('cropperP', undefined) cropperP: ImageCropperComponent;
    @ViewChild('cropperC', undefined) cropperC: ImageCropperComponent;

    constructor(
        injector: Injector,
        //private _pageService: Page,
    ) {
        super(injector);
        this.getPictureSettings();
        this.getCoverSettings();
        this.dC = {};
        this.dP = {};
    }

    ngOnInit() {
        //this._pageService.getCurrentProfile().subscribe(r => {
        //    this.setModel(r);
        //});
        
    }
    getPictureSettings() {
        this.csP = new CropperSettings();
        this.csP.width = 120;
        this.csP.height = 120;

        this.csP.croppedWidth = 120;
        this.csP.croppedHeight = 120;

        this.csP.canvasWidth = 240;
        this.csP.canvasHeight = 240;


        this.csP.rounded = false;
        this.csP.minWithRelativeToResolution = false;
        this.csP.keepAspect = true;

        this.csP.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        this.csP.cropperDrawSettings.strokeWidth = 1;


    }
    getCoverSettings() {
        this.csC = new CropperSettings();
        this.csC.width = 1048;
        this.csC.height = 400;

        this.csC.croppedWidth = 1048;
        this.csC.croppedHeight = 400;

        this.csC.canvasWidth = 524;
        this.csC.canvasHeight = 200;


        this.csC.rounded = false;
        this.csC.minWithRelativeToResolution = false;
        this.csC.keepAspect = true;

        this.csC.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        this.csC.cropperDrawSettings.strokeWidth = 1;

    }

    croppedP(bounds: Bounds) {
        this.model.pictureUrl = this.cropperP.image.image;
    }

    croppedC(bounds: Bounds) {
        this.model.coverUrl = this.cropperC.image.image;
    }


    ngAfterViewInit() {

    }
    //save() {
    //    this._pageService.updatePage(this.model).subscribe(r => {
    //        this.setModel(r);
    //        //this.appSession.user.profile = r;
    //        this.notify.success("Your page information is successfuly saved.", "", { positionClass: 'toast-top-right' });
    //    });
    //}
    //setModel(p: PageDetailDto) {
    //    this.model = p;
    //    this.dP = {
    //        image: { image: p.pictureUrl }
    //    };
    //    this.dC = {
    //        image: { image: p.coverUrl }
    //    };
    //    console.log(p);
    //}
}