import * as _ from 'lodash';

export function getSchemaDefaultValue(schema: any) {

    const { type } = schema
    if(type === 'object') {
      return getObjectSchemaDefaultValue(schema)
    }
    if(type === 'array') {
      return getArraySchemaDefaultValue(schema)
    }
    return schema.default
  }

  export function getObjectSchemaDefaultValue(schema : any) {
    const result = {}
    const { properties, definitions } = schema
    if(!properties) {
     return result
    }
    Object.keys(properties).forEach(key => {
      const property = properties[key]
      result[key] = getSchemaDefaultValue({
        ...property,
        definitions
      })
    })
    return result
  }
  
  export function getArraySchemaDefaultValue(schema : any) {
    const result = []
    const { items, defaultLength, definitions } = schema
    if(!defaultLength) return []
    const properties = _.get(schema, items.$ref.split('.'));
    const defaultItem = getObjectSchemaDefaultValue({ properties, definitions })
    for(let i=0; i<defaultLength; i++) {
      result.push(defaultItem)
    }
    return result
  }