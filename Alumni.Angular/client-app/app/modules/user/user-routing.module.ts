import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserEventComponent } from './event/event.component';
import { UserCreatePageComponent } from './page/create-page.component';
import { UserPagesComponent } from './page/pages.component';
import { UserSettingAccountComponent } from './setting/profile/setting-account.component';
import { UserSettingEducationComponent } from './setting/profile/setting-education.component';
import { UserSettingProfilePictureComponent } from './setting/profile/setting-profile-picture.component';
import { UserSettingProfileComponent } from './setting/profile/setting-profile.component';
import { UserSettingComponent } from './setting/setting.component';
import { UserTimelineComponent } from './timeline/timeline.component';
import { UserComponent } from './user.component';
import { ActiveUserResolver } from './user.service';
import { UserFriendComponent } from '@app/modules/user/friend/friend.component';
import { UserFriendRequestComponent } from '@app/modules/user/friend/friend-request.component';

const routes: Routes = [
    {
        path: ':userName', component: UserComponent,
        resolve: { activeProfile: ActiveUserResolver },
        children: [
            { path: '', component: UserTimelineComponent },
            { path: 'timeline', component: UserTimelineComponent },
            { path: 'friends', component: UserFriendComponent },
            { path: 'requests', component: UserFriendRequestComponent },
            { path: 'events', component: UserEventComponent },
            { path: 'pages', component: UserPagesComponent },
            { path: 'page/create', component: UserCreatePageComponent },
            {
                path: 'settings', component: UserSettingComponent,
                children: [
                    { path: '', component: UserSettingProfileComponent },
                    { path: 'profile', component: UserSettingProfileComponent },
                    { path: 'account', component: UserSettingAccountComponent },
                    { path: 'picture', component: UserSettingProfilePictureComponent },
                    { path: 'education', component: UserSettingEducationComponent },
                ]
            },
        ]
    }
]
@NgModule({

    imports: [
        RouterModule.forChild(routes)
    ],
    providers: [ActiveUserResolver],
    exports: [RouterModule]
})
export class UserRoutingModule { }