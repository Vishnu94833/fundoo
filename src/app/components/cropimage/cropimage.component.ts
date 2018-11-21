import { Component, OnInit, Inject,OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { HttpService } from '../../core/services/http/http.service';
import { environment } from '../../../environments/environment';
import { SearchsharingService } from '../../core/services/dataservice/searchsharing.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-cropimage',
  templateUrl: './cropimage.component.html',
  styleUrls: ['./cropimage.component.scss']
})
export class CropimageComponent implements OnInit,  OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  public croppedImage: any = '';
  imageChangedEvent: any = '';
  constructor(
    public dialogRefPic: MatDialogRef<DashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpService: HttpService,
    private dataService: SearchsharingService) { }

  ngOnInit() {
  }

  /**
   * @description event emitting function for cropped image
   */
  imageCropped(event: any) {
    this.croppedImage = event.file;
  }


  public image2 = localStorage.getItem('imageUrl');
  img = environment.apiUrl + this.image2;

  /**
   * @description function to upload profile photo
   */
  onUpload() {
    var token = localStorage.getItem('token');
    console.log(this.croppedImage);
    const uploadData = new FormData();
    uploadData.append('file', this.croppedImage);
    this.httpService.addImage('/user/uploadProfileImage', uploadData, token)
    .pipe(takeUntil(this.destroy$)).subscribe(res => {
      this.img = environment.apiUrl + res['status'].imageUrl;
      localStorage.setItem("imageUrl", res['status'].imageUrl);
      this.dialogRefPic.close()
      this.dataService.changeMsg(true);
    }, error => {


    })

  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}