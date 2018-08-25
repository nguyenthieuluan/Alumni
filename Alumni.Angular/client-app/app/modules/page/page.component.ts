import { Component } from "@angular/core";
import { PageDetailDto } from "@shared/service-proxies/service-proxies";

@Component({
    selector: '',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.css'],
})
export class PageComponent {
    model: PageDetailDto = new PageDetailDto();

    ngOnInit() {
    }
    ngAfterViewInit() {
        //this._pageService.getPage().subscribe(r => {
        //    this.setModel(r);
        //});
    }
}