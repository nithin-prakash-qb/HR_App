const getDataLocation = () => {
    fetch("JSON/employee.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data)
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
label_2.innerHTML="Filter : "
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
t_h_1.innerHTML="Employee ID"
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
        for(let i=1;i<=5;i++){
            let table_data=document.createElement("td")
            if(i===1){
                table_data.innerHTML=`${element.employee_id}`
                table_row.appendChild(table_data)
            } else if(i===2){
                table_data.innerHTML=`${element.name}`
                table_row.appendChild(table_data)
            }else if(i===3){
                table_data.innerHTML=`${element.email_id}`
                table_row.appendChild(table_data)
            }else if(i===4){
                let table_data=document.createElement("td")
                table_data.setAttribute("class","skill_td")
                let count_skills=element["skills"].length
                element["skills"].forEach((element,index) => {
                    let table_data_new=document.createElement("p")
                    table_data_new.setAttribute("class","inline_prop")
                    // return(count_skills-1===index?table_data_new.innerHTML=` ${element}`:table_data_new.innerHTML=` ${element} , `)
                    let skillButton=document.createElement("button")
                    skillButton.innerHTML=`${element}`
                    table_data_new.appendChild(skillButton)
                    table_data.appendChild(table_data_new)
                });
                table_row.appendChild(table_data)

            }
            else {
                let icons=document.createElement("div")
                icons.setAttribute("class","icons")
                let sub_icon_1=document.createElement("i")
                sub_icon_1.setAttribute("class","fa-solid fa-eye")
                // sub_icon_1.setAttribute("data-e_id",element.employee_id)
                sub_icon_1.setAttribute("id",element.employee_id)
                sub_icon_1.onclick= ()=> modal_box_view();
                let sub_icon_2=document.createElement("i")
                sub_icon_2.setAttribute("class","fa-solid fa-pen-to-square")
                let sub_icon_3=document.createElement("i")
                sub_icon_3.setAttribute("class","fa-solid fa-trash")
                sub_icon_3.setAttribute("id",element.employee_id)
                sub_icon_3 .setAttribute("onclick",modal_delete);
                sub_icon_3 .onclick= ()=> modal_delete();
                icons.appendChild(sub_icon_1)
                icons.appendChild(sub_icon_2)
                icons.appendChild(sub_icon_3)
                table_data.appendChild(icons)
                table_row.appendChild(table_data)
            }
        }
        main_table.appendChild(table_row)   
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
t_r_1.appendChild(t_h_1)
t_r_1.appendChild(t_h_2)
t_r_1.appendChild(t_h_3)
t_r_1.appendChild(t_h_4)
t_r_1.appendChild(t_h_5)
addInitialData()


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
let submit_btn=document.getElementById("submit_btn")
submit_btn.addEventListener("click", modal_box_close);


//Adding details of the employee using submit button
let new_data_arr=[]
// localStorage.setItem("new_data_arr_1", JSON.stringify(new_data_arr));
submit_btn.addEventListener("click",addingData)
function addingData(){
    let new_data_obj={}
    // const location = JSON.parse(localStorage.getItem("empoyeeData"));
    
    let employee_id=document.getElementById("employee_id")
    let name=document.getElementById("name")
    let DOB=document.getElementById("DOB")
    let age=document.getElementById("age")
    let email=document.getElementById("email")
    let experiance=document.getElementById("experiance")
    let DOJ=document.getElementById("DOJ")
    let designation=document.getElementById("designation")
    let skills=document.getElementById("skills")
    let split_skill_array=skills.value.split(',')
    let location_detail=document.getElementById("location_detail")
    let table_row=document.createElement("tr")
    
    // adding data to table
    let isLastColumn=false
    for(let i=1;i<=11;i++){
        
        if(i===1){
            if(employee_id.value!==""){
                isLastColumn=true
                let table_data=document.createElement("td")
                table_data.innerHTML=employee_id.value
                table_row.appendChild(table_data)
                new_data_obj["employee_id"]=employee_id.value

            }
        } else if(i===2){
            if(name.value!==""){
                isLastColumn=true
                let table_data=document.createElement("td")
                table_data.innerHTML=name.value
                table_row.appendChild(table_data)
                new_data_obj["name"]=name.value
            }
            
        }else if(i===3){
            if(email.value!==""){
                isLastColumn=true
                let table_data=document.createElement("td")
                table_data.innerHTML=email.value
                table_row.appendChild(table_data)   
                new_data_obj["email_id"]=email.value
            }
        }else if(i===4){
            if(skills.value!==""){
                isLastColumn=true
                let table_data=document.createElement("td")
                table_data.setAttribute("class","skill_td")
                let count_skills=split_skill_array.length
                split_skill_array.forEach((element,index) => {
                    let table_data_new=document.createElement("p")
                    table_data_new.setAttribute("class","inline_prop")
                    let skillButton=document.createElement("button")
                    skillButton.innerHTML=`${element}`
                    table_data_new.appendChild(skillButton)
                    table_data.appendChild(table_data_new)
                });
                table_row.appendChild(table_data)
                new_data_obj["skills"]=skills.value
            }       
        }
        else if(i===5){
            if(isLastColumn===true){
                let table_data=document.createElement("td")
                let icons=document.createElement("div")
                icons.setAttribute("class","icons")
                let sub_icon_1=document.createElement("i")
                sub_icon_1.setAttribute("class","fa-solid fa-eye")
                // sub_icon_1.setAttribute("data-e_id",employee_id.value)
                sub_icon_1.setAttribute("id",employee_id.value)
                sub_icon_1.onclick= ()=> modal_box_view();
                let sub_icon_2=document.createElement("i")
                sub_icon_2.setAttribute("class","fa-solid fa-pen-to-square")
                let sub_icon_3=document.createElement("i")
                sub_icon_3.setAttribute("class","fa-solid fa-trash")
                // sub_icon_3.setAttribute("id",element.employee_id)
                sub_icon_3 .setAttribute("onclick",modal_delete);
                sub_icon_3 .onclick= ()=> modal_delete();
                icons.appendChild(sub_icon_1)
                icons.appendChild(sub_icon_2)
                icons.appendChild(sub_icon_3)
                table_data.appendChild(icons)
                table_row.appendChild(table_data)
            }
        }
        else if(i===6){
            new_data_obj["DOB"]=DOB.value
        }else if(i===7){
            new_data_obj["Age"]=age.value
        }else if(i===8){
            new_data_obj["experiance"]=experiance.value
        }else if(i===9){
            new_data_obj["designation"]=designation.value
        }else if(i===10) {
            new_data_obj["contact_details"]=location_detail.value
        }else{
            new_data_obj["DOJ"]=DOJ.value
        }
    }
    const location = JSON.parse(localStorage.getItem("empoyeeData"));
    location.details.push(new_data_obj)
    localStorage.setItem("empoyeeData",JSON.stringify(location));
    // console.log(new_data_arr)
    // localStorage.setItem("data_new_row", JSON.stringify(new_data_obj));
    main_table.appendChild(table_row)
    // const NewData = JSON.parse(localStorage.getItem("new_data_arr_1")); 
    // NewData.push(new_data_obj)  
}


// Viewing details of the employee 
function modal_box_view(){
    const location = JSON.parse(localStorage.getItem("empoyeeData"));
    let modal_box_view = document.getElementById("modal_box_view")
    modal_box_view.style.display="block"

        const x = JSON.parse(localStorage.getItem("empoyeeData"));
        // console.log(x["details"])
        x["details"].forEach(element => {
            console.log(element.employee_id)
            if(+event.target.id===+element.employee_id){
                document.getElementById("employee_id_!").value=element.employee_id
                document.getElementById("name_!").value=element.name
                document.getElementById("DOB_!").value=element["DOB"]
                document.getElementById("age_!").value=element.Age
                document.getElementById("email_!").value=element.email_id
                document.getElementById("experiance_!").value=element.experiance
                document.getElementById("DOJ_!").value=element["DOJ"]
                document.getElementById("designation_!").value=element.designation
                document.getElementById("skills_!").value=element.skills
                document.getElementById("location_detail_!").value=element.contact_details
            } 
        });
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
    let id = event.target.id;
    deleteEmployee(id);
    // modal_box_delete.style.transition="transform 5s"
}

// for hiding delete confirmatio box 
let delete_cross=document.getElementById("delete_cross")
delete_cross.addEventListener("click", modal_confirmation_close);
let deleteBtn = document.getElementById("no");
deleteBtn.addEventListener("click",modal_confirmation_close)
function modal_confirmation_close(){
    let modal_box_delete = document.getElementById("modal_box_delete")
    modal_box_delete.style.display="none"
}

function deleteEmployee(id) {
    let deleteBtn = document.getElementById("yes");
    deleteBtn.addEventListener("click",modal_confirmation_close)
        function modal_confirmation_close(){
            let modal_box_delete = document.getElementById("modal_box_delete")
            modal_box_delete.style.display="none"
        }
    deleteBtn.addEventListener("click",() => {
        const location = JSON.parse(localStorage.getItem("empoyeeData"));
        location["details"].forEach(element => {
            if(id == element.employee_id){     
                const index = location.details.indexOf(element);
                location.details = [...location.details.slice(0, index), ...location.details.slice(index + 1)];
                localStorage.setItem("empoyeeData", JSON.stringify(location));
                addInitialData();
            }
        });
        
        
    })
}

    


