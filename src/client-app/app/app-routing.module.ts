import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';

import { NewsFeedComponent } from "./newsfeed/newsfeed.component";
import { PostsComponent } from '@app/posts/posts.component';

const test: Routes = [
    {
        path: '', component: AppComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'newsfeed', component: NewsFeedComponent, canActivate: [AppRouteGuard] },
            {
                path: 'users',
                //canActivate: [AppRouteGuard],
                loadChildren: '@app/users/users.module#UsersModule',
                data: { preload: true }
            },
            {
                path: 'setting',
                //canActivate: [AppRouteGuard],
                loadChildren: '@app/setting/setting.module#SettingModule',
                data: { preload: true }
            },
            {
                path: 'page',
                //canActivate: [AppRouteGuard],
                loadChildren: '@app/page/page.module#PageModule',
                data: { preload: true }
            }
        ]
    }
]
@NgModule({

    imports: [
        RouterModule.forChild(test)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }