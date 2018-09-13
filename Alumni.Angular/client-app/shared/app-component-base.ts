import { Injector, ElementRef } from "@angular/core";
import { AppConsts } from "@shared/AppConsts";
import { LocalizationService } from "@abp/localization/localization.service";
import { PermissionCheckerService } from "@abp/auth/permission-checker.service";
import { FeatureCheckerService } from "@abp/features/feature-checker.service";
import { NotifyService } from "@abp/notify/notify.service";
import { SettingService } from "@abp/settings/setting.service";
import { MessageService } from "@abp/message/message.service";
import { AbpMultiTenancyService } from "@abp/multi-tenancy/abp-multi-tenancy.service";
import { AppSessionService } from "@shared/session/app-session.service";
import { Moment } from "moment";

export abstract class AppComponentBase {
  localizationSourceName = AppConsts.localization.defaultLocalizationSourceName;

  localization: LocalizationService;
  permission: PermissionCheckerService;
  feature: FeatureCheckerService;
  notify: NotifyService;
  setting: SettingService;
  message: MessageService;
  multiTenancy: AbpMultiTenancyService;
  appSession: AppSessionService;
  elementRef: ElementRef;

  constructor(injector: Injector) {
    this.localization = injector.get(LocalizationService);
    this.permission = injector.get(PermissionCheckerService);
    this.feature = injector.get(FeatureCheckerService);
    this.notify = injector.get(NotifyService);
    this.setting = injector.get(SettingService);
    this.message = injector.get(MessageService);
    this.multiTenancy = injector.get(AbpMultiTenancyService);
    this.appSession = injector.get(AppSessionService);
    this.elementRef = injector.get(ElementRef);
  }

  l(key: string, ...args: any[]): string {
    let localizedText = this.localization.localize(
      key,
      this.localizationSourceName
    );

    if (!localizedText) {
      localizedText = key;
    }

    if (!args || !args.length) {
      return localizedText;
    }

    args.unshift(localizedText);
    return abp.utils.formatString.apply(this, args);
  }

  isGranted(permissionName: string): boolean {
    return this.permission.isGranted(permissionName);
  }
  isLoggedin(): boolean {
    return this.appSession.user !== undefined;
  }
  loading(state?: number) {
    if (state === 0) {
      abp.ui.clearBusy();
    } else {
      abp.ui.setBusy();
    }
  }
  formatEventDate(start: Moment, end: Moment) {
    if (!start) {
      return "";
    }
    if (!end) {
      return (
        start.format("ddd") +
        " at " +
        start.format("HH:mma") +
        " - " +
        start.fromNow()
      );
    }
    let sameDate = start.isSame(end, "day");

    if (sameDate) {
      return (
        start.format("ddd") +
        " at " +
        start.format("HH:mma") +
        " - " +
        end.format("HH:mma") +
        " - " +
        end.fromNow()
      );
    }
    return (
      start.format("ddd") +
      " at " +
      start.format("HH:mma") +
      " (" +
      start.format("DD/MM") +
      ") - " +
      end.format("ddd") +
      " at " +
      end.format("HH:mma") +
      " (" +
      end.format("DD/MM") +
      ") - " +
      end.fromNow()
    );
  }
}
