import * as React from 'react';
import { Col } from 'antd';
import renderInput from './FormItem/renderInput';
import renderSelect from './FormItem/enumSelector';
import renderColor from './FormItem/color';
import { FormItemProps, PropertiesContitionalIf, ContitionalProperties, Schema, EnumSchema } from './types';
import renderListEditor from './FormItem/listEditor';
import renderResource from './FormItem/renderResource';
import renderRange from './FormItem/renderRange'

function renderItem({
  prefix, 
  schema,
  form,
  ...restProps
} : FormItemProps) : any {
  const { type, properties, format } = schema;
  if(type === 'object') {
    return Object.keys(properties).map(key => {
      const property = properties[key];
      return renderItem({
        prefix: [prefix, key].join('.'),
        schema: property.If ? getContitionalSchema(property, form.getFieldValue) : property,
        form,
        ...restProps
      })
    })
  }
  return renderBaseItem({
    format,
    schema,
    form,
    title: schema.title,
    prefix,
    formItemLayout: schema.formItemLayout,
    ...restProps
  })
  

}


function renderBaseItem({
  format,
  schema,
  form,
  title,
  prefix,
  ...restProps
}: any) {

  var formItem;
  if(format === 'text') {
    formItem =  renderInput({
      prefix,
      schema,
      form,
      title: schema.title,
      ...restProps
    })
  }
  if(format === 'enum') {
    formItem =  renderSelect({
      prefix,
      schema: schema as EnumSchema,
      initialValue: '',
      form,
      title: schema.title,
      ...restProps
    })
  }
  if(format === 'color') {
    formItem = renderColor({
      title: schema.title,
      form,
      prefix
    })
  }
  if(format === 'list') {
    formItem = renderListEditor({
      title: schema.title,
      form,
      schema,
      prefix
    })
  }

  if(format === 'resource') {
    formItem = renderResource({
      title: schema.title,
      form,
      schema,
      prefix
    })
  }
  if(format === 'range') {
    formItem = renderRange({
      title: schema.title,
      form,
      schema,
      prefix,
      range: schema.range
    })
  }
  if(schema.col) {
    formItem = <Col {...schema.col}>
      {formItem}
    </Col>
  }
  return formItem
}

function getContitionalSchema(
  propertity: ContitionalProperties,
  getFieldValue: Function,
): Schema {
  const contitionResult = getContitionResult(getFieldValue, propertity.If);
  const curPropertity  = contitionResult ? propertity.Then : propertity.Else;
  if(curPropertity.If) {
    return getContitionalSchema(curPropertity as ContitionalProperties, getFieldValue)
  }else {
    return curPropertity as Schema
  }
  
}

function getContitionResult(getValue: Function, contitional: PropertiesContitionalIf) {
  const { left, contition, right } = contitional;
  const leftValue = getValue(left);
  if(!contition || !right) {
    return !!leftValue
  }
  switch(contition) {
    case 'eq':
      return leftValue === right;
    case 'gt':
      return leftValue > right;
    case 'gte':
      return leftValue >= right;
    case 'lt':
      return leftValue < right;
    case 'lte':
      return leftValue <= right;
    default:
      return false;
  }
}



export default renderItem;

