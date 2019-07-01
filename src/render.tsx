import renderInput from './FormItem/renderInput';
import renderSelect from './FormItem/enumSelector';
import renderColor from './FormItem/color';
import { FormItemProps, PropertiesContitionalIf, ContitionalProperties, Schema, EnumSchema } from './types';
import renderListEditor from './FormItem/listEditor';
// import { FormTypes } from './formTypes';


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

  if(format === 'text') {
    return renderInput({
      prefix,
      schema,
      form,
      title: schema.title,
      ...restProps
    })
  }
  if(format === 'enum') {
    return renderSelect({
      prefix,
      schema: schema as EnumSchema,
      initialValue: '',
      form,
      title: schema.title,
      ...restProps
    })
  }
  if(format === 'color') {
    return renderColor({
      title: schema.title,
      form,
      prefix
    })
  }
  if(format === 'list') {
    return renderListEditor({
      title: schema.title,
      form,
      schema,
      prefix
    })
  }
  return null

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

