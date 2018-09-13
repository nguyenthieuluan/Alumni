import { CommonModule } from "@angular/common";
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
import { EventCommentEditorComponent } from "@app/components/event/event-comment-editor/event-comment-editor.component";
import { EventCommentDetailComponent } from "@app/components/event/event-comment-detail/event-comment-detail.component";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import {
  DateTimeAdapter,
  OWL_DATE_TIME_FORMATS,
  OWL_DATE_TIME_LOCALE
} from "ng-pick-datetime";
import {
  MomentDateTimeAdapter,
  OWL_MOMENT_DATE_TIME_FORMATS
} from "ng-pick-datetime-moment";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { N2BrPipe } from "@shared/directives/n2br.pipe";
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
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    InfiniteScrollModule,
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
    //others

    N2BrPipe,
    //events
    EventDetailComponent,
    EventCommentEditorComponent,
    EventCommentDetailComponent,
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
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    N2BrPipe,
    InfiniteScrollModule,
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
    EventCommentEditorComponent,
    EventCommentDetailComponent,
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
  providers: [
    PageService,
    // `MomentDateTimeAdapter` and `OWL_MOMENT_DATE_TIME_FORMATS` can be automatically provided by importing
    // `OwlMomentDateTimeModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateTimeAdapter,
      useClass: MomentDateTimeAdapter,
      deps: [OWL_DATE_TIME_LOCALE]
    },
    { provide: OWL_DATE_TIME_FORMATS, useValue: OWL_MOMENT_DATE_TIME_FORMATS }
  ],
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
