import { PageEventEditorComponent } from "./event/page-event-editor/page-event-editor.component";
import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { PageRoutingModule } from "./page-routing.module";
import { PageComponent } from "./page.component";
import { PagePostsComponent } from "./post/page-posts.component";
import { PageTimelineComponent } from "./timeline/timeline.component";
import { PageService, ActivePageResolver } from "./page.service";
import { WidgetPageMenuComponent } from "./_components/widget-page-menu.component";
import { WidgetPageIntroComponent } from "./_components/widget-page-intro.component";
import { PageHeaderProfileComponent } from "./_components/page-header-profile.component";
import { PageSettingComponent } from "./setting/page-setting.component";
import { PageSettingInfoComponent } from "./setting/page-setting-info.component";
import { PageSettingPictureComponent } from "./setting/page-setting-picture.component";
import { PageSettingCategoryComponent } from "./setting/page-setting-category.component";
import { PageFollowerComponent } from "./follower/follower.component";
import { PageEventComponent } from "./event/event.component";
import { PageSettingCategoryCreateComponent } from "@app/modules/page/setting/page-setting-category-create.component";
import { PageEventDetailComponent } from "@app/modules/page/event/page-event-detail/page-event-detail.component";

@NgModule({
    declarations: [
        PageComponent,
        PagePostsComponent,
        PageTimelineComponent,
        PageEventComponent,
        PageFollowerComponent,
        PageSettingComponent,
        PageSettingInfoComponent,
        PageSettingPictureComponent,
        PageSettingCategoryComponent,
        PageSettingCategoryCreateComponent,
        PageEventDetailComponent,
        PageEventEditorComponent
    ],
    imports: [SharedModule, PageRoutingModule],
    providers: [PageService]
})
export class PageModule {}
