import React from 'react';
import {withStyles} from '@material-ui/core';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import PhoneIcon from '@material-ui/icons/Phone';
import Icon from '@material-ui/core/Icon';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import PersonIcon from '@material-ui/icons/Person';

const styles = {
    form: {
        paddingLeft: "10px"
    },
    label: {
        position: "relative",
        margin: "10px",
        display: "inline-block",
    },
    label_text: {
        display: "inline-block",
        marginLeft: "5px"
    },
    input: {
        margin: "10px",
        border: "solid",
        borderWidth: "0.5px",
        borderRadius: "2.5px",
        borderColor: "gray",
        paddingLeft: "5px"
    },
    button_group: {
        margin: "10px",
        paddingLeft: "2.5%",
        paddingRight: "2.5%",
    },
    button: {
        margin: "10px",
        background: "orange",
        color: "White",
        marginLeft: "32%",
        marginRight: "32%",
        borderRadius: "25px",
        cursor: "pointer",
        textTransform: "none",
    },
    button_selected: {
        textTransform: "none",
        background: "lightgreen",
        color: "green",
        borderColor: "green",
        "&:hover": {
            background: "lightgreen",
            color: "green",
            borderColor: "green"
        }
    },
    button_hover: {
        textTransform: "none",
        "&:hover": {
            background: "lightgreen",
            color: "green",
            borderColor: "green"
        }
    },
    icon: {
        display: "inline-block",
    }
}
class CustomerForm extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        cookies: PropTypes.object.isRequired,
        onSubmit: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            product: null,
            customerName: null,
            phoneNumber: null,
        }

        this.onProductSelect = this.onProductSelect.bind(this);
        this.onCustomerNameChanged = this.onCustomerNameChanged.bind(this);
        this.onPhoneNumberChanged = this.onPhoneNumberChanged.bind(this);

    }

    onPhoneNumberChanged(event) {
        console.log("Phone number changed.");
        let newState = this.state;
        newState.phoneNumber = event.target.value;
        this.setState(newState);
    }

    onCustomerNameChanged(event) {
        console.log("Customer name changed.");
        let newState = this.state;
        newState.customerName = event.target.value;
        this.setState(newState);
    }
    onProductSelect(event) {
        let newState = this.state;
        console.log(event.target.innerText.toLowerCase());
        newState.product = event.target.innerText.toLowerCase();
        this.setState(newState);
    }
    render() {
        console.log(this.state);
        console.log(this.props);
        let children = [
            <div>
            <FormGroup>
            
            <InputLabel className={this.props.classes.label} shrink = {true} required = {true}>
                <Icon>
                    <PhoneIcon className={this.props.classes.icon} />
                </Icon>
                <div style={styles.label_text}>
                    <b>Customer Phone Number</b>
                </div>
                
            </InputLabel>
            <Input  onChange = {this.onPhoneNumberChanged} className={this.props.classes.input} disableUnderline={true} id="phone_number" type="text" name="phone_number" placeholder="1236202984">
            </Input>
            </FormGroup>
            </div>
            ,
            <div>
            <FormGroup>
            <InputLabel className={this.props.classes.label} shrink = {true} required = {true}>
                <Icon>
                    <ShoppingBasketIcon className={this.props.classes.icon} />
                </Icon>
                <div style={styles.label_text}>
                    <b>Product Type</b>
                </div>
                
            </InputLabel>
            <FormGroup row = {true} classes={{
                root: this.props.classes.button_group
                }
            }>
                <Button disableRipple={true} className={this.state.product == "lime" ? this.props.classes.button_selected : this.props.classes.button_hover} variant="outlined" onClick={this.onProductSelect}>Lime</Button>
                <Button disableRipple={true} className={this.state.product == "cherry" ? this.props.classes.button_selected : this.props.classes.button_hover} variant="outlined" onClick={this.onProductSelect}>Cherry</Button>
                <Button disableRipple={true} className={this.state.product == "vanilla" ? this.props.classes.button_selected : this.props.classes.button_hover} variant="outlined" onClick={this.onProductSelect}>Vanilla</Button>
            </FormGroup>
            </FormGroup>
            </div>
            ,
            <div>
            <FormGroup>
            <InputLabel  className={this.props.classes.label} shrink = {true} required = {true}>
                <Icon>
                    <PersonIcon className={this.props.classes.icon} />
                </Icon>
                <div style={styles.label_text}>
                    <b>Customer Name</b>
                </div>
                
            </InputLabel>
            <Input onChange={this.onCustomerNameChanged} className={this.props.classes.input} disableUnderline={true} id="customer_name" type="text" name="customer_name" placeholder="Sarah">
            </Input>
            </FormGroup>
            </div>
            ,
            <Button variant="outlined" className={this.props.classes.button} type="submit">Send SMS</Button>
            
            
        ]
        return (
            <form style={styles.form} onSubmit={() => this.props.onSubmit(this.state)}>
            {children}
            </form>
            
        )
    }
}

export default withStyles(styles)(CustomerForm);