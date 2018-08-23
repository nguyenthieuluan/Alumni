import { Directive, ElementRef, Injectable, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[materialInput]'
})

@Injectable()
export class MaterialInput implements AfterViewInit {
    constructor(private _element: ElementRef) {
    }

    ngAfterViewInit(): void {
        $.material.init();
        $('.checkbox > label').on('click', function () {
            $(this).closest('.checkbox').addClass('clicked');
        })
    }
}
