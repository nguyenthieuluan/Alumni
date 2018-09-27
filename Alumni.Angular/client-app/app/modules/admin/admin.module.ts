import { NgModule } from "@angular/core";

import { SharedModule } from "@shared/shared.module";
import { AdminPagesComponent } from "@app/modules/admin/page/admin-pages.component";
import { AdminComponent } from "@app/modules/admin/admin.component";
import { AdminWidgetMenuComponent } from "@app/modules/admin/_component/admin-widget-menu.component";
import {AdminRoutingModule} from "@app/modules/admin/admin-routing.module";
import { PageSettingComponent } from "@app/modules/admin/page/page-setting.component";
import { PageSettingMemberComponent } from "@app/modules/admin/page/page-setting-member.component";
import { PageService } from "@app/modules/admin/page/page.service";
import {UserService} from "@app/modules/admin/user.service";
import {PageSettingRoleComponent} from "@app/modules/admin/page/page-setting-role.component";

@NgModule({
    declarations: [
        AdminComponent,
        AdminPagesComponent,
        AdminWidgetMenuComponent,
        PageSettingComponent,
        PageSettingMemberComponent,
        PageSettingRoleComponent,
    ],
    imports: [
        SharedModule,
        AdminRoutingModule
    ],
    providers: [PageService, UserService],
})
export class AdminModule { }