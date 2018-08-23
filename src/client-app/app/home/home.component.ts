import { Component, Injector, AfterViewInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { Routes, RouterModule, Router } from "@angular/router";
import { appModuleAnimation } from '@shared/animations/routerTransition';

@Component({
    templateUrl: './home.component.html',
    styles: [`
        .title p a{
            text-decoration: underline;
            color: white;
            font-size: 16px;
        }
    `],
    animations: [appModuleAnimation()]
})
export class HomeComponent extends AppComponentBase implements AfterViewInit {

    constructor(
        private router: Router,
        injector: Injector
    ) {
        super(injector);
        if (this.isLoggedin()) {
            this.router.navigate(["/app/newsfeed"]);
        } else {

        }
    }
    ngAfterViewInit(): void {

    }
}
