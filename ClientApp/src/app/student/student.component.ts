import { CustomValidators } from './../common/custom.validators';
import { StudentService, CreateEntity, CreateGrade } from './student.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Guid } from "guid-typescript";

interface KeyValue {
  key: any
  value: any
}

interface Student {
  id: number
  name: string
  guid: Guid
  grades: StudentGrades[]
}

interface Lecture {
  id: number
  name: string
}

interface StudentGrades {
  gradeId: number
  LectureName: string
  degree: number
  isSuccessed: boolean
}

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})

export class StudentComponent implements OnInit {
  lectures: Lecture[] = []
  studentsLectures: Student[] = []

  form: FormGroup
  createList: KeyValue[] = []

  student: Student
  studentGuid

  generalEntityValidations = [Validators.required, Validators.minLength(3)]
  studentValidation = [CustomValidators.uniqueName]

  constructor(private service: StudentService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.onCreatingForm()
    this.getData()
    this.getStudentsLectures()

    this.fillEnumList()
    this.validate()
  }

  fillEnumList() {
    let x = Object.keys(CreateEnum).filter(k => !isNaN(Number(k)));
    let y = Object.keys(CreateEnum).filter(k => isNaN(Number(k)));
    for (var i = 0; i < x.length; i++) {
      this.createList.push({ key: x[i], value: y[i] })
    }
  }
  onCreatingForm(createOption : CreateEnum = CreateEnum.Student) {
    this.form = this.fb.group({
      entity: [],
      studentId: [0, [], []],
      lectureId: [0, [], []],
      degree: [0.0, [], []],
      createOption: [createOption, [], []],
    })

  }
  setStudentValidation() {
    this.entity.setValidators(this.generalEntityValidations)
    this.entity.setAsyncValidators(this.studentValidation)
  }

  setLectureValidation() {
    this.entity.setValidators(this.generalEntityValidations)
  }

  submit() {
    let x = +this.createOption
    switch (x) {
      case CreateEnum.Student: this.createStudents({ name: this.entity.value })
        break

      case CreateEnum.Lecture: this.createLectures({ name: this.entity.value })
        break

      case CreateEnum.Grade:

        let data: CreateGrade = {
          studentId: +this.studentId.value as number,
          lectureId: +this.lectureId.value as number,
          degree: this.degree.value as number
        }
        this.createGrades(data)
        break

      default: console.log(this.createOption.value as number)
        break
    }
    let v = this.createOption
    this.onCreatingForm()
    this.form.patchValue({
      'createOption': v
    })
  }

  createStudents(data: CreateEntity) {
    this.service.createStudents(data).subscribe(response => {
      let student = response as Student
      student.grades = []
      this.studentsLectures.push(student)
      console.log("createStudents function")
      console.log(student)
      this.pop(CreateEnum.Student, student.guid)
    }, error => {
      console.log(error)
    })
  }

  createLectures(data: CreateEntity) {
    this.service.createLectures(data).subscribe(response => {
      let lecture = response as Lecture
      this.lectures.push(lecture)
      console.log("createLectures function")
      console.log(lecture)
      this.pop(CreateEnum.Lecture, lecture.name)
    }, error => {
      console.log(error)
    })
  }

  createGrades(data: CreateGrade) {
    this.service.createGrades(data).subscribe(response => {
      let grade = response as StudentGrades
      console.log(grade)
      this.studentsLectures.filter(s => s.id == data.studentId)[0].grades.push(grade)
      console.log("createGrades function")
      console.log(this.studentsLectures)
      this.pop(CreateEnum.Grade, grade.degree)
    })
  }

  getData() {
    this.service.getData().subscribe(response => {
      this.lectures = response['lectures']
      console.log("getData function")
      console.log(this.lectures)
    })
  }

  getStudentsLectures() {
    this.service.getStudentLecture().subscribe(response => {
      this.studentsLectures = response as Student[]
      console.log("getStudentsLectures function")
      console.log(this.studentsLectures)
    })
  }

  get entity() {
    return this.form.get('entity') as FormControl
  }

  get studentId() {
    return this.form.get('studentId') as FormControl
  }

  get lectureId() {
    return this.form.get('lectureId') as FormControl
  }

  get degree() {
    return this.form.get('degree') as FormControl
  }

  get createOption() {
    return this.form.get('createOption').value
  }

  getGrades() {
    let x = this.studentsLectures.filter(s => s.guid == this.studentGuid)[0]
    this.student = x
  }

  pop(type: CreateEnum, value) {
    let message
    if (type == CreateEnum.Grade) {
      message = "grade has assained as: " + value
      alert(message)
      return
    }
    if (type == CreateEnum.Lecture) {
      message = "Lecture " + value + " has been Added"
      alert(message)
      return
    }
    if (type == CreateEnum.Student) {
      message = "Student with serial: " + value + " has been Added, (important: copy serial to be able to search about him/her)"
      alert(message)
      return
    }
  }

  validate() {
    this.onCreatingForm(this.createOption)

    let x = +this.createOption
    switch (x) {
      case CreateEnum.Student:
        this.setStudentValidation()
        break;
      case CreateEnum.Lecture:
        this.setLectureValidation()
        break;

    }
  }
}

enum CreateEnum {
  Student = 1,
  Lecture = 2,
  Grade = 3
}
