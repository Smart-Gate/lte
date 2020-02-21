<template>
    <div class="container">
        <div class="row">
          <div class="col-md-12 mt-4">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Users table</h3> 
                <div class="card-tools">
              <button class="btn btn-success" @click="newModal">Add new
              <i class="fa fa-w fa-user-plus"></i>
              </button>
              </div>
              </div>
              
              
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Type</th>
                      <th>Registed at</th>
                      <th>Modify</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <tr v-for="user in users" :key="user.id">
                         <td>{{user.id}}</td>
                         <td>{{user.name|upText}}</td>
                         <td>{{user.email}}</td>
                         <td>{{user.type}}</td>
                         <td>{{user.created_at|myDate}}</td>
                      <td><a href="#">
                      <i class="fa fa-edit text-blue" @click="editModal(user)"></i>
                      </a>
                      <a href="#">
                      <i class="fa fa-trash text-red" @click="deleteUser(user.id)"></i>
                      </a>
                      </td>
                      </tr>
                     
                    
                    
                  </tbody>
                </table>
                <!-- Modal -->
<div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel" v-show="!editMode">Add New</h5>
        <h5 class="modal-title" id="exampleModalLabel" v-show="editMode">Update User info</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
       <form @submit.prevent="editMode ? updateUser() : createUser()">
      <div class="modal-body">
       <div class="form-group">
      
      <input v-model="form.name" type="text" name="name" placeholder="Name"
        class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
      <has-error :form="form" field="name"></has-error>
    </div>
     <div class="form-group">
      <input v-model="form.email" type="email" name="email" placeholder="Email"
        class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
      <has-error :form="form" field="email"></has-error>
    </div>
      <div class="form-group">
      <textarea v-model="form.bio" type="text" name="bio" placeholder="Bio"
        class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }"></textarea>
      <has-error :form="form" field="bio"></has-error>
    </div>
    <div class="form-group">
      <select v-model="form.type"  name="type" 
        class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">
        <option value="" disabled selected>Select user Role</option>
        <option value="Admin">Admin</option>
        <option value="Standard">Standard</option>
        <option value="Author">Author</option>
        </select>
      <has-error :form="form" field="type"></has-error>
    </div>
     <div class="form-group">
      <input v-model="form.password" type="password" name="password" placeholder="password"
        class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
      <has-error :form="form" field="password"></has-error>
    </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        <button type="submit"  class="btn btn-primary" v-show="!editMode">Create</button>
        <button type="submit" class="btn btn-success" v-show="editMode">Update</button>
      </div>
      </form>
      
    </div>
  </div>
</div>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
              editMode:false,
              users:{},
                form:new Form({
                    id:'',
                    name:'',
                    email:'',
                    password:'',
                    bio:'',
                    photo:'',
                    type:'',
                }),

            }
        },
        methods:{
          newModal(){
            this.editMode = false;
            this.form.reset();
            $('#addNew').modal('show');
          },
          editModal(user){
            this.editMode = true;
            this.form.reset();
            $('#addNew').modal('show');
            this.form.fill(user);
          },
            createUser(){
              this.$Progress.start();
                this.form.post('api/user').then(()=>{
Fire.$emit('AfterCreate');
                Toast.fire({
  icon: 'success',
  title: 'User Created Successfully'
})
                this.$Progress.finish();
                $('#addNew').modal('hide');
                }).catch();
                
            },
            updateUser(id){
              // console.log('editig data');
              this.form.put("api/user/"+this.form.id).then(()=>{
                this.$Progress.start();
                Fire.$emit('AfterUpdate');
                $('#addNew').modal('hide');
                Toast.fire({
  icon: 'success',
  title: 'User Updated Successfully'
})
                this.$Progress.finish();
                

              }).catch(()=>{
                this.$Progress.fail();
              });
            },
            loadUsers(){
              
              axios.get("api/user").then(({data})=>(this.users = data.data));
              
            },
            deleteUser(id){
            Swal.fire({  
            title: 'Are you sure?',  
            text: "You won't be able to revert this!",  
            icon: 'warning',  
            showCancelButton: true,  
            confirmButtonColor: '#3085d6',  
            cancelButtonColor: '#d33',  
            confirmButtonText: 'Yes, delete it!'  
          }).then((result) => { 
            // send request to the server
            this.form.delete('api/user/'+id).then(()=>{
              if (result.value) {  
              Swal.fire(  
                'Deleted!',  
                'Your file has been deleted.',  
                'success'  
              );
              Fire.$emit('AfterDelete'); 
            }
            }).catch(()=>{
              Swal("Faild!","there was some thing wrong");
              
          })
            });  
            },
           
        },
         created(){
           
              this.loadUsers();
              Fire.$on('AfterCreate',()=>this.loadUsers());
              Fire.$on('AfterDelete',()=>this.loadUsers());
              Fire.$on('AfterUpdate',()=>this.loadUsers());
              
            },
        
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
