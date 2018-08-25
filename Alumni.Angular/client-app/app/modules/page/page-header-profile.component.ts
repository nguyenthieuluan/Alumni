import { Component, Input } from "@angular/core";

@Component({
    selector: 'page-header-profile',
    templateUrl: './page-header-profile.component.html',
})
export class PageHeaderProfileComponent {
   @Input() page: any;
}