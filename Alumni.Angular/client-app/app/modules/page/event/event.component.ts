import { PageDetailDto } from "@shared/service-proxies/service-proxies";
import { PageService } from "@app/modules/page/page.service";
import {
  EventPlanServiceProxy,
  EventPlanDetailDto,
  PagedResultRequestDto,
  EventListInput
} from "@shared/service-proxies/service-proxies";
import { Component, OnInit, Injector } from "@angular/core";
import { fn } from "moment";
import { AppComponentBase } from "@shared/app-component-base";

@Component({
  selector: "",
  templateUrl: "./event.component.html"
})
export class PageEventComponent extends AppComponentBase implements OnInit {
  eventList: EventPlanDetailDto[] = [];
  eventListP: EventPlanDetailDto[] = [];
  eventListF: EventPlanDetailDto[] = [];
  page: PageDetailDto;
  request: EventListInput = new EventListInput();
  constructor(
    private injector: Injector,
    private eventService: EventPlanServiceProxy,
    private pageService: PageService
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.eventList = [];
    this.eventListP = [];
    this.eventListF = [];
    this.page = this.pageService.activePage;
    this.request.maxResultCount = 10;
    this.request.pageUserName = this.pageService.activePage.userName;
    this.eventService.getEventOfPageList(this.request).subscribe(r => {
      this.eventList = r.items;
      this.eventListF = r.items.filter(ev => {
        if (ev.startDate.toDate() >= new Date()) {
          return ev;
        }
      });
      this.eventListP = r.items.filter(ev => {
        if (ev.startDate.toDate() < new Date()) {
          return ev;
        }
      });
    });
  }
}
