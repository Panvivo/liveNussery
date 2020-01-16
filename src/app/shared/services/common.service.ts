import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EncryptService} from './encrypt.service';


@Injectable()


export class CommonService extends BaseService {
  headers = {};
  options = {};
  auditRecordheaders = {};
  auditRecordoptions = {};
  encryptService: EncryptService;


  /**
   *Creates an instance of CommonService.
   * @param {HttpClient} http
   * @param {EncryptService} encryptservice
   * @memberof CommonService
   */
  constructor(public http: HttpClient, private encryptservice: EncryptService) {
    // initializing all the header parameters
    super(http);
    this.headers['Content-Type'] = 'application/json';
    this.auditRecordheaders['Content-Type'] = 'application/json';
    this.headers['Authorization'] = sessionStorage.getItem('token');

    const httpHeaders = new HttpHeaders(this.headers);
    this.options['headers'] = httpHeaders;
    this.options['observe'] = 'response';

    const httpAuditHeaders = new HttpHeaders(this.auditRecordheaders);
    this.auditRecordoptions['headers'] = httpAuditHeaders;
    this.auditRecordoptions['observe'] = 'response';
    this.auditRecordoptions['module'] = 'auditlog';

    this.encryptService = encryptservice;
  }


  
  getModulePermission(permissionArray): object {
    const modulePermission = {'view': false, 'add': false, 'edit': false, 'delete': false};
    if (permissionArray.includes('V')) modulePermission['view'] = true;
    if (permissionArray.includes('E')) modulePermission['edit'] = true;
    if (permissionArray.includes('A')) modulePermission['add'] = true;
    if (permissionArray.includes('D')) modulePermission['delete'] = true;
    return modulePermission;
  }

  /**
   * This common service will be used to sort the Items alphabetically
   *
   * @param {*} arrObject
   * @param {*} fieldName
   * @return {any}
   * @memberof CommonService
   */
  sortColumn(arrObject, fieldName): any {
    if (arrObject.length == 0) return [];
    const sortedObject = arrObject.sort((t1, t2): number => {
      const name1 = t1[fieldName].toLowerCase();
      const name2 = t2[fieldName].toLowerCase();
      if (name1 > name2) return 1;
      if (name1 < name2) return -1;
      return 0;
    });

    return sortedObject;
  }

  /**
   * This method will help us the find the level 3
   * navigations that are used along with selected options
   * @param {string} parentModule
   * @param {string} activeModule
   * @return {*}
   * @memberof CommonService
   */
  getSubNavigation(parentModule: string, activeModule: string): any {
    let result = [];
    const navigationModules = JSON.parse(sessionStorage.getItem('mainNavigation'));
    // to find the parent module to display their sub menus
    for (const index in navigationModules) {
      if (navigationModules[index]['children'].length == 0) continue;
      for (const index2 in navigationModules[index]['children']) {
        const module = navigationModules[index]['children'][index2];
        if (module['moduleName'] == parentModule) {
          result = module['children']; // return level 3 menu item
        }
      }
    }

    // to find the active module
    for (const index in result) {
      if (result[index]['moduleName'] == activeModule) {
        result[index]['selectedCSS'] = 'active';
        result[index]['selected'] = true;
      } else {
        result[index]['selectedCSS'] = 'color';
        result[index]['selected'] = false;
      }
    }
    return result;
  }

  /**
   * This module will help us to identify if the feature
   * is released or not based on the navigation menu available
   *
   * @param {string} parentModule
   * @param {string} actualModule
   * @return {boolean}
   * @memberof CommonService
   */
  isFeatureReleased(parentModule: string, actualModule: string): boolean {
    let featureReleased = false;
    let result = [];
    const navigationModules = JSON.parse(sessionStorage.getItem('mainNavigation'));
    // to find the parent module is available or not
    mainFor: for (const index in navigationModules) {
      if (navigationModules[index]['children'].length == 0) continue;
      for (const index2 in navigationModules[index]['children']) {
        const module = navigationModules[index]['children'][index2];
        if (module['moduleName'] == parentModule) {
          featureReleased = true;
          result = module['children']; // return level 3 menu item
          break mainFor;
        }
      }
    }
    if (featureReleased == true) {
      featureReleased = false;
      // to find the active module
      for (const index in result) {
        if (result[index]['moduleName'] == actualModule) {
          featureReleased = true;
          break;
        }
      }
    }
    return featureReleased;
  }

  /**
   * To check if the access is available based on the
   * Featured released
   *
   * @param {string} url
   * @return {boolean}
   * @memberof CommonService
   */
  isAccessDenied(url: string): boolean {
    url = url.replace('/', '');
    let hasAccess = false;
    const releasedModules = JSON.parse(sessionStorage.getItem('mainNavigation'));
    // to find the parent module is available or not
    mainFor: for (const index in releasedModules) {
      // checking in the level one menu
      if ((releasedModules[index]['menuLevel'] == 1
        && releasedModules[index]['children-urls'].length > 0
        && releasedModules[index]['children-urls'].indexOf(url) != -1)
        || releasedModules[index]['url'] == url) {
        hasAccess = true;
        break mainFor;
      }

      if (releasedModules[index]['menuLevel'] == 1
        && releasedModules[index]['children-urls'].length > 0) {
        for (const index2 in releasedModules[index]['children']) {
          const module = releasedModules[index]['children'][index2];
          if (module['menuLevel'] == 2
            && module['children-urls'].length > 0
            && module['children-urls'].indexOf(url) != -1) {
            hasAccess = true;
            break mainFor;
          }
        }
      }
    }

    return hasAccess;
  }
}
