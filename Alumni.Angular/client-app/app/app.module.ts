import { AppComponent } from "@app/app.component";

import { AppRoutingModule } from "@app/app-routing.module";
import { SharedModule } from "@shared/shared.module";
import { NgModule } from "@angular/core";
import { HomePageComponent } from "@app/modules/home/homepage.component";
import { UserService } from "@app/modules/user/user.service";
import { TraCuuComponent } from "@app/components/tracuu/tracuu.component";


@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        TraCuuComponent,
    ],
    imports: [
        AppRoutingModule,
        SharedModule,
    ],
    providers: [
        UserService
    ]
})
export class AppModule { }
