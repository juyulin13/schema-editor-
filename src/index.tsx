/**
 * @class ExampleComponent
 */

import * as React from 'react'
import styles from './styles.css'
import render from './render';

import Components from './components'

export type Props = { text: string }

interface SchemaNode {
  type: string
}
interface SchemaNodeList extends Array<SchemaNode> {

}
interface ChildProps {
  [key: string] : any
}

interface ChildPropsList extends Array<ChildProps>{}

function renderChild(schema : SchemaNode, props: ChildProps) {
  const { type } = schema;
  return React.createElement(Components[type], schema)
}

function renderChildren(schemaArray: SchemaNodeList | SchemaNode, propsList: ChildPropsList) {
  if(!Array.isArray(schemaArray)) {
    schemaArray = [schemaArray];
    propsList = [propsList]
  }
  return schemaArray.map((schema, index) => renderChild(schema, propsList[index]))

}




interface RootProps {
  schema: SchemaNode | SchemaNodeList,
}

class Root extends React.Component<RootProps> {
  
  render() {
    const { schema } = this.props;
    return <>
      {renderChildren(schema, {})}
    </>
    
  }
}

class SchemaNodeRender extends React.Component {
  render() {
    const { schema } = this.props
  }
}