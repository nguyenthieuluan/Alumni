import { Directive, ElementRef, Input, Output, Renderer, OnChanges, SimpleChanges,EventEmitter } from '@angular/core';

@Directive({ selector: '[mediaPreview]' })

export class MediaPreviewDirective implements OnChanges {
    @Input() private media: File;
    @Output() onRead = new EventEmitter<any>();
    constructor(private el: ElementRef) { }

    ngOnChanges(changes: SimpleChanges) {
        if (!this.media) {
            return;
        }
        const reader = new FileReader();
        const el = this.el;
        if (this.media.type === '   ---    ') {
            reader.onloadend = () => el.nativeElement.data = reader.result;
        } else if (this.media.type.startsWith('image')) {
            reader.onloadend = () => {
                var data = reader.result;
                el.nativeElement.src = data;
                this.onRead.emit(data);
            }
        }
    
        reader.readAsDataURL(this.media);
    }
}