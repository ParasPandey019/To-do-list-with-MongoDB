// arr that will contain the ids of checked tasks when delete button is clicked
const idArr = [];

const checkboxes = document.getElementsByClassName("checkboxes");
const deleteLink = document.getElementById("delete-link");
const dateElem = document.getElementById("date");

function checkList(){
    deleteLink.href = "";
    for(let checkbox of checkboxes){
        if(checkbox.checked){
            if(!idArr.includes(checkbox.value)){
                idArr.push(checkbox.value);
            }
        }
    }
    if(idArr.length !== 0){
        const queryString = `/delete-tasks/?ids=${idArr.join(',')}`; // converting array elements to string to send as query parameter
        deleteLink.href = queryString;
    }else{
        alert("Select something from the list"); //if nothing is selected then do nothing and pop an alert
        deleteLink.href = `#`;
    }
    idArr.splice(0,idArr.length);
}

// function to set min allowed date the current date
function setMinDate(){
    const today = new Date().toISOString().split('T')[0];
    dateElem.value = today;
    dateElem.min = today;
}

setMinDate();