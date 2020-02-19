class UI {

    constructor(){
        this.posts = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-btn');
        this.forState = 'add';
    }

    // Display Posts
    showPosts(posts){
        let output = '';
        posts.forEach((post) => {
            output += `
                <div class="alert alert-dark">
                    <p class=""> ${post.title} </p>
                    <p class=""> ${post.body} </p>
                    <a href="#" class="card-link edit">
                        <i id="${post.id}" class="fa fa-pencil"></i>
                    </a>
                    <a href="#" class="card-link delete">
                        <i id="${post.id}" class="fa fa-remove"></i>
                    </a>
                </div>
            `;
        });
        this.posts.innerHTML = output;
    }

    // show message
    showMessage(message, className){

        const div = document.createElement('div');
        div.className = className;
        div.appendChild(document.createTextNode(message));

        const card = document.querySelector('.card');
        const form = document.querySelector('.form');
        
        card.insertBefore(div, form);

        setTimeout(() => {
            this.clearMessage();
        }, 3000);
    }

    // clear Message
    clearMessage(){
        const alert = document.querySelector('.alert');
        if(alert){
            alert.remove();
        }
        
    }

    // clear field values
    clearField(){
        this.titleInput.value = '';
        this.bodyInput.value = '';
    }

    // edit click to form fill
    fillForm(data){
        this.idInput.value = data.id;
        this.titleInput.value = data.title;
        this.bodyInput.value= data.body;

        this.changeFormState('edit');
    }

    // change edit
    changeFormState(type){

        if(type === 'edit'){
            this.postSubmit.textContent = 'Update Post!';
            this.postSubmit.className = 'post-submit btn btn-success btn-block';

            const form = document.querySelector('.form');
            const formEnd = document.querySelector('.form-end');

            const button = document.createElement('button');
            button.className = 'post-cancel btn btn-light w-100 mt-2';
            button.appendChild(document.createTextNode('Update Cancel!'));
            form.insertBefore(button, formEnd);

        }
        else{
            this.postSubmit.textContent = 'Post It!';
            this.postSubmit.className = 'post-submit btn btn-primary btn-block';
            if(document.querySelector('.post-cancel')){
                this.clearField();
                document.querySelector('.post-cancel').remove();
            }
        }
    }

}


export const ui = new UI();