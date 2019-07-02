import * as React from 'react';
import { Form } from 'antd';

import renderItem from '../render';

const FormItem = Form.Item;


export default ({
  schema,
  prefix,
  form,
  range,
  formItemLayout = {},
}: any) => {
  return (
    <FormItem label={schema.title} key={prefix} {...formItemLayout}>
      {
        renderItem({
          schema: range[0],
          form,
          prefix: prefix + '.' + range[0].key,
          style:{ display: 'inline-block', width: 'calc(50% - 12px)' }
        })
      }
      ~
      {
       renderItem({
         form,
         schema: range[1],
         prefix: prefix + '.' + range[1].key,
         style:{ display: 'inline-block', width: 'calc(50% - 12px)' }
       })
      }
    </FormItem>
  )
}
