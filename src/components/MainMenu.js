import React, { Component } from 'react';
import Menu from './Menu';
import { Slide, AppBar } from '@material-ui/core';

class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      category: null,
      game: props.game,
      difficulties: [
        {"name": "Easy", "id": 0},
        {"name": "Medium", "id": 1},
        {"name": "Hard", "id": 2},
        {"name": "Random", "id": 3}
      ],
      catIn: false, 
      diffIn: false
    }
  }
  
  componentWillMount() {
    this.setState({ catIn: true });
  }
  
  componentDidMount() {
    const game = this.props.game;
    game.getCategories()
      .then( categories => {
        this.setState({ categories: categories.trivia_categories });
      })
      .catch( err =>  this.props.history.push('/error'));
  }

  handleSelect = (value) => {
    const category = this.state.category;
    if (this.state.category) {
      this.props.startGame(category, value.name.toLowerCase());
    } else {
      window.scrollTo(0, 0);
      this.setState({ catIn: false });
      setTimeout(() => {
        this.setState({ category: value.id, diffIn: true });
      }, 200);
    }
  }
  
  render() { 
    return (
      this.state.category ? (
        <div className="container difficulty-menu">
          <AppBar 
            position="fixed" 
            color="inherit"
            className="app-bar">
            Select Difficulty
          </AppBar>
          <Slide direction="left" in={this.state.diffIn} timeout={{enter: 500, exit: 0}}>
            <Menu
              options={this.state.difficulties} 
              handleSelect={this.handleSelect}/>
          </Slide>
        </div>
      ) : (
        <div className="container category-menu">
          <AppBar 
            position="fixed" 
            color="inherit"
            className="app-bar">
            Select Category
          </AppBar>
          <Slide direction="left" in={this.state.catIn} timeout={{enter: 500, exit: 0}}>
            <Menu
              options={this.state.categories} 
              handleSelect={this.handleSelect}/>
          </Slide>
        </div>
      )
    );
  }
}
 
export default MainMenu;