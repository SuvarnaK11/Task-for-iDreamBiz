import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-employee-data',
  templateUrl: './employee-data.component.html',
  styleUrls: ['./employee-data.component.css']
})
export class EmployeeDataComponent implements OnInit {
  employee_data: any = []
  temp: any
  data: any
  date: any = []
  sort: any
  searchData: any = []
  flagSearch: boolean = false
  deptflag: boolean = false
  filterData: any = []
  deptarr: any = []
  deptcount :any={}
  newdept :any=[]
  constructor(private ser: ServiceService) {
    this.ser.getdata().subscribe(
      (r: any) => {
        console.log(r);
        this.employee_data = r
      },
      (e: any) => { console.log(e) }
    )

    //this.dynamicSort(this.employee_data)
  }




  ngOnInit(): void {
  }

  sortbyname() {
    this.data = this.employee_data.sort((a: any, b: any) => a.name.localeCompare(b.name))
    console.log(this.data)
  }

  sortbydate() {
    for (let i = 0; i < this.employee_data.length; i++) {
      //  console.log(this.employee_data[i].joining_date)
      //   this.date.push(this.employee_data[i].joining_date)

      // for (let x in this.employee_data[i]) {
      console.log(this.employee_data[i]['joining_date'])
      this.employee_data[i]['joining_date'] = new Date(this.employee_data[i]['joining_date'])
      // }


    }
    this.employee_data.sort((a: any, b: any) => { return (b.joining_date) - (a.joining_date) })

  }

  onSearch(vnm: any) {
    this.flagSearch = true
    console.log(vnm.value)
    for (let i = 0; i < this.employee_data.length; i++) {
      //console.log(this.employee_data[i].name)
      if (vnm.value == this.employee_data[i].name) {
        console.log(this.employee_data[i].name)
        this.searchData.push(this.employee_data[i])
      }
    }
    console.log(this.searchData)
  }

  filterforexp() {
    //this.filterflag = true
    console.log("ok")
  }

  deptemp() {
   
    for (let i = 0; i < this.employee_data.length; i++) {
      //console.log(this.employee_data[i].department)
      var d: any = this.employee_data[i].department
      let count = 0
      this.deptarr.push(d)

    }
    this.deptarr = [...new Set(this.deptarr)]
    //console.log(this.deptarr)

    for (let i = 0; i < this.deptarr.length; i++) {
      let count = 0
      this.deptcount = {}
      for (let j = 0; j < this.employee_data.length; j++) {
        if (this.deptarr[i] == this.employee_data[j].department) {
          count++
        }
      }
      this.deptcount.dept=this.employee_data[i].department 
        this.deptcount.count= count
       console.log(this.deptcount)
  
       this.newdept.push(this.deptcount)
       console.log(this.newdept)
      

      //console.log("department " + this.employee_data[i].department + " no of employees "+ count )
    }
      console.log(this.deptarr)
      this.deptflag = true
  }

  deleteDept(){
    let deldept = "Development"
   
    for(let i=0; i<this.employee_data.length; i++){
      console.log(this.employee_data[i].department)
      if(deldept == this.employee_data[i].department){
        console.log(this.employee_data[i].name)
        this.employee_data.splice(i,1)
        i--;
      }
    }  
  }

}
