let add_new_btn=document.getElementById("add_new")
add_new_btn.addEventListener("click", modal_box_add);

function modal_box_add(){
    let modal_box_add=document.getElementById("modal_box_add")
    modal_box_add.style.display="block"
}
let add_cross=document.getElementById("add_cross")
add_cross.addEventListener("click", modal_box_close);
function modal_box_close(){
    let modal_box_add=document.getElementById("modal_box_add")
    modal_box_add.style.display="none"

}

let view_icon=document.getElementById("view_icon")
view_icon.addEventListener("click",modal_box_view)
function modal_box_view(){
    let modal_box_view = document.getElementById("modal_box_view")
    modal_box_view.style.display="block"

}

let view_cross=document.getElementById("view_cross")
view_cross.addEventListener("click", modal_view_close);
function modal_view_close(){
    let modal_box_view = document.getElementById("modal_box_view")
    modal_box_view.style.display="none"

}

let delete_icon = document.getElementById("delete_icon")
delete_icon.addEventListener("click",modal_delete)
function modal_delete(){
    let modal_box_delete= document.getElementById("modal_box_delete")
    modal_box_delete.style.display="block"
}

    
