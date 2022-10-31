const getDataLocation = () => {
    fetch("JSON/employee.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data)
        localStorage.setItem("empoyeeData", JSON.stringify(data));
      });
  };
  getDataLocation();
// Creating Navigation Container
let parent=document.getElementById("parent")
let H1=document.createElement("h1")
H1.innerHTML=`HR management App`
parent.appendChild(H1)

let nav_container = document.createElement("div")
nav_container.setAttribute("id","nav_container")

let sort_filter=document.createElement("div")
sort_filter.setAttribute("id","sort_filter")

let add_employee_div=document.createElement("div")
add_employee_div.setAttribute("id","add_employee_div")

let s_f_div1=document.createElement("div")
s_f_div1.setAttribute("id","s_f_div1")

let s_f_div2=document.createElement("div")
s_f_div2.setAttribute("id","s_f_div2")

let add_new=document.createElement("button")
add_new.innerHTML="Add New"
add_new.setAttribute("id","add_new")

let label_1=document.createElement("label")
label_1.setAttribute("for","sort")
label_1.innerHTML="Sort : "
let sort=document.createElement("select")
sort.setAttribute("id","sort")

let option_a_1=document.createElement("option")
let option_a_2=document.createElement("option")
option_a_1.innerHTML="Name Sorting"
option_a_2.innerHTML="Employee ID Sorting"



let label_2=document.createElement("label")
label_2.setAttribute("for","filter")
label_1.innerHTML="Filter : "
let filter=document.createElement("select")
filter.setAttribute("id","filter")

let option_b_1=document.createElement("option")
let option_b_2=document.createElement("option")
let option_b_3=document.createElement("option")

option_b_1.innerHTML="JS"
option_b_2.innerHTML="TS"
option_b_3.innerHTML="Python"

let main_table=document.createElement("table")
main_table.setAttribute("id","main_table")

let t_r_1=document.createElement("tr")
let t_h_1=document.createElement("th")
t_h_1.innerHTML="Employee"
let t_h_2=document.createElement("th")
t_h_2.innerHTML="Name"
let t_h_3=document.createElement("th")
t_h_3.innerHTML="Email"
let t_h_4=document.createElement("th")
t_h_4.innerHTML="Skills"
let t_h_5=document.createElement("th")
t_h_5.innerHTML="Actions"

// Adding initial data
function addInitialData(){
    const location = JSON.parse(localStorage.getItem("empoyeeData"));
    location["details"].forEach(element => {
        let table_row=document.createElement("tr")
        let table_data=document.createElement("td")
        table_data.innerHTML="element[""]

    });
}



parent.appendChild(nav_container)
nav_container.appendChild(sort_filter)
nav_container.appendChild(add_employee_div)
sort_filter.appendChild(s_f_div1)
sort_filter.appendChild(s_f_div2)
add_employee_div.appendChild(add_new)
s_f_div1.appendChild(label_1)
s_f_div1.appendChild(sort)
s_f_div2.appendChild(label_2)
s_f_div2.appendChild(filter)
sort.appendChild(option_a_1)
sort.appendChild(option_a_2)
filter.appendChild(option_b_1)
filter.appendChild(option_b_2)
filter.appendChild(option_b_3)
parent.appendChild(main_table)
main_table.appendChild(t_r_1)
t_r_1.appendChild(t_h_2)
t_r_1.appendChild(t_h_3)
t_r_1.appendChild(t_h_4)
t_r_1.appendChild(t_h_5)




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

    


//   const location = JSON.parse(localStorage.getItem("empoyeeData"));