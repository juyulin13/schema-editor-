import * as React from 'react';
import { Select, Input, Form } from 'antd';

const FormItem = Form.Item;

const { Option } = Select;


interface FormItemChildProps {
  value: any,
  onChange: Function
}

export default function LengthUnit(props: FormItemChildProps) {
  const {
    value,
    onChange
  } = props
  const [data, setData] = React.useState({
    number: "",
    unit: 'px'
  })
  React.useEffect(() => {
    const [_value, number, unit] = (value || "").match(/([0-9]+)(px|%)/) || ["", "", data.unit]
    setData({
      number,
      unit
    }) 
  }, [value])
  const Units = (
    <Select defaultValue={data.unit} style={{ width: 80 }} onChange={() => onChange(null)}>
      <Option value="px">px</Option>
      <Option value="%">%</Option>
    </Select>
  );
  return (
    <Input addonAfter={Units} value={data.number} onChange={({target}) => onChange(target.value ? `${target.value}${data.unit}` : '')} />
  )

}

export function renderLengthUnit({
  schema,
  form,
  prefix,
  initialValue,
  formItemLayout
}: any) {
  return (
    <FormItem label={schema.title} key={prefix} {...formItemLayout}>
      {
        form.getFieldDecorator(prefix, {
          initialValue
        })(React.createElement(LengthUnit))
      }
    </FormItem>
  )
}