import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Issue } from '../shared/models/issues';

@Injectable({
  providedIn: 'root'
})
export class GitService {

  constructor(private http: HttpClient) { }

  private basicApiUrl = 'https://api.github.com/';

  private createHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Accept':'application/vnd.github+json'

    });
  }

  private getOwner(url: string): string{
    return url.split('/')[3];
  }

  private getRepository(url: string): string{
    return url.split('/')[4];
  }

  /* /repos/{owner}/{repo}/issues?page=page&per_page=perPage */
  getRepositoryIssues(url: string, token: string, page: number, perPage: number):Observable<Issue[]>{
    const headers = this.createHeaders(token);
    const params = new HttpParams()
    .set('page', page.toString())
    .set('per_page', perPage.toString());

    const options = { params: params, headers: headers };

    const owner = this.getOwner(url);
    const repository = this.getRepository(url);

    return this.http.get<Issue[]>(this.basicApiUrl + 'repos/' + owner + '/' + repository + '/issues',options);
  }

  /*  /repos/OWNER/REPO/issues/ISSUE_NUMBER */
  getIssueByNumber(url: string, token: string, issueNumber: string){
    const headers = this.createHeaders(token);

    const owner = this.getOwner(url);
    const repository = this.getRepository(url);

    return this.http.get<Issue>(this.basicApiUrl + 'repos/' + owner + '/' + repository + '/issues/' + issueNumber ,{headers});
  }

  /*  /repos/OWNER/REPO/issues/ISSUE_NUMBER/comments */
  getIssueComments(url: string, token: string, issueNumber: string){
    const headers = this.createHeaders(token);

    const owner = this.getOwner(url);
    const repository = this.getRepository(url);

    return this.http.get<any[]>(this.basicApiUrl + 'repos/' + owner + '/' + repository + '/issues/' + issueNumber + '/comments' ,{headers});
  }

}
