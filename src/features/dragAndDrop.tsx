import { FileUploader } from "react-drag-drop-files";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dimmer, Header, Loader, Modal } from "semantic-ui-react";
import { getCSVtoJson, openCvsModal, createDataByCSV } from "./records/recordSlice";
import { RootState } from "../app/store";

export default function DragAndDrop() {
  type ModalProps = {
    isopen: boolean;
    onClose: Function
  }
  const dispatch = useDispatch<any>();
  const { cvsModal: isopen, loading, jsonCSV } = useSelector((state: RootState) => state).record

  const handleChange = (file: any) => {
    dispatch(getCSVtoJson(file))
  }
  const handleToogleDrop = () => {
    dispatch(openCvsModal(true))
  }
  const handleOnCloseModal = () => {
    dispatch(openCvsModal(false))
  }
  const handleOnSaveCSV = () => {
    dispatch(createDataByCSV())
  }

  const DropModal = ({ isopen, onClose }: ModalProps) => {
    return (<>
      <Modal
        open={isopen}
        className='modal'
      >
        <Modal.Header>CSV Modal</Modal.Header>
        <Modal.Content>
          <Dimmer active={loading}>
            <Loader>Loading</Loader>
          </Dimmer>
          {jsonCSV.length <= 0 ? (
            <Modal.Description className='modal-description' >
              <Header>Update your CSV file</Header>
              <div style={{ height: '200px' }}>
                <FileUploader classes='dropzone' handleChange={handleChange} name="file" types={['CSV']} />
              </div>
            </Modal.Description>
          )
            : (
              <Modal.Description className='modal-description' >
                <Header>Save CSV file</Header>
                <div style={{ height: '200px', display: 'flex', alignItems: 'baseline' }}>
                  <Header as={'h5'} style={{paddingRight: '0.5rem'}}>{jsonCSV.length}</Header> <p style={{paddingRight: '0.5rem'}}>items loaded.</p>
                  <Button onClick={handleOnSaveCSV} style={{maxHeight: '40px'}} color="blue">Save Items loaded ({jsonCSV.length})</Button>
                </div>
              </Modal.Description>
            )
          }
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Cancel"
            color="red"
            onClick={() => onClose()}
          />
        </Modal.Actions>
      </Modal>
    </>
    )
  }
  return (
    <>
      <Button color="blue" onClick={handleToogleDrop}>Update CVS</Button>
      <DropModal isopen={isopen} onClose={handleOnCloseModal} />
    </>
  )
}