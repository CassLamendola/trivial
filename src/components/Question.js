import React, { Component } from 'react';
import { Card, CardHeader, Slide, AppBar } from '@material-ui/core';
import he from 'he';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import Answers from './Answers';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      question: {},
      questionContent: '',
      in: false
    }
  }

  componentWillMount() {
    this.mounted = true;
    this.setState({ in: true });
    this.getQuestion();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  shuffleAnswers = (incorrect, correct) => {
    let answers = incorrect.concat(correct);
    answers = answers.map(a => he.decode(a));
    for (let i = answers.length - 1; i > 0; i -= 1) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = he.decode(answers[i]);
      answers[i] = he.decode(answers[j]);
      answers[j] = temp;
    }
    return answers;
  }

  getQuestion = () => {
    const questions = JSON.parse(localStorage.getItem('questions'));
    const index = Number(this.props.match.params.id) - 1;
    const question = questions[index];
    if (!question) {
      this.props.history.push('/error')
    } else {
      console.log(question);
      const questionContent = he.decode(question.question)
      const answers = this.shuffleAnswers(question.incorrect_answers, question.correct_answer);
      this.setState({ answers, question, questionContent, in: true });
    }
  }

  selectAnswer = (target, selectedAnswer) => {
    const correctAnswer = he.decode(this.state.question.correct_answer);
    const correct = selectedAnswer === correctAnswer ? 1 : 0;
    target.style.color = correct ? "green" : "red";
    setTimeout(() => {
      this.setState({ in: false });
      this.props.updateScore(correct);
      if (this.mounted) this.getQuestion();
    }, 600);
  }

  render() { 
    return (
      <div className="container question-container">
        <AppBar 
          className="app-bar" 
          color="inherit"
          onClick={() => {this.props.history.push('/')}}>
          <ArrowBackIos className="back"/>
          <span className="back">Back to Menu</span>
        </AppBar>
        <Slide direction="left" in={this.state.in} timeout={{enter: 500, exit: 0}}>
          <div className="question-card">
            <Card className="question">
              <CardHeader title={this.state.questionContent}/>
            </Card>
            <Answers answers={this.state.answers} selectAnswer={this.selectAnswer}/>
          </div>
        </Slide>
      </div>
    );
  }
}
 
export default Question;