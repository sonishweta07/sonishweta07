import React from 'react';
import '../Styles/home.css';
import Wallpaper from './Wallpaper';
import QuickSearch from './QuickSearch';
import axios from 'axios';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            locations:[],
            mealtypes:[]
        }
    }

    componentDidMount(){
        sessionStorage.clear();
        axios({
            url:'http://localhost:4567/locations',
            method:'GET',
            headers:{'Content-Type': 'application/json'}
        })

        .then(res => {
            this.setState({ locations: res.data.locations})
        })
        .catch(err => console.log(err))
//mealtypes
        axios({
            url:'http://localhost:4567/mealtypes',
            method:'GET',
            headers:{'Content-Type': 'application/json'}
        })

        .then(res => {
            this.setState({ mealtypes: res.data.mealtypes})
        })
        .catch(err => console.log(err))

    }

    render() {
        const { locations, mealtypes }= this.state;
        return(
            <div>
                <Wallpaper locationsData={locations} />
                <QuickSearch mealtypesData={mealtypes}/>
          </div>
        )
    }
}

export default Home;