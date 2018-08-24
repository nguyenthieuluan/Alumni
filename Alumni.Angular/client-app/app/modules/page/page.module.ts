import { NgModule } from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap';
import { SharedModule } from '@shared/shared.module';
import { PageRoutingModule } from './page-routing.module';
import { PageComponent } from './page.component';



@NgModule({
    declarations: [
        PageComponent,
    ],
    imports: [
        SharedModule,
        PageRoutingModule,
    ],
    providers: [
    ]
})
export class PageModule { }
