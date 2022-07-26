
import React, { useState } from 'react';
import styled from "styled-components";
import useSWR from 'swr'
import { upload } from '../../../api/images';
import { getAll } from '../../../api/product';
import { Typography, Col, Row, Button, Checkbox, Form, Input, InputNumber, Select, message } from 'antd'
import UploadImage from '../../../components/Product/UploadImage';


const { TextArea } = Input

const { Option } = Select;
const EditProduct: React.FC = () => {
  const [previewImage, setPreviewImage] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const handleChangeImage = (event: any) => {
    const file = event.target.files[0]
    console.log(file);

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewImage(reader.result)
    }
  }

  const uploadImage = async (base64Image: string) => {
    try {
      const res = await upload(base64Image)
      const data = res.data
      setImageUrl(data.url)
    } catch (err) {
      console.log(err);
      message.error(JSON.stringify(err.message))
    }
  }

  const fetcher = (rest) => {
    console.log(rest)
  }

  const { data, error } = useSWR('/products', fetcher)
  console.log(data)
  return (
    <>
    <Breadcrumb>
				<Typography.Title level={2} style={{ margin: 0 }}>
					Sửa thông tin sản phẩm
				</Typography.Title>
			</Breadcrumb>
     
   
      <Col span={10}>
					<UploadImage/>
					{/* <UploadTest/> */}
				</Col>
      <Form.Item
        name="name"
        labelCol={{ span: 24 }}
        label="Tên sản phẩm"
        rules={[{ required: true, message: 'Tên sản phẩm không được trống' }]}
      >
        <Input size="large" />
      </Form.Item>
      
      <Row gutter={16}>
							<Col span={12}>
								<Form.Item
									name="originalPrice"
									label="Giá gốc"
									labelCol={{ span: 24 }}
									rules={[{ required: true, message: 'Gía sản phẩm' }]}
								>
									<InputNumber style={{ width: '100%' }} size="large" />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name="saleOffPrice"
									label="Giá giảm"
									labelCol={{ span: 24 }}
									rules={[{ required: true, message: 'Gía sản phẩm' }]}
								>
									<InputNumber style={{ width: '100%' }} size="large" />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									label="Phân loại"
									name="categories"
									rules={[{ required: true }]}
								>
									<Select style={{ width: '100%' }} size="large">
										<Option value="phone">Điện thoại</Option>
										<Option value="laptop">Laptop</Option>
										<Option value="accessories" disabled>
											Phụ kiện
										</Option>
										<Option value="tablet">Máy tính bảng</Option>
									</Select>
								</Form.Item>
							</Col>
						</Row>
            <Form.Item
							name="feature"
							labelCol={{ span: 24 }}
							label="Đặc điểm nổi bật"
							rules={[{ required: true, message: 'Đặc điểm sản phẩm' }]}
						>
							<TextArea name="feature" />
						</Form.Item>
						<Form.Item
							name="description"
							labelCol={{ span: 24 }}
							label="Mô tả sản phẩm"
							rules={[{ required: true, message: 'Mô tả sản phẩm' }]}
						>
							<TextArea name="description" />
						</Form.Item>
            <Form.Item>
							<Button type="primary" htmlType="submit">
								Cập nhật sản phẩm
							</Button>
						</Form.Item>
    </>
  );
};
const Breadcrumb = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`

export default EditProduct;