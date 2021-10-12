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
        response.sort((a, b) => a.id - b.id);
        let buttonClassSetter;
        let listItemClassSetter;
        for (let i=0; i<response.length; i++){
            if (response[i].complete === true){
                buttonClassSetter = "btn btn-success btn-sm";
                listItemClassSetter = "text-black-50"
            }
            else {
                buttonClassSetter = "btn btn-outline-success btn-sm";
                listItemClassSetter = "text-dark"
            }
            el.append(`<li  class="list-group-item clearfix ${listItemClassSetter}" data-id=${response[i].id}>
            <span class="float-start">
                ${response[i].task}
            </span>
            <span class="float-end">
                <button class="completedButton float-right mx-1 ${buttonClassSetter}" data-id=${response[i].id}>Completed</button>
                <button class="deleteButton float-right btn btn-danger btn-sm mx-1" data-id=${response[i].id}>Delete</button>
            </span>
            </li>`)
        }
    }).catch(function(err){
        console.log(err);
        alert('error displaying tasks');
    })
} // end displayTasks