﻿import { Injectable, Injector } from "@angular/core";
import { Observable, Subject, of } from "rxjs";
import { MessageService } from "@abp/message/message.service";
import { LogService } from "@abp/log/log.service";
import { TokenService } from "@abp/auth/token.service";
import { UtilsService } from "@abp/utils/utils.service";

import {
  HttpClient,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";

import { Http, HttpModule } from "@angular/http";
import { AppConsts } from "@shared/AppConsts";
export interface IValidationErrorInfo {
  message: string;

  members: string[];
}

export interface IErrorInfo {
  code: number;

  message: string;

  details: string;

  validationErrors: IValidationErrorInfo[];
}

export interface IAjaxResponse {
  success: boolean;

  result?: any;

  targetUrl?: string;

  error?: IErrorInfo;

  unAuthorizedRequest: boolean;

  __abp: boolean;
}

@Injectable()
export class CustomHttpConfiguration {
  constructor(
    private _messageService: MessageService,
    private _logService: LogService
  ) {}

  defaultError = <IErrorInfo>{
    message: "An error has occurred!",
    details: "Error details were not sent by server."
  };

  defaultError401 = <IErrorInfo>{
    message: "You are not authenticated!",
    details:
      "You should be authenticated (sign in) in order to perform this operation."
  };

  defaultError403 = <IErrorInfo>{
    message: "You are not authorized!",
    details: "You are not allowed to perform this operation."
  };

  defaultError404 = <IErrorInfo>{
    message: "Resource not found!",
    details: "The resource requested could not be found on the server."
  };

  logError(error: IErrorInfo): void {
    this._logService.error(error);
  }

  showError(error: IErrorInfo): any {
    if (error.details) {
      return this._messageService.error(
        error.details,
        error.message || this.defaultError.message
      );
    } else {
      return this._messageService.error(
        error.message || this.defaultError.message
      );
    }
  }

  handleTargetUrl(targetUrl: string): void {
    if (!targetUrl) {
      location.href = "/";
    } else {
      location.href = targetUrl;
    }
  }

  handleUnAuthorizedRequest(messagePromise: any, targetUrl?: string) {
    const self = this;
    if (!targetUrl) {
      targetUrl = AppConsts.appBaseLogin;
    }
    if (messagePromise) {
      messagePromise.done(() => {
        this.handleTargetUrl(targetUrl || "/");
      });
    } else {
      self.handleTargetUrl(targetUrl || "/");
    }
  }

  handleNonAbpErrorResponse(response: HttpResponse<any>) {
    const self = this;

    switch (response.status) {
      case 401:
        self.handleUnAuthorizedRequest(
          self.showError(self.defaultError401),
          "/"
        );
        break;
      case 403:
        self.showError(self.defaultError403);
        break;
      case 404:
        self.showError(self.defaultError404);
        break;
      default:
        self.showError(self.defaultError);
        break;
    }
  }

  handleAbpResponse(
    response: HttpResponse<any>,
    ajaxResponse: IAjaxResponse
  ): HttpResponse<any> {
    let newResponse: HttpResponse<any>;

    if (ajaxResponse.success) {
      newResponse = response.clone({
        body: ajaxResponse.result
      });

      if (ajaxResponse.targetUrl) {
        this.handleTargetUrl(ajaxResponse.targetUrl);
      }
    } else {
      newResponse = response.clone({
        body: ajaxResponse.result
      });

      if (!ajaxResponse.error) {
        ajaxResponse.error = this.defaultError;
      }

      this.logError(ajaxResponse.error);
      this.showError(ajaxResponse.error);
      if (abp && abp.ui) {
        abp.ui.clearBusy();
      }
      if (response.status === 401) {
        this.handleUnAuthorizedRequest(null, AppConsts.appBaseLogin);
      }
      if (response.status === 403) {
        this.handleUnAuthorizedRequest(null, AppConsts.appBaseLogin);
      }
    }

    return newResponse;
  }

  getAbpAjaxResponseOrNull(response: HttpResponse<any>): IAjaxResponse | null {
    if (!response || !response.headers) {
      return null;
    }

    let contentType = response.headers.get("Content-Type");
    if (!contentType) {
      this._logService.warn("Content-Type is not sent!");
      return null;
    }

    if (contentType.indexOf("application/json") < 0) {
      this._logService.warn(
        "Content-Type is not application/json: " + contentType
      );
      return null;
    }

    let responseObj = JSON.parse(JSON.stringify(response.body));
    if (!responseObj.__abp) {
      return null;
    }

    return responseObj as IAjaxResponse;
  }

  handleResponse(response: HttpResponse<any>): HttpResponse<any> {
    let ajaxResponse = this.getAbpAjaxResponseOrNull(response);
    if (ajaxResponse == null) {
      return response;
    }

    return this.handleAbpResponse(response, ajaxResponse);
  }

  blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
      if (!blob) {
        observer.next("");
        observer.complete();
      } else {
        const reader = new FileReader();
        reader.onload = function() {
          observer.next(this.result);
          observer.complete();
        };
        reader.readAsText(blob);
      }
    });
  }
}

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  protected configuration: CustomHttpConfiguration;
  private _tokenService: TokenService = new TokenService();
  private _utilsService: UtilsService = new UtilsService();
  private _logService: LogService = new LogService();

  constructor(
    private injector: Injector,
    configuration: CustomHttpConfiguration
  ) {
    this.configuration = this.injector.get(CustomHttpConfiguration);
    this._tokenService = this.injector.get(TokenService);
    this._utilsService = this.injector.get(UtilsService);
    this._logService = this.injector.get(LogService);
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let interceptObservable = new Subject<HttpEvent<any>>();
    let modifiedRequest = this.normalizeRequestHeaders(request);

    next.handle(modifiedRequest).subscribe(
      (event: HttpEvent<any>) => {
        this.handleSuccessResponse(event, interceptObservable);
      },
      (error: any) => {
        return this.handleErrorResponse(error, interceptObservable);
      }
    );

    return interceptObservable;
  }

  protected normalizeRequestHeaders(
    request: HttpRequest<any>
  ): HttpRequest<any> {
    let modifiedHeaders = new HttpHeaders();
    modifiedHeaders = request.headers
      .set("Pragma", "no-cache")
      .set("Cache-Control", "no-cache")
      .set("Expires", "Sat, 01 Jan 2000 00:00:00 GMT");

    modifiedHeaders = this.addXRequestedWithHeader(modifiedHeaders);
    modifiedHeaders = this.addAuthorizationHeaders(modifiedHeaders);
    modifiedHeaders = this.addAspNetCoreCultureHeader(modifiedHeaders);
    modifiedHeaders = this.addAcceptLanguageHeader(modifiedHeaders);
    modifiedHeaders = this.addTenantIdHeader(modifiedHeaders);

    return request.clone({
      headers: modifiedHeaders
    });
  }

  protected addXRequestedWithHeader(headers: HttpHeaders): HttpHeaders {
    if (headers) {
      headers = headers.set("X-Requested-With", "XMLHttpRequest");
    }

    return headers;
  }

  protected addAspNetCoreCultureHeader(headers: HttpHeaders): HttpHeaders {
    const cookieLangValue = this._utilsService.getCookieValue(
      "Abp.Localization.CultureName"
    );
    if (cookieLangValue && headers && !headers.has(".AspNetCore.Culture")) {
      headers = headers.set(".AspNetCore.Culture", cookieLangValue);
    }

    return headers;
  }

  protected addAcceptLanguageHeader(headers: HttpHeaders): HttpHeaders {
    const cookieLangValue = this._utilsService.getCookieValue(
      "Abp.Localization.CultureName"
    );
    if (cookieLangValue && headers && !headers.has("Accept-Language")) {
      headers = headers.set("Accept-Language", cookieLangValue);
    }

    return headers;
  }

  protected addTenantIdHeader(headers: HttpHeaders): HttpHeaders {
    const cookieTenantIdValue = this._utilsService.getCookieValue("Abp.TenantId");
    if (cookieTenantIdValue && headers && !headers.has("Abp.TenantId")) {
      headers = headers.set("Abp.TenantId", cookieTenantIdValue);
    }

    return headers;
  }

  protected addAuthorizationHeaders(headers: HttpHeaders): HttpHeaders {
    let authorizationHeaders = headers ? headers.getAll("Authorization") : null;
    if (!authorizationHeaders) {
      authorizationHeaders = [];
    }

    if (
      !this.itemExists(
        authorizationHeaders,
        (item: string) => item.indexOf("Bearer ") == 0
      )
    ) {
      const token = this._tokenService.getToken();
      if (headers && token) {
        headers = headers.set("Authorization", "Bearer " + token);
      }
    }

    return headers;
  }

  protected handleSuccessResponse(
    event: HttpEvent<any>,
    interceptObservable: Subject<HttpEvent<any>>
  ): void {
    let self = this;

    if (event instanceof HttpResponse) {
      if (
        event.body instanceof Blob &&
        event.body.type &&
        event.body.type.indexOf("application/json") >= 0
      ) {
        let clonedResponse = event.clone();

        self.configuration.blobToText(event.body).subscribe(json => {
          const responseBody = json == "null" ? {} : JSON.parse(json);

          let modifiedResponse = self.configuration.handleResponse(
            event.clone({
              body: responseBody
            })
          );

          interceptObservable.next(
            modifiedResponse.clone({
              body: new Blob([JSON.stringify(modifiedResponse.body)], {
                type: "application/json"
              })
            })
          );

          interceptObservable.complete();
        });
      } else {
        interceptObservable.next(event);
        interceptObservable.complete();
      }
    }
  }

  protected handleErrorResponse(
    error: any,
    interceptObservable: Subject<HttpEvent<any>>
  ): Observable<any> {
    let errorObservable = new Subject<any>();

    if (!(error.error instanceof Blob)) {
      interceptObservable.error(error);
      interceptObservable.complete();
      return of({});
    }

    this.configuration.blobToText(error.error).subscribe(json => {
      const errorBody = json == "" || json == "null" ? {} : JSON.parse(json);
      const errorResponse = new HttpResponse({
        headers: error.headers,
        body: errorBody,
        status: error.status,
        statusText: error.statusText
      });

      let ajaxResponse = this.configuration.getAbpAjaxResponseOrNull(
        errorResponse
      );

      if (ajaxResponse != null) {
        this.configuration.handleAbpResponse(errorResponse, ajaxResponse);
      } else {
        this.configuration.handleNonAbpErrorResponse(errorResponse);
      }

      errorObservable.complete();

      //prettify error object.
      error.error = errorBody;
      interceptObservable.error(error);
      interceptObservable.complete();
    });

    return errorObservable;
  }

  private itemExists<T>(items: T[], predicate: (item: T) => boolean): boolean {
    for (let i = 0; i < items.length; i++) {
      if (predicate(items[i])) {
        return true;
      }
    }

    return false;
  }
}
