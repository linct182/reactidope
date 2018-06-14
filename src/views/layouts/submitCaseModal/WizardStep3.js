import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import styled from 'react-emotion';
import { connect } from 'react-redux';

import { actionSetComment, actionSetUploadFiles, actionDeleteFileUpload } from '../../../actionReducers/Cases';

import { Container, Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';

import icon_upload from '../../../assets/icons/innerPage_icn_upload.svg';
import iconRemove from '../../../assets/icons/remove.svg';
import icon_pdf from '../../../assets/icons/innerPage_icn_pdf.svg';
import sizeConverter from '../../../utils/bytesConverter';
import { dateTimeConverter } from '../../../utils/datetime';

const SubContainer = styled('div')({
  margin: '20px 10px'
});

const DragAndDropContainer = styled('div')({
  border: 'dashed 1px #cfcfcf',
  width: '100%',
  height: 180,
  display: 'table',
  backgroundColor: '#fbfbfb'
});

const CommentArea = styled('textarea')({
  border: 'solid 1px #cfcfcf',
  width: '100%',
  height: 180,
  padding: 20
});

const FileContainer = styled('div')({
  margin: 10,
  padding: 15,
  display: 'flex',
  border: 'solid 1px #d0d0d0',
  backgroundColor: '#ffff'
});
const FilePreview = styled('img')({
  width: 70,
  height: 70,
  flex: 1
});
const TextContainer = styled('div')({
  flex: 8,
  textAlign: 'left',
  paddingLeft: 10
});
const FileName = styled('div')({
  
});
const FileStatus = styled('div')({
  fontSize: 12,
  color: '#d0d0d0'
});
const FileRemove = styled(FileStatus)({
  // fontSize: 14,
  // color: '#136da1'
});
const FileLimit = styled('div')({
  fontSize: 12,
  color: 'gray'
});

const IconContainer = styled('div')({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  textAlign: 'center',
  cursor: 'pointer'
});
const BtnFileRemove = styled('img')({
  textAlign: 'center',
  height:35
});

const UploadPlaceHolder = styled('div')(({isEmpty})=>{
  display: 'none'
});

const IconUpload = styled('img')({
  width: 70,
  height: 70
});
const DropLabel = styled('span')({
  margin: 10
});

class WizardStep3 extends Component {
  state = {
    isEmptyUploads: true,
    filesCount: 0,
    filesUpload: [],
    comments: ''
  };

  componentDidMount() {
    this.setState({ comments: this.props.comments });
  }

  removeFile = index => {
    this.props.actionDeleteFileUpload(index);
  }

  renderFilePreview = () =>{
    if (this.props.filesUpload.length === 0){
      return null
    }
    return this.props.filesUpload.map((data,i)=>{
      let previewIcon = '';
      switch (data.type) {
        case 'application/pdf':
          previewIcon = icon_pdf;
          break;
        case 'image/jpeg':
        case 'image/png':
          previewIcon = data.preview;
          break;
        default:
          break;
      }

      return (
        <FileContainer key={i} onClick={(e) => { e.stopPropagation() }}>
          <FilePreview src={previewIcon}></FilePreview>
          <TextContainer>
            <FileName>{data.name}</FileName>
            <FileStatus>Size: {sizeConverter(data.size)}</FileStatus>
            <FileRemove>Date: {dateTimeConverter(data.lastModified)}</FileRemove>
          </TextContainer>
          <IconContainer>
            <BtnFileRemove src={iconRemove} onClick={(e) => { e.stopPropagation(); this.removeFile(i)}}></BtnFileRemove>
          </IconContainer>
        </FileContainer>
      )
    });
  }

  onDrop = (acceptedFiles, unAcceptedFiles) => {
    console.log('acceptedFiles: ', acceptedFiles);
    console.log('unAcceptedFiles: ', unAcceptedFiles);
    for(let i = 0; i < acceptedFiles.length; i++) {
      let blob = acceptedFiles[i];
      let fileReader = new FileReader();
      fileReader.onloadend = (e) => {
        let arr = (new Uint8Array(e.target.result)).subarray(0, 4);
        let header = "";
        for (let i = 0; i < arr.length; i++) {
          header += arr[i].toString(16);
        }
        switch (header) {
          case "89504e47":// "image/png"
          case "ffd8ffe0":// "image/jpeg"
          case "ffd8ffe1":// "image/jpeg"
          case "ffd8ffe2":// "image/jpeg"
          case "ffd8ffe3":// "image/jpeg"
          case "ffd8ffe8":// "image/jpeg"
          case "25504446"://"application/pdf"
            console.log('filesUpload', acceptedFiles[i]);
            if (this.props.filesUpload.length < 10){
              this.props.actionSetUploadFiles(acceptedFiles[i]);
            }
            break;
          default:// Or you can use the blob.type as fallback
            break;
        }
      }
      fileReader.readAsArrayBuffer(blob);
    }
  }

  componentWillUnmount() {
    this.props.actionSetComment(this.state.comments);
  }

  render(){
    return (
    <Container>
      <SubContainer>
        <Row>
            <Col sm="12" md={12}>
              <h6 style={{marginBottom: '0px'}}>Attach Files</h6>
              <FileLimit>(maximum of 10 Images/PDF and maximum of 6mb per file only)</FileLimit>
              <DragAndDropContainer>
                <Dropzone className="text-center"
                  accept="image/jpeg, image/png, application/pdf"
                  onDrop={this.onDrop}
                  maxSize={1024 * 1024 * 6}
                  onClick={(e)=>{e.stopPropagation()}}
                  disableClick={(this.props.filesUpload.length >= 10)? true:false }
                  style={{ display: 'table-cell', verticalAlign: 'middle'}}
                >               
                  <Row>
                      <Col sm="12" md={12}>
                        <UploadPlaceHolder className="Holder" 
                        style={{ display: (this.props.filesUpload.length ===0)? 'block':'none'}}
                          >
                          <IconUpload src={icon_upload} />
                          <DropLabel>Drop files to upload or </DropLabel>
                          <Button>browse</Button>
                        </UploadPlaceHolder>
                      { this.renderFilePreview() }

                      {(this.props.filesUpload.length === 0) ? '': 
                        <Button style={{ marginBottom: 10 }} onClick={(e) => { console.log("clickadd")}}>Add more files</Button>}
                      
                      </Col>
                  </Row>
                </Dropzone>
              </DragAndDropContainer>
            </Col>
        </Row>
      </SubContainer>
      <SubContainer>
        <Row>
          <Col sm="12" md={12}>
            <h6>Comments</h6>
              <CommentArea 
                placeholder="Add Comments..."
                onChange={(e) => this.setState({ comments: e.target.value })}
                value={this.state.comments}
              />
          </Col>
        </Row>
      </SubContainer>
    </Container>
    
  )}
}
 
export default connect(state => ({
  comments: state.cases.caseSubmitData.comments,
  filesUpload: state.cases.caseFileUpload
}),
  {
    actionSetComment,
    actionSetUploadFiles,
    actionDeleteFileUpload
  }
)(WizardStep3); 

