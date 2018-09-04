import React, { Component } from 'react';
import Menu from './Menu';
// import Transition from 'react-transition-group/Transition';
import { Slide, AppBar } from '@material-ui/core';

class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      game: props.game
    }
  }
  
  componentDidMount() {
    const game = this.props.game;
    game.getCategories()
      .then( categories => {
        this.setState({ categories: categories.trivia_categories });
      })
      .catch( err => console.log(err));
  }

  handleSelect = (name, value) => {
    this.props.startGame(value);
  }
  
  render() { 
    return (
      <div className="container main-menu">
        <AppBar 
          position="fixed" 
          color="inherit"
          className="app-bar">
          Choose One
        </AppBar>
        <Slide direction="left" in={true} timeout={500}>
          <Menu
            options={this.state.categories} 
            handleSelect={this.handleSelect} 
            name='category'/>
        </Slide>
      </div>
    );
  }
}
 
export default MainMenu;