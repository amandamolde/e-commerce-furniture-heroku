import React, { Component } from 'react';
import CreateItem from '../CreateItem/createItem.jsx';
import ItemList from '../ItemList/itemList.jsx';
import EditItem from '../EditItem/editItem.jsx';
import ModalExample from '../EditModal/editModal';

class ItemContainer extends Component {
    constructor () {
        super(),
        this.state = {
            items: [],
            showEdit: false,
            editItemId: null,
            itemToEdit: {
                title: '',
                description: '',
                price: 0,
            }
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
            method: "GET" 
        });
        const itemsJson = await items.json();
        console.log(itemsJson);
        return itemsJson;
    };
    addItem = async (item, e) => {
        e.preventDefault();

        try {
            const createItem = await fetch('https://e-commerce-furniture.herokuapp.com/api/v1/items', {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const parsedResponse = await createItem.json();

            this.setState({items: [...this.state.items, parsedResponse.data]});
        } catch (err) {
            console.log(err);
        }
    };
    deleteItem = async (id, e) => {
        e.preventDefault();
        console.log('deleteItem function is being called, this is the id:', id);

        try {
            const deleteItem = await fetch('https://e-commerce-furniture.herokuapp.com/api/v1/items/' + id, {
                method: 'DELETE'
            });

            const parsedResponse = await deleteItem.json();

            if (parsedResponse.status === 200) {
                this.setState({items: this.state.items.filter((item, i) => item._id !== id)});
            }
        } catch (err) {
            console.log(err);
        }
    };
    showModal = (id) => {
        const itemToEdit = this.state.items.find((item) => item._id === id);

        this.setState({
            showEdit: true,
            editItemId: id,
            itemToEdit: itemToEdit,
        });
    };
    closeAndEdit = async (e) => {
        e.preventDefault();

        try {
            const editItem = await fetch('https://e-commerce-furniture.herokuapp.com/api/v1/items/' + this.state.editItemId, {
                method: 'PUT',
                body: JSON.stringify(this.state.itemToEdit),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const parsedResponse = await editItem.json();

            const editedItemArray = this.state.items.map((item) => {

                if (item._id === this.state.editItemId) {

                    item.title = parsedResponse.data.title;
                    item.description = parsedResponse.data.description;
                    item.price = parsedResponse.data.price;
                    item.photo1URL = parsedResponse.data.photo1URL;
                    item.photo2URL = parsedResponse.data.photo2URL;
                    item.photo3URL = parsedResponse.data.photo3URL;
                }
                return item;
            });

            this.setState({
                items: editedItemArray,
                showEdit: false,
            });

        } catch (err) {
            console.log(err);
        }
    };
    handleFormChange = (e) => {

        this.setState({
            itemToEdit: {
                ...this.state.itemToEdit,
                [e.target.name]: e.target.value,
            }
        });
    };
    render(){
        return(
            <div>
                <CreateItem addItem={this.addItem}/>
                <ItemList items={this.state.items} deleteItem={this.deleteItem} showModal={this.showModal}/>

                {this.state.showEdit ? <EditItem closeAndEdit={this.closeAndEdit} handleFormChange={this.handleFormChange} itemToEdit={this.state.itemToEdit}/> : null}
            </div>
        )   
    }
}

export default ItemContainer;