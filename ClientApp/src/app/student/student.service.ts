import { HttpClient, HttpHeaders, HttpXhrBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface CreateEntity {
  name: string
}

export interface CreateGrade {
  studentId: number,
  lectureId: number,
  degree: number,
}


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  develop = "https://localhost:44354"
  deploy = "http://192.168.137.1"
  
  static develop = "https://localhost:44354"
  static deploy = "http://192.168.137.1"
  

  static url = StudentService.develop + "/api/values/"
  url = this.develop           + "/api/values/"

  private options = {
    headers: new HttpHeaders({
      "Content-Type": "application/json-patch+json",
      "Accept": "text/plain"
    })

  };

  constructor(private http: HttpClient) { }

  getStudentLecture() {
    return this.http.get(this.url + 'Get')
  }

  getData() {
    return this.http.get(this.url + 'Data')
  }

  createStudents(data: CreateEntity) {
    return this.http.post(this.url + 'Students', JSON.stringify(data), this.options)
  }

  checkStudent(data: CreateEntity) {
    return this.http.post(this.url + 'CheckStudent', JSON.stringify(data), this.options)
  }

  createLectures(data: CreateEntity) {
    return this.http.post(this.url + 'Lectures', JSON.stringify(data), this.options)
  }

  createGrades(data: CreateGrade) {
    return this.http.post(this.url + 'Grades', JSON.stringify(data), this.options)
  }

  static staticCheckStudentUniqueNameValidator(actionNameWithParams: string) {
    let httpClient = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
    return httpClient.get(this.url + actionNameWithParams)
  }

}
