import { NgModule } from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap';
import { SharedModule } from '@shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserSettingProfileComponent } from '@app/modules/user/setting/profile/setting-profile.component';
import { UserSettingAccountComponent } from '@app/modules/user/setting/profile/setting-account.component';
import { UserSettingProfilePictureComponent } from '@app/modules/user/setting/profile/setting-profile-picture.component';
import { UserSettingEducationComponent } from '@app/modules/user/setting/profile/setting-education.component';
import { UserSettingPagesComponent } from '@app/modules/user/setting/page/setting-pages.component';
import { UserSettingCreatePageComponent } from '@app/modules/user/setting/page/setting-create-page.component';

@NgModule({
    declarations: [
        UserComponent,
        UserSettingProfileComponent,
        UserSettingAccountComponent,
        UserSettingProfilePictureComponent,
        UserSettingEducationComponent,
        UserSettingPagesComponent,
        UserSettingCreatePageComponent,
    ],
    imports: [
        SharedModule,
        UserRoutingModule,
    ],
    providers: [
    ]
})
export class UserModule { }
