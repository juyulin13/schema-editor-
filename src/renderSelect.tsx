import * as React from 'react';
import { Select, Form } from 'antd';

const FormItem = Form.Item;

export default ({
  prefix,
  form,
  initValue
}: any) => (
  <FormItem>
    {
      form.getFieldsValue(prefix, {
        initValue
      })(Input)
    }
  </FormItem>
)