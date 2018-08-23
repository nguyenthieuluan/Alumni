import { Component, Injector } from "@angular/core";
import { StudentProfileInput, StudentProfileServiceProxy, StudentProfileDto } from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";

@Component({
    selector: '',
    templateUrl: './education.component.html',
})
export class EducationComponent   extends AppComponentBase {
    model: StudentProfileInput = new StudentProfileInput();
    constructor(
        injector: Injector,
        private _studentProfileService: StudentProfileServiceProxy
    ) {
        super(injector);
        this.model.studentProfile = new StudentProfileDto;
        this._studentProfileService.getStudentProfile().subscribe(r => {
            this.model = r;
        });
    }
  
    save() {
       
        this._studentProfileService.updateStudentProfile(this.model).subscribe(r => {

            this.notify.success("Your password is successfuly changed.", "", { positionClass: 'toast-top-right' });
        });
    }
}