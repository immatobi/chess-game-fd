import React, { Component } from 'react'

class ErrorBoundry extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             hasError: false
        }
    }
    

    static getDerivedStateFromError(err){

        return {
            hasError: true
        }

    }

    componentDidCatch(err, info){
        console.log(err, 'logged error');
        console.log(info, 'logged error info');
    }

    render() {
        
        if(this.state.hasError){
            return <h1>Something went wrong</h1>
        }

        return this.props.children;
        
    }

}

export default ErrorBoundry
