import { Component, Input } from "@angular/core";
import { PostDetailDto, PostServiceProxy, UserTimelinePostRequest, Picture } from "@shared/service-proxies/service-proxies";
import { PostDetailComponent } from "@app/components/post/post-detail.component";

@Component({
    selector: 'widget-post-gallery',
    templateUrl: './widget-post-gallery.component.html',
    styles:[`
    .block-photo {
        padding: 0 15px;
        margin: 0-5px;
    }
    .block-photo a img, .post-block-photo span img {
        border-radius: 0px;
        width: 100%;
    }

    .r {
        width: 100%;
        height: auto;
        max-height: 700px;
        object-fit: cover;
    }

    .r1 {
        width: 100%;
        height: 400px;
        object-fit: cover;
    }

    .r2 {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }
    .r2-2 {
        width: 100%;
        height: 120px;
        object-fit: cover;
    }

    .p {
        padding: 1px;
        padding-right: 0;
        padding-top: 0;
    }

    .more-photos {
        position: absolute !important;
    }
    .more-photos:after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ff5e3a;
        opacity: .6;
        border-radius: 0;
    }
    @media only screen and (max-width: 800px) {
        .r1 {
            width: 100%;
            height: auto;
            max-height: 700px;
            object-fit: cover;
        }

        .r2 {
            width: 100%;
            height: auto;
            max-height: 700px;
            object-fit: cover;
        }
        .r2-2 {
            width: 100%;
            height: auto;
            max-height: 700px;
            object-fit: cover;
        }
        .post {
            overflow: auto;
        }
    }
`]
})
export class WidgetPostGalleryComponent {
    
    @Input() pictures:  Picture[];
    constructor() {
       
    }
}