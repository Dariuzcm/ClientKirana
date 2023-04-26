import { Container, Grid } from 'semantic-ui-react';
import RecordTable from './features/records/RecordTable';
import DragAndDrop from './features/dragAndDrop';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { setNotification } from './features/records/recordSlice';
import './global.css'
function App() {
  const {notification} = useSelector((state: RootState) => state).record
  const dispatch = useDispatch()
  useEffect(() => {
    if(notification.length > 0) {
      for(const note of notification){
          toast(note.content, {
          position: toast.POSITION.BOTTOM_RIGHT,
          type: note.type,
          theme:'colored',
          autoClose: 800
        })
      }
      dispatch(setNotification([]))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification])
  
  return (
    <Container >
      <Grid style={{ paddingTop: '1rem'}} divided='vertically'>
        <Grid.Row>
          <DragAndDrop/>
        </Grid.Row>
        <Grid.Row>
          <RecordTable />
        </Grid.Row>
      </Grid>
       <ToastContainer pauseOnHover={false} draggablePercent={60} />
    </Container>
  );
}

export default App;
