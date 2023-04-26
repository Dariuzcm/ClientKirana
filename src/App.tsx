import { Container, Grid } from 'semantic-ui-react';
import RecordTable from './features/records/RecordTable';
import DragAndDrop from './features/dragAndDrop';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <Container>
      <Grid divided='vertically'>
        <Grid.Row>
          <DragAndDrop/>
        </Grid.Row>
        <Grid.Row>
          <RecordTable />
        </Grid.Row>
      </Grid>
       <ToastContainer />
    </Container>
  );
}

export default App;
