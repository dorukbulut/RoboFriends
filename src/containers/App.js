import React,{Component} from "react";
import CardList from "../components/CardList.js";
import SearchBox from "../components/SearchBox.js";
import Scroll from "../components/Scroll.js";
import ErrorBoundry from "../components/ErrorBoundry.js";
import "./App.css";


class  App extends Component{

    constructor(){
        super();
        this.state = {
            robots : [],
            seacrhfield : ""
        }
    }

    onSearchChange = (e) =>{
        this.setState({seacrhfield: e.target.value});
    }

    componentDidMount(){
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response=>{
                return response.json();
            })
            .then(users =>{
                this.setState({
                    robots: users,
                })
            })
        
        
    }

    render(){
        const filteredRobots = this.state.robots.filter(robot=>{
            return robot.name.toLowerCase().includes(this.state.seacrhfield.toLowerCase());
        })

        if(this.state.robots.lenght === 0) return <h1>Loading</h1>

        else {
            return (
                <div className="tc">
                    <h1 className="f1 ">RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundry>
                    </Scroll>
                    
                </div>
            );
        }
        
    }
    
};


export default App;



