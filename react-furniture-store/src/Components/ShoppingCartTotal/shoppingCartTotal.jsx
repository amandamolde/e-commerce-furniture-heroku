import React, { Component } from "react"
import './style.css';

class ShoppingCartTotal extends Component {
    render(){ 
        return(
            <div className="shopping-cart-total-component">
                 <p> your cart totals: ${this.props.totalCost}</p>
               
            </div>
        )
    }
}

export default ShoppingCartTotal;