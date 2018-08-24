import { AppComponent } from "@app/app.component";

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
