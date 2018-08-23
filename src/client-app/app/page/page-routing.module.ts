import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { PageComponent } from './page.component';
import { PageSettingComponent } from '@app/page/setting/page-setting.component';
import { PagePostsComponent } from '@app/page/post/page-posts.component';
import { PageSettingPictureComponent } from '@app/page/setting/page-setting-picture.component';
import { PagePostPublishComponent } from '@app/page/post/page-post-publish.component';


const routes: Routes = [
    {
        path: ':id', component: PageComponent,
        children: [
            //{ path: 'setting', component: PageSettingComponent },
            //{ path: 'setting/picture', component: PageSettingPictureComponent },
            { path: 'posts', component: PagePostsComponent },
            //{ path: 'publish', component: PagePostPublishComponent },
            { path: '**', pathMatch:'full', redirectTo:'posts' },
        
        ]
    }
]
@NgModule({

    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class PageRoutingModule { }