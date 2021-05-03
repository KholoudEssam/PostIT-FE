import { AbstractControl } from '@angular/forms';
import { Observable, Observer, scheduled } from 'rxjs';

export const mimeType = (
  control: AbstractControl
): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
  if (typeof control.value === 'string') {
    // console.log('string is');
    return new Promise(null);
  }
  const file = control.value as File;
  const fileReader = new FileReader();
  const frObs = new Observable((observer: Observer<{ [key: string]: any }>) => {
    fileReader.addEventListener('loadend', () => {
      const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(
        0,
        4
      );
      let header = '';
      let isValid = false;
      for (let i = 0; i < arr.length; i++) {
        header += arr[i].toString(16);
      }
      switch (header) {
        case '89504e47':
        case '47494638':
        case 'ffd8ffe0':
        case 'ffd8ffDB':
        case 'ffd8ffe1':
        case 'ffd8ffe2':
        case 'ffd8ffe3':
        case 'ffd8ffe8':
          isValid = true;
          break;
        default:
          isValid = false;
          break;
      }
      if (isValid) {
        //have to return-emit- null if it is valid
        observer.next(null);
      } else {
        observer.next({ invalidMimeTye: true });
      }
      observer.complete();
    });
    fileReader.readAsArrayBuffer(file);
  });

  return frObs;
};
