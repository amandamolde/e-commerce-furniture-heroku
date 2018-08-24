import React from 'react';
import { Container, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const EditItem = (props) =>  {

    return (
        <Container>
            <h2>Edit Item</h2>
            <Form onSubmit={props.closeAndEdit}>
                <FormGroup row>
                    <Label for="itemTitle" sm={3}>Title</Label>
                    <Col sm={9}>
                        <Input type="text" name="title" placeholder="item title" onChange={props.handleFormChange} value={props.itemToEdit.title} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="itemDescription" sm={3}>Description</Label>
                    <Col sm={9}>
                        <Input type="text" name="description" placeholder="item description" onChange={props.handleFormChange} value={props.itemToEdit.description} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="itemPrice" sm={3}>Price $</Label>
                    <Col sm={9}>
                        <Input type="number" name="price" placeholder="item price" onChange={props.handleFormChange} value={props.itemToEdit.price} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="photo1URL" sm={3}>Photo 1</Label>
                    <Col sm={9}>
                        <Input type="url" name="photo1URL" placeholder="image URL" onChange={props.handleFormChange} value={props.itemToEdit.photo1URL} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="photo2URL" sm={3}>Photo 2</Label>
                    <Col sm={9}>
                        <Input type="url" name="photo2URL" placeholder="image URL" onChange={props.handleFormChange} value={props.itemToEdit.photo2URL} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="photo3URL" sm={3}>Photo 3</Label>
                    <Col sm={9}>
                        <Input type="url" name="photo3URL" placeholder="image URL" onChange={props.handleFormChange} value={props.itemToEdit.photo3URL} />
                    </Col>
                </FormGroup>
                <Button type="Submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default EditItem;