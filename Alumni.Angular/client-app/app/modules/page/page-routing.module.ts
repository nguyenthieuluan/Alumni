﻿import { PageEventEditorComponent } from "./event/page-event-editor/page-event-editor.component";
import { PageEventDetailComponent } from "@app/modules/page/event/page-event-detail/page-event-detail.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";
import { PageComponent } from "./page.component";
import { PagePostsComponent } from "./post/page-posts.component";
import { PageTimelineComponent } from "./timeline/timeline.component";
import { ActivePageResolver } from "@app/modules/page/page.service";
import { PageSettingComponent } from "@app/modules/page/setting/page-setting.component";
import { PageSettingInfoComponent } from "@app/modules/page/setting/page-setting-info.component";
import { PageSettingPictureComponent } from "@app/modules/page/setting/page-setting-picture.component";
import { PageSettingCategoryComponent } from "@app/modules/page/setting/page-setting-category.component";
import { PageFollowersComponent } from "@app/modules/page/follower/page-followers.component";
import { PageLikesComponent } from "@app/modules/page/follower/page-likes.component";
import { PageEventComponent } from "@app/modules/page/event/event.component";

const routes: Routes = [
  {
    path: ":userName",
    component: PageComponent,
    resolve: { activePage: ActivePageResolver },
    children: [
      { path: "", component: PageTimelineComponent },
      { path: "posts", component: PagePostsComponent },
      { path: "events", component: PageEventComponent },
      { path: "event/editor", component: PageEventEditorComponent },
      { path: "event/:id", component: PageEventDetailComponent },
      { path: "followers", component: PageFollowersComponent },
      { path: "likes", component: PageLikesComponent },
      {
        path: "setting",
        component: PageSettingComponent,
        children: [
          { path: "", component: PageSettingInfoComponent },
          { path: "info", component: PageSettingInfoComponent },
          { path: "picture", component: PageSettingPictureComponent },
          { path: "category", component: PageSettingCategoryComponent }
        ]
      },
      {
        path: "category/:categoryCode",
        component: PageTimelineComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [ActivePageResolver],
  exports: [RouterModule]
})
export class PageRoutingModule {}
