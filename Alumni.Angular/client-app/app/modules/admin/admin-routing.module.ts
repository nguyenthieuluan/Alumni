import { NgModule } from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import { AdminComponent } from "@app/modules/admin/admin.component";
import { AdminPagesComponent } from "@app/modules/admin/page/admin-pages.component";
import { PageSettingComponent } from "@app/modules/admin/page/page-setting.component";
import { PageSettingMemberComponent } from "@app/modules/admin/page/page-setting-member.component";
import { ActivePageResolver } from "@app/modules/admin/page/page.service";
import {PageSettingRoleComponent} from "@app/modules/admin/page/page-setting-role.component";


const routes: Routes = [
    {
        path: '', component: AdminComponent,
        children: [
            { path: '', redirectTo: 'pages', pathMatch: 'full' },
            { path: 'pages', component: AdminPagesComponent },
            { path: ':userName/setting', component: PageSettingComponent, resolve: { activePage: ActivePageResolver } },
            { path: ':userName/setting/member', component: PageSettingMemberComponent, resolve: { activePage: ActivePageResolver } },
            { path: ':userName/setting/role', component: PageSettingRoleComponent, resolve: { activePage: ActivePageResolver } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    providers: [ActivePageResolver],
    exports: [RouterModule],
})
export class AdminRoutingModule {}