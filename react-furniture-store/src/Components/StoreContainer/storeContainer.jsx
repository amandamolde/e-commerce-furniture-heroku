import React, { Component } from "react"
import Title from "../Title/title.jsx"
import ShoppingCart from "../ShoppingCart/shoppingCart.jsx"
import ItemCarousel from "../ItemCarousel/itemCarousel.jsx"
import ItemCardContainer from "../ItemCardContainer/itemCardContainer.jsx"
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import './style.css';

class StoreContainer extends Component {
    constructor () {
        super(),
        this.state = {
            items: [],
            shoppingCart: [],
            totalCost: 0,
            purchaseComplete: false,
        }
    };
    componentDidMount(){
        this.getItems().then((items) => {
            this.setState({
                items: items.data
            })
        }).catch((err) => {
            console.log(err);
        });
    };
    getItems = async () => {
        const items = await fetch('https://e-commerce-furniture.herokuapp.com/api/v1/items', {
            credentials: 'include',
            method: "GET" 
        });
        const itemsJson = await items.json();
        console.log(itemsJson);
        return itemsJson;
    };
    handleIncrement = (item) => {
        const newItemsArray = [...this.state.items]
        const index = newItemsArray.indexOf(item);
        newItemsArray[index] = {...item};
        newItemsArray[index].count++;
        this.setState({items : newItemsArray});  
    };
    handleReset = () =>{
        console.log("event reset called")
        const items = this.state.items.map(item => {
            item.value =0;
            return item;
        })
        this.setState({items})
    };
    handleDelete =(counterId)=> {
        console.log("event delete called", counterId)
        const counters = this.state.counters.filter(counter => counter.id !== counterId)
        this.setState({counters})
    };
     //Patrick ADD here--------------------------------
     addToCart = (item) => {
        console.log("event added item to cart")
        const newCartArray = [...this.state.shoppingCart]
        const newCartItem = {...item};
        newCartArray.push(newCartItem)
        this.setState({shoppingCart : newCartArray});  
    };
    handleItemClick = async (item) => {
    
        await this.addToCart(item);
        this.calculateTotal();
    }
    calculateTotal = () => {
        let total = 0
        this.state.shoppingCart.map(item => {
            total += item.price
            console.log(total)
            return total
        })
        this.setState({totalCost : total})
        
    }
    checkOut = async (checkout, e) => {
        console.log("checkout called")
        console.log(checkout)
        e.preventDefault();
        try {
            const createCheckout = await fetch('https://e-commerce-furniture.herokuapp.com/checkout/', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(checkout),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const parsedResponse = await createCheckout.json();
        
            console.log(parsedResponse);
    
        } catch (err) {
            console.log(err, "error");
        }
    };
    async submit(ev) {
        console.log("checkout form submitted")
        let {token} = await this.props.stripe.createToken({name: "Name"});
        let response = await fetch("https://e-commerce-furniture.herokuapp.com/charge", {
          method: "POST",
          headers: {"Content-Type": "text/plain"},
          body: token.id
        });
      
        if (response.ok) this.setState({purchaseComplete: true});
        console.log("Submit was completed")
    }
    userHasScopes = (scopes) => {
        const grantedScopes = JSON.parse(localStorage.getItem('scopes')).split(' ');
        return scopes.every(scope => grantedScopes.includes(scope));
    }

    isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }
    clearCart = () =>{
        this.setState({shoppingCart : []});
        this.setState({totalCost: 0})
    }

    render(){
        const isAuthenticated = this.isAuthenticated;
        const userHasScopes = this.userHasScopes;
        return(
                <Container fluid>
                    <div className = "store-container-component">
                        <Row>
                            <Col sm="8">
                                <Title className = ""/>
                            </Col>
                            <Col >
                                <ShoppingCart 
                                    item={this.state.items} 
                                    shoppingCart={this.state.shoppingCart} 
                                    totalCost={this.state.totalCost} onReset = {this.state.handleReset}
                                    onDelete = {this.state.handleDelete}
                                    checkOut = {this.checkOut}
                                    submit = {this.submit}
                                    clearCart = {this.clearCart}    
                                />
                            </Col>
                        </Row>
                        {/* <Row className="space"></Row> */}
                        <Row>
                           
                                <Col>
                                    <ItemCarousel 
                                        item={this.state.items}
                                    />
                                </Col>
                           
                        </Row>
                        <Row>
                            <ItemCardContainer 
                                item={this.state.items}
                                // onIncrement={this.handleIncrement}
                                // addToCart={this.addToCart}
                                // calculateTotal={this.calculateTotal}
                                handleItemClick={this.handleItemClick}
                            />
                        </Row>
                        <Row className="manage-inventory">
                            {
                                isAuthenticated() && userHasScopes(['write:messages']) && (
                                    <Link to='/admin'>Manage Inventory</Link>
                                )
                            }
                        </Row>    
                    </div>
                </Container>
           
        )   
    }
}

export default StoreContainer;