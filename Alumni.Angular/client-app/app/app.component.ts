import { Component, ViewContainerRef, Injector, OnInit, AfterViewInit } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/app-component-base';


@Component({
    templateUrl: './app.component.html'
})
export class AppComponent extends AppComponentBase implements OnInit, AfterViewInit {
    
    constructor(
        injector: Injector
    ) {
        super(injector);
        
       // console.log("start app...");
    }

    ngOnInit(): void {
      
    }

    ngAfterViewInit(): void {
       
    }
}
