import { NgModule } from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap';
import { SharedModule } from '@shared/shared.module';

import { PostsComponent } from '@app/posts/posts.component';
import { AboutComponent } from '@app/about/about.component';
import { AdvertisementRightComponent } from '@app/advertisement/advertisement-right.component';
import { AdvertisementLeftComponent } from '@app/advertisement/advertisement-left.component';
import { AdvertisementTopComponent } from '@app/advertisement/advertisement-top.component';

import { EventsComponent } from '@app/events/events.component';
import { EventDetailComponent } from '@app/events/event-detail/event-detail.component';
import { EventListComponent } from '@app/events/event-list/event-list.component';
import { RightSideBarComponent } from '@app/layout/right-sidebar.component';
import { FriendsComponent } from '@app/friends/friends.component';
import { SideBarNavComponent } from '@app/layout/sidebar-nav.component';
import { TopBarComponent } from '@app/layout/topbar.component';
import { CreateRoleComponent } from '@app/roles/create-role/create-role.component';
import { EditRoleComponent } from '@app/roles/edit-role/edit-role.component';
import { RolesComponent } from '@app/roles/roles.component';
import { SideBarFooterComponent } from '@app/layout/sidebar-footer.component';
import { SideBarUserAreaComponent } from '@app/layout/sidebar-user-area.component';
import { TopBarLanguageSwitchComponent } from '@app/layout/topbar-languageswitch.component';
import { PrivacyComponent } from '@app/setting/privacy/privacy.component';
import { ChangePasswordComponent } from '@app/setting/profile/change-password.component';
import { HobbiesInterestsComponent } from '@app/setting/profile/hobbies-interests.component';
import { EditTenantComponent } from '@app/tenants/edit-tenant/edit-tenant.component';
import { CreateTenantComponent } from '@app/tenants/create-tenant/create-tenant.component';
import { TenantsComponent } from '@app/tenants/tenants.component';
import { EditUserComponent } from '@app/users/edit-user/edit-user.component';



@NgModule({
    declarations: [
        PostsComponent,
        AboutComponent,
        AdvertisementRightComponent,
        AdvertisementLeftComponent,
        AdvertisementTopComponent,
        EventsComponent,
        EventDetailComponent,
        EventListComponent,
        FriendsComponent,
        RightSideBarComponent, 
        SideBarFooterComponent,
        SideBarNavComponent ,
        SideBarUserAreaComponent,
        TopBarLanguageSwitchComponent,
        TopBarComponent,
        CreateRoleComponent,
        EditRoleComponent ,
        RolesComponent , 
        PrivacyComponent,
        ChangePasswordComponent,
        HobbiesInterestsComponent,
        EditTenantComponent ,
        CreateTenantComponent ,
        TenantsComponent , 
        EditUserComponent ,
    ],
    imports: [
        
        SharedModule,
    ],
    providers: [
    ]
})
export class PostModule { }
