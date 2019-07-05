/**
 * @class ExampleComponent
 */

import * as React from 'react'
import styles from './styles.css'
import render from './render';

export type Props = { text: string }

const RootProvider = React.createContext({})
interface SchemaNode {
  type: string
}

class Root extends React.Component {
  
  render() {
    
  }
}