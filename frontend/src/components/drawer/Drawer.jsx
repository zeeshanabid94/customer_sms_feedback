import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import classNames from 'classnames';
import CustomerForm from '../forms/CustomerForm';
import {CookiesProvider, withCookies, Cookies} from 'react-cookie';


const drawerWidth = "25%";

const styles = {
  drawer: {
    display: 'flex',
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
    zIndex: 0,
    paddingTop: "5%",
    boxShadow: "0px 10px 5px gray"
  },
};

class EmotiveDrawer extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        children: PropTypes.array.isRequired,
        cookies: PropTypes.object.isRequired
    }
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <CookiesProvider>
                <Drawer open={true} className={classNames(this.props.classes.drawer, this.props.className)} variant="permanent"
                classes ={
                    {
                        paper: this.props.classes.drawerPaper
                    }
                }
                children={this.props.children}>
                </Drawer>
            </CookiesProvider>
            
        )
    }
}


export default withCookies(withStyles(styles)(EmotiveDrawer));