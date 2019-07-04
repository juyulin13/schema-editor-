import * as React from 'react';
import { Form } from 'antd';

import renderItem from '../render';

const FormItem = Form.Item;


export default ({
  form,
  range,
}: any) => {
  return (
    <>
      {[
        renderItem({form, ...range[0], style: { display: 'inline-block', width: 'calc(50% - 12px)' }}),
        '~',
        renderItem({form, ...range[1], style: { display: 'inline-block', width: 'calc(50% - 12px)' }}),
      ]}
    </>
  )
}
