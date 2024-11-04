import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HelpInfoComponent } from './help-info/help-info.component';
import { IssueDetailsComponent } from './issue-details/issue-details.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'help', component: HelpInfoComponent }, 
    { path: 'issue-details/:id', component: IssueDetailsComponent }, 
];
