import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { UserServiceProxy, CreateUserDto, RoleDto, PageCategory, PageServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
  selector: 'create-page-category-modal',
  templateUrl: './page-setting-category-create.component.html'
})
export class PageSettingCategoryCreateComponent extends AppComponentBase implements OnInit {

    @ViewChild('createCategoryModal') modal: ModalDirective;
    @ViewChild('modalContent') modalContent: ElementRef;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active: boolean = false;
    saving: boolean = false;
    pageCategory: PageCategory = null;

    constructor(
        injector: Injector,
        private pageRemoteService: PageServiceProxy,
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.pageCategory = new PageCategory();
       
    }
    onShown(): void {
   
}
    show(): void {
        this.active = true;
        this.modal.show();
        this.pageCategory = new PageCategory();
        this.pageCategory.init({code: '', name:'', listOrder : 1 }); 
    }
    

    save(): void {
        this.saving = true;
        this.modalSave.emit(null);
                this.close();
        this.saving = false;
                this.notify.info(this.l('SavedSuccessfully'));
      
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
