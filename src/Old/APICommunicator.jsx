import React, { Component } from 'react';
class APICommunicator extends Component {
    render() { 
        return (
            <div class="ms-3 mt-3">
                <form onSubmit={this.props.postData}>
        			<div class ="mb-3">
        				<label class="form-label"> Tell Ellie what to speak:</label>
        				<input class="form-control w-25" onChange={this.props.onChange} type="text"/>
        			</div>
        			<button type="submit" class="btn btn-info" text="Submit">Submit</button>
      			</form>
            </div>
        );
    }
}
 
export default APICommunicator;