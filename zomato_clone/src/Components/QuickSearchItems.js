import React from "react";
import '../Styles/home.css';
import {withRouter} from 'react-router-dom';

class QuickSearchItems extends React.Component {
    handleNavigate = (mealTypeId) => {
        const locationId = sessionStorage.getItem('locationId');
        if (locationId) {
            this.props.history.push(`/filter?mealtype=${mealTypeId}&location=${locationId}`);
        } else {
            this.props.history.push(`/filter?mealtype=${mealTypeId}`);
        }
    }
    render(){
        const {quickSearchItemData} = this.props;
        return(
            
            <div className="col-lg-4 col-md-6 col-sm-12 item" onClick={() => this.handleNavigate(quickSearchItemData.meal_type)}>
                    <div className="left">
                        <img src={`./${quickSearchItemData.image}`} alt="" width="100%" height="150px"/>
                    </div>
                    <div className="right">
                        <div className="menu">{quickSearchItemData.name}</div>
                        <div className="menu-desc">{quickSearchItemData.content}</div>
                    </div>
                </div>
            
        )
    }
}

export default withRouter(QuickSearchItems);