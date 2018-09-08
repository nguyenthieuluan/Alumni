import { Component, OnInit, ViewEncapsulation, Injector, Input } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponentBase } from "@shared/app-component-base";
import { AppAuthService } from "@shared/auth/app-auth.service";
import { ConfigurationServiceProxy, UserInfoDto } from "@shared/service-proxies/service-proxies";

import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile'
import { interval } from "rxjs";
@Component({
    selector: 'user-link',
    templateUrl: './user-link.component.html',

    encapsulation: ViewEncapsulation.None
})

export class UserLinkComponent extends AppComponentBase implements OnInit {
    @Input() user: UserInfoDto;
    @Input() linkClass?: string;
    delayPop;
    popHide;
    isHoverPop: boolean = false;
    constructor(
        injector: Injector,
        private _authService: AppAuthService,
        private _configurationService: ConfigurationServiceProxy,
        private activeRoute: ActivatedRoute,


    ) {
        super(injector);
    }

    ngOnInit(): void {

    }
    hoverPop(isHover: boolean) {
        this.isHoverPop = isHover;
    }
    showProfile(pop: any) {
        this.delayPop = setTimeout(() => {
            pop.show();
            
            this.isHoverPop = true;
        }, 1000);
    }
    hideProfile(pop: any) {
        var stopCondition = false;
        this.isHoverPop = false;
        interval(500)
            .takeWhile(() => !stopCondition)
            .subscribe(i => {
                if (!this.isHoverPop) {
                    this.popHide = setTimeout(() => {
                        pop.hide();
                    }, 1000);
                    clearTimeout(this.delayPop);
                    stopCondition = true;
                }
            })
    }
}