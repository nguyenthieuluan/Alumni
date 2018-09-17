import {
  Component,
  Injector,
  ElementRef,
  AfterViewInit,
  ViewChild,
  OnInit
} from "@angular/core";
import { Router } from "@angular/router";
import {
  AccountServiceProxy,
  RegisterInput,
  RegisterOutput
} from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";
import { LoginService } from "../login/login.service";
import { accountModuleAnimation } from "@shared/animations/routerTransition";

@Component({
  templateUrl: "./register.component.html",
  animations: [accountModuleAnimation()]
})
export class RegisterComponent extends AppComponentBase
  implements AfterViewInit, OnInit {
  // @ViewChild('cardBody') cardBody: ElementRef;

  model: RegisterInput = new RegisterInput();

  saving = false;
  confirmPassword = "";

  constructor(
    injector: Injector,
    private _accountService: AccountServiceProxy,
    private readonly _loginService: LoginService,
    private _router: Router
  ) {
    super(injector);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  back(): void {
    this._router.navigate(["/login"]);
  }

  save(): void {
    //this.saving = true;
    //this._accountService.register(this.model)
    //    .finally(() => { this.saving = false; })
    //    .subscribe((result:RegisterOutput) => {
    //        if (!result.canLogin) {
    //            this.notify.success(this.l('SuccessfullyRegistered'));
    //            this._router.navigate(['/login']);
    //            return;
    //        }
    //        //Autheticate
    //        this.saving = true;
    //        this._loginService.authenticateModel.userNameOrEmailAddress = this.model.userName;
    //        this._loginService.authenticateModel.password = this.model.password;
    //        this._loginService.authenticate(() => { this.saving = false; });
    //    });
  }

  register() {
    if (this.model.password != this.confirmPassword) {
      this.message.error("Password and Confirm password don't match");
      return;
    }

    this.model.surname = "surname";
    //console.log(this.model);
    this.saving = true;
    this._accountService
      .register(this.model)
      .finally(() => {
        this.saving = false;
      })
      .subscribe((result: RegisterOutput) => {
        if (!result.canLogin) {
          this.notify.success(this.l("SuccessfullyRegistered"));
          this._router.navigate(["/login"]);
          return;
        }

        //Autheticate
        this.saving = true;
        this._loginService.authenticateModel.userNameOrEmailAddress = this.model.userName;
        this._loginService.authenticateModel.password = this.model.password;
        this._loginService.authenticate(() => {
          this.saving = false;
        });
      });
  }
}
