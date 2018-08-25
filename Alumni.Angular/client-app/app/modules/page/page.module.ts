import { NgModule } from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap';
import { SharedModule } from '@shared/shared.module';
import { PageRoutingModule } from './page-routing.module';
import { PageComponent } from './page.component';
import { ImageCropperComponent } from 'ngx-img-cropper';
import { PagePostsComponent } from '@app/modules/page/post/page-posts.component';
import { PagePostPublishComponent } from '@app/modules/page/post/page-post-publish.component';
import { PageSettingComponent } from '@app/modules/page/setting/page-setting.component';
import { PageSettingPictureComponent } from '@app/modules/page/setting/page-setting-picture.component';
import { PageHeaderProfileComponent } from '@app/modules/page/page-header-profile.component';
import { PageSettingInfo } from '@app/modules/page/setting/page-setting-info.component';
import { PagePostEditorComponent } from '@app/modules/page/post/page-post-editor.component';
import { PageLeftSideBarComponent } from '@app/modules/page/leftsidebar/page-left-sidebar.component';
import { PageAboutComponent } from '@app/modules/page/about/page-about.component';
import { PageCommunityComponent } from '@app/modules/page/community/page-community.component';
import { PageEventsComponent } from '@app/modules/page/events/page-events.component';
import { PageHomeComponent } from '@app/modules/page/home/page-home.component';
import { PagePhotosComponent } from '@app/modules/page/photo/page-photos.component';
import { PageVideosComponent } from '@app/modules/page/video/page-videos.component';
import { PageInfoAdsComponent } from '@app/modules/page/infoads/page-Info-ads.component';
import { PageLikesComponent } from '@app/modules/page/followers/page-likes.component';
import { PageFollowersComponent } from '@app/modules/page/followers/page-followers.component';


@NgModule({
    declarations: [
        PageComponent,
        PagePostsComponent,
        PagePostPublishComponent,
        PageSettingComponent,
        PageSettingPictureComponent,
        PageHeaderProfileComponent,
        PageSettingInfo,
        PagePostEditorComponent,
        PageLeftSideBarComponent,
        PageAboutComponent,
        PageCommunityComponent,
        PageEventsComponent,
        PageHomeComponent,
        PagePhotosComponent,
        PageVideosComponent,
        PageInfoAdsComponent,
        PageLikesComponent,
        PageFollowersComponent
    ],
    imports: [
        SharedModule,
        PageRoutingModule,
    ],
    providers: [
    ]
})
export class PageModule { }
