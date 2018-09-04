import React from 'react';
import { List, ListItem } from '@material-ui/core';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';

const Menu = (props) => {
  return (
    <List className="menu">
      {props.options.map( option => {
        return <ListItem
          className="menu-list-item"
          button={true}
          name={props.name}
          key={option.id}
          onClick={(e) => {props.handleSelect(props.name, option.id)}}>
          {option.name}
          <ArrowForwardIos/>
        </ListItem>
      })}
    </List>
  );
}
 
export default Menu;