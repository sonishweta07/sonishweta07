import React from 'react';
import '../Styles/filter.css';
import queryString from 'query-string';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

class Filter extends React.Component {
    constructor(){
        super();
        this.state = {
            restaurants: [],
            locations: [],
            mealtype: undefined,
            location: undefined,
            cuisine: undefined,
            lcost: undefined,
            hcost: undefined,
            sort: 1,
            page: 1
        }
    }
    componentDidMount() {
        const qs = queryString.parse(this.props.location.search);
        const {mealtype, location} = qs;

        const filterObj = {
            mealtype: mealtype,
            location: location
            
        };

        axios({
            url:'http://localhost:4567/filter',
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            data: filterObj
        })
        .then(res => {
            this.setState({restaurants: res.data.restaurants, mealtype, location, pageCount:res.data.data})
        })
        .catch(err => console.log(err))
        
        axios({
            url:'http://localhost:4567/locations',
            method:'GET',
            headers:{'Content-Type': 'application/json'}
        })

        .then(res => {
            this.setState({ locations: res.data.locations})
        })
        .catch(err => console.log(err))
    }


    handleSortChange = (sort) => {
        const {mealtype, cuisine, location, lcost, hcost, page} = this.state;
        const filterObj = {
            mealtype: mealtype,
            cuisine: cuisine,
            location: location,
            lcost,
            hcost,
            sort,
            page
        };

        axios({
            url:'http://localhost:4567/filter',
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            data: filterObj
        })
        .then(res => {
            this.setState({ restaurants: res.data.restaurants, sort, pageCount:res.data.data})
        })
        .catch(err => console.log(err))
    }
//cost change
    handleCostChange= (lcost , hcost)=> {
        const {mealtype, cuisine, location,sort, page} = this.state;
        const filterObj = {
            mealtype: mealtype,
            cuisine: cuisine,
            location: location,
            lcost:lcost,
            hcost:hcost,
            sort,
            page
        };

        axios({
            url:'http://localhost:4567/filter',
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            data: filterObj
        })
        .then(res => {
            this.setState({ restaurants: res.data.restaurants, lcost, hcost,pageCount:res.data.data})
        })
        .catch(err => console.log(err))

    }
//location change 
    handleLocationChange = (event) => {
        const location = event.target.value;
        const { mealtype, cuisine, lcost, hcost, sort, page } = this.state;

        const filterObj = {
            mealtype: mealtype,
            cuisine: cuisine,
            location: location,
            lcost,
            hcost,
            sort,
            page
        };

        axios({
            url: 'http://localhost:4567/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(res => {
                this.setState({ restaurants: res.data.restaurants, location ,pageCount:res.data.data})
            })
            .catch(err => console.log(err))
    }
//cuisine change
        handleCuisineChange = (cuisine) => {
            const {mealtype, location,sort, page ,lcost, hcost} = this.state;

            const filterObj = {
            mealtype: mealtype,
            location: location,
            cuisine : cuisine,
            lcost,
            hcost,
            sort,
            page
        };

        axios({
            url:'http://localhost:4567/filter',
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            data: filterObj
        })
        .then(res => {
            this.setState({ restaurants: res.data.restaurants, cuisine,pageCount:res.data.data});
        })
        .catch(err => console.log(err))
    }
 //pagination   
    handlePageClick = (page) => {
        const data = page.selected + 1;
        const {mealtype, location,sort,lcost, hcost, cuisine, pageCount} = this.state;

        const filterObj = {
        mealtype: mealtype,
        location: location,
        cuisine : cuisine,
        lcost,
        hcost,
        sort,
        page: data,
        pageCount
        };

     axios({
        url:'http://localhost:4567/filter',
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        data: filterObj
       })
        .then(res => {
        this.setState({ restaurants: res.data.restaurants, pageCount:res.data.data});
       })
       .catch(err => console.log(err))
    }
 handleNavigate = (resId) =>{
     this.props.history.push(`/details?restaurants=${resId}`)
 }

    render(){
        const {restaurants, locations, pageCount} = this.state;
        return(
            <div>
        
        {/*------------------------header----------------------------*/}
    <div className="quote">Breakfast Places in Mumbai</div>

                           {/*------------------------left-box----------------------------*/}
    <div className="container">
        <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12 left-box">
                <div className="filter-section">
                    <div>
                        <span className="one">Filters/Sort</span>
                        <span className="fas fa-chevron-down drop-icon" data-bs-toggle="collapse" data-bs-target="#filters"></span>
                    </div>

                    <div id="filters" className="show">
                           <div className="two">Search Location</div>
                           <div className="three">
                              <select className="location" onChange={this.handleLocationChange}>
                                <option>Select</option>
                                {locations.map((item) => {
                                return <option value={item.location_id}>{`${item.name}, ${item.city}`}</option>
                                        })}
                              </select>
                         </div>
                         <div className="two">Cuisine</div>
                         <div className="four">
                            <input type="checkbox" onChange={()=> this.handleCuisineChange(1)} /> North Indian<br/>
                            <input type="checkbox" onChange={()=> this.handleCuisineChange(2)}/> South Indian<br/>
                            <input type="checkbox" onChange={()=> this.handleCuisineChange(3)}/> Chinese<br/>
                            <input type="checkbox" onChange={()=> this.handleCuisineChange(4)}/> Fast Food<br/>
                            <input type="checkbox" onChange={()=> this.handleCuisineChange(5)}/> Street Food<br/>
                         </div>
                         <div className="two">Cost for two</div>
                         <div className="four">
                            <input type ="radio" name="cost"  onChange={()=> this.handleCostChange(1, 500)}/> less than &#8377;500<br/>
                            <input type ="radio" name="cost"  onChange={()=> this.handleCostChange(500, 1000)}/> &#8377;500  to  &#8377;1000<br/>
                            <input type ="radio" name="cost"  onChange={()=> this.handleCostChange(1000, 1500)}/> &#8377;1000 to &#8377;1500<br/>
                            <input type ="radio" name="cost"  onChange={()=> this.handleCostChange(1500, 2000)}/> &#8377;1500 to &#8377;2000<br/>
                            <input type ="radio" name="cost"  onChange={()=> this.handleCostChange(2000, 50000)}/> &#8377;2000 and above<br/>
                         </div>
                         <div className="two">Sort</div>
                         <div className="four">
                            <input type ="radio" name="price"   onChange={()=> this.handleSortChange(1)} /> Price Low to High<br/>
                            <input type ="radio" name="price"   onChange={ ()=> this.handleSortChange(-1)}/> Price High to Low<br/>
                         </div>
                     </div>
                </div>
            </div>


            {/*-----------------------------------right-box------------------------*/}
            <div className="col-lg-8 col-md-8 col-sm-12 right-box">
          {restaurants.length !==0 ? restaurants.map((item) => {
            return <div className="items" onClick={()=>this.handleNavigate(item._id)}>
                        <div className="left-item">
                             <div><img src="Assets/breakfast.jpg" alt="" /></div>
                            <div className="zero">
                               <div className="a">Cuisine:</div>
                               <div className="a">Cost for Two:</div>
                          </div>
                       </div>
                       <div className="right-item">
                           <div className="top-head">
                           <div className="restaurants">{item.name}</div>
                           <div className="desc">{item.locality}</div>
                           <div className="address">{item.city}</div>
                       </div>
                       <hr/>
                       <div className="category">
                          <div className="b"> {item.cuisine.map((cuisine) => `${cuisine.name}, `)} </div>
                          <div className="b">&#8377; {item.min_price}</div>
                       </div>
                     </div>
                  </div>
                 }):<div><b>No Data Found......</b></div>}  


{restaurants.length !==0 ? <div className="pagination" >
                  <ReactPaginate 
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  breakLabel={"..."}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={3}
                  onPageChange={this.handlePageClick}
                  containerClassName={"pagination justify-content-center"}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link"}
                  previousClassName={"page-item"}
                  previousLinkClassName={"page-link"}
                  nextClassName={"page-item"}
                  nextLinkClassName={"page-link"}
                  breakClassName={"page-item"}
                  breakLinkClassName={"page-link"}
                  activeClassName={"active"}
                  /></div>: null}
              </div>  
        </div>
   </div>                       

            </div>
        )
    }
}

export default Filter;