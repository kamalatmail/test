import { Component, OnInit } from '@angular/core';
import { request } from '@esri/arcgis-rest-request';
import { UserSession } from '@esri/arcgis-rest-auth';
import { queryFeatures, IFeature } from '@esri/arcgis-rest-feature-layer';
import { addFeatures } from '@esri/arcgis-rest-feature-layer';
import { updateFeatures } from '@esri/arcgis-rest-feature-layer';
import { NgxSpinnerService } from "ngx-spinner";

const url = "https://www.arcgis.com/sharing/rest/content/items/6e03e8c26aad4b9c92a87c1063ddb0e3/data";

const session = new UserSession({
  username: "gsoadmin",
  password: "arcgispro1"
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private spinner: NgxSpinnerService) {}
  ngOnInit() {
    /** spinner starts on init */
    this.spinner.show();
 
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    },500);
  }
  title = 'Tour of Heroes';
  PUQMaster="https://gso-govtech.com/server/rest/services/Test/PUQdataView/FeatureServer/1/query?token=XVYzUa0X3i2WE_gGT9TDcMKDTb8GblZJYduJL4Tne5yeE5FoxEzT3aJwSzMDBJdOxGdBlggS68D_CxS17h6GN4cxdQ4T_SYhSl73gEuAcpdpUoxDy2Of0yJ5p9doFqD-SpLv2Wf7qnxSVJp7QkWksxl9sxxZEArTOXrLopBx1fhf3wOppG41GAMOwqf53ryXiv5kmnD3Xqki0EUcyashBtTZHJoQE5TmQ8TXXV_BZ3u4fHeCyMZC6Yc0w69lQ_o5"
  getdata1(){
    request(url)
    .then(response => {
        console.log(response) // WebMap JSON
    })
  }
  getdata(){
    this.spinner.show();
    request(this.PUQMaster,{
      params: { where: '1=1' ,outFields:"*"}
    })
    .then(response => {
        console.log(response) // WebMap JSON
        this.spinner.hide();
    })
  }

  options = {
    url:this.PUQMaster,
    where: "Species = 'Oak'"
  };
  
  getdata3(){
  queryFeatures(this.options)
    .then(response => {
      console.log(response); // 500
    });
  }

  ///adding features
  adddata(){
  addFeatures({
    url: "https://gso-govtech.com/server/rest/services/Test/PUQdataView/FeatureServer/1",
   // params:{token:"XVYzUa0X3i2WE_gGT9TDcMKDTb8GblZJYduJL4Tne5yeE5FoxEzT3aJwSzMDBJdOxGdBlggS68D_CxS17h6GN4cxdQ4T_SYhSl73gEuAcpdpUoxDy2Of0yJ5p9doFqD-SpLv2Wf7qnxSVJp7QkWksxl9sxxZEArTOXrLopBx1fhf3wOppG41GAMOwqf53ryXiv5kmnD3Xqki0EUcyashBtTZHJoQE5TmQ8TXXV_BZ3u4fHeCyMZC6Yc0w69lQ_o5"},
    features: [{ attributes:{
      "FirstName":"Bruce132",
      "LastName":"Lee",
      "Nationality":"China",
      "Gender":"Male",
      "Age":40,
      "ContactNo1":"8888888",
      "ContactNo2":null,
      "Remarks":null,
      "SpecialNeeds":null,
      "CreatedBy":"SYSTEM",
      "CreatedDate":1550534400000,
      "UpdatedBy":null,
      "UpdatedDate":null}
   }]
  })
    .then(response => {
      console.log(response); // 500
    })
    .catch(error =>{
      console.log(error); 
    })
  }

  updatedata(){
    updateFeatures({
      url: "https://gso-govtech.com/server/rest/services/Test/PUQdataView/FeatureServer/1",
      params:{token:"XVYzUa0X3i2WE_gGT9TDcMKDTb8GblZJYduJL4Tne5yeE5FoxEzT3aJwSzMDBJdOxGdBlggS68D_CxS17h6GN4cxdQ4T_SYhSl73gEuAcpdpUoxDy2Of0yJ5p9doFqD-SpLv2Wf7qnxSVJp7QkWksxl9sxxZEArTOXrLopBx1fhf3wOppG41GAMOwqf53ryXiv5kmnD3Xqki0EUcyashBtTZHJoQE5TmQ8TXXV_BZ3u4fHeCyMZC6Yc0w69lQ_o5"},
      features: [{ attributes:{
        "PUQID":401,
        "FirstName":"Bruce12",
        "LastName":"Lee",
        "Nationality":"China",
        "Gender":"Male",
        "Age":40,
        "ContactNo1":"8888888",
        "ContactNo2":null,
        "Remarks":null,
        "SpecialNeeds":null,
        "CreatedBy":"SYSTEM",
        "CreatedDate":1550534400000,
        "UpdatedBy":null,
        "UpdatedDate":null}
     }]
    })
      .then(response => {
        console.log(response); // 500
      })
    }
}