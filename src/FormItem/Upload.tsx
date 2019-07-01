import React from 'react';
import { Upload as AntdUpload, Button } from 'antd';
import { UploadProps as AntdUploadProps } from 'antd/es/upload'
import { isProduction } from '../utils/utils'
import * as _ from 'lodash';


export interface file {
  uid: string,
  status: 'uploading' | 'done' | 'error' | 'removed',
  response?: string,
  linkProps?: string,
  name?: string,
  url?: string
}
const prefix = `https://${ isProduction() ? '' : 't-'}basetool.ccrgt.com/fileupload`
const PATH_MAP = {
  'image': '/picUp?path=images',
  'video': '/videoUp',
  'common': '/picUp'
}

export interface UploadProps extends AntdUploadProps {
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


  get action() {
    const { resourceType } = this.props
    return prefix + PATH_MAP[resourceType]
  }
   
  render() {
    const { children, ...restProps } = this.props;
    return (
      <AntdUpload
        action={this.action}
        {...restProps}
      >
        { children && <Button>上传</Button>}
      </AntdUpload>
    )

  }
}