import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CompressImageServiceService } from '../compress-image-service.service';
import { take } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { E } from '@angular/core/src/render3';

@Component({
  selector: 'app-contingency-activation',
  templateUrl: './contingency-activation.component.html',
  styleUrls: ['./contingency-activation.component.css']
})
export class ContingencyActivationComponent implements OnInit {
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
  public agentMsisdn:any
  public signupmsisdn:any///localStorage.getItem('msisdn')
  public approveBtn1txt: string  = 'Validate';
  public approveBtn2txt: string =  'Validate';
  public approveBtn3txt: string = 'Validate';
  public fileName = '';

  uploadPics= "https://selfcare.chili.mu:8080/dealer/uploads";
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
  i: any;
  docPath2: any;
  constructor(private _sanitizer: DomSanitizer,private compressImage:CompressImageServiceService,private http:HttpClient,private router:Router) { }
  imgResult: string = '';
  certType:any
  pmuid:any;
  address:any
  email:any
  newCustomer:any
  BtnName="Validate & Activate"
  permit:any;
  locality:any;
  base64imgofdoc:any

  ngOnInit() {
    this.setAlert(JSON.parse(localStorage.getItem('datafromDashboard')))
    if(localStorage.getItem('login')!='success'){
			this.router.navigate(['/']);
		}
    this.i = 1;
  }

  public setAlert(alert:any){
    console.log(alert);
    this.detailAlert =alert ;
    let vPhoto = alert.verifiedPhoto;
    if(alert.verifiedPhoto!=null){
      this.ekycP = alert.verifiedPhoto.replaceAll('\'','');
		vPhoto = vPhoto.replaceAll('\'','');
    }
		// let ophoto = alert.OriginalPhoto;
		// let kycphoto = alert.eKYCPhoto;
    // ophoto = ophoto.replaceAll('\"','')
		// kycphoto = kycphoto.replaceAll('\"','')
    if(alert.image.verifiedPhotoUrl!=null){
      this.imagePath2 = alert.image.verifiedPhotoUrl;
      this.imagePath2=this.imagePath2.replaceAll('http://41.223.78.154:8080/','https://ekyc.chili.mu/')
      this.imagePath2=this.imagePath2.replaceAll('/home/apache-tomcat-8.5.85/webapps/ROOT/','https://ekyc.chili.mu/')
    }
    if(alert.image.kycPhotoUrl!=null){
      this.imagePath1 = alert.image.kycPhotoUrl;
      this.imagePath1=this.imagePath1.replaceAll('http://41.223.78.154:8080/','https://ekyc.chili.mu/')
      this.imagePath1=this.imagePath1.replaceAll('/home/apache-tomcat-8.5.85/webapps/ROOT/','https://ekyc.chili.mu/')
    }
		
    if(alert.image.originalPhotoUrl!=null){
      this.imagePath = alert.image.originalPhotoUrl;
      this.imagePath=this.imagePath.replaceAll('http://41.223.78.154:8080/','https://ekyc.chili.mu/')  
      this.imagePath=this.imagePath.replaceAll('/home/apache-tomcat-8.5.85/webapps/ROOT/','https://ekyc.chili.mu/')
    }
		
    if(alert.document!=null){

      // if(alert.document.length>0)
      // {
      //   if(alert.document.document4Url!=null){
      //     this.docPath = alert.document.document4Url;
      //     this.docPath = this.docPath.replaceAll('/home/apache-tomcat-8.5.85/webapps/ROOT/','https://ekyc.chili.mu/')
      //     this.docName = alert.document.docName;
      //   }
      
      //   if(alert.document.docImage_url!=null ){
      //   this.docpath2 = alert.document.docImage_url;
      //   this.docpath2 = this.docpath2.replaceAll('/home/apache-tomcat-8.5.85/webapps/ROOT/','https://ekyc.chili.mu/')
      //   this.docName2 = alert.document.docName;
      // }
      //    }
      //    else{
        if(alert.document.document3Url!=null){
          this.docPath = alert.document.document3Url;
          this.docPath = this.docPath.replaceAll('/home/apache-tomcat-8.5.85/webapps/ROOT/','https://ekyc.chili.mu/')
          this.docName = "permit";
        }
          if(alert.document.document4Url!=null){
            this.docpath2 = alert.document.document4Url;
            this.docpath2 = this.docpath2.replaceAll('/home/apache-tomcat-8.5.85/webapps/ROOT/','https://ekyc.chili.mu/')
            this.docName2 = "others";
          }
          
          if(alert.document.document2Url!=null){
            this.docpath2 = alert.document.document2Url;
            this.docpath2 = this.docpath2.replaceAll('/home/apache-tomcat-8.5.85/webapps/ROOT/','https://ekyc.chili.mu/')
            this.docName2 = "electricity";
          }
          if(alert.document.document5Url!=null){
            this.docpath2 = alert.document.document5Url;
            this.docpath2 = this.docpath2.replaceAll('/home/apache-tomcat-8.5.85/webapps/ROOT/','https://ekyc.chili.mu/')
            this.docName2 = alert.document.docName;
          }
          if(alert.document.document6Url!=null){
            this.docpath2 = alert.document.document6Url;
            this.docpath2 = this.docpath2.replaceAll('/home/apache-tomcat-8.5.85/webapps/ROOT/','https://ekyc.chili.mu/')
            this.docName2 = alert.document.docName;
          }
          if(alert.document.document7Url!=null){
            this.docpath2 = alert.document.document7Url;
            this.docpath2 = this.docpath2.replaceAll('/home/apache-tomcat-8.5.85/webapps/ROOT/','https://ekyc.chili.mu/')
            this.docName2 = "telecom";
          }
          if(alert.document.document8Url!=null){
            this.docpath2 = alert.document.document8Url;
            this.docpath2 = this.docpath2.replaceAll('/home/apache-tomcat-8.5.85/webapps/ROOT/','https://ekyc.chili.mu/')
            this.docName2 = alert.document.docName;
          }
        //  }
      // this.docpath3 = alert.documentDetailList[2].docImage_url;
      // this.docpath3 = this.docpath3.replaceAll('/home/apache-tomcat-8.5.85/webapps/ROOT/','https://ekyc.chili.mu/')
      // this.docpath2 = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+alert.documentDetailList[1].docImage);
      // this.docpath3 = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+alert.documentDetailList[2].docImage);
      // this.docpath4 = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+alert.documentDetailList[].water);
      // this.docpath5 = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+alert.documentDetailList[0].telecom)
    }

    this.ApplicationMode = alert.ApplicationMode;
    this.agentMsisdn = alert.agentMsisdn
    if(this.agentMsisdn==null){
      this.agentMsisdn="230529433330"
    }
    this.signupGender = alert.gender;
    if(this.signupGender=="Male"){
      this.signupGender="M"
    }
    if(this.signupGender=="Female"){
      this.signupGender="F"
    }
    this.signupDocType = alert.DocumentType;
    if(this.signupDocType=="National ID" || this.signupDocType=='NID'){
      this.certType="1"
    }
    else{
      this.certType="2"
    }
    
    if(alert.pmUid!=null){
      this.pmuid=alert.pmUid;
    }
    else{
      this.pmuid="99999999"
    }
    this.permit=alert.permitValue;
    this.signupCertNo = alert.id;
    this.signupDateOfBirth = alert.dob;
    this.signupDateOfBirth = this.signupDateOfBirth.split(" ")
    this.signupDateOfBirth = this.signupDateOfBirth[0]
    // this.signupDateOfBirth=this.signupDateOfBirth[2]+"-"+this.signupDateOfBirth[1]+"-"+this.signupDateOfBirth[0]

    this.fullname = alert.firstName+" "+alert.lastName;
    if(this.fullname!=null){
      this.fullname = this.fullname.replace('null ','');
    }
    this.nationality = alert.nationality;
    if(alert.simDetail!=null){
      this.usermsisdn = alert.simDetail.msisdn;
    }
    this.usertype = alert.residentType;
    if(this.usertype!=null){
      this.usertype = JSON.stringify(this.usertype).toLocaleUpperCase()
    }
    if(this.usertype.includes("CITIZEN")){
      this.usertype='Resident'
    }
    if(this.usertype.includes("RESIDENT")){
      this.usertype='Non-Resident'
    }
    
    
    this.ekycphoto = alert.eKYCPhoto;
    this.token = alert.newToken;
    this.verifiedphoto = alert.verifiedPhoto;
    this.corellation_id = alert.corellation_id
    this.address=alert.address;
      if(this.address==null || this.address.length==0){
        this.address="Mauritius"
      }else{
        this.address = this.address.replaceAll('&','&amp;');
        if(this.address.includes('locality')){
          var addrs = this.address.split('locality');
          console.log(addrs)
          this.address = addrs[0]
          this.locality = addrs[1]
          console.log(this.address.split('locality')[0],'*****',addrs[1],'******',this.locality);
        }
      }
    this.email=alert.email
    this.newCustomer=alert.newCustomer 
    if(this.newCustomer==null || this.newCustomer=="no"){
      this.newCustomer="no"
    }
    else{
      this.newCustomer="yes"
    }
    // this.signupDateOfBirth=this.signupDateOfBirth.split("-")
    // this.signupDateOfBirth=this.signupDateOfBirth[2]+"-"+this.signupDateOfBirth[1]+"-"+this.signupDateOfBirth[0]
    // console.log(this.docpath2);
    console.log(this.token);
  }

  dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.toString().split(',')[1]);

    //var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], {type: 'image/jpg'}); //or mimeString if you want
    return blob;
}

 _handleReaderLoaded(readerEvt) {
  var binaryString = readerEvt.target.result;
        //let base64textString= btoa(binaryString);
         console.log(btoa(binaryString));
 }

 onFileSelected(event, flag) {

  const file:File = event.target.files[0];
  this.fileName = file.name;
  let imageFile:File;
  if (file) {
      imageFile = new File([file], flag+'.jpg', { type: 'image/jpg' });
      const formData = new FormData();
      formData.append('msisdn',this.usermsisdn)
      console.log(` BEFORE : ${imageFile.size} bytes.`)
      this.compressImage.compress(imageFile)
      .pipe(take(1))
      .subscribe(compressedImage=>
       {
        this.imgResultAfterCompression=compressedImage;
          console.log(`Image size after compressed: ${compressedImage.size} bytes.`);
          formData.append('files',this.imgResultAfterCompression);
          return this.http.post(this.uploadPics,formData)
          .subscribe(data=>{
            let reaponse:any=data
            console.log(flag, reaponse)
            
            if(flag=='selfie')
                {
                  this.signupPic = reaponse.pic1;
                  
                  console.log(this.signupPic);
                  this.imagePath = this.signupPic;
                  this.approveBtn1txt='Validated';
                }
                if(flag=='kycpic')
                {
                  this.contractpic = reaponse.pic1;
                  
                  console.log(this.contractpic);
                  this.imagePath1 = this.contractpic;
                  this.updateDocument(flag, this.imagePath1);
                  this.approveBtn2txt='Validated';
                  
                }if(flag=='verifiedpic')
                {
                  this.documentpic = reaponse.pic1;
                  
                  console.log(this.documentpic);
                  this.imagePath2 = this.documentpic;
                  this.updateDocument(flag, this.imagePath2);
                  this.approveBtn3txt='Validated';
                }
          },error => {
            
            console.log( JSON.parse(error.data));
                  }
            )
        })
     
  }
}

  upload(flag){
    //console.log(this.ekycP);
    var blob = this.dataURItoBlob('data:image/jpg;base64,'+this.ekycP);
    var imageF = new File([blob], 'image.jpg');
    if(flag == 'selfie'){
      imageF = new File([blob], '1234'+'customerImage.jpg');
    }if(flag=='kycpic')
    {
      imageF = new File([blob], '1234'+'IdImage.jpg');
    }if(flag=='verifiedpic')
    {
      imageF = new File([blob], '1234'+'contractFormImage.jpg');
    }
    
    //let reader = new FileReader();
    let formData: FormData = new FormData();
    formData.append('msisdn',this.usermsisdn)
    //let image =this.imagePath ;
    //const imageName = 'name.jpg';
    //const imageFile = new File([this.imagePath], imageName, { type: 'image/jpg' });
    //console.log(typeof image);


    console.log(` BEFORE : ${imageF.size} bytes.`)
     this.compressImage.compress(imageF)
     .pipe(take(1))
     .subscribe(compressedImage=>
      {
        //var reader = new FileReader();
        //reader.onload =this._handleReaderLoaded.bind(this);
        //reader.readAsBinaryString(compressedImage);
        this.imgResultAfterCompression=compressedImage;
        console.log(`Image size after compressed: ${compressedImage.size} bytes.`);
        formData.append('files',this.imgResultAfterCompression);
        return this.http.post(this.uploadPics,formData)
        .subscribe(data=>{
          let reaponse:any=data
          console.log(flag, reaponse)
          
          if(flag=='selfie')
              {
                this.signupPic = reaponse.pic1;
                this.signupPic = this.signupPic.replace('https://selfcare.chili.mu','http://172.27.90.2');
                console.log(this.signupPic);
                this.approveBtn1txt='Validated';
              }
              if(flag=='kycpic')
              {
                this.contractpic = reaponse.pic1;
                this.contractpic = this.contractpic.replace('https://selfcare.chili.mu','http://172.27.90.2');
                console.log(this.signupPic);
                this.approveBtn2txt='Validated';
                
              }if(flag=='verifiedpic')
              {
                this.documentpic = reaponse.pic1;
                this.documentpic = this.documentpic.replace('https://selfcare.chili.mu','http://172.27.90.2');
                console.log(this.signupPic);
                this.approveBtn3txt='Validated';
              }
        },error => {
          
          console.log( JSON.parse(error.data));
                }
          )
      })

    
  }


  activate(){
    this.BtnName="Processing..."
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    
   let _request ={
	                   'msisdn':this.usermsisdn,
	                   'agentNbr':this.agentMsisdn,
	                   'customerName':this.fullname ,
	                  //  'parentName':'',
	                   'customerType':this.usertype,
	                   'gender': this.signupGender,
	                   'certType': this.certType,  
	                   'certNo': this.signupCertNo,
	                   'docEffDate': '',
	                   'docExpDate': '',
	                   'issueDate': '',
	                   'addressLine1': this.pmuid,
	                   'addressLine2': this.usertype,
	                   'addressLine3': this.nationality,                   
	                   'location': this.address,
	                   'phoneNumber': this.usermsisdn,
	                   'email': this.email,
	                   'birthday': this.signupDateOfBirth,//this.signupDateOfBirth.replaceAll('-','/'), 
	                   'customerImagePath':this.signupPic,
	                   'idPic':this.documentpic,
	                   'contractForm':this.contractpic,
                     'facebookAccount':this.token,
                     'twitterAccount':this.agentMsisdn,
                     'address':this.address,
                     'zipCode':"",
                     'vatId':"",
                     'vatExempted':""

    }
    console.log(_request);
    
// alert(request.ApplicationMode)
    return this.http.post("https://selfcare.chili.mu:8080/dealer/customerRegisterBORequest",_request,{headers:headers})
    .subscribe(data=>{
      let reaponse:any=data;
              console.log(reaponse);
              if(reaponse.data=="success"){
               alert(reaponse.data)
               this.BtnName="Activated"
               this.updateStatus("activated","")
               } else{
                 let dataresponse=JSON.parse(reaponse.data);
                alert(dataresponse.errormsg)
               }
            },
            error => {
              this.BtnName="Failed"
                alert('Error Response'+error.data)
              console.log( JSON.parse(error.data));
            });

            
  }
  
activateProfile(){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    var formData = new FormData();
    if(this.locality == null || this.locality == ''){
      this.locality = this.address;
    }
    
    formData.append('msisdn',this.usermsisdn);
    formData.append('agentNbr',this.agentMsisdn);
    formData.append('customerName',this.fullname )
    //  'parentName':'',
    formData.append('customerType',this.usertype);
    formData.append('gender',this.signupGender);
    formData.append('certType', this.certType);
    formData.append('certNo', this.signupCertNo+"-1");
    formData.append('docEffDate', '');
    formData.append('docExpDate', '');
    formData.append('issueDate', '');
    formData.append('addressLine1', this.pmuid);
    formData.append('addressLine2', this.usertype);
    formData.append('addressLine3', this.nationality);                   
    formData.append('location', this.locality);
    formData.append('phoneNumber', this.usermsisdn);
    formData.append('email', this.email);
    formData.append('birthday', this.signupDateOfBirth);//this.signupDateOfBirth.replaceAll('-','/'),
    formData.append('customerImagePath',this.signupPic);
    formData.append('idPic',this.documentpic);
    formData.append('contractForm',this.contractpic);
    formData.append('facebookAccount',this.token);
    formData.append('twitterAccount',this.agentMsisdn);
    formData.append('address',this.address);
    formData.append('zipCode',"");
    formData.append('vatId',"");
    formData.append('vatExempted',"");

   
    return this.http.post('https://ekyc.chili.mu:9443/crm/activate',formData)
          .subscribe(data=>{
            let response:any=data
            let str = JSON.stringify(response);
            //this.i=1;
            //console.log(JSON.stringify(response));
            if(str.includes('faultstring') || str.includes('faultcode')){
              alert('Error Response from CRM\n\n'+ '['+str+']');
              if(str.includes('MSISDN has already been registered')){
                this.updateStatus('Activated','');
                this.sendSms();
              }
              
                if(this.i<10){
                  this.signupCertNo = this.signupCertNo+"-"+this.i
                }
                this.i = this.i+1;
                this.BtnName="Retry"

            }else{
              alert('Operation Successful.');
              this.sendSms();
              this.updateStatus('Activated','');
            }
            
            
          },error => {
            
            alert('Error Response from CRM ');
            this.updateStatus('Activation Failed','');
            
                  }
            )
    
 
  }
  
 

  //new customer status needs to be validated
  updateMSISDN(){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    var formData = new FormData();
    formData.append('msisdn',this.usermsisdn);
    formData.append('token',this.token);
    formData.append('newCustomer','yes');
          return this.http.post('https://ekyc.chili.mu:9443/api/msisdnUpdate',formData)
          .subscribe(data=>{
            let reaponse:any=data
            
          },error => {
            
            console.log( JSON.parse(error.data));
                  }
            )
        }

         //new customer status needs to be validated
  updateDocument(docName, imgBase64){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    var formData = new FormData();
    formData.append('documentName',docName);
    formData.append('token',this.token);
    formData.append('image',imgBase64);
          return this.http.post('https://ekyc.chili.mu:9443/api/documentUpdate',formData)
          .subscribe(data=>{
            let reaponse:any=data
            
          },error => {
            
            console.log( JSON.parse(error.data));
                  }
            )
        }

         //new customer status needs to be validated

         updatedocumentimg($event,docname){
          if(docname == 'docname1'){
            docname = this.docName
          }
          else{
            docname = this.docName2
          }
          const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
          var formData = new FormData();
          const target = $event.target as HTMLInputElement
          const file = (target.files as FileList)[0]
          console.log(file)

          const obs = new Observable((Subscriber:Subscriber<any>)=>{
            const filereader = new FileReader()
            filereader.readAsDataURL(file)
            filereader.onload=()=>{
              Subscriber.next(filereader.result);
              Subscriber.complete()
            }
            filereader.onerror=()=>{
              Subscriber.error()
              Subscriber.complete()
            }
          })
          obs.subscribe((d)=>{
            this.base64imgofdoc = d
            this.base64imgofdoc = this.base64imgofdoc.split(',')
            let x = this.base64imgofdoc[1]
            console.log(x)
            console.log(docname)
            console.log(this.token)
            formData.append('documentName',docname);
          formData.append('token',this.token);
          formData.append('image',x);
                return this.http.post('https://ekyc.chili.mu:9443/api/documentUpdate',formData)
                .subscribe(data=>{
                  let reaponse:any=data
                  
                },error => {
                  
                  console.log( JSON.parse(error.data));
                        }
                  )
          })
          
         }
  sendSms(){
    var text = 'Congratulations your e-KYC is verified and completed as per Token ID '+this.token+'. Thank you and Enjoy the CHiLi Services.';
    
    var url = 'https://ekyc.chili.mu:9443/ekyc/v1/sms?msisdn='+this.usermsisdn+'&from=2306668&text='+text+'&configId=2&locale=en'
  
    return this.http.get(url)
    .subscribe(data=>{
      console.log('sms sent');
    })

  }
  
  sendRejectSms(){
    var text = 'Your e-KYC document are not uploaded properly as per Token ID '+this.token+ '. Kindly initiate the Re-Registration process.';
    var url = 'https://ekyc.chili.mu:9443/ekyc/v1/sms?msisdn='+this.usermsisdn+'&from=2306668&text='+text+'&configId=2&locale=en'
  
    return this.http.get(url)
    .subscribe(data=>{
      alert("Rejected")
      console.log('sms sent');
    })
  }
  updateStatus(status,msg){
    if(status=='reject'){
      this.sendRejectSms();
    }
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    var formData = new FormData();
    let request = {
      'status':status+' '+msg,
      'token':this.token,
      'type':'customer'
    };
   formData.append('status',status+msg);
   formData.append('token',this.token);
   formData.append('type','customer');
          return this.http.post('https://ekyc.chili.mu:9443/api/statusUpdate',formData)
          .subscribe(data=>{
            let reaponse:any=data
            //alert("Activated")
          },error => {
            //alert("Activation Failed")
            
            console.log( JSON.parse(error.data));
                  }
            )
            
        }

       

        gotoDownloadPDF(){
          this.router.navigate(['/downloadpdf'])
        }


}
