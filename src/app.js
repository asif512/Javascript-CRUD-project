import { http } from './http';
import { ui } from './ui';

// DOM loaded to get post
document.addEventListener('DOMContentLoaded', getPosts);

// post submit event
document.querySelector('.post-btn').addEventListener('click', submitPost);

// delete post event
document.querySelector('#posts').addEventListener('click', deletePost);

// edit post event
document.querySelector('#posts').addEventListener('click', enableEdit);

// post edit cancel event
document.querySelector('.form').addEventListener('click', postEditCancel);

// get posts
function getPosts(){
    http.getPosts('http://localhost:3000/posts')
        .then(data => ui.showPosts(data))
        .catch(err => console.log(err));
}

// submit post
function submitPost() {
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    const id = document.querySelector('#id').value;
    console.log(id);
    const data = {
        title,
        body
    }
    if(title === '' || body === ''){
        ui.showMessage('Fill all the input field!', 'alert alert-info');
    }
    else{
        
        if(id === ''){
            // create post
            http.submitPost('http://localhost:3000/posts',data)
            .then(data => {   
                ui.showMessage('Post submitted sucessfully!!', 'alert alert-success');
                getPosts();
                ui.clearField();
            })
            .catch(err => console.log(err));  
        }else{

            // update post
            http.putPost(`http://localhost:3000/posts/${id}`, data)
                .then(data => {
                    ui.showMessage('Post Update sucessfully!', 'alert alert-success');
                    ui.changeFormState('add');
                    getPosts();
                })
                .catch(err => console.log(err));
        }
    }
}

// delete post

function deletePost(e){
    
    if(e.target.parentElement.classList.contains('delete')){
    
        const id = e.target.id;
        if(confirm('Are you sure?')){
            http.deletePost(`http://localhost:3000/posts/${id}`)
                .then(data => {
                    getPosts();
                    ui.showMessage('Post Deleted!!', 'alert alert-danger')
                })
                .catch(err => console.log(err));
        }
        
    }

    e.preventDefault();

}

// Enable input filed
function enableEdit(e){

    if(e.target.parentElement.classList.contains('edit')){
        const id = e.target.id;
        const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const body = e.target.parentElement.previousElementSibling.textContent;

        const data = {
            id,
            title,
            body
        }
        ui.fillForm(data);
    }
    e.preventDefault();
}

// post edit cancel
function postEditCancel(e){

    if(e.target.classList.contains('post-cancel')){
        ui.changeFormState('add');
        ui.clearField();
    }
    
    e.preventDefault();
}