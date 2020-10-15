import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Pagination from '../components/Pagination';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ValidatedCreateUserForm from '../components/ValidatedCreateUserForm';
import ValidatedEditedForm from '../components/ValidatedEditUserForm';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { requestApiData, requestRemoveUser} from "../actions";
import * as userAction from '../userAction';
import styled from 'styled-components';
import { css, cx } from 'emotion'


class UserPage extends React.Component{
    constructor() {
        super();
        this.state = {
        lists: [],
        singleUser:[],
        singleViewUser:[],
        userId:'',
        singleUserId:'',
        editOpen:false,
        viewOpen:false,
        open:false,
        currentPage:1,
        postsPerPage:5,
        pageNumber:1
      
      };
      this.handleClose = this.handleClose.bind(this);
      this.handleEditClose = this.handleEditClose.bind(this);
      this.handleViewClose = this.handleViewClose.bind(this);
      this.paginate = this.paginate.bind(this);
    }

    componentDidMount() {
      this.props.requestApiData();
      this.setState({filter:""})
     }

     deleteUser(e, index){
      this.props.deleteUser(index);
    }

    paginate (pageNumber) {
      this.setState({currentPage:pageNumber});
      }


    editUser (user){
      this.setState({editOpen:true});
      this.setState({singleUser:user});
    }
    viewUser (user){
      this.setState({viewOpen:true});
      this.setState({singleViewUser:user});
    }

    handleEditClose (){
      this.setState({editOpen:false});
      this.props.requestApiData();
    }

    handleClose () {
      this.setState({open:false});
      this.props.requestApiData();

    }
    handleViewClose () {
      this.setState({viewOpen:false});
      this.props.requestApiData();
    }

handleChange = event => {
      this.setState({ filter: event.target.value });
    };
     render() {
        const getUsers = this.props.data;
        const {filter } = this.state;
        const lists = getUsers.users;
        const TableTitleText = styled.div`
            font-size:30px;
            color:black;
        `;
        
        const TableContainer = styled.div`
            padding-left: 5%;
            padding-right: 5%;
          
    `;
        
        if( typeof lists == 'undefined' || typeof filter == 'undefined'){
          return <h2>Loading...</h2>;
        }
        const lowercasedFilter = filter.toLowerCase();
        const filteredData = lists.filter(item => {
          return Object.keys(item).some(key =>
            item.email.toLowerCase().includes(lowercasedFilter) || item.active.toString().toLowerCase().includes(lowercasedFilter) 
        
          );
        });
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);
        return (
          <>
         
           < TableTitleText>User Table</ TableTitleText>
           <TableContainer>
            <input className="searchBar" value={filter} onChange={this.handleChange} placeholder="Search email or active status..."/>
           
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

    {currentPosts.map((u,key)=>(
        <tr key={key}>
          <td  >{u.id}</td>
          <td >{u.email}</td>
          <td >{u.jobs_count}</td>
          <td >{`${u.active}`}</td>
          <td>
            {/* <a className="btn btn-outline-success" href={`/users/${u.id}` }>View</a> */}
           <button className="btn btn-outline-success" onClick={()=>this.viewUser(u)}>View</button>
            <button className="btn btn-outline-info" onClick={()=>this.editUser(u)}>Edit</button>
            <button className="btn btn-outline-danger"  onClick={(e) => this.deleteUser(e, u.id)}>Delete</button>
         
          </td>
        </tr>
    ))}
    </tbody>
    </table>
        <button className="btn btn-outline-success"  onClick={() => this.setState({open:true})}>Add new user</button>
        

        </TableContainer>
          <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                style={{height:`1000px`}}
            >
                <DialogTitle >{"Add User"}</DialogTitle>
                <DialogContent>
                    <ValidatedCreateUserForm onClick={() => this.setState({open:false})}/>
                </DialogContent>
            </Dialog>
            <Dialog
                open={this.state.viewOpen}
                onClose={this.handleViewClose}
                style={{height:`1000px`}}
            >
                <DialogTitle >{"View user detail"}</DialogTitle>
                <DialogContent>
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <th>User ID:</th>
                            <td>{this.state.singleViewUser.id}</td>
                        </tr>
                        <tr>
                            <th>First name</th>
                            <td>{this.state.singleViewUser.first_name}</td>
                        </tr>
                        <tr>
                            <th>Last name:</th>
                            <td>{this.state.singleViewUser.last_name}</td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <td>{this.state.singleViewUser.email}</td>
                        </tr>
                        <tr>
                            <th>Jobs Count:</th>
                            <td>{this.state.singleViewUser.jobs_count}</td>
                        </tr>
                        <tr>
                            <th>Active</th>
                            <td>{`${this.state.singleViewUser.active}`}</td>
                        </tr>
                        <tr>
                            <th>Slack username</th>
                            <td>{this.state.singleViewUser.slack_username}</td>
                        </tr>
                  </tbody> 
                </table>
                </DialogContent>
                
            </Dialog>
 
        <Dialog
                open={this.state.editOpen}
                onClose={this.handleEditClose}
                style={{height:`fit-content`}}
            >
                <DialogTitle >{"Edit User"}</DialogTitle>
                <DialogContent>
                    <ValidatedEditedForm user={this.state.singleUser} onClick={() => this.setState({editOpen:false})} />
                </DialogContent>              
        </Dialog>
        <Pagination
        postsPerPage={this.state.postsPerPage}
        totalPosts={filteredData.length}
        paginate={this.paginate} 
      />
      <div
            className={css`
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            height:5%;
            background-color: black;
            color: white;
            text-align: center;
            `}
          >
            Emotion CSS-in-JS
          </div>
 <NotificationContainer/>
          </>
        );
      }
    
    
}

const mapStateToProps = state => ({ data: state.data});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ 
    requestApiData,  
    viewUser: index =>dispatch(userAction.viewUserInfo(index)),
    deleteUser: index =>dispatch(userAction.deleteUserInfro(index)),
    createUser: contact => dispatch(userAction.createUserInfo(contact)), }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
