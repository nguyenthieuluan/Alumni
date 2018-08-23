import { NgModule } from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap';
import { SharedModule } from '@shared/shared.module';
import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { PersonalInfomationComponent } from './profile/personal-infomation.component';
import { AccountSettingsComponent } from './profile/account-settings.component';
import { EducationComponent } from '@app/setting/profile/education.component';
import { ProfilePictureComponent } from '@app/setting/profile/profile-picture.component';
import { ImageCropperComponent } from 'ngx-img-cropper';
import { SettingCreatePageComponent } from '@app/setting/page/setting-create-page.component';
import { SettingPagesComponent } from '@app/setting/page/setting-pages.component';



@NgModule({
    declarations: [
        SettingComponent,
        PersonalInfomationComponent,
        EducationComponent,
        AccountSettingsComponent,
        ProfilePictureComponent,
        SettingCreatePageComponent,
        SettingPagesComponent,
    ],
    imports: [
        SharedModule,
        SettingRoutingModule,
    ],
    providers: [
    ]
})
export class SettingModule { }
