import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {jsPDF} from 'jspdf';


@Component({
  selector: 'app-downloadpdf',
  templateUrl: './downloadpdf.component.html',
  styleUrls: ['./downloadpdf.component.css']
})
export class DownloadpdfComponent implements OnInit {
  @ViewChild('content')el!:ElementRef
  // @ViewChild('content', { static : false})el!:ElementRef

  public detailAlert = '';
  public imagePath;
	public imagePath1;
	public imagePath2;
  public docPath;
  
  public docpath2;
  public docpath3;
  public docpath4;
  public docpath5;
  public docName;
  public docName2;
  public docName3;
  public docName4;
  public docName5;
  public ekycP = '';
  public newmsisdn = '';
  public signupEmail = '';
  imgResultBeforeCompression: string = '';
  imgResultAfterCompression: File ;
  public agentMsisdn = '23052943333';
  public signupmsisdn = '23058631601';///localStorage.getItem('msisdn')
  public approveBtn1txt: string  = 'Approve';
  public approveBtn2txt: string =  'Approve';
  public approveBtn3txt: string = 'Approve';
  public fileName = '';

  public currentDate = new Date();

  signupPic: any;
  documentpic: any;
  contractpic: any;
  parentName :any;
  ApplicationMode:any;
  signupGender: any;
  signupDocType: any;
  signupCertNo: any;
  signupDateOfBirth: any;
  fullname: any;
  nationality: any;
  usermsisdn: any;
  usertype: any;
  ekycphoto: any;
  token: any;
  verifiedphoto: any;
  corellation_id: any;
  

  constructor(private _sanitizer: DomSanitizer,private router:Router) { }

  ngOnInit() {
    if(localStorage.getItem('login')!='success'){
			this.router.navigate(['/']);
		}
    this.setAlert(JSON.parse(localStorage.getItem('datafromDashboard')))
    
  }
 


  public setAlert(alert:any){
    this.detailAlert =alert ;
    let vPhoto;
    // if(alert.verifiedPhoto!=null){
    //   vPhoto = alert.verifiedPhoto;
		//   vPhoto = vPhoto.replaceAll('\'','');
    // }
    // this.ekycP = alert.verifiedPhoto.replaceAll('\'','');
    if(alert.verifiedPhoto_url!=null){
			this.imagePath2 = alert.verifiedPhoto_url;
			this.imagePath2=this.imagePath2.replaceAll('http://41.223.78.154:8080/','https://ekyc.chili.mu/')
			this.imagePath2=this.imagePath2.replaceAll('/home/apache-tomcat-8.5.85/webapps/ROOT/','https://ekyc.chili.mu/')
		}

		if(alert.eKYCPhoto_url!=null){
			this.imagePath1 = alert.eKYCPhoto_url;
			this.imagePath1=this.imagePath1.replaceAll('http://41.223.78.154:8080/','https://ekyc.chili.mu/')
			this.imagePath1=this.imagePath1.replaceAll('/home/apache-tomcat-8.5.85/webapps/ROOT/','https://ekyc.chili.mu/')
		}
		if(alert.originalPhoto_url!=null){
			this.imagePath = alert.originalPhoto_url;
			this.imagePath=this.imagePath.replaceAll('http://41.223.78.154:8080/','https://ekyc.chili.mu/')	
			this.imagePath=this.imagePath.replaceAll('/home/apache-tomcat-8.5.85/webapps/ROOT/','https://ekyc.chili.mu/')
		}
    if(alert.documentDetailList!=null)
    this.docPath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+alert.documentDetailList[0].docImage);
    this.ApplicationMode = alert.ApplicationMode;
    this.signupGender = alert.Gender;
    this.signupDocType = alert.DocumentType;
    this.signupCertNo = alert.DocumentId;
    this.signupDateOfBirth = alert["Date Of Birth"];
    this.fullname = alert.FullName;
    this.nationality = alert.Nationality;
    this.usermsisdn = alert.SIMDetails.MSISDN;
    this.usertype = alert.UserType;
    this.ekycphoto = alert.eKYCPhoto;
    this.token = alert.token;
    this.verifiedphoto = alert.verifiedPhoto;
    this.corellation_id = alert.corellation_id
    // console.log(this.detailAlert);

    if(alert.documentDetailList!=null && alert.documentDetailList.length!=0){

      if(alert.documentDetailList.length==2)
      {
        if(alert.documentDetailList[0].docImage_url!=null){
          this.docPath = alert.documentDetailList[0].docImage_url;
          this.docPath = this.docPath.replaceAll('/home/apache-tomcat-8.5.85/webapps/ROOT/','https://ekyc.chili.mu/')
          this.docName = alert.documentDetailList[0].docName;
        }
      
        if(alert.documentDetailList[1].docImage_url!=null ){
        this.docpath2 = alert.documentDetailList[1].docImage_url;
        this.docpath2 = this.docpath2.replaceAll('/home/apache-tomcat-8.5.85/webapps/ROOT/','https://ekyc.chili.mu/')
        this.docName2 = alert.documentDetailList[1].docName;
      }
         }
         else{
          if(alert.documentDetailList[0].docImage_url!=null){
            this.docPath = alert.documentDetailList[0].docImage_url;
            this.docPath = this.docPath.replaceAll('/home/apache-tomcat-8.5.85/webapps/ROOT/','https://ekyc.chili.mu/')
            this.docName = alert.documentDetailList[0].docName;
          }
         }
      // this.docpath3 = alert.documentDetailList[2].docImage_url;
      // this.docpath3 = this.docpath3.replaceAll('/home/apache-tomcat-8.5.85/webapps/ROOT/','https://ekyc.chili.mu/')
      // this.docpath2 = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+alert.documentDetailList[1].docImage);
      // this.docpath3 = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+alert.documentDetailList[2].docImage);
      // this.docpath4 = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+alert.documentDetailList[].water);
      // this.docpath5 = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+alert.documentDetailList[0].telecom)
    }
  }

  makePDF(){
    let pdf = new jsPDF('p','pt','a4');
    // pdf.text("HEllo Gagan",10,10);
    pdf.html(this.el.nativeElement,{
      callback:(pdf=>{
        pdf.save('Profile.pdf')
      })
    })
        // pdf.save()
    
  }
  printPdf(res) {
    /*const pdf = new Blob([res], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(pdf);
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = this._sanitizer.sanitize(5, this._sanitizer.bypassSecurityTrustResourceUrl(blobUrl));
    
    document.body.appendChild(iframe);
    iframe.contentWindow.print();*/
    window.print();
  }
}
