import React from 'react';
import './App.css';
import { Container, Grid, Button } from 'semantic-ui-react';

function App() {
  return (
    <Container>
      <Grid divided='vertically'>
        <Grid.Row>
          <Button>Add CVS</Button>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default App;
