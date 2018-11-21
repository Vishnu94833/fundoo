import { Component,OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { HttpService } from '../../core/services/http/http.service';
import { LabelComponent } from '../label/label.component';
import { SearchsharingService } from '../../core/services/dataservice/searchsharing.service';
import { environment } from '../../../environments/environment';
import { CropimageComponent } from '../cropimage/cropimage.component';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { label } from 'src/app/core/model/labels';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  // private hoverItem: string;
  private buttonclick: any = false;
  private title = "Fundoo";
  private model: any = {};
  private token = localStorage.getItem('token');
  private userId = localStorage.getItem('userId');


  constructor(
    private router: Router,
    private myRoute: Router, private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog, public data: SearchsharingService,
    private notesService: NotesService, private userService: UserService
  ) { }


  /**
   * @description function to logout of the fundoo notes homgepage
   */
  logout() {
    console.log(this.token);
    this.userService.logoutPost({})
    .pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        localStorage.removeItem("token");
        localStorage.removeItem('firstname');
        localStorage.removeItem('lastname');
        localStorage.removeItem('email');
        localStorage.removeItem('userId');
        this.router.navigateByUrl('/login');
      },
      error => {
      }
    );
  }

  private firstname: any;
  private lastname: any;
  private email: any;
  private label: any;
  private temp: any;
  private inputData: any;
  private array: label[] = [];


  ngOnInit() {
    this.firstname = localStorage.getItem('firstname');
    this.lastname = localStorage.getItem('lastname');
    this.email = localStorage.getItem('email');
    this.labelList();
    this.title = localStorage.getItem('title');
  }

  /**
   * @description function to change title 
   * @param title 
   */
  changeTitle(title) {
    this.title = title;
    localStorage.setItem('title',title)
  }

  /**
   * @description open dialog box to create ,update,delete labels
   */
  openDialog(): void {

    const dialogRef = this.dialog.open(LabelComponent, {
      width: '350px',
      data: { array: this.temp }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result => {
      this.labelList();
    });
  }

  /**
   * @description function to get labels list after creating new labels
   */
  labelList() {

    debugger;
    this.notesService.getLabels().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        this.array=[];
        LoggerService.log(" Get Request is successful yes ", data);
        for (var i = 0; i < data['data']['details'].length; i++) {
          if (data['data']['details'][i].isDeleted == false) {
            this.array.push(data['data']['details'][i]);
          }
        }
        this.array.sort(function (a, b) {
          var labelA = a.label.toLowerCase(), labelB = b.label.toLowerCase()
          if (labelA < labelB)
            return -1
          if (labelA > labelB)
            return 1
          return 0
        })
        this.temp = this.array;


      },
      error => {
      });
  }

  navigateSearch() {
    this.router.navigate(['homepage/search']);
  }

  down() {
    this.data.changeMessage(this.inputData);

  }

  /**
   * @description function to navigate to the labels page by their respective labels
   * @param labelName 
   */
  labelsPage(labelName) {
    var labelname = labelName.label;
    this.router.navigate(['homepage/labelslist/' + labelname]);
  }

  private list = 0;
  gridView() {
    this.data.changeGridEvent(true);
    this.list = 1;
  }
  grid() {
    this.data.changeGridEvent(false);
    this.list = 0;
  }
  ProfilePath: any;
  selectedFile = null;

  public pic;
  public image2 = localStorage.getItem('imageUrl');
  img = environment.apiUrl + this.image2;

  onFileUpload(event) {
    var token = localStorage.getItem('token');
    this.profileCropOpen(event);

    this.selectedFile = event.path[0].files[0];
    const uploadData = new FormData();
    uploadData.append('file', this.selectedFile, this.selectedFile.name);
  }
  private image = {};

  clickLabel(labelsList) {
    var labelsList = labelsList.label;
    this.router.navigate(['/home/label/' + labelsList])
  }
  profileCropOpen(data): void { 
    const dialogRefPic = this.dialog.open(CropimageComponent, {
      width: '600px',
      data: data
    });

    dialogRefPic.afterClosed().subscribe(result => {
      this.data.currentMsg.pipe(takeUntil(this.destroy$)).subscribe(message => this.pic = message)
      if (this.pic == true) {
        this.image2 = localStorage.getItem('imageUrl');
        this.img = environment.apiUrl + this.image2;
      }

    });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}


