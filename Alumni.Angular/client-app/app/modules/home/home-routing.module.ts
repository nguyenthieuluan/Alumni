import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
//import { UserComponent } from './user.component';
//import { SettingComponent } from '@app/modules/user/setting/setting.component';
//import { UserSettingPagesComponent } from '@app/modules/user/setting/page/setting-pages.component';
//import { UserSettingCreatePageComponent } from '@app/modules/user/setting/page/setting-create-page.component';
//import { UserSettingProfileComponent } from '@app/modules/user/setting/profile/setting-profile.component';
//import { UserSettingAccountComponent } from '@app/modules/user/setting/profile/setting-account.component';
//import { UserSettingProfilePictureComponent } from '@app/modules/user/setting/profile/setting-profile-picture.component';
//import { UserSettingEducationComponent } from '@app/modules/user/setting/profile/setting-education.component';

const routes: Routes = [
    {
        //path: ':username', component: UserComponent,
        //children: [
        //    { path: 'settings',  component: SettingComponent,
        //        children: [
        //            { path: '', component: UserSettingProfileComponent },
        //            { path: 'profile', component: UserSettingProfileComponent },
        //            { path: 'account', component: UserSettingAccountComponent },
        //            { path: 'picture', component: UserSettingProfilePictureComponent },
        //            { path: 'education', component: UserSettingEducationComponent },
        //            { path: 'pages', component: UserSettingPagesComponent },
        //            { path: 'create-page', component: UserSettingCreatePageComponent },
        
        //        ]},
        //    { path: '**', pathMatch:'full', redirectTo:'/' },
            
        //]
    }
]
@NgModule({

    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class HomeRoutingModule { }