import { FormsModule } from '@angular/forms';
import { GitService } from './../services/git.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Issue } from '../shared/models/issues';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  githubURL: string = '';
  githubAccessToken: string = '';
  issues: Issue[] | undefined = undefined;

  currentPage = 1;
  itemsPerPage = 2;
  totalItems = 0;

  constructor(
    private gitService: GitService
  ){}

  ngOnInit(){

  }

  onClear(){
    this.githubURL = '';
    this.githubAccessToken = '';
    this.issues = undefined;
  }

  search(){
    const regex = /^https:\/\/github\.com\/([a-zA-Z0-9-]+)\/([a-zA-Z0-9-_]+)$/;
    if(!regex.test(this.githubURL)){
      alert("Repository URL is not valid.");
      return;
    }

    localStorage.setItem('githubUrl', this.githubURL);
    localStorage.setItem('githubAccessToken', this.githubAccessToken);

    this.gitService.getRepositoryIssues(this.githubURL, this.githubAccessToken,this.currentPage, this.itemsPerPage).subscribe((resp)=>{
      this.issues = resp;
    });
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.search();
  }

}
