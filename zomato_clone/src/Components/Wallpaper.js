import React from "react";
import '../Styles/home.css';
import axios from 'axios';
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

class Wallpaper extends React.Component {
    constructor(){
        super();
        this.state = {
            restaurants: [],
            inputText: undefined,
            suggestions: []
        }
    }
    handleLocationChange = (event) => {
        const locationId = event.target.value;
        sessionStorage.setItem('locationId', locationId);

        axios({
                url:`http://localhost:4567/restaurants/${locationId}`,
                method:'GET',
                headers:{'Content-Type': 'application/json'}
           })
            .then(res => {
                this.setState({ restaurants: res.data.restaurants})
            })
            .catch(err => console.log(err))
    }

    handleInputChange = (event) => {
        const {restaurants} = this.state;
        const inputText = event.target.value;

        let suggestions = [];

        suggestions = restaurants.filter(item => item.name.toLowerCase().includes(inputText.toLowerCase()));
        this.setState({inputText, suggestions});

    }

    selectingRestaurant = (resObj) => {
        this.props.history.push(`/details?restaurants=${resObj._id}`);
    }

    showSuggestion = () =>{
        const {suggestions, inputText} = this.state;
        if (suggestions.length == 0 && inputText == undefined){
            return null;
        }
        if(suggestions.length == 0 && inputText == ""){
            return <ul className="restaurants-ul">
                <li>No Results</li>
            </ul>
        }
        return(
            <ul>
                {
                    suggestions.map((item, index)=>(<li key={index} onClick={() => this.selectingRestaurant(item)}>{`${item.name} - ${item.locality},${item.city}`}</li>))
                }
            </ul>
        )

    }

    render(){
        const {locationsData} = this.props;
        return(
            <div>
                <img src="./Assets/homepageimg.png" alt="" width="100%" height="400px" />
        <div className="top-items">
            <div className="find">Find the best restaurants, cafes bars</div>
            <div className="search">
                <select className="locations" onChange={this.handleLocationChange}>
                    <option value="0">Select</option>
                    {locationsData.map((item) => {
                        return <option value={item.location_id}>{`${item.name},${item.city}`}</option>

                    })}
                </select>
                <span>
                    <span className="fas fa-search search-icon"></span>
                    <input className="search-bar" type="text" 
                    placeholder="Search your restaurants" onChange={this.handleInputChange}/>
                    {this.showSuggestion()}
                </span>
            </div>
        </div>
            </div>

        )
    }

}

export default withRouter(Wallpaper);
