import * as React from 'react';
import { Input, Form } from 'antd';

const FormItem = Form.Item;

export default ({
  label,
  prefix,
  initialValue,
  form,
  formItemLayout = {},
  ...restProps
}: any) => {
  const component = (
    form.getFieldDecorator(prefix, {
      initialValue
    })(<Input />)
  )
  return (
    <FormItem label={label} key={prefix} {...formItemLayout} {...restProps}>
      {
       component
      }
    </FormItem>
  )
}
