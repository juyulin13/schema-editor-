import * as React from 'react';
import { CompactPicker } from 'react-color';
import { Form } from 'antd';
import * as validator from 'validator';
import { defaultFormItemProps, FormItemProps } from './types';

const FormItem = Form.Item;




const defaultColorFormItemProps = {
  ...defaultFormItemProps,
  valuePropName: 'color',
    getValueFromEvent({ hex } : { hex: string}) {
      return hex;
    },
    rules: [{
      validator(_rule: any, value: string, callback: Function) {
        if(!value) return callback()
        if(!validator.isHexColor(value.toUpperCase()) && value !== 'inherit')  return callback('请输入正确的色值')
        return callback()
      }
    }]
}

export function ColorFormItem (_props: FormItemProps){
  const props = {
      ...defaultColorFormItemProps, 
      ..._props,
  };
  const { getFieldDecorator, formItemLayout, options, prefix, label } = props;
  return (
    <FormItem {...formItemLayout} label={label}>
      {
        getFieldDecorator(prefix, options)(<CompactPicker />)
      }
    </FormItem>
  )
}
export default function renderColor ({
  form,
  prefix,
  title
}: any) {
  return (
    <ColorFormItem
      label={title}
      getFieldDecorator={form.getFieldDecorator}
      prefix={prefix}
    />
  )
}