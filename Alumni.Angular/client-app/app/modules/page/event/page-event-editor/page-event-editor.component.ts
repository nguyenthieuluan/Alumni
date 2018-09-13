import { PageService } from "@app/modules/page/page.service";
import {
  EventPlanDetailDto,
  EventPlanServiceProxy
} from "@shared/service-proxies/service-proxies";
import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  ElementRef,
  Injector
} from "@angular/core";

import {
  ImageCropperComponent,
  CropperSettings,
  Bounds
} from "ngx-img-cropper";
import {
  UploadFile,
  UploadInput,
  UploaderOptions,
  humanizeBytes,
  UploadOutput
} from "ngx-uploader";
import { Picture } from "@shared/service-proxies/service-proxies";
import { AnyKindOfDictionary } from "lodash";
import { Router, ActivatedRoute } from "@angular/router";
import { AppComponentBase } from "@shared/app-component-base";

@Component({
  selector: "page-event-editor",
  templateUrl: "./page-event-editor.component.html",
  styleUrls: ["./page-event-editor.component.css"]
})
export class PageEventEditorComponent extends AppComponentBase
  implements OnInit {
  model = {};
  page = {};
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  event: EventPlanDetailDto = new EventPlanDetailDto();
  options: UploaderOptions;
  mediaFile: File;
  @ViewChild("doBPickerFrom")
  elDateFrom: ElementRef;
  @ViewChild("doBPickerTo")
  elDateTo: ElementRef;
  constructor(
    private remoteEventService: EventPlanServiceProxy,
    private injector: Injector,
    private router: Router,
    private route: ActivatedRoute,
    private pageService: PageService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.options = { concurrency: 1, maxUploads: 2 };
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }
  save() {
    this.event.pageId = this.pageService.activePage.id;
    this.event.eventType = 1;
    if (!this.event.eventName) {
      this.notify.error("You must set Event Name");
      return;
    }
    if (!this.event.startDate) {
      this.notify.error("You must set Start Date");
      return;
    }

    //this.event.startDate = this.dateValue(this.elDateFrom);
    //this.event.endDate = this.dateValue(this.elDateTo);
    //console.log(this.event);
    this.remoteEventService.createEvent(this.event).subscribe(r => {
      this.router.navigate(["..", r.guid], { relativeTo: this.route });
    });
  }
  ///upload stuffs
  onUploadOutput(output: UploadOutput): void {
    if (output.type === "allAddedToQueue") {
    } else if (
      (output.type === "addedToQueue" || output.type === "rejected") &&
      typeof output.file !== "undefined"
    ) {
      if (output.file.type.startsWith("image/")) {
        this.mediaFile = output.file.nativeFile;
      }
    } else if (output.type === "removed") {
    } else if (output.type === "start") {
    } else if (output.type === "done") {
    }
  }

  setImgData(data: string): void {
    this.event.eventPhoto = data;
  }
  removeFile(): void {
    this.event.eventPhoto = "";
    this.mediaFile = null;
  }
  dateValue(el: ElementRef, val?): any {
    // const dateInput = $(el.nativeElement).data("daterangepicker").startDate;
    // if (!val) {
    //   return dateInput;
    // }
    // el.nativeElement.value = val.format("DD/MM/YYYY");
  }
}
