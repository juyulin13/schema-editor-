import * as React from 'react';
import { Input, Form } from 'antd';

const FormItem = Form.Item;

export default ({
  schema,
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
    <FormItem label={schema.title} key={prefix} {...formItemLayout} {...restProps}>
      {
       component
      }
    </FormItem>
  )
}
