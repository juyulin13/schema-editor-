import * as React from 'react';
import { Select } from 'antd';
import { EnumSchema } from '../types';
import FormItem from 'antd/lib/form/FormItem';

const { Option } = Select;


export interface EnumSelectorProps {
  EnumOptions: Array<{
    key: string,
    desc: string
  }>
}


export class EnumSelector extends React.Component <EnumSelectorProps>  {

  render() {
    const {  EnumOptions, ...restProps } = this.props;
    return (
      <Select {...restProps} allowClear>
        {
          EnumOptions.map(({key, desc}) => (<Option key={key} value={key}>{desc}</Option>))
        }
      </Select>
    )
  }
}

interface EnumSelectorFormItemProps {
  prefix: string,
  form: any,
  schema: EnumSchema,
  initialValue: any,
  label?: string,
  style?: object
}


export default function EnumSelectorFormItem({
  prefix,
  form,
  schema,
  initialValue,
  label,
} : EnumSelectorFormItemProps){
  const EnumOptions = schema.enum.map((key, index) => ({
    key,
    desc: schema['x-enumNames'][index]
  }))
  const component = (
    form.getFieldDecorator(prefix, {
      initialValue
    })(<EnumSelector EnumOptions={EnumOptions} />)
  )
  const formProps :any = {}
  if(label) {
    formProps.label = label
  }
  return (
    <FormItem {...formProps}>
      {
        component
      }
    </FormItem>
  )
}
