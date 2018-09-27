import { Component, OnInit, ViewEncapsulation, Injector } from "@angular/core";
  import { AppComponentBase } from "@shared/app-component-base";
import { UserProfileDto } from "@shared/service-proxies/service-proxies";
  
  @Component({
    selector: "admin-widget-menu",
    templateUrl: "./admin-widget-menu.component.html",
  
    encapsulation: ViewEncapsulation.None
  })
  export class AdminWidgetMenuComponent extends AppComponentBase implements OnInit {
    
    constructor(
      injector: Injector,
    ) {
      super(injector);
    }
  
    ngOnInit(): void {

    }

  }
  