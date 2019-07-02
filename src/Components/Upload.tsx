import * as React from 'react';
import { Upload as AntdUpload, Button, message } from 'antd';
import { UploadProps as AntdUploadProps } from 'antd/es/upload'
import { isProduction } from '../utils/utils'


export interface file {
  uid: string,
  status: 'uploading' | 'done' | 'error' | 'removed',
  response?: string,
  linkProps?: string,
  name?: string,
  url?: string,
}
const prefix = `https://${ isProduction() ? '' : 't-'}basetool.ccrgt.com/fileupload`
const PATH_MAP = {
  'image': '/picUp?path=images',
  'video': '/videoUp',
  'common': '/picUp'
}


const MIME_TYPE = {
  'image': ['jpeg', 'png', 'svg+xml'],
  'video': ['mp4'],
  'text': ['plain', 'csv', 'html']
}


function checkMimeType(fileType:string, acceptFileTypes: Array<string>) {
  const [type, subType] = fileType.split('/');
  if(!acceptFileTypes || acceptFileTypes.length === 0) return true;

  return acceptFileTypes.some((acceptFileType: string) => {
    const [acceptType, acceptsubType] = acceptFileType.split('/')
    if(type !== acceptType ) return false;
    if(acceptsubType === '*') {
      return MIME_TYPE[acceptType].includes(subType)
    }else {
      return acceptType === subType
    }

  })
  
}
interface uploadValidation {
  maxSize? : number,
  minSize? : number,
  accept?: string
}

function beforeUpload(file: any, {
  maxSize,
  minSize,
  accept
}: uploadValidation) : boolean {
  if(accept && !checkMimeType(file.type, accept.split(','))) {
    return false
  }
  const fileSize = file.size / 1024;
  if(fileSize > (maxSize  || Number.POSITIVE_INFINITY) || fileSize < (minSize || 0)) {
    return false
  }
  return true
}

export interface UploadProps extends AntdUploadProps {
  maxSize?: number,
  minSize? : number,
  resourceType: 'image' | 'video' | 'common'
}

export default class Upload extends React.Component <UploadProps>{
  state = {
    fileList: null
  }
  
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if(typeof nextProps.value !== 'undefined') {
  //     const { format = 'string' } = nextProps
      
  //     return {
  //       fileList: []
  //     }
  //   }
  //   return null;
  // }

  onChange  = (data: any) => {
    const { onChange } = this.props
    const { file, fileList } = data
    this.setState({
      fileList
    })
    if (file.status === 'done') {
      const { response } = file
      if (response.code === 0) {
        onChange && onChange(response.data.fileUrl);
        message.success('上传成功');
      } else {
        message.error(response.errmsg);
      }
    }
  }

  get action() {
    const { resourceType } = this.props
    return prefix + PATH_MAP[resourceType]
  }
   
  render() {
    const { children, accept, maxSize, minSize,...restProps } = this.props;
    const { fileList } = this.state
    return (
      <AntdUpload
        listType="picture"
        fileList={fileList || []}
        beforeUpload={(file) => beforeUpload(file, {
          accept,
          maxSize,
          minSize
        })}
        {...restProps}
        onChange={this.onChange}
        action={this.action}
      >
        { children || <Button>上传</Button>}
      </AntdUpload>
    )

  }
}