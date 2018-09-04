import React from 'react';
import { Card, CardHeader, Button, Slide } from '@material-ui/core';
// import Star from '@material-ui/icons/Star';

const Result = (props) => {
  const score = Number(localStorage.getItem('correct')) * 10;

  return (
    <div className="container result">
      <Slide direction="left" in={true} timeout={500}>
        <Card className="result-card">
          <CardHeader title={`Score: ${score}%`}/>
          <Button 
            color="inherit" 
            size="large"
            variant="contained"
            onClick={() => props.history.push('/')}>
            Play Again!
          </Button>
        </Card>
      </Slide>
    </div>
  );
}
 
export default Result;