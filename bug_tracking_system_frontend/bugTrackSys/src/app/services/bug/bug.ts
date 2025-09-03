import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BugService {
  bugShownLimit = new BehaviorSubject<number>(10);
  refetchTasks = new Subject<void>();
  constructor(private http: HttpClient) {}

  createBug(formData: any) {
    return this.http.post(`${environment.url}/bug`, formData);
  }

  editBug(formData: any, bug_id: any) {
    return this.http.patch(`${environment.url}/bug/${bug_id}`, formData);
  }
  deleteBug(bug_id: any, project_id: any) {
    const reqBody = { project_id };
    return this.http.delete(
      `${environment.url}/bug/${bug_id}?project_id=${project_id}`
    );
  }
  getProjectBugs(project_id: any, page: any, limit: any) {
    return this.http.get(
      `${environment.url}/bug?project_id=${project_id}&page=${
        page + 1
      }&limit=${limit}`
    );
  }

  getProjectBugsByName(project_id: any, title: any) {
    return this.http.get(
      `${environment.url}/bug/${title}?project_id=${project_id}`
    );
  }

  changeStatus(project_id: any, type: any, status: any, bug_id: any) {
    const reqBody = { project_id, status, type };
    return this.http.patch(`${environment.url}/bug/${bug_id}/status`, reqBody);
  }

  isQABelongToBug(project_id: any, bug_id: any) {
    return this.http.get(
      `${environment.url}/bug/${bug_id}/user/QA/belong?project_id=${project_id}`
    );
  }
}
