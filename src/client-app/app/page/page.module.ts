import { NgModule } from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap';
import { SharedModule } from '@shared/shared.module';
import { PageRoutingModule } from './page-routing.module';
import { PageComponent } from './page.component';
import { ImageCropperComponent } from 'ngx-img-cropper';
import { PagePostsComponent } from '@app/page/post/page-posts.component';
import { PagePostPublishComponent } from '@app/page/post/page-post-publish.component';
import { PageSettingComponent } from '@app/page/setting/page-setting.component';
import { PageHeaderProfileComponent } from '@app/page/page-header-profile.component';
import { PageSettingPictureComponent } from '@app/page/setting/page-setting-picture.component';



@NgModule({
    declarations: [
        PageComponent,
        PagePostsComponent,
        PagePostPublishComponent,
        PageSettingComponent,
        PageSettingPictureComponent,
        PageHeaderProfileComponent,
    ],
    imports: [
        SharedModule,
        PageRoutingModule,
    ],
    providers: [
    ]
})
export class PageModule { }
