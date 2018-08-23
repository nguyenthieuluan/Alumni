import { Directive, ElementRef, Injectable, AfterViewInit, Input } from '@angular/core';

@Directive({
    selector: '[bsEl]'
})

@Injectable()
export class BootstrapElementDirective implements AfterViewInit {
    @Input() options?: any;
    constructor(private _element: ElementRef) {
      
    }

    ngAfterViewInit(): void {
        $.ClientAppScripts.Bootstrap();
        if (!this.options) {
            return;
        }
        if (this.options.scrollbar) {
            $.ClientAppScripts.Scrollbar();
        }
    }
}
