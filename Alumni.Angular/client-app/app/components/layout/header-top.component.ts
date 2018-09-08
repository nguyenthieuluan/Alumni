import { Component, Injector, ViewEncapsulation, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { ConfigurationServiceProxy} from '@shared/service-proxies/service-proxies';

import { AppAuthService } from '@shared/auth/app-auth.service';


@Component({
    templateUrl: './header-top.component.html',
    selector: 'header-top',
    styleUrls: ['./styles/styles.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HeaderTopComponent extends AppComponentBase implements OnInit {
    isLeftMenuCollapsed: boolean = true;
    shownLoginName: string = "";
    searchModel: any = {};
    constructor(
        injector: Injector,
        private _authService: AppAuthService,
        private _configurationService: ConfigurationServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
   
        this.shownLoginName = this.appSession.getShownLoginName();
    }
    
    headerSearch(): void {
        alert(this.searchModel.keyword);
    }
    logout(): void {
        this._authService.logout();
    }

    isHomeLoggedin(): boolean {
        var a: boolean = this.isLoggedin();
        debugger;
        return a;
    }
    private _opened: boolean = false;
  private _modeNum: number = 0;
  private _positionNum: number = 1;
  private _dock: boolean = false;
  private _closeOnClickOutside: boolean = true;
  private _closeOnClickBackdrop: boolean = true;
  private _showBackdrop: boolean = false;
  private _animate: boolean = true;
  private _trapFocus: boolean = true;
  private _autoFocus: boolean = true;
  private _keyClose: boolean = true;
  private _autoCollapseHeight: number = null;
  private _autoCollapseWidth: number = null;
    private isClosing : boolean = false;
  private _MODES: Array<string> = ['over', 'push', 'slide'];
  private _POSITIONS: Array<string> = ['left', 'right', 'top', 'bottom'];

  private _toggleOpened(): void {
      if (this.isClosing) {
          return;
      }
    this._opened = !this._opened;
  }


  private _onOpenStart(): void {
   // console.info('Sidebar opening');
  }

  private _onOpened(): void {
    //console.info('Sidebar opened');
  }

  private _onCloseStart(): void {
      
      this.isClosing= true;
    //console.info('Sidebar closing');
  }

  private _onClosed(): void {
      this._opened= false;
      
      this.isClosing= false;
   // console.info('Sidebar closed');
  }

  private _onTransitionEnd(): void {
   // console.info('Transition ended');
  }

  private _onBackdropClicked(): void {
   // console.info('Backdrop clicked');
  }
}
