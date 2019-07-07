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
export default {
  'select': EnumSelect,
  'input': Input,
  'list': List,
  'color': Color,
  'group': Group
}




// export function getFormItemComponent(type: string): any {
//   return _.find(FormTypes, { type })
// }

// export function registFormItemCompoennt(data: FormItem) {
//   FormTypes.push(data)
// }