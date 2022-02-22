import React from "react";
import '../Styles/details.css';
import queryString from 'query-string';
import Modal from 'react-modal';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import axios from 'axios';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      height: '550px',
      width: '450px'
    },
  };

class Details extends React.Component {
    constructor(){
        super();
        this.state = {
            restaurants: {},
            resId: undefined,
            menulist:[],
            galleryModalIsOpen: false,
            menuItemModalIsOpen: false,
            formModalIsOpen: false,
            total: 0,
            userName: undefined,
            userEmail: undefined,
            userContact: undefined,
            userAddress: undefined
        }
    }
    componentDidMount() {
        const qs = queryString.parse(this.props.location.search);
        const {restaurants} = qs;

            axios({
                url:`http://localhost:4567/getResById/${restaurants}`,
                method:'GET',
                headers:{'Content-Type': 'application/json'}
            })
    
            .then(res => {
                this.setState({ restaurants: res.data.restaurants, resId: restaurants})
            })
            .catch(err => console.log(err))   
    }

    handleModal = (state, value) => {
        const {resId} = this.state;
        if (state == "menuItemModalIsOpen" && value == true){
            axios({
                url:`http://localhost:4567/menuitems/${resId}`,
                method:'GET',
                headers:{'Content-Type': 'application/json'}
            })
    
            .then(res => {
                this.setState({ menulist: res.data.menulist})
            })
            .catch(err => console.log(err))   
        }
        this.setState({[state]: value});
    }

    addItems = (index, operationType) =>{
        let total = 0;
        const items = [...this.state.menulist];
        const item = items[index];

        if (operationType == 'add'){
            item.qty += 1;
        }
        else {
            item.qty -= 1;
        }
        items[index] = item;
        items.map((item)=> {
            total += item.qty * item.price;
        })
        this.setState({menulist: items, total:total});
    }

    handleFormDataChange = (event, state) => {
        this.setState({ [state]: event.target.value});
    }

    isData(val) {
        return Object.prototype.toString.call(val) === '[object Date]'
    }

    isObj = (val) => {
        return typeof val === 'object'
    }

    stringifyValue = (val) => {
        if (this.isObj(val) && !this.isDate(val)){
            return JSON.stringify(val)
        }
        else{
            return val
        }
    }

    buildForm = ({ action, params }) => {
        const form = document.createElement('form')
        form.setAttribute('method', 'post')
        form.setAttribute('action', action)

        Object.keys(params).forEach(key => {
            const input = document.createElement('input')
            input.setAttribute('type', 'hidden')
            input.setAttribute('name', key)
            input.setAttribute('value', this.stringifyValue(params[key]))
            form.appendChild(input)
        })
        return form
    }

    post = (details) => {
        const form = this.buildForm(details)
        document.body.appendChild(form)
        form.submit()
        form.remove()
    }

    getData = (data) => {
        return fetch(`http://localhost:4567/payment`,{
            method: 'POST',
            headers: {
                Accept:'application/json',
                'Content-Type' :'application/json'
            },
            body:JSON.stringify(data)
        }).then(response => response.json())
        .catch(err => console.log(err))
    }

    handlePayment = () => {
        const { total, userEmail } = this.state;
        if (!userEmail) {
            alert('Please fill the email');
        }
        else{
            const paymentObj = {
                amount: total,
                email: userEmail
            };

            this.getData(paymentObj).then(response => {
                var information = {
                    action: "https://securegw-stage.paytm.in/order/process",
                    params: response
                }
                this.post(information)
            })
        }
    }


    render() {
        const { restaurants, galleryModalIsOpen , menuItemModalIsOpen, menulist, total,formModalIsOpen} = this.state;
        return(
            <div>
                <img className="detail-image" src={`../${restaurants.image}`} alt="" width="100%" height="400px"/>
                <button className="gallery" onClick={ () =>this.handleModal('galleryModalIsOpen', true)}>Image Gallery</button>
    <div className="container">
        <div>
            <span className="res-name">{restaurants.name}</span>
            <span><button type="button" className="btn btn-outline-danger btn-lg order-button" onClick={ () =>this.handleModal('menuItemModalIsOpen', true)}>Place an Order</button></span>
        </div>
        
        <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Overview</button>
              <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Contact</button>
              
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                <div className="about">About this Place</div>
                <div className="food-type">Cuisine : {restaurants && restaurants.cuisine && restaurants.cuisine.map((cuisine =>`${cuisine.name}, `))}</div>
                <div className="avg-cost">Average Cost : {restaurants.min_price}</div>
            </div>
            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                <div className="phn-no">Contact No. : {restaurants.contact_number}</div>
                <div className="place">{restaurants.name}</div>
                <div className="place-add">{`${restaurants.locality}, ${restaurants.city}`}</div>
            </div>
          </div>
    </div> 

{/*gallery-modal*/}

    <Modal
        isOpen={galleryModalIsOpen}
        style={customStyles}>

         <div>
             <div className="fas fa-times remove-icon" onClick={ () =>this.handleModal('galleryModalIsOpen', false)}></div>
          <Carousel
          showThumbs = {false} >          
              {restaurants && restaurants.thumb && restaurants.thumb.map((item) => {
                  return <div>
                      <img src={`../${item}`} alt="" height="500px" /></div>
              })}  
            </Carousel>
         </div>   
      </Modal>

{/*menu-modal*/}


       <Modal
             isOpen={menuItemModalIsOpen}
             style={customStyles}>  

        <div>
             <div className="fas fa-times remove-icon" onClick={() =>this.handleModal('menuItemModalIsOpen', false)}></div>
             <h1 style={{color:'blue'}}>{restaurants.name}</h1>
             <h4 style={{color:'black'}}>Total: {total}</h4>

             {menulist.map((item, index)=>{
                 return <div >
                     <div className="row">
                         <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9" style={{width:"260px", height:'142px'}}>
                             <div className="fod-nam">{item.name}</div>
                             <div className="fod-qty">&#8377; {item.price}</div>
                             <div className="fod-desc">{item.description}</div>
                         </div>
                         <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3" >
                             <img className="menu-image" src={`../${item.image}`} style={{
                                 marginTop: '25px',
                                 width: '144px',
                                 borderRadius: '55px'
                             }}/>
                             {item.qty == 0 ? <div>
                                 <button className="add-button" onClick={()=> this.addItems(index, 'add')}>Add</button>
                                 </div>: 
                                 <div className="add-num"> 
                                 <button className="minus" onClick={()=>this.addItems(index, 'subtract')} style={{
                                     width: '33px',
                                     height: '30px'}}>-</button>   
                                 <span>{item.qty}</span>
                                 <button className="plus" onClick={()=>this.addItems(index, 'add')}style={{
                                     width: '33px',
                                     height: '30px',
                                 }}>+</button>
                                 </div>}
                         </div>
                     </div>
                 </div>
             })}
              <button className="btn btn-outline-danger pay-button" onClick={()=>{
                  this.handleModal('menuItemModalIsOpen', false);
                  this.handleModal('formModalIsOpen',true);
              }}>PayNow</button>
         </div>
        </Modal>

{/*form-modal*/}
    <Modal
         isOpen={formModalIsOpen}
         style={customStyles}>

          <div>   
              <div className="fas fa-times remove-icon" 
                 onClick={() =>this.handleModal('formModalIsOpen', false)}></div>
                  <h3>{restaurants.name}</h3>
                  <div>
                      <label><b>Name :</b></label>
                      <input className = "form-control" type="text" placeholder="Enter Name" 
                      style={{width:'400px'}} onChange={(event)=> this.handleFormDataChange(event, 'userName')}/>
                  </div>
                  <div>
                      <label><b>Email :</b></label>
                      <input className = "form-control" type="text" placeholder="Enter Email" 
                      style={{width:'400px'}}onChange={(event)=> this.handleFormDataChange(event, 'userEmail')}/>
                  </div>
                  <div>
                      <label><b>Address :</b></label>
                      <input className = "form-control" type="text" placeholder="Enter Address" 
                      style={{width:'400px'}} onChange={(event)=> this.handleFormDataChange(event, 'userAddress')}/>
                  </div>
                  <div>
                      <label><b>Contact No. :</b></label>
                      <input className = "form-control" type="text" placeholder="Enter Phone no." 
                      style={{width:'400px'}} onChange={(event)=> this.handleFormDataChange(event, 'userContact')}/>
                  </div>
                  <button className="btn btn-success" 
                  style={{float:'right',marginTop:'10px'}} onClick={this.handlePayment} >Proceed</button>
         </div>
    </Modal>

             {/*-----------------------------------------------------------------------*/}
    
            </div>
        )
    }
}

export default Details;