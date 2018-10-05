import { Component,Injector, OnInit } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
    StudentSearchInput,
    StudentProfileDto,
    StudentProfileServiceProxy
} from "@shared/service-proxies/service-proxies";
@Component({
    selector: '',
    templateUrl: './tracuu.component.html',
})
export class TraCuuComponent  extends AppComponentBase implements OnInit {
    constructor(
        injector: Injector,
        private studentService: StudentProfileServiceProxy
    ) {
        super(injector);
    }
    input = new StudentSearchInput;
    students: StudentProfileDto[];
    student = new StudentProfileDto;
    
    ngOnInit(): void {
        this.input.maxResultCount = 10;
        this.input.skipCount = 10;
        // this.student.birthday;
        // this.student.name;
    }
    search() {
        this.studentService.searchStudents(this.input).subscribe(r=> {
            this.students = r.studentProfiles.items;
        })
    }
 
}