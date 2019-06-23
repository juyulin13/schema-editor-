import * as React from 'react';
import { Input, Form } from 'antd';

const FormItem = Form.Item;

export default ({
  schema,
  prefix,
  initialValue,
  form,
  formItemLayout = {},
}: any) => {
  return (
    <FormItem label={schema.title} key={prefix} {...formItemLayout}>
      {
        form.getFieldDecorator(prefix, {
          initialValue
        })(<Input />)
      }
    </FormItem>
  )
}
