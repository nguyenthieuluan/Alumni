import {
    Component,
    OnInit,
    ViewEncapsulation,
    Injector,
    Input
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AppComponentBase } from "@shared/app-component-base";
import { AppAuthService } from "@shared/auth/app-auth.service";
import {
    ConfigurationServiceProxy,
    UserInfoDto,
    UserProfileDto,
    PageDetailDto
} from "@shared/service-proxies/service-proxies";
import { PageService } from "@app/modules/page/page.service";

@Component({
    selector: "widget-page-menu",
    templateUrl: "./widget-page-menu.component.html",

    encapsulation: ViewEncapsulation.None
})
export class WidgetPageMenuComponent extends AppComponentBase
    implements OnInit {
    @Input()
    page: PageDetailDto;
    categories: any[];
    constructor(
        injector: Injector,
        private pageService: PageService,
        private _configurationService: ConfigurationServiceProxy,
        private activeRoute: ActivatedRoute
    ) {
        super(injector);
    }

    ngOnInit(): void {}
}
