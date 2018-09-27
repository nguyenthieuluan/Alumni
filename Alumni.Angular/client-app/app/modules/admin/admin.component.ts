
import {Component, OnInit, Injector, AfterViewInit} from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {UserProfileDto, UserProfileServiceProxy} from "@shared/service-proxies/service-proxies";

@Component({
  selector: "",
  templateUrl: "./admin.component.html"
})
export class AdminComponent extends AppComponentBase implements OnInit, AfterViewInit {
    model: UserProfileDto = new UserProfileDto;
    constructor(
        injector: Injector,
        private _userProfileService: UserProfileServiceProxy,
    ) {
        super(injector);
    }

    ngOnInit(): void {
    }
    ngAfterViewInit() {
        this._userProfileService.getCurrentProfile().subscribe(r => {
            this.model = r;
        });
    }
}
