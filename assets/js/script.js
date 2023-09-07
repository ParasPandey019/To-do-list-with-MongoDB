const idArr = [];

const checkboxes = document.getElementsByClassName("checkboxes");
const deleteLink = document.getElementById("delete-link");

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
        const queryString = `/delete-tasks/?ids=${idArr.join(',')}`;
        deleteLink.href = queryString;
    }else{
        alert("Select something from the list");
        deleteLink.href = `#`;
    }
    idArr.splice(0,idArr.length);
}