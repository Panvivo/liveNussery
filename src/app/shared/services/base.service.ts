
import {throwError as observableThrowError} from 'rxjs';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/operator/finally';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';

@Injectable()

export class BaseService {
  userType: string;
  constructor(public http: HttpClient) {
    this.userType = sessionStorage.getItem('userType');
  }

  // Get methods with or without options
  get(url, options?: any) {

    if (options) {
      // Helper service to start ng2-slim-loading-bar progress bar
      return this.http.get(url, options)
        .pipe(
          map((res) => {return res}),
          catchError((error) => observableThrowError(error))
        );
    } else {
      // Helper service to start ng2-slim-loading-bar progress bar
      return this.http.get(url)
        .pipe(
          map((res) => {return res}),
          catchError((error) => observableThrowError(error))
        );
    }
  }
  // POST methods with or without options
  post(url, postBody: any, options?: any) {
    // to avoid adding anything to the audit payload
    if (this.userType == 'Administrator on Demand' && options['module'] == undefined) {
      postBody["BAR"] = sessionStorage.getItem('BAR');
    }

    if (options) {
      return this.http.post(url, postBody, options)
        .pipe(
          map((res) => {return res}),
          catchError((error) => observableThrowError(error))
        );
    } else {
      return this.http.post(url, postBody)
        .pipe(
          map((res) => {return res}),
          catchError((error) => observableThrowError(error))
        );
    }


  }

  // Delete methods with or without options
  delete(url, options?: any) {
    if (options) {
      return this.http.delete(url, options)
        .pipe(
          map((res) => {return res}),
          catchError((error) => observableThrowError(error))
        );
    } else {
      return this.http.delete(url)
        .pipe(
          map((res) => {return res}),
          catchError((error) => observableThrowError(error))
        );
    }

  }

  // PUT methods with or without options
  put(url, putData: any, options?: any) {
    if (options) {
      return this.http.put(url, putData, options)
        .pipe(
          map((res) => {return res}),
          catchError((error) => observableThrowError(error))
        );
    } else {
      return this.http.put(url, putData)
        .pipe(
          map((res) => {return res}),
          catchError((error) => observableThrowError(error))
        );
    }

  }

}
