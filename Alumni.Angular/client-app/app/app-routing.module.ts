import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard'

import { NewsFeedComponent } from "@app/modules/home/newsfeed.component";
import { HomePageComponent } from '@app/modules/home/homepage.component';
import { ActivePageResolver } from '@app/modules/page/page.service';

const test: Routes = [
    {
        path: '', component: AppComponent,
        children: [
            { path: 'home', component: HomePageComponent, resolve: {homePage:  ActivePageResolver} },
            { path: 'newsfeed', component: NewsFeedComponent, canActivate: [AppRouteGuard] },
            {
                path: 'user',
                canActivate: [AppRouteGuard],
                loadChildren: '@app/modules/user/user.module#UserModule',
               //loadChildren: ()=>UsersModule,
                data: { preload: true }
            },
            {
                path: 'page',
                canActivate: [AppRouteGuard],
                loadChildren: '@app/modules/page/page.module#PageModule',
                data: { preload: true }
            },
            {
                path: 'admin',
                canActivate: [AppRouteGuard],
                loadChildren: '@app/modules/admin/admin.module#AdminModule',
                data: { preload: true }
            }
        ]
    }
]
@NgModule({
    imports: [
        RouterModule.forChild(test)
    ],
    providers:[ActivePageResolver],
    exports: [RouterModule]
})
export class AppRoutingModule { }