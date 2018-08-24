import React, { Component } from "react"
import './style.css';
import { Container, Row, Col } from 'reactstrap';


class Title extends Component {
    render(){
        return(
            <Container fluid>
                <h1 className="title-component"><img src="https://www.brandcrowd.com/gallery/brands/pictures/picture13760228457274.png"/> Couldn't Chair Less </h1>
            </Container>    
        )
    }
}

export default Title;