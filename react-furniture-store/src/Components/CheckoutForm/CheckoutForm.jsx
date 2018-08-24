import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import './style.css';

class CheckoutForm extends Component {
  // constructor(props) {
  //   super(props);
  //   this.submit = this.submit.bind(this);
  // }

  // async submit(ev) {
  //   let {token} = await this.props.stripe.createToken({name: "Name"});
  //   let response = await fetch("http://localhost:9000/charge", {
  //     method: "POST",
  //     headers: {"Content-Type": "text/plain"},
  //     body: token.id
  //   });
  
  //   if (response.ok) this.setState({purchaseComplete: true});
  //   console.log()
  // }

  render() {
    if (this.props.purchaseComplete) return <h1>Purchase Complete</h1>;
  
    return (
      <div className="checkout checkout-form-component">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={() => {this.props.submit.bind(this); this.props.clearCart(); this.props.toggle()}}>Pay : {this.props.totalCost}</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);