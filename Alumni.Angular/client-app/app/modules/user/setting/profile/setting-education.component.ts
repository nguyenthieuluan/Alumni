import { Component, Injector } from "@angular/core";
import { StudentProfileInput, StudentProfileServiceProxy, StudentProfileDto } from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";

@Component({
    selector: '',
    templateUrl: './setting-education.component.html',
})
export class UserSettingEducationComponent   extends AppComponentBase {
    model: StudentProfileInput = new StudentProfileInput();
    professionList: any[];
    constructor(
        injector: Injector,
        private _studentProfileService: StudentProfileServiceProxy
    ) {
        super(injector);
        this.model.studentProfile = new StudentProfileDto;
        this.professionList = [
            {
                id: "student",
                name: "Sinh viên"
            },
            {
                id: "teacher",
                name: "Giáo viên"
            },
            {
                id: "officer",
                name: "Nhân viên văn phòng"
            },
            {
                id: "others",
                name: "Khác"
            },];
            
        this._studentProfileService.getStudentProfile().subscribe(r => {
            this.model = r;
        });
    }
  
    save() {
       
        this._studentProfileService.updateStudentProfile(this.model).subscribe(r => {

            this.notify.success("Cập nhật thông tin thành công.", "", { positionClass: 'toast-top-right' });
        });
    }
}