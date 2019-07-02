export interface FormItemProps {
    prefix: string,
    schema: Schema,  
    style?: any,
    [propsName: string]: any
  }
  
  export interface PropertiesContitionalIf {
    left: string,
    contition ?: 'gte' | 'gt' | 'eq' | 'lt' | 'lte' | 'includes' | 'pattern',
    right?: string
  }
  export interface ContitionalProperties {
    If: PropertiesContitionalIf,
    Then: Schema | ContitionalProperties,
    Else: Schema | ContitionalProperties,
  }
  export interface Properties {
    [propsName: string]: ContitionalProperties | any
  }
  
  export interface Schema {
    type: 'array' | 'object' | 'string',
    format: string,
    
    properties: Properties,
    
    If? : string,
    [propsName: string]: any
  }
  

  export interface EnumSchema extends Schema {
    enum : Array<any>,
    'x-enumNames': Array<any>
  }