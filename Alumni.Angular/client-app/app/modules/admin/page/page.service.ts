import { Injectable } from "@angular/core";
import { PageDetailDto, PageServiceProxy } from "@shared/service-proxies/service-proxies";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import "rxjs/add/observable/interval";
import "rxjs/add/operator/takeWhile";
import { Subject } from "rxjs";

@Injectable()
export class PageService {
    private _activePage: PageDetailDto;
    private _observableActivePage = new Subject<PageDetailDto>();

    get activePage() {
        return this._activePage;
    }
    setActivePage(page: PageDetailDto) {
        this._activePage = page;
        this._observableActivePage.next(page);
    }
    onSetPage(callback) {
        return this._observableActivePage.asObservable().subscribe(callback);
    }
}

@Injectable()
export class ActivePageResolver implements Resolve<PageDetailDto> {

    constructor(private remotePageService: PageServiceProxy) {}

    resolve(route: ActivatedRouteSnapshot) {
        var model: PageDetailDto = new PageDetailDto();

        model.userName = route.paramMap.get("userName");
        if (!model.userName) {
            return this.remotePageService.getHomePage();
        } else {
            return this.remotePageService.getPage(model);
        }
    }
}
