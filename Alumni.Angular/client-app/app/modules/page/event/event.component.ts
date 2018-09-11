import { PageDetailDto } from "@shared/service-proxies/service-proxies";
import { PageService } from "@app/modules/page/page.service";
import {
    EventPlanServiceProxy,
    EventPlanDetailDto,
    PagedResultRequestDto,
    EventListInput
} from "@shared/service-proxies/service-proxies";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "",
    templateUrl: "./event.component.html"
})
export class PageEventComponent implements OnInit {
    eventList: EventPlanDetailDto[] = [];
    page: PageDetailDto;
    request: EventListInput = new EventListInput();
    constructor(
        private eventService: EventPlanServiceProxy,
        private pageService: PageService
    ) {}
    ngOnInit(): void {
        this.page = this.pageService.activePage;
        this.request.maxResultCount = 10;
        this.request.pageUserName = this.pageService.activePage.userName;
        this.eventService.getEventOfPageList(this.request).subscribe(r => {
            this.eventList = r.items;
        });
    }
}
