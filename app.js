// Clicking add new employee button
let add_new_btn=document.getElementById("add_new")
add_new_btn.addEventListener("click", modal_box_add);
function modal_box_add(){
    let modal_box_add=document.getElementById("modal_box_add")
    modal_box_add.style.display="block"
}
//closng after adding new employee
let add_cross=document.getElementById("add_cross")
add_cross.addEventListener("click", modal_box_close);
function modal_box_close(){
    let modal_box_add=document.getElementById("modal_box_add")
    modal_box_add.style.display="none"
}
// Viewing details of the employee
function modal_box_view(){
    let modal_box_view = document.getElementById("modal_box_view")
    modal_box_view.style.display="block"
}
// Closing after viewing details of the employee
let view_cross=document.getElementById("view_cross")
view_cross.addEventListener("click", modal_view_close);
function modal_view_close(){
    let modal_box_view = document.getElementById("modal_box_view")
    modal_box_view.style.display="none"
}

// for showing delete confirmation box
function modal_delete(){
    let modal_box_delete= document.getElementById("modal_box_delete")
    modal_box_delete.style.display="block"
    // modal_box_delete.style.transition="transform 5s"
}

// for hiding delete confirmatio box 
let delete_cross=document.getElementById("delete_cross")
delete_cross.addEventListener("click", modal_confirmation_close);
function modal_confirmation_close(){
    let modal_box_delete = document.getElementById("modal_box_delete")
    modal_box_delete.style.display="none"
}

    
