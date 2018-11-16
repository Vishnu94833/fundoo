import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { HttpService } from '../../core/services/http/http.service';
import { environment } from '../../../environments/environment';
import { SearchsharingService } from '../../core/services/dataservice/searchsharing.service';

@Component({
  selector: 'app-cropimage',
  templateUrl: './cropimage.component.html',
  styleUrls: ['./cropimage.component.scss']
})
export class CropimageComponent implements OnInit {
  public croppedImage: any = '';
  imageChangedEvent: any = '';
  constructor(
    public dialogRefPic: MatDialogRef<DashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpService: HttpService,
    private dataService: SearchsharingService) { }

  ngOnInit() {
  }
  imageCropped(event: any) {
    this.croppedImage = event.file;
  }
  public image2 = localStorage.getItem('imageUrl');
  img = environment.apiUrl + this.image2;
  onUpload() {
    var token = localStorage.getItem('token');
    console.log(this.croppedImage);
    const uploadData = new FormData();
    uploadData.append('file', this.croppedImage);
    this.httpService.addImage('/user/uploadProfileImage', uploadData, token).subscribe(res => {
      this.img = environment.apiUrl + res['status'].imageUrl;
      localStorage.setItem("imageUrl", res['status'].imageUrl);
      this.dialogRefPic.close()
      this.dataService.changeMsg(true);
    }, error => {


    })

  }

}