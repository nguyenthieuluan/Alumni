import {
    Directive,
    ElementRef,
    Input,
    Output,
    Renderer,
    OnChanges,
    SimpleChanges,
    EventEmitter
} from "@angular/core";

@Directive({ selector: "[mediaPreview]" })
export class MediaPreviewDirective implements OnChanges {
    @Input()
    private media: File;
    @Output()
    onRead = new EventEmitter<any>();
    constructor(private el: ElementRef) {
        console.log(el);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!this.media) {
            return;
        }

        const reader = new FileReader();
        const el = this.el;
        if (this.media.type === "   ---    ") {
            reader.onloadend = () => (el.nativeElement.data = reader.result);
        } else if (this.media.type.startsWith("image")) {
            reader.onloadend = () => {
                var size = this.el.nativeElement.parentElement;
                var img = new Image();
                let that = this;
                img.onload = function(imageEvent) {
                    var canvas = document.createElement("canvas"),
                        ctx = canvas.getContext("2d");
                    var width = img.width,
                        height = img.height;
                    if (width > height) {
                        if (width > size.clientWidth) {
                            height *= size.clientWidth / width;
                            width = size.clientWidth;
                        }
                    } else {
                        if (height > size.clientHeight) {
                            width *= size.clientHeight / height;
                            height = size.clientHeight;
                        }
                    }
                    // set its dimension to target size
                    canvas.width = size.clientWidth;
                    canvas.height = size.clientHeight;

                    // draw source image into the off-screen canvas:
                    ctx.drawImage(img, 0, 0, width, height);

                    // encode image to data-uri with base64 version of compressed image
                    var resizedData = canvas.toDataURL();
                    el.nativeElement.src = resizedData;

                    // Resize the image using canvas

                    that.onRead.emit(resizedData);
                };
                img.src = reader.result as string;
            };
        }

        reader.readAsDataURL(this.media);
    }
    resize(
        img: HTMLImageElement,
        w: number,
        h: number,
        keepAspectRatio: boolean
    ) {
        var canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d");
        var width = img.width,
            height = img.height;
        if (width > height) {
            if (width > w) {
                height *= w / width;
                width = w;
            }
        } else {
            if (height > h) {
                width *= h / height;
                height = h;
            }
        }
        // set its dimension to target size
        canvas.width = w;
        canvas.height = h;

        // draw source image into the off-screen canvas:
        ctx.drawImage(img, 0, 0, width, height);

        // encode image to data-uri with base64 version of compressed image
        return canvas;
    }
    crop(img: HTMLImageElement, x: number, y: number, w: number, h: number) {
        var canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d");
        var width = img.width,
            height = img.height;

        canvas.width = w;
        canvas.height = h;

        // draw source image into the off-screen canvas:
        ctx.drawImage(img, 0, 0, width, height, x, y, w, h);

        // encode image to data-uri with base64 version of compressed image
        return canvas;
    }
}
