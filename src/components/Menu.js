import React from 'react';
import { List, ListItem } from '@material-ui/core';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';

const Menu = (props) => {
  return (
    <List className="menu">
      {props.options.map( option => {
        return(
          <div className="menu-list-item">
            <ListItem
              className="inner-list-item"
              button={true}
              key={option.id}
              onClick={(e) => {props.handleSelect(option)}}>
              {option.name}
              <ArrowForwardIos/>
            </ListItem>
          </div>
        )
      })}
    </List>
  );
}
 
export default Menu;