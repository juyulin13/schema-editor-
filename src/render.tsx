


interface FormItemProps {
  prefix: string,
  schema: Schema,  
  [propsName: string]: any
}

interface PropertiesContitionalIf {
  left: string,
  contition ?: 'gte' | 'gt' | 'eq' | 'lt' | 'lte' | 'includes' | 'pattern',
  right?: string
}
interface ContitionalProperties {
  If: PropertiesContitionalIf,
  Then: Schema | ContitionalProperties,
  Else: Schema | ContitionalProperties,
}
interface Properties {
  [propsName: string]: ContitionalProperties | any
}

interface Schema {
  type: 'array' | 'object' | 'string',
  format?: 'Input' | 'Table',
  enum? : Array<any>,
  properties: Properties,
  'x-enumNames'? : Array<any>,
  [propsName: string]: any
}



export const renderItem = ({
  prefix, 
  schema,
  form,
  ...restProps
} : FormItemProps) : any => {
  const { type, format, properties } = schema;
  if(type === 'object') {
    return Object.keys(properties).map(key => {
      const property = properties[key];
      renderItem({
        prefix: [prefix, key].join('.'),
        schema: property.If ? getContitionalSchema(property, form.getFieldValue) : property,
        ...restProps
      })
    })
  } 
  

}

function getContitionalSchema(
  propertity: ContitionalProperties,
  getFieldValue: Function,
): Schema {
  const contitionResult = getContitionResult(getFieldValue, propertity.If);
  const curPropertity = contitionResult ? propertity.Then : propertity.Else;
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
  }
}