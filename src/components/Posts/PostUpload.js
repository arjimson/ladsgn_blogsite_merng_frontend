import React, { useCallback } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useDropzone } from 'react-dropzone';
import { filesQuery } from './Files';

function PostUpload(props) {

    const [uploadFile] = useMutation(UPLOAD_FILE)

    // const onDrop = useCallback(
    //     ([file]) => {
    //         uploadFile({ variable: { file } })
    //     },
    //     [uploadFile]
    // );

    const onChange = ({
        target: {
          validity,
          files: [file]
        }
      }) => validity.valid && uploadFile({ variables: { file } })

    // const { getRootProps, getInputProps, isDragActive } = useDropzone()

    // console.log(isDragActive)

    return (
        <input type="file" onChange={onChange} />
        // <div {...getRootProps()}>
        //     <input {...getInputProps()} onChange={onChange}/>
        //     {isDragActive ? (
        //         <p>Drop the file here..</p>
        //     ) : (
        //             <p>Drag 'n' drop file here, or click to select file..</p>
        //         )}
        // </div>

    )
}

const UPLOAD_FILE = gql`
mutation UploadFile($file: Upload!){
    uploadFile(file: $file)
}`;
export default PostUpload;