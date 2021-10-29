import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseFormData {
  constructor() {}

  async create(
    object: Object | any,
    form?: FormData,
    namespace?: string
  ): Promise<FormData> {
    let formData = form || new FormData();
    for (let property in object) {
      if (!object.hasOwnProperty(property) || !object[property]) continue;
      const formKey = namespace ? `${namespace}['${property}']` : property;
      if (object[property] instanceof Date) {
        await formData.append(formKey, object[property].toISOString());
        // } else if (typeof object[property] === 'object' && !(object[property] instanceof File)) {
        //   formData = await this.create(object[property], formData, formKey);
      } else {
        await formData.append(formKey, object[property]);
      }
    }
    return formData;
  }
}
