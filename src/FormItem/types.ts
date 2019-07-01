export interface options {
  initialValue?: any,
  valuePropName?: string,
  rules?: Array<any>
}

export interface FormItemProps {
  getFieldDecorator: Function,
  formItemLayout?: Object,
  required?: boolean,
  options?: options
  prefix: string,
  label?: string
}


export const defaultFormItemProps = {
  formItemLayout: {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  },
  options: []
}