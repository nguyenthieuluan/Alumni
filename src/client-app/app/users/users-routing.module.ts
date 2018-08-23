import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { UsersComponent } from '@app/users/users.component';


const routes: Routes = [
    {
        path: '', component: UsersComponent,
        children: [
            { path: 'info', component: UsersComponent },
        
        ]
    }
]
@NgModule({

    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class UsersRoutingModule { }