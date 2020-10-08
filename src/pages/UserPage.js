import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Pagination from '../components/Pagination';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ValidatedCreateUserForm from '../components/ValidatedCreateUserForm';
import ValidatedEditedForm from '../components/ValidatedEditUserForm';


// https://stackoverflow.com/questions/51801907/how-to-create-react-search-filter-for-search-multiple-object-key-values
class ContactsListPage extends React.Component{
    constructor() {
        super();
        this.state = {
        lists: [],
        userId:'',
        singleUserId:'',
        editOpen:false,
        open:false,
        currentPage:1,
        postsPerPage:5,
        pageNumber:1
      
      };
      this.handleClose = this.handleClose.bind(this);
      this.handleEditClose = this.handleEditClose.bind(this);
      this.paginate = this.paginate.bind(this);
    }
    
  fetchAutoData() {
    const token = localStorage.getItem('token');
    const result =axios.get("/api/v2/users",{ 
    headers: {
        authorization: token,
      }, 
     }) .then(response => {
         
             this.setState({
               filter:"",
               lists: response.data.users
          })
    
     })
    console.log(result);
}
    componentDidMount() {
      this.fetchAutoData();
        
     }


  deleteUser(id) {
    const token = localStorage.getItem('token');
      try{
           axios.delete(`/api/v2/users/${id}`,{
              headers: {
                  authorization: token
                }
          });   
      }
      catch(error){
          console.log(error);
      }
      this.fetchAutoData();
  }

 paginate (pageNumber) {
  this.setState({currentPage:pageNumber});
  

  }


  editUser (id){
    this.setState({editOpen:true});
    this.setState({singleUserId:id});
 }

  handleEditClose (){
    this.setState({editOpen:false});
    this.fetchAutoData();
}

handleClose () {
  this.setState({open:false});
  this.fetchAutoData();

}

    handleChange = event => {
            this.setState({ filter: event.target.value });
          };

     render() {
        const {filter,lists } = this.state;
        if( typeof filter === 'undefined'){
          return <h2>Loading...</h2>;
         
        }

       
    
        const lowercasedFilter = filter.toLowerCase();
        const filteredData = lists.filter(item => {
          return Object.keys(item).some(key =>
            item.email.toLowerCase().includes(lowercasedFilter) || item.active.toString().toLowerCase().includes(lowercasedFilter) 
            // console.log("k",item.first_name)
          );
        });
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);

     
    
        return (
          <>
            <input class="searchBar" value={filter} onChange={this.handleChange} placeholder="Search email or active status..."/>
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
            <a className="btn btn-outline-success" href={`/users/${u.id}` }>View</a>
            {/* <Link to= {`/editInfo/${u.id}`}> */}
            <button className="btn btn-outline-info" onClick={()=>this.editUser(u.id)}>Edit</button>
            {/* </Link>
          */}
            <button className="btn btn-outline-danger" onClick={()=>this.deleteUser(u.id)}>Delete</button>
         
          </td>
        </tr>
    ))}
    </tbody>
    </table>
        <button className="btn btn-outline-success"  onClick={() => this.setState({open:true})}>Add new user</button>
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
                open={this.state.editOpen}
                onClose={this.handleEditClose}
                style={{height:`1000px`}}
            >
                <DialogTitle >{"Edit User"}</DialogTitle>
                <DialogContent>
                    <ValidatedEditedForm id={this.state.singleUserId} onClick={() => this.setState({editOpen:false})} />
                </DialogContent>              
        </Dialog>


        <Pagination
        postsPerPage={5}
        totalPosts={filteredData.length}
        paginate={this.paginate} 
      />

          </>
        );
      }
    
    
}
export default ContactsListPage;
