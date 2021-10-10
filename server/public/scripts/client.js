$(document).ready(onReady);

function onReady(){
    displayTasks();
    $('#addTaskButton').on('click', addTask);
    $('#outputDiv').on('click', '.completedButton', markTaskCompleted);
    $('#outputDiv').on('click', '.deleteButton', deleteTask);
} // end onReady

function addTask(){
    console.log('in addTask');
    let objectToSend = {
        task: $('#taskInput').val(),
        completed: false
    }
    console.log('sending:', objectToSend);
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: objectToSend
    }).then(function(response){
        console.log('back from POST:', response);
        $('#taskInput').val('');
        displayTasks();
    }).catch(function(err){
        console.log(err);
        alert('error adding task')
    })
}

function deleteTask(){
    console.log('in deleteTask:', $(this).data('id'));
    $.ajax({
        method: 'DELETE',
        url: '/tasks?id=' + $(this).data('id')
    }).then(function(response){
        console.log('back from delete:', response);
        displayTasks();
    }).catch(function(err){
        console.log(err);
        alert('error deleting task');
    })
} // end deleteTask

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
        alert('error displaying tasks');
    })
} // end displayTasks