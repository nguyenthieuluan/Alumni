import { NgModule } from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap';
import { SharedModule } from '@shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserTimelineComponent } from './timeline/timeline.component';
import { UserEventComponent } from './event/event.component';
import { UserHeaderProfileComponent } from './_components/user-header-profile.component';
import { UserWidgetMenuComponent } from './_components/user-widget-menu.component';
import { UserWidgetFriendsComponent } from './_components/user-widget-friends.component';
import { UserWidgetIntroComponent } from './_components/user-widget-intro.component';
import { UserService } from './user.service';
import { UserSettingComponent } from './setting/setting.component';
import { UserSettingAccountComponent } from './setting/profile/setting-account.component';
import { UserSettingProfileComponent } from './setting/profile/setting-profile.component';
import { UserSettingProfilePictureComponent } from './setting/profile/setting-profile-picture.component';
import { UserSettingEducationComponent } from './setting/profile/setting-education.component';
import { UserCreatePageComponent } from './page/create-page.component';
import { UserPagesComponent } from './page/pages.component';
import { UserFriendItemComponent } from '@app/modules/user/friend/friend-item.component';
import { UserFriendComponent } from '@app/modules/user/friend/friend.component';

@NgModule({
    declarations: [
        UserComponent,
        UserFriendComponent,
        UserTimelineComponent,
        UserEventComponent,
        UserSettingComponent,
        UserSettingProfileComponent,
        UserSettingAccountComponent,
        UserSettingProfilePictureComponent,
        UserSettingEducationComponent,
        UserPagesComponent,
        UserCreatePageComponent,
        UserFriendItemComponent,

    ],
    imports: [
        SharedModule,
        UserRoutingModule,
    ],
    providers: [
        UserService
    ]
})
export class UserModule { }
