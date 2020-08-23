import { StudentService } from './../student/student.service';
import { ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';
export class CustomValidators {

    static uniqueName(control: AbstractControl): Promise<ValidationErrors | null> {
        return new Promise((resolve) => {
            setTimeout(() => {
                CustomValidators.checkStudentName(control.value).subscribe(response => {
                    if (response)
                        resolve({ uniqueName: true })
                    else
                        resolve(null)
                })
            }, 2000);
        })
    }

    static tooShort(minimum: number): ValidatorFn {
        return (control: AbstractControl): Promise<ValidationErrors | null> => {
            return new Promise(resolve => {
                if (control.value.length < +minimum)
                    resolve({ tooShort: true })
                else
                    resolve(null)
            })
        }
    }


    public static checkStudentName(val: string) {
        return this.dealWithService('checkStudentName?newStudentName=' + val)
    }

    private static dealWithService(actionNameWithParams: string) {
        return StudentService.staticCheckStudentUniqueNameValidator(actionNameWithParams)
    }
}