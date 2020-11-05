import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { media } from '../../helpers/agent';

function FileUpload({ label, previewAs, onUploadSuccess, ...rest }) {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const uploadMedia = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const res = await media.upload(formData);
    onUploadSuccess(res[0]);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    uploadMedia(selectedFile);

    return () => URL.revokeObjectURL(objectUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  return (
    <Form.Group className='d-flex align-items-center'>
      <Form.File id='myStoreFileUpload' label={label}>
        <Form.File.Label>{label}</Form.File.Label>
        <Form.File.Input onChange={onSelectFile} {...rest} />
      </Form.File>
      {(previewAs || selectedFile) && (
        <div
          className='image-upload-preview'
          style={{ backgroundImage: `url(${previewAs || preview})` }}
        ></div>
      )}
    </Form.Group>
  );
}
export default FileUpload;
