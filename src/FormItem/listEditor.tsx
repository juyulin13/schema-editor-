import * as React from 'react';
import { Form, Button, Table, Modal } from 'antd';
import * as _ from 'lodash';
import renderObjectFormItem from '../render';
import { getSchemaDefaultValue } from '../utils';
import { v4 as uuid } from 'uuid';
import { Schema } from '../types';

class EditForm extends React.Component<any> {
  componentDidMount() {
    const { initialValue, form } = this.props;
    form.setFieldsValue(initialValue || {})
  }

  componentDidUpdate(preProps: any) {
    const { initialValue, form } = this.props;
    if(preProps.initialValue !== initialValue ) {
      form.setFieldsValue(initialValue)
    }
  }

  render() {
    const { renderForm, form } = this.props;
    return (
      <>
        {renderForm({ ...this.props,form })}
      </>
    )
  }
}
const WrapperEditForm : any = Form.create()(EditForm)

interface ModalPayload {
  data?: any,
  index?: number
}

function arrayModify(originData: Array<any>, type: string, payload: ModalPayload) {
  if(type === 'add') {
    return [...originData, payload.data]
  }
  if(type === 'update') {
    return originData.map((item, index) => payload.index === index ? payload.data : item) 
  }
  if(type === 'delete') {
    return originData.filter((_, index) => index !== payload.index)
  }
  return [...originData]
}

const OPERATORS = {
  'add': '新增',
  'update': '编辑'
}

interface ListEditorProps {
  form: any,
  schema: any,
  onChange: Function,
  renderForm: Function
}

interface ListEditorState {
  data: Array<any>,
  modalVisible: boolean,
  modalType: string,
  curIndex: number
}

class ListEditor extends React.Component<ListEditorProps, ListEditorState> {
  state = {
    data: [],
    modalVisible: false,
    modalType:  '',
    curIndex: -1

  }

  modalForm: any
  
  static getDerivedStateFromProps(props: ListEditorProps) {
    const { form, schema } = props;
    const data = form.getFieldValue(schema.id) || []
    return {
      data
    }
  }




  get Columns() {
    return [{
      key: 'title',
      title: '标题',
      dataIndex: 'title'
    }, {
      key: '$$OPERATOR',
      title: '操作',
      render: (_text:string, _record: Object, index: number) => this.renderOperation(index)
    }]
  }



  renderOperation = (index: number) => {
    return (
      <>
        <a href="javascript:;" onClick={() => this.onUpdate(index)}>编辑</a>
        <a href="javascript:;" onClick={() => this.onDelete(index)} style={{marginLeft: 10}}>删除</a>
      </>
    )
  }
  
  onUpdate = (index:number): void => {
    this.setState({
      modalVisible: true,
      modalType: 'update',
      curIndex: index
    })
  }

  onDelete = (index: number) => {
    this.onChange('delete', {
      index
    })
  }

  renderListInfo = () => {
    const { data } = this.state;
    return (
      <Table
        size="small"
        rowKey="$$id"
        columns={this.Columns}
        dataSource={data.map((item: Object, index: number) => ({...item, '$$id': index}))}
        pagination={false}
      />
    )
  }

  closeModal = () => {
    this.setState({
      modalType: '',
      modalVisible: false,
      curIndex: -1
    })
  }  

  get itemSchema(): Schema {
    const { schema } = this.props;
    let {properties} = schema.items
    return {
      title: schema.title,
      type: 'object',
      format: 'object',
      properties
    }
  }

  renderForm = (data: any) => {
    const schema: Schema = this.itemSchema
    return (
      <Form>
        {renderObjectFormItem({
          ...this.props,
          prefix: '',
          schema,
          form: data.form
        })}
      </Form>
    )
  }
  
  onChange = (type: string, paylpad: Object) => {
    const { data } = this.state;
    const { onChange } = this.props;
    onChange(arrayModify(data, type, paylpad))
  }

  onModalOk = () => {
    this.modalForm.props.form.validateFields((error: any, data: Object) => {
      if(error) return;
      const { modalType, curIndex } = this.state;
      if(!modalType) return;
      this.onChange(modalType, {
        id: uuid(),
        index: curIndex,
        data
      })
      this.closeModal()
    });
  }
  
  render() {
    const { modalVisible, modalType, curIndex, data } = this.state;
    return (
      <>
        <Button onClick={() => this.setState({ modalVisible: true, modalType: 'add', curIndex: -1})}>新增</Button>
        {this.renderListInfo()}
        {
          modalType && (
            <Modal
              title={OPERATORS[modalType]}
              visible={modalVisible}
              onOk={this.onModalOk}
              onCancel={this.closeModal}
            >
              {
                (curIndex > -1) && (
                  <WrapperEditForm
                    initialValue={data[curIndex] || getSchemaDefaultValue(this.itemSchema)}
                    wrappedComponentRef={(form: any) => this.modalForm = form}
                    renderForm={this.renderForm}
                  />
                )
              }
              
            </Modal>
          )
        }
        
      </>

    )
  }
}






export default ListEditor;