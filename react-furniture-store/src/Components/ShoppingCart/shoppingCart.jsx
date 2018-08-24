import React, { Component } from "react";
import { 
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Container,
    Row,
    Col,
 } from 'reactstrap';

import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from "../CheckoutForm/CheckoutForm.jsx"


import ShoppingCartTotal from "../ShoppingCartTotal/shoppingCartTotal"
import './style.css';

class ShoppingCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          backdrop: true
        };
    
        this.toggle = this.toggle.bind(this);
      }
    
      toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }    
    render(){
            return (
              <Container fluid className="shopping-cart-container"> 
                
                    
                        <Button onClick={this.toggle} className="shopping-cart-modal-button"><img src="http://www.iconhot.com/icon/png/devine/256/cart-2.png"/> : {this.props.shoppingCart.length}   </Button>
                    
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}><h1> Shopping Cart </h1></ModalHeader>
                        <ModalBody className = "shopping-cart-modal">
                            
                            <div>
                                {this.props.item.count}
                                <ul>
                                    {this.props.shoppingCart.map((cartItem, i) => {
                                        return (
                                            <li key={i}>{cartItem.title} : $ {cartItem.price}</li>
                                        )
                                    })}
                                </ul>
                                <ShoppingCartTotal totalCost={this.props.totalCost} />
                                <button
                                    onClick = {this.props.clearCart}
                                    className="btn btn-primary btn-sm m-2"
                                    > 
                                    Reset
                                </button>
                            {/* <button 
                                onClick={this.props.checkOut.bind(this, this.props.totalCost)}
                                > 
                                    checkout
                            </button>  */}
                            <StripeProvider apiKey="pk_test_LwL4RUtinpP3PXzYirX2jNfR">
                                <div className="stripProvider">
                                    <h1>Complete Checkout?</h1>
                                    <Elements>
                                        <CheckoutForm 
                                        totalCost={this.props.totalCost}
                                        submit = {this.props.submit}
                                        clearCart = {this.props.clearCart} 
                                        toggle = {this.toggle}   
                                        />
                                    </Elements>
                                </div>
                            </StripeProvider>
                        </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                        </Modal>
                    
                
            </Container>
            );
          }
    }

export default ShoppingCart; 