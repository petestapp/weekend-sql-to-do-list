$(document).ready(onReady);

function onReady(){
    displayTasks();
}

function displayTasks(){
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function(response){
        console.log('back from GET:', response);
        let el = $('#outputDiv');
        el.empty();
        for (let i=0; i<response.length; i++){
            el.append(`<li>${response[i].task}
            <button class="completedButton" data-id=${response[i].id}>Completed</button>
            <button class="deleteButton" data-id=${response[i].id}>Delete</button>
            </li>`)
        }
    }).catch(function(err){
        console.log(err);
        alert('problem getting tasks');
    })
}