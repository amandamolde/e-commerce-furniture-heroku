import React, { Component } from 'react';
import { Container, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class CreateItem extends Component {
    constructor() {
        super();

        this.state = {
            title: '',
            description: '',
            price: 0,
            photo1URL: '',
            photo2URL: '',
            photo3URL: '',
        }
    }
    updateItem = (e) => {
        this.setState({[e.currentTarget.name]: e.currentTarget.value});
    }
    render() {
        return (
            <Container>
                <h2>Add an Item to Inventory</h2>
                <Form onSubmit={this.props.addItem.bind(this, this.state)}>
                    <FormGroup row>
                        <Label for="itemTitle" sm={3}>Title</Label>
                        <Col sm={9}>
                            <Input type="text" name="title" placeholder="item title" onChange={this.updateItem} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="itemDescription" sm={3}>Description</Label>
                        <Col sm={9}>
                            <Input type="text" name="description" placeholder="item description" onChange={this.updateItem} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="itemPrice" sm={3}>Price $</Label>
                        <Col sm={9}>
                            <Input type="number" name="price" placeholder="item price" onChange={this.updateItem} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="photo1URL" sm={3}>Photo 1</Label>
                        <Col sm={9}>
                            <Input type="url" name="photo1URL" placeholder="image URL" onChange={this.updateItem} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="photo2URL" sm={3}>Photo 2</Label>
                        <Col sm={9}>
                            <Input type="url" name="photo2URL" placeholder="image URL" onChange={this.updateItem} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="photo3URL" sm={3}>Photo 3</Label>
                        <Col sm={9}>
                            <Input type="url" name="photo3URL" placeholder="image URL" onChange={this.updateItem} />
                        </Col>
                    </FormGroup>
                    <Button type="Submit">Submit</Button>
                </Form>
            </Container>
        )
    }
}

export default CreateItem;