import { Directive, ElementRef, Injectable, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[mediaType]'
})

@Injectable()
export class MediaTypeDirective implements AfterViewInit {
    constructor(private _element: ElementRef) {
    }

    ngAfterViewInit(): void {
        $.ClientAppScripts.mediaPopups();
       
    }
}
