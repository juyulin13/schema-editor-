import * as _ from 'lodash';
import * as React from 'react';
import EnumSelect from './FormItem/enumSelector';
import Input from './FormItem/renderInput';
import List from './FormItem/listEditor';
import Color from './FormItem/color';
import Group from './FormItem/renderRange'
export interface FormRender {
  type: string,
  component: React.ComponentClass | React.FunctionComponent | Function
}

export const FormTypes: Array<FormRender> = [{
  type: 'select',
  component: EnumSelect,
}, {
  type: 'input',
  component: Input,
}, {
  type: 'list',
  component: List
}, {
  type: 'color',
  component: Color,
}, {
  type: 'group',
  component: Group
}]





export function getFormItemComponent(type: string): any {
  return _.find(FormTypes, { type })
}

export function registFormItemCompoennt(data: FormItem) {
  FormTypes.push(data)
}