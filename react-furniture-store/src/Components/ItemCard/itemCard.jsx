import React, { Component } from "react"
import './style.css';
import { 
    
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Container, 
    Row, 
    Col

} from 'reactstrap';


class ItemCard extends Component {
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
        return(
            <div className="item-card-component">
                <div className="item-card-component-modal-div">
                                <Button 
                                    onClick={this.toggle} 
                                    className="item-card-modal-button">
                                    
                                    <strong>{this.props.item.title}</strong>
                                    <br></br>
                                    <img src={this.props.item.photo1URL}/>
                                </Button>
                                
                                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                <ModalHeader 
                                    toggle={this.toggle}
                                    >
                                    <h1>{this.props.item.title}</h1>
                                </ModalHeader>
                                <ModalBody className = "item-card-modal-body">

                                    <img src={this.props.item.photo1URL}/>
                                    <div className="item-description-box"> <p className="item-description-title"> Item Description: </p>   
                                     <p className="item-description">{this.props.item.description} </p> </div>
                                    <div className="item-price-div">
                                        <p>
                                            <span className="item-price-title"> Price: </span> 
                                            <span className="item-price"> ${this.props.item.price} </span>
                                        </p>
                                    </div>
            
                        
                                    {/* <button on Click={this.props.handleItemClick.bind(null,this.props.item)}> + </button> */}
                                

                                </ModalBody>
                                <ModalFooter>
                                    <Button 
                                    color="primary" 
                                    
                                    onClick={()=>{this.props.handleItemClick(this.props.item); this.toggle()}}
                                    >
                                    Add To Shopping Cart
                                    </Button>
                                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                                </ModalFooter>
                                </Modal>
                            </div>                        
                    
                    
               
           
        </div>
    )
    }
}

export default ItemCard; 


