import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { requestApiData, requestRemoveUser,requestViewUser} from "../actions";
import * as userAction from '../userAction';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle'

// https://www.codingame.com/playgrounds/9169/simple-redux-create-delete-contact-application
class Home extends React.Component {
  constructor() {
    super();
    this.state = {
    singleUser:[],
  
  }
}
  componentDidMount() {
    this.props.requestApiData();
  }
  
  deleteContact(e, index){
    this.props.deleteContact(index);
  }
  
  viewContact(e, index){
    this.props.viewContact(index);
    console.log("viewing", this.props.viewContact(index));
  }

  render() {
    const getUsers = this.props.data;
  
    const u = this.props.user;
    console.log("uuuuu",u);
    if( typeof getUsers.users == 'undefined'){
      return <h2>Loading...</h2>;
    }
  return(
    <>
    <table className="table table-striped">
            <thead>
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Email</th>
                <th scope="col">Job count</th>
                <th scope="col">Active</th>
                <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>

    {getUsers.users.map((u,key)=>(
        <tr key={key}>
          <td  >{u.id}</td>
          <td >{u.email}</td>
          <td >{u.jobs_count}</td>
          <td >{`${u.active}`}</td>
          <td>
            {/* <a className="btn btn-outline-success" href={`/users/${u.id}` }>View</a> */}
           {/* <button className="btn btn-outline-success" onClick={()=>this.viewUser(u)}>View</button> */}
           <button className="btn btn-outline-success"  onClick={(e) => this.viewContact(e, u.id)}>View</button>
            <button className="btn btn-outline-info" onClick={()=>this.editUser(u)}>Edit</button>
            <button className="btn btn-outline-danger"  onClick={(e) => this.deleteContact(e, u.id)}>Delete</button>
         
          </td>
        </tr>
    ))}
    </tbody>
    </table>
    
    </>
  )}

}

// const mapStateToProps = state => ({ data: state.data});
// function mapStateToProps(state,ownProps) {
//   console.log("state",state) 
//   return{
//     data: state.data,

//   }
// }

const mapStateToProps = state => ({ data: state.data});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ 
    requestApiData,  
    viewContact: index =>dispatch(userAction.viewUserInfo(index)),
    deleteContact: index =>dispatch(userAction.deleteUserInfro(index)),
    createContact: contact => dispatch(userAction.createUserInfo(contact)), }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Home);
