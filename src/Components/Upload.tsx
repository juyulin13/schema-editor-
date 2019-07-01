import React from 'react';
import { Upload as AntdUpload, message } from 'antd';
import { isProduction } from '../utils/utils'

const PATH_MAP = {
  'image': '/picUp?path=images',
  'video': '/videoUp',
  'common': '/picUp'
}
export interface UploadProps {
  onChange: Function,
  children?: any,
  options?: object,
  onSuccess?: Function,
  onError?: Function,
  type: string
}


function SingleUpload(props: UploadProps) {
  const { onChange, children, options, onSuccess, onError, type } = props;
  const prefix = `https://${ isProduction() ? '' : 't-'}basetool.ccrgt.com/fileupload`
  const path =  PATH_MAP[type]
  const uploadProps = {
    action: prefix + path,
    onChange: (data: any) => {
      const { file } = data;
      onChange && onChange(data);
      if (file.status === 'done') {
        const { code, errmsg = '上传失败' } = file.response;
        if (code === 0) {
          onSuccess && onSuccess(file);
          message.success('上传成功');
        } else {
          onError && onError(errmsg);
          message.error(errmsg);
        }
      }
    },
    ...options,
  };
  return <AntdUpload {...uploadProps}>{children}</AntdUpload>;
}
export default SingleUpload;
