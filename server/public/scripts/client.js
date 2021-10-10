$(document).ready(onReady);

function onReady(){
    displayTasks();
    $('#outputDiv').on('click', '.completedButton', markTaskCompleted);
    $('#outputDiv').on('click', '.deleteButton', deleteTask);
} // end onReady

function markTaskCompleted(){
    console.log('in markTaskCompleted:', $(this).data('id'));
    $.ajax({
        method:'PUT',
        url: '/tasks?id=' + $(this).data('id')
    }).then(function(response){
        console.log('back from update:', response);
        displayTasks();
    }).catch(function(err){
        console.log(err);
        alert('error marking task as completed');
    })
} // markTaskCompleted

function deleteTask(){
    console.log('in deleteTask:', $(this).data('id'));
} // end deleteTask

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
} // end displayTasks