import * as React from 'react';
import { Form } from 'antd';
import Upload from '../Components/Upload'

const FormItem = Form.Item;


export default ({
  schema,
  prefix,
  initialValue,
  form,
  formItemLayout = {},
}: any) => {
  const { options } = schema;
  return (
    <FormItem label={schema.title} key={prefix} {...formItemLayout}>
      {
        form.getFieldDecorator(prefix, {
          initialValue
        })(<Upload {...options} />)
      }
    </FormItem>
  )
}
