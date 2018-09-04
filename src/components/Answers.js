import React from 'react';
import { Card, List, ListItem } from '@material-ui/core';

const Answers = (props) => {
  return (
    <div className="answers">
      <List >
        {props.answers.map(answer => {
          return (
            <Card className="answer-card" key={answer}>
              <ListItem
                className="answer"
                button={true}
                value={answer}
                onClick={(e) => props.selectAnswer(e.target, answer)}>
                {answer}
              </ListItem>
            </Card>
          )
        })}
      </List>
    </div>
  );
}
 
export default Answers;