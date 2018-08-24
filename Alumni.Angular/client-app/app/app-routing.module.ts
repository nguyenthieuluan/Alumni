import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard'

import { NewsFeedComponent } from "@app/modules/home/newsfeed.component";

const test: Routes = [
    {
        path: '', component: AppComponent,
        children: [
            { path: 'newsfeed', component: NewsFeedComponent, canActivate: [AppRouteGuard] },
            {
                path: 'user',
                //canActivate: [AppRouteGuard],
                loadChildren: '@app/modules/user/user.module#UserModule',
               //loadChildren: ()=>UsersModule,
                data: { preload: true }
            },
            {
                path: 'page',
                //canActivate: [AppRouteGuard],
                loadChildren: '@app/modules/page/page.module#PageModule',
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