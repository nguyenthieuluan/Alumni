import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Injector, inject } from "@angular/core";
import { UserProfileServiceProxy, UserProfileDto } from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";

import { ImageCropperComponent, CropperSettings, Bounds } from "ngx-img-cropper";
import { UserService } from "@app/modules/user/user.service";
@Component({
    selector: '',
    templateUrl: './setting-profile-picture.component.html',
})
export class UserSettingProfilePictureComponent  extends AppComponentBase implements OnInit, AfterViewInit{
    
    profile: UserProfileDto = new UserProfileDto();
    
    dP:any;
    dC:any;
    csP:CropperSettings;
    csC:CropperSettings;
    
    @ViewChild('cropperP', undefined) cropperP:ImageCropperComponent;
    @ViewChild('cropperC', undefined) cropperC:ImageCropperComponent;

    constructor(
        injector: Injector,
        private userService: UserService,
        private _userProfileService: UserProfileServiceProxy
    ) {
        super(injector);
        this.getPictureSettings();
        this.getCoverSettings();
        this.dC = {};
        this.dP = {};
    }

    ngOnInit() {
        
        this._userProfileService.getCurrentProfile().subscribe(r => {
            this.setProfile(r);
        });
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
        this.profile.pictureUrl = this.cropperP.image.image;
    }
    
    croppedC(bounds: Bounds) {
        this.profile.coverUrl = this.cropperC.image.image;
    }
    

    ngAfterViewInit() {

    }
    save() {
        this._userProfileService.updateUserProfile(this.profile).subscribe(r => {
            this.setProfile(r);
            this.appSession.user.profile = r;
            this.notify.success("Your information is successfuly saved.", "", { positionClass: 'toast-top-right' });
        });
    }
    setProfile(p: UserProfileDto) {
        this.profile = p;
        this.dP = {
            image: { image: p.pictureUrl }
        };
        this.dC = {
            image: { image: p.coverUrl }
        };
        this.userService.setActiveProfile(p);
    }
}