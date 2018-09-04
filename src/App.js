import React, { Component } from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router';
import Trivia from 'trivia-api';
import { MainMenu, Question, Result } from './components/index';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: null,
      quizLength: 10,
    };
  }
  
  componentWillMount() {
    const game = new Trivia({ encoding: 'url3986' });
    this.setState({ game });
  }

  startGame = (category) => {
    const options = {
      type: 'multiple',
      amount: this.state.quizLength,
      category: category
    };
    
    this.state.game.getQuestions(options)
      .then( questions => {
        localStorage.setItem('questions', JSON.stringify(questions.results));
        localStorage.setItem('questionIndex', 0);
        localStorage.setItem('correct', 0);
        this.props.history.push('/question/1');
      })
      .catch( err => console.log(err) );
  }

  updateScore = (correct=0) => {
    const score = Number(localStorage.getItem('correct')) + correct;
    const questionIndex = localStorage.getItem('questionIndex');
    localStorage.setItem('correct', score);

    if (questionIndex >= this.state.quizLength -1) {
      this.props.history.push('/result');
    } else {
      const questionIndex = Number(localStorage.getItem('questionIndex')) + 1;
      localStorage.setItem('questionIndex', questionIndex);
      this.props.history.push(`/question/${questionIndex + 1}`);
    }
  }

  render() {
    return (
      <Switch>
        <Route exact path="/"
          render={ props => (
            <MainMenu 
              {...props}
              startGame={this.startGame.bind(this)}
              game={this.state.game}/>
          )}/>
        <Route path="/question/:id"
          render={ props => (
            <Question 
              {...props}
              questions={this.state.questions}
              updateScore={this.updateScore.bind(this)}/>
          )}/>
        <Route path="/result" component={Result}/>
      </Switch>
    );
  }
}

export default withRouter(App);
