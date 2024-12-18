import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurentData } from './restaurent.model'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
    formValue! : FormGroup;
    restaurentModelObj : RestaurentData = new RestaurentData;
    allRestaurentData : any;
    showAdd! : boolean;
    showBtn! : boolean;

    constructor(private formbuilder: FormBuilder,private api: ApiService){}

    ngOnInit(): void {
      this.formValue = this.formbuilder.group({
        name:[''],
          email:[''],
          mobile : [''],
          address:[''],
          services:['']
      })
      this.getAllData();
    }

   

    addRestaurent()
    {
      this.restaurentModelObj.id = this.restaurentModelObj.id+1;
      this.restaurentModelObj.name = this.formValue.value.name;
      this.restaurentModelObj.email = this.formValue.value.email;
      this.restaurentModelObj.mobile = this.formValue.value.mobile;
      this.restaurentModelObj.address = this.formValue.value.address;
      this.restaurentModelObj.services = this.formValue.value.services;

      this.api.postRestaurent(this.restaurentModelObj).subscribe(res=>{
        console.log(res);
        alert("Restaurent Added Successfully");
        this.formValue.reset();

        let ref = document.getElementById('close');
        ref?.click();

        this.getAllData();

      }, err=>{
        console.log(err);
        alert("Restaurent Added Failed");
      })
    }
    
    clickAddResto()
    {
      this.formValue.reset();
      this.showAdd = true;
      this.showBtn = true;
      // this.addRestaurent();
     
    }

    getAllData()
    {
      this.api.getRestaurent().subscribe(res => {
        this.allRestaurentData= res;
      }, err=>{
        console.log(err);
      })
    }

    deleteResto(data:any){
      this.api.deleteRestaurent(data).subscribe((res:any)=>{
        console.log(res);
        alert("Restaurent Deleted Successfully");
        this.getAllData();
      })
    }

    onEditResto(data:any){
      this.showAdd = true;
      this.showBtn = true;
      
      this.restaurentModelObj.id = data.id;
      this.formValue.controls['name'].setValue(data.name);
      this.formValue.controls['email'].setValue(data.email);
      this.formValue.controls['mobile'].setValue(data.mobile);
      this.formValue.controls['address'].setValue(data.address);
      this.formValue.controls['services'].setValue(data.services);
    }

    updateResto(){
      this.restaurentModelObj.name = this.formValue.value.name;
      this.restaurentModelObj.email= this.formValue.value.email;
      this.restaurentModelObj.mobile = this.formValue.value.mobile;
      this.restaurentModelObj.address = this.formValue.value.address;
      this.restaurentModelObj.services = this.formValue.value.services;

      this.api.updateRestaurent(this.restaurentModelObj.id,this.restaurentModelObj).subscribe((res:any)=>{
        alert("Restaurent Updated Successfully");
        this.formValue.reset();
  
        let ref = document.getElementById('close');
        ref?.click();
  
        this.getAllData();
      })

    }

}
