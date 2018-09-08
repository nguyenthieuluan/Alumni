import { Component, Input } from "@angular/core";

@Component({
    selector: 'dynamic-component',
    template: ''
})
export class DynamicComponent {
    @Input() componentData: any;
}