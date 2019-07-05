import * as React from 'react';
import { Select } from 'antd';
const { Option } = Select;

export interface EnumSelectorProps {
  options: Array<{
    key: string,
    desc: string
  } | string> 
}


export default class EnumSelector extends React.Component <EnumSelectorProps>  {

  render() {
    const {  options, ...restProps } = this.props;
    return (
      <Select allowClear {...restProps}>
        {
          options.map(option => {
            if(typeof option === 'string') {
              option = {
                key: option,
                desc: option,
              }
            }
            const { key, desc } = option;
            <Option key={key}>{desc}</Option>
          })
        }
      </Select>
    )
  }
}
