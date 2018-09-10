import {
    Component,
    OnInit,
    ViewEncapsulation,
    Injector,
    Input,
    Injectable
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AppComponentBase } from "@shared/app-component-base";
import { AppAuthService } from "@shared/auth/app-auth.service";
import {
    ConfigurationServiceProxy,
    UserInfoDto,
    UserProfileDto
} from "@shared/service-proxies/service-proxies";

@Component({
    selector: "widget-user-list",
    templateUrl: "./widget-user-list.component.html",

    encapsulation: ViewEncapsulation.None
})
@Injectable()
export class WidgetUserListComponent extends AppComponentBase
    implements OnInit {
    @Input()
    title: string;
    @Input()
    users: UserProfileDto[];
    model: any;
    constructor(
        injector: Injector,
        private _authService: AppAuthService,
        private _configurationService: ConfigurationServiceProxy,
        private activeRoute: ActivatedRoute
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.model.title = this.title;
        this.model.users = this.users;
    }
}
