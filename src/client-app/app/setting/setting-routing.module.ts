import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { SettingComponent } from './setting.component';
import { PersonalInfomationComponent } from './profile/personal-infomation.component';
import { AccountSettingsComponent } from '@app/setting/profile/account-settings.component';
import { EducationComponent } from '@app/setting/profile/education.component';
import { ProfilePictureComponent } from '@app/setting/profile/profile-picture.component';
import { SettingPagesComponent } from '@app/setting/page/setting-pages.component';
import { SettingCreatePageComponent } from '@app/setting/page/setting-create-page.component';


const routes: Routes = [
    {
        path: '', component: SettingComponent,
        children: [
            { path: '', component: PersonalInfomationComponent },
            { path: 'profile', component: PersonalInfomationComponent },
            { path: 'account', component: AccountSettingsComponent },
            { path: 'picture', component: ProfilePictureComponent },
            { path: 'education', component: EducationComponent },
            { path: 'pages', component: SettingPagesComponent },
            { path: 'create-page', component: SettingCreatePageComponent },
        
        ]
    }
]
@NgModule({

    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class SettingRoutingModule { }