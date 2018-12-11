import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'Login',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: './home/home.module#HomePageModule'
    },
    {
        path: 'list',
        loadChildren: './list/list.module#ListPageModule'
    },
    {
        path: 'Login',
        loadChildren: './login/login.module#LoginPageModule'
    },
    {
        path: 'Adhocrequest',
        loadChildren: './adhocrequest/adhocrequest.module#AdhocrequestPageModule'
    },
    {
        path: 'Mytrips',
        loadChildren: './mytrips/mytrips.module#MytripsPageModule'
    },
    {
        path: 'Myapprvaldashboard',
        loadChildren: './myapprvaldashboard/myapprvaldashboard.module#MyapprvaldashboardPageModule'
    },
  { path: 'activetrips', loadChildren: './activetrips/activetrips.module#ActivetripsPageModule' },
  { path: 'canceltrips', loadChildren: './canceltrips/canceltrips.module#CanceltripsPageModule' },
  { path: 'myapproval', loadChildren: './myapproval/myapproval.module#MyapprovalPageModule' },
  { path: 'myapprovalcip', loadChildren: './myapprovalcip/myapprovalcip.module#MyapprovalcipPageModule' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
