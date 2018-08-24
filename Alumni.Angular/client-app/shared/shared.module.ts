import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AbpModule } from '@abp/abp.module';
import { RouterModule } from '@angular/router';

import { AppSessionService } from './session/app-session.service';
import { AppUrlService } from './nav/app-url.service';
import { AppAuthService } from './auth/app-auth.service';
import { AppRouteGuard } from './auth/auth-route-guard';
import { MaterialInput } from "shared/directives/material-input.directive";
import { TooltipModule, ModalModule, AccordionModule, BsDatepickerModule } from 'ngx-bootstrap';
import { MomentModule } from 'ngx-moment';
import { TagInputModule } from 'ngx-chips';
import { NgxUploaderModule } from 'ngx-uploader';
import { NgxPaginationModule } from 'ngx-pagination';
import { HeaderProfileComponent } from '@app/components/layout/header-profile.component';
import { MediaPreviewDirective } from '@shared/directives/media-preview.directive';
import { MediaTypeDirective } from '@shared/directives/media-type.directive';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JsonpModule } from '@angular/http';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { HeaderTopComponent } from '@app/components/layout/header-top.component';
import { BootstrapElementDirective } from '@shared/directives/bootstrap.directive';
import { ImageCropperModule } from 'ngx-img-cropper';
import { NewsFeedComponent } from '@app/modules/home/newsfeed.component';
import { PostDetailComponent } from '@app/components/post/post-detail.component';
import { PostEditorComponent } from '@app/components/post/post-editor.component';
import { PostCommentEditorComponent } from '@app/components/post/post-comment-editor.component';
import { PostCommentDetailComponent } from '@app/components/post/post-comment-detail.component';

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
        ModalModule.forRoot(),
        TooltipModule.forRoot(),
        AccordionModule.forRoot(),
        TagInputModule,
        ImageCropperModule,
        NgxUploaderModule,
        NgxPaginationModule,

        //others
        MomentModule ,


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
        
        NewsFeedComponent,
        PostDetailComponent,
        PostEditorComponent,
        PostCommentEditorComponent,
        PostCommentDetailComponent,
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
        ModalModule,
        TooltipModule,
        AccordionModule,
        TagInputModule,
        NgxUploaderModule,
        NgxPaginationModule,

        //others
        MomentModule ,


        //webapi
        ServiceProxyModule,

        //Components, directives, pipes
        HeaderTopComponent,
        BootstrapElementDirective,
        MediaPreviewDirective,
        MediaTypeDirective,
        ImageCropperModule,
        MaterialInput,
        HeaderProfileComponent

    ]
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
        }
    }
}
