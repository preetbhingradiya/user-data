import { AbstractControl, FormControl } from "@angular/forms";

export class customvalidation{

    static validEmail(control:AbstractControl){
        let email=control.value
        if(email && !email.endsWith("@gmail.com")){
            return {validEmail:true};
        }
        return null
    }
}