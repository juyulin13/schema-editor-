import * as _ from 'lodash';
import * as React from 'react';
import EnumSelect from './FormItem/enumSelector';
import Input from './FormItem/renderInput';
import List from './FormItem/listEditor';
import Color from './FormItem/color';

export interface FormItem {
  format: string,
  component: React.ComponentClass | React.FunctionComponent
}

export const FormTypes: Array<FormItem> = [{
  format: 'enum',
  component: EnumSelect,
}, {
  format: 'text',
  component: Input,
}, {
  format: 'list',
  component: List
}, {
  format: 'color',
  component: Color
}]



export function getFormItemComponent(format: string): any {
  return _.find(FormTypes, { format })
}

export function registFormItemCompoennt(data: FormItem) {
  FormTypes.push(data)
}