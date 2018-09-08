import { AppComponent } from "@app/app.component";

import { AppRoutingModule } from "@app/app-routing.module";
import { SharedModule } from "@shared/shared.module";
import { NgModule } from "@angular/core";
import { HomePageComponent } from "@app/modules/home/homepage.component";


@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
    ],
    imports: [
        AppRoutingModule,
        SharedModule,
    ],
    providers: [

    ]
})
export class AppModule { }
