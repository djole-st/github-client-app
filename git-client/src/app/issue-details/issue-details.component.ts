import { GitService } from './../services/git.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Issue } from '../shared/models/issues';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { merge, mergeMap } from 'rxjs';

@Component({
  selector: 'app-issue-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './issue-details.component.html',
  styleUrl: './issue-details.component.css'
})
export class IssueDetailsComponent {

  isLoading = false;

  issueId!: string;
  githubAccessToken!: string;
  githubUrl!: string;
  comments: any;
  issue!: Issue;

  constructor(
    private route: ActivatedRoute,
    private gitService: GitService
  ){

  }

  ngOnInit(){
    this.issueId = this.route.snapshot.paramMap.get('id')!;
    this.githubAccessToken = localStorage.getItem('githubAccessToken')!;
    this.githubUrl = localStorage.getItem('githubUrl')!;

    this.getIssueAndComments();
  }

  getIssueAndComments(){
    this.isLoading = true;
    this.gitService.getIssueByNumber(this.githubUrl, this.githubAccessToken, this.issueId).pipe(
      mergeMap((data)=>{
        this.issue = data;
        return this.gitService.getIssueComments(this.githubUrl, this.githubAccessToken, this.issueId);
      })
    ).subscribe((resp)=>{
      this.comments = resp;
      this.isLoading = false;
    })
  }
/*
  getIssue(){
    this.gitService.getIssueByNumber(this.githubUrl, this.githubAccessToken, this.issueId).subscribe((resp)=>{
      this.issue = resp;
    })
  }

  getIssueComments(){
    this.gitService.getIssueComments(this.githubUrl, this.githubAccessToken, this.issueId).subscribe((resp)=>{
      this.comments = resp;
    })
  }
*/
}
