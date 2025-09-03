import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, lastValueFrom } from 'rxjs';
import { BugService } from '../services/bug/bug';
import { ProjectService } from '../services/project/project';
import { User } from '../services/user/user';
import { Navbar } from '../shared/navbar/navbar';
import { AddBug } from './add-bug/add-bug';
import { AssignedProjectMembers } from './assigned-project-members/assigned-project-members';

// ...................imports ends ............................

@Component({
  selector: 'app-bug',
  imports: [
    Navbar,
    CommonModule,
    MatIconModule,
    MatPaginatorModule,
    ReactiveFormsModule,
  ],
  templateUrl: './bug.html',
  styleUrl: './bug.scss',
})
export class Bug implements OnInit {
  // component variable

  project_id: string | null = null;
  projectName = '';
  bugDetails: any[] = [];
  bugDetailsFromApi: any[] = [];
  isChangeStatus: any = false;
  chosenBug: any = '';
  currentPageNumber: any = 0;
  limitt: any;
  totalRecords: any = 0;
  searchControl = new FormControl('');
  assignBtn = false;
  addTask = false;

  // constructor

  constructor(
    private ToastrService: ToastrService,
    private bug_service: BugService,
    private project_service: ProjectService,
    private user_service: User,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // get the limit of bugs

    this.bug_service.bugShownLimit.subscribe((value) => {
      this.limitt = value;
    });

    // to get the path params

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.project_id = params.get('project_id');
    });

    // to get the query params

    this.route.queryParams.subscribe((query) => {
      this.projectName = query['project'];
    });

    // get project bugs

    this.getBugs(this.limitt);
    this.bug_service.refetchTasks.subscribe(() => {
      this.getBugs(this.limitt);
    });

    //  check valid manager or is manager

    this.project_service.isManagerBelongToProject(this.project_id).subscribe({
      next: (res: any) => {},
      error: (err: any) => {
        this.assignBtn = true;
      },
    });

    //  check valid QA and is QA

    this.project_service.isQABelongToProject(this.project_id).subscribe({
      next: (res: any) => {},
      error: (err: any) => {
        this.addTask = true;
      },
    });

    //  search the bug
    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((keyword) => {
        if (!keyword || keyword.trim() === '') {
          this.bug_service.refetchTasks.next();
        } else {
          this.bug_service
            .getProjectBugsByName(this.project_id, keyword)
            .subscribe({
              next: (response: any) => {
                const bugs = response.data.sort((a: any, b: any) =>
                  a.id.toString().localeCompare(b.id.toString())
                );

                Promise.all(
                  bugs.map(async (bug: any) => {
                    const developerNames: string[] = [];
                    const developersDetail: any[] = [];
                    for (const devId of bug.developer_id) {
                      try {
                        const userRes: any = await lastValueFrom(
                          this.user_service.getUserById(devId)
                        );
                        developersDetail.push(userRes.data);
                        developerNames.push(userRes.data.name);
                      } catch (error) {
                        console.error(error);
                      }
                    }

                    return {
                      ...bug,
                      developerNames: developerNames.join(' - '),
                      developersDetail: developersDetail,
                    };
                  })
                ).then((bugDet) => {
                  this.bugDetailsFromApi = bugDet;
                  this.bugDetails = bugDet;
                });
              },
              error: (error: any) => {
                this.bugDetails = [];
              },
            });
        }
      });
  }

  private getBugs(limit: number) {
    this.bug_service
      .getProjectBugs(this.project_id, this.currentPageNumber, limit)
      .subscribe({
        next: (response: any) => {
          this.totalRecords = response.data.count;

          const bugs = response.data.rows.sort((a: any, b: any) =>
            a.id.toString().localeCompare(b.id.toString())
          );

          Promise.all(
            bugs.map(async (bug: any) => {
              const developerNames: string[] = [];
              const developersDetail: any[] = [];
              for (const devId of bug.developer_id) {
                try {
                  const userRes: any = await lastValueFrom(
                    this.user_service.getUserById(devId)
                  );
                  developersDetail.push(userRes.data);
                  developerNames.push(userRes.data.name);
                } catch (error) {
                  console.error(error);
                }
              }

              return {
                ...bug,
                developerNames: developerNames.join(' - '),
                developersDetail: developersDetail,
              };
            })
          ).then((bugDet) => {
            this.bugDetailsFromApi = bugDet;
            this.bugDetails = bugDet;
          });
        },
        error: (err: any) => {
          this.ToastrService.error(err.error.error, 'Error');
        },
      });
  }

  // page number get for pagination and get bugs

  onPageChange(event: PageEvent): void {
    this.currentPageNumber = event.pageIndex;
    this.bug_service.bugShownLimit.next(event.pageSize || 1);
    this.totalRecords = event.length;

    this.getBugs(event.pageSize);
  }

  // get the selected id of bug and show the UI for choosing bug status
  showChangeStatus(chosenBug: any) {
    this.chosenBug = chosenBug;
  }

  // choose status get and update
  choosenStatus(id: any, status: any, type: any) {
    this.bug_service.changeStatus(this.project_id, type, status, id).subscribe({
      next: (response: any) => {
        this.bugDetails = this.bugDetails.map((bug) => {
          if (bug.id === id && bug.status !== status) {
            return {
              ...bug,
              status: status,
            };
          }
          return bug;
        });
        this.chosenBug = '';
      },
      error: (err) => {
        this.chosenBug = '';
        this.ToastrService.error(err.error.error, 'Error');
      },
    });
  }

  // close the change status
  closeChangeStatus() {
    this.chosenBug = '';
  }
  // delete bug
  deleteBug(bug_id: any) {
    this.bug_service.deleteBug(bug_id, this.project_id).subscribe({
      next: (response: any) => {
        this.ToastrService.success(response.message, 'Success');
        this.bug_service.refetchTasks.next();
        this.chosenBug = '';
      },
      error: (err) => {
        this.ToastrService.error(err.error.error, 'Error');
        this.chosenBug = '';
      },
    });
    this.chosenBug = '';
  }

  // add member to Project either QA or developer
  openAddMembersToProjectDialog() {
    const dialogRef = this.dialog.open(AssignedProjectMembers, {
      backdropClass: 'popup',
      autoFocus: false,
      data: {
        projectId: this.project_id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // add bug dialog
  openAddBugDialog() {
    const dialogRef = this.dialog.open(AddBug, {
      backdropClass: 'popup',
      autoFocus: false,
      data: {
        projectId: this.project_id,
        dialogTitle: 'Add New Bug',
        btnName: 'Add',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // edit bug dialog
  openEditBugDialog(bug: any) {
    this.bug_service.isQABelongToBug(this.project_id, bug.id).subscribe({
      next: (res: any) => {
        const dialogRef = this.dialog.open(AddBug, {
          backdropClass: 'popup',
          autoFocus: false,
          data: {
            projectId: this.project_id,
            dialogTitle: 'Edit Bug',
            btnName: 'Edit',
            bugDetail: bug,
          },
        });

        dialogRef.afterClosed().subscribe((result) => {
          console.log(`Dialog result: ${result}`);
        });
      },
      error: (err: any) => {
        this.ToastrService.error(err.error.error, 'Error');
      },
    });
  }
}
