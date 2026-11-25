import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function firstLetterShouldBeUpperCase() : ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = <string>control.value;

        if (!value) return null;
        if (value.length === 0) return null;

        const firstLetter = value[0];

        if (firstLetter !== firstLetter.toUpperCase()){
            return {
                firstLetterShouldBeUpperCase: {
                    message: 'The first letter should be uppercase'
                }
            };
        }

        return null;
    }
}

export function noNumbersAllowed(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = <string>control.value;
        const regex = /\d/;

        if(!value) return null;
        if(value.length === 0) return null;
        
        if(regex.test(value) || regex.test(value)){
            return {
                noNumbersAllowed : {
                    message: 'Numbers are not allowed'
                }
            };
        }

        return null;
    }
}

export function dateCannotBeInTheFuture(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = <Date>control.value;
        const today = new Date();

        if(!value) return null;
        if(value > today) return {
            dateCannotBeInTheFuture: {
                message: 'Date cannot be in the future'
            }
        };

        return null;
    }
}

export function dateCannotBeInThePast(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = <Date>control.value;
        const today = new Date();

        if(!value) return null;
        if(value < today) return {
            dateCannotBeInThePast: {
                message: 'Date cannot be in the past'
            }
        }

        return null;        
    }
}