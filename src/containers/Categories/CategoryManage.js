import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { categories as api } from '../../helpers/agent';
import FileUpload from '../../shared/UI/FileUpload';
import Input from '../../shared/UI/Input';

function CategoryManage({ history, match: { params } }) {
  const [categories, setCategories] = useState([]);

  const [categoryForm, setCategoryForm] = useState({
    categoryPicture: '',
    name: {
      en: '',
      ar: '',
    },
    parent: undefined,
  });

  const getCategory = async (id) => {
    const res = await api.getCategory(id);

    setCategoryForm({
      name: res.name,
      parent: res.parent ? res.parent._id : undefined,
      categoryPicture: res.categoryPicture,
    });
  };

  const getCategories = async ({ page = 1, limit = 1 }) => {
    const res = await api.getCategories({ page, limit });
    setCategories(res.docs);
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      if (params.categoryId) {
        await api.updateCategory(params.categoryId, categoryForm);
      } else {
        await api.createCategory(categoryForm);
      }

      history.push('/dashboard/categories');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories({});
    if (params.categoryId) {
      getCategory(params.categoryId);
    }
  }, [params.categoryId]);
  return (
    <Fragment>
      <Row className='justify-content-md-center'>
        <Col>
          <h5 className='mb-4'>Create new category</h5>
          <Form onSubmit={(e) => onSubmit(e)}>
            <Row>
              <Col>
                <FileUpload
                  label='Category picture'
                  previewAs={categoryForm.categoryPicture}
                  onUploadSuccess={(categoryPicture) =>
                    setCategoryForm({
                      ...categoryForm,
                      categoryPicture,
                    })
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Input
                  name='categoryNameEn'
                  type='text'
                  label='category name in English: *'
                  placeholder='category name'
                  required={true}
                  minLength={3}
                  value={categoryForm.name.en}
                  onChange={(e) =>
                    setCategoryForm({
                      ...categoryForm,
                      name: {
                        ar: categoryForm.name.ar,
                        en: e.target.value,
                      },
                    })
                  }
                />
              </Col>
              <Col>
                <Input
                  name='categoryNameAr'
                  type='text'
                  label='category name in Arabic: *'
                  placeholder='category name'
                  required={true}
                  minLength={3}
                  value={categoryForm.name.ar}
                  onChange={(e) =>
                    setCategoryForm({
                      ...categoryForm,
                      name: {
                        en: categoryForm.name.en,
                        ar: e.target.value,
                      },
                    })
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId='parentCategory'>
                  <Form.Label>Parent category:</Form.Label>
                  <Form.Control
                    as='select'
                    custom
                    placeholder='choose parent category'
                    value={categoryForm.parent}
                    onChange={(e) =>
                      setCategoryForm({
                        ...categoryForm,
                        parent: e.target.value,
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
            </Row>
            <Button variant='primary' type='submit'>
              {params.categoryId ? 'Update category' : 'Create category'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
}

export default CategoryManage;
