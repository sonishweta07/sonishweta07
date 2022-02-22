import React from "react";
//import '../Styles/home.css';
import QuickSearchItems from './QuickSearchItems';

class QuickSearch extends React.Component{
    render(){
        const {mealtypesData} = this.props;
        return(
            <div>
                <div className="container">
                     <div className="quick">Quick Searches</div>
                     <div className="quick-desc">Discover the restaurants by type of meal</div>
                 <div className="row"> 
                     {mealtypesData.map((item)=>{
                       return < QuickSearchItems quickSearchItemData={item}/>
                     })}
                  </div>
              </div>
          </div>
        )
    }
}

export default QuickSearch;