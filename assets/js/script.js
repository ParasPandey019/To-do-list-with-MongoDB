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
    const queryString = `/delete-tasks/?ids=${idArr.join(',')}`;
    deleteLink.href = queryString;
    idArr.splice(0,idArr.length);
}