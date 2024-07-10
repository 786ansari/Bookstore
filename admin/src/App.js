import logo from './logo.svg';
import './App.css';
import Routes  from './Routes/Routes';
import { ProfileProvider } from './component/ui/contextProvider';
import { useEffect } from 'react';
import { LogoutAfterTokenExpire } from './context/logout.js';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <>
    <LogoutAfterTokenExpire>
    <ProfileProvider>
      <Routes/>
    </ProfileProvider>
    </LogoutAfterTokenExpire>
    <Toaster/>
    </>
  );
}

export default App;



// import React from 'react';
// import { Form, Input, Button, Upload, message, Row, Col } from 'antd';
// import { InboxOutlined } from '@ant-design/icons';

// const { Dragger } = Upload;

// const App = () => {
//   const [form] = Form.useForm();

//   const normFile = (e) => {
//     if (Array.isArray(e)) {
//       return e;
//     }
//     return e && e.fileList;
//   };

//   const onFinish = (values) => {
//     console.log('Received values:', values);
//     message.success('Form submitted successfully!');
//   };

//   const fileValidation = (rule, value) => {
//     console.log("filefilefilefileiflei",value)
//     if (!value || value.length === 0) {
//       return Promise.reject(new Error('Please upload a file.'));
//     }
//     if (!value || value.length === 2) {
//       return Promise.reject(new Error('Please upload a single file.'));
//     }
//     const file = value[0].originFileObj;
//     const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//     const isLt2M = file.size / 1024 / 1024 < 2;
//     if (!isJpgOrPng) {
//       return Promise.reject(new Error('You can only upload JPG/PNG file!'));
//     }
//     if (!isLt2M) {
//       return Promise.reject(new Error('File must be smaller than 2MB!'));
//     }

//     return Promise.resolve();
//   };

//   return (
//     <Form
//       form={form}
//       name="validate_other"
//       onFinish={onFinish}
//       initialValues={{
//         remember: true,
//       }}
//       layout="vertical"
//     >
//       <Row>
//         <Col span={12}>
//       <Form.Item
//         name="name"
//         label="Name"
//         rules={[
//           {
//             required: true,
//             message: 'Please input your name!',
//           },
//         ]}
//       >
//         <Input placeholder="Enter your name" />
//       </Form.Item>
//       </Col>
      
//       <Col span={6} xl={10} sm={10}>
//       <Form.Item
//         name="file"
//         label="Upload File"
//         valuePropName="fileList"
//         getValueFromEvent={normFile}
//         rules={[
//           {
//             validator: fileValidation,
//           },
//         ]}
//       >
//         <Dragger name="file" multiple={false}>
//           <p className="ant-upload-drag-icon">
//             <InboxOutlined />
//           </p>
//           <p className="ant-upload-text">Click or drag file to this area to upload</p>
//           <p className="ant-upload-hint">Support for a single upload. JPG/PNG files only. Max size: 2MB</p>
//         </Dragger>
//       </Form.Item>
//       </Col>
//       </Row>
//       <Form.Item>
//         <Button type="primary" htmlType="submit">
//           Submit
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default App;












