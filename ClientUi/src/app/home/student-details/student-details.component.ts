import { Component, OnInit } from '@angular/core';
import { DataHolderService } from 'src/app/services/data-holder.service';
import { DataService } from '../../services/data.service';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  constructor(
    public dataHolderService: DataHolderService,
    private dataService: DataService,
    private studentDataService: StudentService
  ) { }

  ngOnInit(): void {
    console.log(this.dataHolderService.currentStudent)
  }
  cliseSideBar() {
    this.dataHolderService.selectedStudentID = 0
    this.dataHolderService.currentStudent=null
  }
  isOnUpdateMode = 0
  disciplines: any[] = [];

  update() {
    this.isOnUpdateMode = 1;
    this.dataService.getAllDisciplines().subscribe(data => { this.disciplines = data;  });

  }
  confirmUpdate() {
    var toUpdate = {
      Name: this.dataHolderService.currentStudent?.Name,
      Id: this.dataHolderService.currentStudent?.ID,
      Email: this.dataHolderService.currentStudent?.Email,
      DisciplineId: this.dataHolderService.currentStudent?.DisciplineID
    }
    this.studentDataService.update(toUpdate).subscribe(resp => {
      this.dataHolderService.currentStudent = resp;
      this.cancelUpdate()
    })
  }
  cancelUpdate() {
    this.isOnUpdateMode = 0;
  }
  isOndeleteMode=0
  delete() {
    this.isOndeleteMode = 1;
  }
  cancelDelete() {
    this.isOndeleteMode = 0;
  }
  confirmDelete() {
    this.studentDataService.delete().subscribe(res => {})
  }
}
