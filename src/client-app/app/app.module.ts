import { AppComponent } from "@app/app.component";
import { HomeComponent } from "@app/home/home.component";
import { NewsFeedComponent } from "@app/newsfeed/newsfeed.component";
import { PostDetailComponent } from "@app/posts/post-detail.component";
import { PostEditorComponent } from "@app/posts/post-editor.component";
import { PostCommentEditorComponent } from "@app/posts/post-comment-editor.component";
import { PostCommentDetailComponent } from "@app/posts/post-comment-detail.component";
import { AppRoutingModule } from "@app/app-routing.module";
import { SharedModule } from "@shared/shared.module";
import { NgModule } from "@angular/core";


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        AppRoutingModule,
        SharedModule,
    ],
    providers: [
    ]
})
export class AppModule { }
