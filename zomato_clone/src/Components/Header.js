import React from "react";
import '../Styles/header.css';
import GoogleLogin from "react-google-login";
import Modal from "react-modal";
import axios from 'axios';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor:'lightpink'
    }
  };

class Header extends React.Component {
    constructor(){
        super();
        this.state = {
            loginModalIsOpen: false,
            isLoggedIn: false,
            loggedInUser: undefined,
            accountModalIsOpen: false,
            loginAccountModalIsOpen: false,
            email:undefined, 
            password: undefined,
            firstname: undefined,
            lastname: undefined,
            user:[]
        }
    }

    responseGoogle = (response) => {
        this.setState({ isLoggedIn: true, loggedInUser: response.profileObj.name, loginModalIsOpen: false });
    }

    handleModal = (state, value) => {
      this.setState({ [state]: value});
    }

    handleLogout = () => {
        this.setState({ isLoggedIn: false, loggedInUser: undefined });
    }

    handleAccountDataChange = (event, state) => {
        this.setState({ [state]: event.target.value});
    }
// create-account

   handleAccount = () => {
        const {email, password, firstname, lastname} = this.state;
        const userObj = {email, password, firstname, lastname};

        axios({
            url:'http://localhost:4567/signup',
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            data: userObj
        })
        .then(res => {
            this.setState({ user: res.data.user , accountModalIsOpen: false , isLoggedIn: true, loggedInUser: userObj.firstname})
        })
        .catch(err => console.log(err))
    }

//login-account

    handleAccountLogin = () => {
        const {email, password, firstname} = this.state;
        const userObj = {email, password, firstname};

        axios({
            url:'http://localhost:4567/login',
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            data: userObj
        })
        .then(res => {
            if(res.data.isAuthenticated == true){
                this.setState({ user: res.data.user, loginAccountModalIsOpen: false, loginModalIsOpen:false,  
                                  isLoggedIn: true, loggedInUser: userObj.firstname})
            }
            else{
                alert("Invalid User !! No such account");
            }
            
        })
        .catch(err => console.log(err))
    }

    render(){
        const {loginModalIsOpen, isLoggedIn, loggedInUser, accountModalIsOpen, loginAccountModalIsOpen} = this.state;
        return(
            <div>
                <div className="header"></div>
                <button className="logo-filter" onClick={() => {window.location.href = '/'}}>e!</button>
                <div>
                {!isLoggedIn ?
                <div className="login-account">
                    <span class="fas fa-map-marker-alt map-icon"></span>
                   <button className="login" onClick={() => this.handleModal('loginModalIsOpen', true)}>Login</button>
                   <button className="account"onClick={() => this.handleModal('accountModalIsOpen',true)}>Create Account</button>
                </div>
                :<div className="login-account">
                   <span class="fas fa-map-marker-alt map-icon"></span>
                   <button className="login">{loggedInUser}</button>
                   <button className="account" style={{position:'absolute',left: '105px',width: '96px'}}
                   onClick={this.handleLogout}>LogOut</button>
                </div>}
                </div>

{/* google-login-modal*/}   

            <Modal
              isOpen={loginModalIsOpen}
              style={customStyles}>
                  <div>
                  <div className="fas fa-times remove" style={{float:'right', marginLeft: '20px', marginBottom:'20px'}} 
                      onClick={() => this.handleModal('loginModalIsOpen', false)}></div>
                      <div style={{marginTop:'5px', marginLeft: '20px'}}>
                  <GoogleLogin
                     clientId="538758106501-cpl9qtbgbum7kgc4dsnqfhgj41c970mb.apps.googleusercontent.com"
                     buttonText="Continue With Google"
                     onSuccess={this.responseGoogle}
                     onFailure={this.responseGoogle}
                     cookiePolicy={'single_host_origin'}
                     /> </div>
                     <div style={{fontWeight:'bold', textAlign:'center'}}>OR</div>
                     <button class="btn btn-success" style={{marginLeft: '10px'}} onClick={()=>this.handleModal('loginAccountModalIsOpen',true)}>Continue to your Account</button>
                  </div>
              </Modal>

 {/* account-modal*/}
              <Modal
              isOpen={accountModalIsOpen}
              style={customStyles}>

                <div>

                  <div className="fas fa-times remove-icon" 
                 onClick={() =>this.handleModal('accountModalIsOpen', false)}></div>
                  <div>
                      <label><b>First Name :</b></label>
                      <input className = "form-control" type="text" placeholder="Enter Firstname" 
                      style={{width:'400px'}} onChange={(event)=> this.handleAccountDataChange(event, 'firstname')}/>
                  </div>
                  <div>
                      <label><b>Last Name :</b></label>
                      <input className = "form-control" type="text" placeholder="Enter Lastname" 
                      style={{width:'400px'}}onChange={(event)=> this.handleAccountDataChange(event, 'lastname')}/>
                  </div>
                  <div>
                      <label><b>Email :</b></label>
                      <input className = "form-control" type="text" placeholder="Enter the email"
                      style={{width:'400px'}} onChange={(event)=> this.handleAccountDataChange(event, 'email')}/>
                  </div>
                  <div>
                      <label><b>Password :</b></label>
                      <input className = "form-control" type="password" placeholder="Enter the password" 
                      style={{width:'400px'}} onChange={(event)=> this.handleAccountDataChange(event, 'password')}/>
                  </div>
                  
                  <button className="btn btn-success" type="submit" 
                  style={{float:'right',marginTop:'10px'}} onClick={()=> this.handleAccount('accountModalIsopen',false)}>Create Account</button>
                
                </div>
              </Modal>    
{/*-----login-account----*/}


            <Modal
            isOpen={loginAccountModalIsOpen}
            style={customStyles}>

                 <div className="fas fa-times remove-icon" 
                 onClick={() =>this.handleModal('loginAccountModalIsOpen', false)}></div>
                <div>
                      <label><b>Email :</b></label>
                      <input className = "form-control" type="text" placeholder="Enter the email"
                      style={{width:'400px'}} onChange={(event)=> this.handleAccountDataChange(event, 'email')}/>
                  </div>
                  <div>
                      <label><b>Password :</b></label>
                      <input className = "form-control" type="password" placeholder="Enter the password" 
                      style={{width:'400px'}} onChange={(event)=> this.handleAccountDataChange(event, 'password')}/>
                  </div>
                  
                  <button className="btn btn-success" type="submit"
                  style={{float:'right',marginTop:'10px'}} onClick={()=> this.handleAccountLogin('loginAccountModalIsOpen', false)}>Login</button>

            </Modal>



            </div>
        )
    }
}

export default Header;