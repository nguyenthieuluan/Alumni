import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AbpHttpInterceptor } from "@abp/abpHttpInterceptor";

import * as ApiServiceProxies from "./service-proxies";
import { CustomHttpInterceptor } from "@shared/customHttpInterceptor";
import { Http, HttpModule } from "@angular/http";
import { Observable, throwError as _observableThrow } from "rxjs";

@NgModule({
    imports: [HttpModule, HttpClientModule],
    providers: [
        ApiServiceProxies.RoleServiceProxy,
        ApiServiceProxies.SessionServiceProxy,
        ApiServiceProxies.TenantServiceProxy,
        ApiServiceProxies.UserServiceProxy,
        ApiServiceProxies.TokenAuthServiceProxy,
        ApiServiceProxies.AccountServiceProxy,
        ApiServiceProxies.ConfigurationServiceProxy,
        ApiServiceProxies.PostServiceProxy,
        ApiServiceProxies.UploadServiceProxy,
        ApiServiceProxies.UserProfileServiceProxy,
        ApiServiceProxies.StudentProfileServiceProxy,
        ApiServiceProxies.PageServiceProxy,
        ApiServiceProxies.EventPlanServiceProxy,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CustomHttpInterceptor,
            multi: true
        }
    ]
})
export class ServiceProxyModule {}

function throwException(
    message: string,
    status: number,
    response: string,
    headers: { [key: string]: any },
    result?: any
): Observable<any> {
    return _observableThrow({});
}
