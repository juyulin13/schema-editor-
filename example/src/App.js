import React, { Component } from 'react'
import { Form } from 'antd';
import { renderItem } from 'fe-schema-editor'
import 'antd/dist/antd.css';

const schema = {
  type: 'object',
  properties: {
    "test1": {
      type: 'array',
      items: {
        type: "object",
        properties: {
          "aa": {
            type: 'string',
            title: "322323",
            format: 'text'
          }
        }
      },
      format: 'list'
    },
    "test": {
      type: "string",
      title: "ddd",
      format: "color"
    },
    "aa": {
      type: "string",
      title: "图片",
      format: "resource",
      desc: "2323",
      placeholder: "请上传最大44k图片",
      options: {
        maxFileSize: '2332kb',
        resourceType: 'image',
        
      }
    }
  }
}

class SchemaForm extends React.Component {
  render() {
    const { form } = this.props
    const prefix = '$root'
    console.log(renderItem({
      form,
      prefix,
      schema
    }))
    return <div>
      <Form>
        {renderItem({
          form,
          prefix,
          schema
        })}
      </Form>
      
    </div>
  }
}

const WrapperSchemaForm = Form.create()(SchemaForm)

export default class App extends Component {
  render () {
    return (
      <WrapperSchemaForm />
    )
  }
}



