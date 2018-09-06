import { Input, Component, EventEmitter, ElementRef, ViewChild, Output, Injector } from "@angular/core";
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { PostDetailDto, Picture, PostData, PostServiceProxy } from "@shared/service-proxies/service-proxies";
import { forEach } from "@angular/router/src/utils/collection";
import { identifierModuleUrl } from "@angular/compiler";
import { AppConsts } from "@shared/AppConsts";
import { TokenService } from '@abp/auth/token.service';
import { AppComponentBase } from "@shared/app-component-base";

@Component({
    selector: 'page-post-editor',
    templateUrl: './page-post-editor.component.html',
})
export class PagePostEditorComponent extends AppComponentBase {

      constructor(
        injector: Injector,
    ) {

        super(injector);
    }
}
