import React from 'react';
import { Button, Card, CardHeader } from '@material-ui/core';

const DisplayError = (props) => {
  return (
    <div className="container error">
      <Card className="result-card">
        <CardHeader title="Oops! Something went wrong..."/>
        <Button 
          color="inherit" 
          size="large"
          variant="contained"
          onClick={() => props.history.push('/')}>
          Try Again
        </Button>
      </Card>
    </div>
  );
}
 
export default DisplayError;