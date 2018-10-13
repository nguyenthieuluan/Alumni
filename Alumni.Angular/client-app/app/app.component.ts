
import { Component, OnInit, AfterViewInit, Injector } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import { PostDetailDto, PostCommentDetailDto } from "@shared/service-proxies/service-proxies";
import { Subject } from "rxjs";
import { Router } from "@angular/router";


@Component({
    templateUrl: './app.component.html'
})
export class AppComponent extends AppComponentBase implements OnInit, AfterViewInit {
    constructor(
        injector: Injector,
        private router: Router

    ) {
        super(injector);
    }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {

    }
}
