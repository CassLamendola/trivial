import React from 'react';
import { Button, Card, CardHeader, CardContent } from '@material-ui/core';

const DisplayError = (props) => {
  return (
    <div className="container error">
      <Card className="result-card">
        <CardHeader title="Oops! Something went wrong..."/>
        <CardContent>
          Psst...You may have selected a difficulty level that is not available for your selected category
        </CardContent>
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