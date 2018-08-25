import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { PageComponent } from './page.component';

import { PagePostsComponent } from '@app/modules/page/post/page-posts.component';
import { PageSettingPictureComponent } from '@app/modules/page/setting/page-setting-picture.component';
import { PagePostPublishComponent } from '@app/modules/page/post/page-post-publish.component';
import { PageSettingComponent } from '@app/modules/page/setting/page-setting.component';
import { PageSettingInfo } from '@app/modules/page/setting/page-setting-info.component';
import { PageLeftSideBarComponent } from '@app/modules/page/leftsidebar/page-left-sidebar.component';
import { PageAboutComponent } from '@app/modules/page/about/page-about.component';
import { PageCommunityComponent } from '@app/modules/page/community/page-community.component';
import { PageEventsComponent } from '@app/modules/page/events/page-events.component';
import { PageHomeComponent } from '@app/modules/page/home/page-home.component';
import { PageVideosComponent } from '@app/modules/page/video/page-videos.component';
import { PagePhotosComponent } from '@app/modules/page/photo/page-photos.component';
import { PageInfoAdsComponent } from '@app/modules/page/infoads/page-Info-ads.component';
import { PageFollowersComponent } from '@app/modules/page/followers/page-followers.component';
import { PageLikesComponent } from '@app/modules/page/followers/page-likes.component';

const routes: Routes = [
    {
        path: ':id', component: PageComponent,
        children: [
            {
                path: 'setting', component: PageSettingComponent, children: [
                    { path: '', redirectTo: 'info', pathMatch: 'full' },
                    { path: 'info', component: PageSettingInfo },
                    { path: 'picture', component: PageSettingPictureComponent },
                ]
            },
                    //{ path: 'publish', component: PagePostPublishComponent },
            {
                path: '', component: PageLeftSideBarComponent, children: [
                    { path: 'posts', component: PagePostsComponent },
                    { path: 'about', component: PageAboutComponent },
                    { path: 'community', component: PageCommunityComponent },
                    { path: 'events', component: PageEventsComponent },
                    { path: 'home', component: PageHomeComponent },
                    { path: 'photos', component: PagePhotosComponent },
                    { path: 'videos', component: PageVideosComponent },
                    { path: 'infoads', component: PageInfoAdsComponent },
                    { path: 'followers', component: PageFollowersComponent },
                    { path: 'likes', component: PageLikesComponent },
                    { path: '', redirectTo: 'home', pathMatch: 'full' },
                ]
            },
            { path: '**', pathMatch:'full', redirectTo:'' },
        ]
    },

]
@NgModule({

    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class PageRoutingModule { }