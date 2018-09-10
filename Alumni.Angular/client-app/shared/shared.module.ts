﻿import { CommonModule } from "@angular/common";
import { NgModule, ModuleWithProviders } from "@angular/core";

import { AbpModule } from "@abp/abp.module";
import { RouterModule } from "@angular/router";

import { AppSessionService } from "./session/app-session.service";
import { AppUrlService } from "./nav/app-url.service";
import { AppAuthService } from "./auth/app-auth.service";
import { AppRouteGuard } from "./auth/auth-route-guard";
import { MaterialInput } from "shared/directives/material-input.directive";
import {
    TooltipModule,
    ModalModule,
    AccordionModule,
    CollapseModule,
    TabsModule,
    PopoverModule,
    BsDropdownModule
} from "ngx-bootstrap";
import { MomentModule } from "ngx-moment";
import { TagInputModule } from "ngx-chips";
import { NgxUploaderModule } from "ngx-uploader";
import { NgxPaginationModule } from "ngx-pagination";
import { HeaderProfileComponent } from "@app/components/layout/header-profile.component";
import { MediaPreviewDirective } from "@shared/directives/media-preview.directive";
import { MediaTypeDirective } from "@shared/directives/media-type.directive";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { JsonpModule } from "@angular/http";
import { ServiceProxyModule } from "@shared/service-proxies/service-proxy.module";
import { HeaderTopComponent } from "@app/components/layout/header-top.component";
import { BootstrapElementDirective } from "@shared/directives/bootstrap.directive";
import { ImageCropperModule } from "ngx-img-cropper";
import { NewsFeedComponent } from "@app/modules/home/newsfeed.component";
import { PostDetailComponent } from "@app/components/post/post-detail.component";
import { PostEditorComponent } from "@app/components/post/post-editor.component";
import { PostCommentEditorComponent } from "@app/components/post/post-comment-editor.component";
import { PostCommentDetailComponent } from "@app/components/post/post-comment-detail.component";
import { DynamicComponent } from "@shared/dynamic-component";
import { NgxComponentOutletModule } from "ngx-component-outlet";
import { SidebarModule } from "ng-sidebar";
import { UserLinkComponent } from "@app/components/user/user-link.component";
import { WidgetPageMenuComponent } from "@app/modules/page/_components/widget-page-menu.component";
import { WidgetPageIntroComponent } from "@app/modules/page/_components/widget-page-intro.component";
import { PageHeaderProfileComponent } from "@app/modules/page/_components/page-header-profile.component";
import { PageService } from "@app/modules/page/page.service";
import { UserHeaderProfileComponent } from "@app/modules/user/_components/user-header-profile.component";
import { UserWidgetMenuComponent } from "@app/modules/user/_components/user-widget-menu.component";
import { UserWidgetIntroComponent } from "@app/modules/user/_components/user-widget-intro.component";
import { UserWidgetFriendsComponent } from "@app/modules/user/_components/user-widget-friends.component";
import { WidgetPostGalleryComponent } from "@app/modules/page/post/widget-post-gallery.component";
import { EventDetailComponent } from "@app/components/event/event-detail/event-detail.component";
import { WidgetUserListComponent } from "@app/components/user/widget-user-list.component";

@NgModule({
    imports: [
        //angular core
        CommonModule,
        RouterModule,
        FormsModule,
        HttpClientModule,
        JsonpModule,
        //abp
        AbpModule,
        //ngx-bootstrap
        BsDropdownModule.forRoot(),
        ModalModule.forRoot(),
        TooltipModule.forRoot(),
        AccordionModule.forRoot(),
        PopoverModule.forRoot(),
        TabsModule.forRoot(),
        SidebarModule.forRoot(),
        TagInputModule,
        ImageCropperModule,
        NgxUploaderModule,
        NgxPaginationModule,
        NgxComponentOutletModule.forChild(),
        //others
        MomentModule,

        //webapi
        ServiceProxyModule
    ],
    declarations: [
        HeaderTopComponent,
        BootstrapElementDirective,
        MediaPreviewDirective,
        MediaTypeDirective,
        MaterialInput,
        HeaderProfileComponent,
        DynamicComponent,
        NewsFeedComponent,
        PostDetailComponent,
        PostEditorComponent,
        PostCommentEditorComponent,
        PostCommentDetailComponent,
        WidgetPostGalleryComponent,
        UserLinkComponent,
        WidgetUserListComponent,
        //events
        EventDetailComponent,
        //user
        UserHeaderProfileComponent,
        UserWidgetMenuComponent,
        UserWidgetIntroComponent,
        UserWidgetFriendsComponent,
        //page
        WidgetPageMenuComponent,
        WidgetPageIntroComponent,
        PageHeaderProfileComponent
    ],
    exports: [
        //angular core
        CommonModule,
        RouterModule,
        FormsModule,
        HttpClientModule,
        JsonpModule,
        //abp
        AbpModule,
        //ngx-bootstrap
        BsDropdownModule,
        ModalModule,
        TooltipModule,
        AccordionModule,
        TabsModule,
        PopoverModule,
        TagInputModule,
        NgxUploaderModule,
        NgxPaginationModule,

        //others
        MomentModule,
        //webapi
        ServiceProxyModule,
        DynamicComponent,
        //Components, directives, pipes
        HeaderTopComponent,
        BootstrapElementDirective,
        MediaPreviewDirective,
        MediaTypeDirective,
        ImageCropperModule,
        MaterialInput,
        NewsFeedComponent,
        PostDetailComponent,
        PostEditorComponent,
        PostCommentEditorComponent,
        PostCommentDetailComponent,
        WidgetPostGalleryComponent,
        UserLinkComponent,
        WidgetUserListComponent,
        HeaderProfileComponent,
        //events
        EventDetailComponent,
        //user
        UserHeaderProfileComponent,
        UserWidgetMenuComponent,
        UserWidgetIntroComponent,
        UserWidgetFriendsComponent,
        //page
        WidgetPageMenuComponent,
        WidgetPageIntroComponent,
        PageHeaderProfileComponent
    ],
    providers: [PageService],
    entryComponents: [HeaderProfileComponent]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                AppSessionService,
                AppUrlService,
                AppAuthService,
                AppRouteGuard
            ]
        };
    }
}
