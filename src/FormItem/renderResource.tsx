import * as React from 'react';
import { Form } from 'antd';
import Upload from '../Components/Upload'

const FormItem = Form.Item;


export default ({
  schema,
  form,
}: any) => {
  const { name, title, maxSize, minSize, resourceType } = schema;
  return (
    <FormItem label={title} key={name}>
      {
        form.getFieldDecorator(name, {
        })(<Upload resourceType ={resourceType} maxSize={maxSize} minSize={minSize} />)
      }
    </FormItem>
  )
}
