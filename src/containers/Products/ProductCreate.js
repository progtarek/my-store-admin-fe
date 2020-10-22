import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import * as api from '../../helpers/agent';
import Textarea from '../../shared/UI/Textarea';
import Input from '../../shared/UI/Input';

function ProductCreate({ history }) {
  const [categories, setCategories] = useState([]);
  const [productForm, setProductForm] = useState({
    name: {
      en: '',
      ar: '',
    },
    description: {
      en: '',
      ar: '',
    },
    category: '',
    price: 1,
  });

  const getCategories = async ({ page = 1, limit = 1 }) => {
    const res = await api.categories.getCategories({ page, limit });
    setCategories(res.docs);
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const result = await api.products.createProduct(productForm);
      console.log(result);
      history.push('/dashboard/products');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories({});
  }, []);
  return (
    <Fragment>
      <Row className='justify-content-md-center'>
        <Col>
          <h5 className='mb-4'>Create new product</h5>
          <Form onSubmit={(e) => onSubmit(e)}>
            <Row>
              <Col>
                <Input
                  name='productNameEn'
                  type='text'
                  label='Product name in English: *'
                  placeholder='product name'
                  required={true}
                  minLength={3}
                  value={productForm.name.en}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      name: {
                        ar: productForm.name.ar,
                        en: e.target.value,
                      },
                    })
                  }
                />
              </Col>
              <Col>
                <Input
                  name='productNameAr'
                  type='text'
                  label='Product name in Arabic: *'
                  placeholder='product name'
                  required={true}
                  minLength={3}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      name: {
                        en: productForm.name.en,
                        ar: e.target.value,
                      },
                    })
                  }
                />
              </Col>
            </Row>

            {/** PRODUCT DESCRIPTION */}
            <Row>
              <Col>
                <Textarea
                  name='productDescriptionEn'
                  type='textarea'
                  label='Product description in english: *'
                  placeholder='product description'
                  minLength={3}
                  rows={3}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      description: {
                        ar: productForm.description.ar,
                        en: e.target.value,
                      },
                    })
                  }
                />
              </Col>
              <Col>
                <Textarea
                  name='productDescriptionAr'
                  type='textarea'
                  label='Product description in arabic: *'
                  placeholder='product description'
                  minLength={3}
                  rows={3}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      description: {
                        en: productForm.description.en,
                        ar: e.target.value,
                      },
                    })
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId='productCategory'>
                  <Form.Label>Product category: *</Form.Label>
                  <Form.Control
                    as='select'
                    custom
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        category: e.target.value,
                      })
                    }
                  >
                    {categories && categories.length
                      ? categories.map((category, index) => (
                          <option key={index} value={category._id}>
                            {category.name.en}
                          </option>
                        ))
                      : null}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Input
                  name='price'
                  type='number'
                  label='Price: *'
                  placeholder='product price'
                  required={true}
                  min={1}
                />
              </Col>
            </Row>

            <Button variant='primary' type='submit'>
              Create product
            </Button>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
}

export default ProductCreate;
