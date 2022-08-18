import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Issue } from 'src/app/shared/interfaces/Project';
import { User } from '../interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {
  private baseUrl: string = environment.baseUrl;


  public headerDict = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Origin': '*',
  };

  public requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  };
  constructor(private http: HttpClient) {}

  /**
   * Return Issues.
   * @returns
   * - done
   */
  public getIssues(): Observable<Issue[]> {    
    return this.http.get<Issue[]>(this.baseUrl+'getIssues/', this.requestOptions);
  }

  /**
   * Create new issue
   * @param body 
   * @returns 
   * -done
   */
  public createNewIssue( body: Issue){
    return this.http.post(this.baseUrl+'issues/new/', body, this.requestOptions )
  }

/**
 * Edit an issue
 * @param id 
 * @param body 
 * @returns 
 * -done
 */
  public editIssues(id: string, body: Issue) {
    console.log(id);
    console.log(body);
    return this.http.patch(
     this.baseUrl + `issue/${id}`,
      body,
      this.requestOptions
    );
  }


  /**
   * Get starting with Issue title
   * @param data 
   * @returns 
   * - done
   */
  public getStartingWithIssues(data: string): Observable<Issue[]> {
    return this.http.get<Issue[]>(this.baseUrl + `issue/startsWith/${data}`);
  }

  /**
   * Get members
   * @returns {User[]}
   * -done
   */
  public getMember(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'getMembers/', this.requestOptions);
  }

  /**
   * Get specific members
   * @param userNameList 
   * @returns 
   * -done
   */
  public getSpecificMember(userNameList:any):Observable<User[]>{
    let body = {data:userNameList};
    return this.http.post<User[]>(this.baseUrl+'member/includes/',body, this.requestOptions)
  }

  /**
   * Delete issue based on param id
   * @param id 
   * @returns 
   */
  public deleteIssueFromList(id: string):Observable<HttpStatusCode>{
    return this.http.delete<any>(this.baseUrl+'issue/'+id, this.requestOptions)
  }

  /**
   * Edit issue by id
   * @param id 
   * @param body 
   * @returns - done
   */
  public editIssueById(id:string, body:Issue):Observable<HttpStatusCode>{
    console.log(id);
    return this.http.patch<any>(this.baseUrl+'issue/'+id, body, this.requestOptions);
  }
}
