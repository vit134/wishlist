import React from 'react';

import { Upload, message, Button, Icon} from 'antd';

const localProps = {
  name: 'file',
  action: '//jsonplaceholder.typicode.com/posts/',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export default class ImageUpload extends React.Component {
  render() {
    return (
      <Upload {...this.props} {...localProps}>
        <Button>
          <Icon type="upload" /> Click to Upload
      </Button>
      </Upload>
    )
  }
}