import { Component, ViewChild, Output, EventEmitter, ElementRef } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap";

@Component({
    selector: '',
    templateUrl: './event.component.html',
})
export class UserEventComponent {
    @ViewChild('createModal') modal: ModalDirective;
    @ViewChild('modalContent') modalContent: ElementRef;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    show() {
        this.modal.show();
    }
    close() {
        this.modal.hide();
    }
}