import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { IconButton, withTheme } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const styles = {
  root: {
      background: "rgb(73, 144, 226, 1)",
      zIndex: 1,
      height: "50px"
  },
  logo: {
      display: "inline-block",
      width: "95%",
      textAlign: "left",
      marginBottom:"10px"
  },
  icon: {
      display: "inline-block",
      float: "right",
      width: "5%",
      textAlign: "right",
      marginBottom:"10px"
  }
}

class EmotiveAppBar extends React.Component {
    static propTypes = {
        children: PropTypes.node,
        classes: PropTypes.object.isRequired,
        className: PropTypes.string,
    };
    constructor(props) {
        super(props);
    }
    render() {
        console.log("APP BAR", this.props);
        let children = [
            <Toolbar>
                <div className={classNames(this.props.classes.logo, this.props.className)}>
                    <img height="42" width="42" src="http://emotive.io/assets/img/favicon-white.png"></img>
                </div>
                <div>
                    <IconButton className={classNames(this.props.classes.icon, this.props.className)}>
                    <AccountCircle /> 
                    </IconButton>
                </div>
                </Toolbar>
        ]
        return (
            <AppBar children={children} className={classNames(this.props.classes.root, this.props.className)}>
                
            </AppBar>
            
        )
    }
}

export default withStyles(styles)(EmotiveAppBar);