// localStorage.clear();
const getDataLocation = () => {
  fetch("JSON/employee.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      localStorage.setItem("empoyeeData", JSON.stringify(data));
    });
};

localStorage.getItem("empoyeeData") === null && getDataLocation();

// Creating table and adding the initial data
let parent = document.getElementById("parent");
let main_table = document.createElement("table");
main_table.setAttribute("id", "main_table");

let t_r_1 = document.createElement("tr");
let t_h_1 = document.createElement("th");
t_h_1.innerHTML = "Employee ID";
let t_h_2 = document.createElement("th");
t_h_2.innerHTML = "Name";
let t_h_3 = document.createElement("th");
t_h_3.innerHTML = "Email";
let t_h_4 = document.createElement("th");
t_h_4.innerHTML = "Skills";
let t_h_5 = document.createElement("th");
t_h_5.innerHTML = "Actions";

parent.appendChild(main_table);
main_table.appendChild(t_r_1);
t_r_1.appendChild(t_h_1);
t_r_1.appendChild(t_h_2);
t_r_1.appendChild(t_h_3);
t_r_1.appendChild(t_h_4);
t_r_1.appendChild(t_h_5);

// Function to add initial data
function addInitialData() {
  const location = JSON.parse(localStorage.getItem("empoyeeData"));
  location["details"].forEach((element) => {
    let table_row = document.createElement("tr");
    for (let i = 1; i <= 5; i++) {
      let table_data = document.createElement("td");
      if (i === 1) {
        table_data.innerHTML = `${element.employee_id}`;
        table_row.appendChild(table_data);
      } else if (i === 2) {
        table_data.innerHTML = `${element.name}`;
        table_row.appendChild(table_data);
      } else if (i === 3) {
        table_data.innerHTML = `${element.email_id}`;
        table_row.appendChild(table_data);
      } else if (i === 4) {
        let table_data = document.createElement("td");
        table_data.setAttribute("class", "skill_td");
        // console.log(typeof element["skills"])
        // console.log(element["skills"])
        // console.log(Object.keys(element["skills"]).length)
        // let count_skills = element["skills"].length;
        // console.log(count_skills)
        console.log("*",element.skills)
        // let count_skills = Object.keys(element["skills"]).length.length;
        element.skills.forEach((element, index) => {
          let table_data_new = document.createElement("p");
          table_data_new.setAttribute("class", "inline_prop");
          let skillButton = document.createElement("button");
          skillButton.innerHTML = `${element}`;
          table_data_new.appendChild(skillButton);
          table_data.appendChild(table_data_new);
        console.log(element)
        });
        table_row.appendChild(table_data);
      } else {
        let icons = document.createElement("div");
        icons.setAttribute("class", "icons");
        let sub_icon_1 = document.createElement("i");
        sub_icon_1.setAttribute("class", "fa-solid fa-eye");
        sub_icon_1.setAttribute("id", element.employee_id);
        sub_icon_1.setAttribute("onclick", modal_box_view);
        sub_icon_1.onclick = () => modal_box_view();
        let sub_icon_2 = document.createElement("i");
        sub_icon_2.setAttribute("class", "fa-solid fa-pen-to-square");
        let sub_icon_3 = document.createElement("i");
        sub_icon_3.setAttribute("class", "fa-solid fa-trash");
        sub_icon_3.setAttribute("id", element.employee_id);
        sub_icon_3.setAttribute("onclick", modal_delete);
        sub_icon_3.onclick = () => modal_delete();
        icons.appendChild(sub_icon_1);
        icons.appendChild(sub_icon_2);
        icons.appendChild(sub_icon_3);
        table_data.appendChild(icons);
        table_row.appendChild(table_data);
      }
    }
    main_table.appendChild(table_row);
  });
}

addInitialData();

// Clicking add new employee button to show modal box
let add_new_btn = document.getElementById("add_new");
add_new_btn.addEventListener("click",() => {
    let modal_box_add = document.getElementById("modal_box_add");
    modal_box_add.style.display = "block";
  } );


//closng after adding new employee using both cross and submit button
let add_cross = document.getElementById("add_cross");
add_cross.addEventListener("click", modal_box_close);

let submit_btn = document.getElementById("submit_btn");
submit_btn.addEventListener("click", modal_box_close);

function modal_box_close() {
  let modal_box_add = document.getElementById("modal_box_add");
  modal_box_add.style.display = "none";
}

//Adding details of the employee using submit button
submit_btn.addEventListener("click", addingData);
function addingData() {
  let new_data_obj = {};
  let employee_id = document.getElementById("employee_id");
  let name = document.getElementById("name");
  let DOB = document.getElementById("DOB");
  let age = document.getElementById("age");
  let email = document.getElementById("email");
  let experiance = document.getElementById("experiance");
  let DOJ = document.getElementById("DOJ");
  let designation = document.getElementById("designation");
  let skills = document.getElementById("skills");
  let split_skill_array = skills.value.split(",");
  let location_detail = document.getElementById("location_detail");
  let table_row = document.createElement("tr");

  // adding data to table when user fills data
    //employeeid,name,email,skills sould not be empty
    for(let i=1;i<=5;i++){
        let table_data = document.createElement("td");
        if(i===1){
            let table_data = document.createElement("td");
            table_data.innerHTML = employee_id.value;
            table_row.appendChild(table_data);
            new_data_obj["employee_id"] = +employee_id.value;
        }else if(i===2){
            table_data.innerHTML = name.value;
            table_row.appendChild(table_data);
            new_data_obj["name"] = name.value;
        }else if(i===3){
            table_data.innerHTML = email.value;
            table_row.appendChild(table_data);
            new_data_obj["email_id"] = email.value;
        }else if(i===4){
            if(skills.value!==""){
                table_data.setAttribute("class", "skill_td");
                let count_skills = split_skill_array.length;
                console.log(count_skills)
                console.log(split_skill_array)
                split_skill_array.forEach((element, index) => {
                  let table_data_new = document.createElement("p");
                  table_data_new.setAttribute("class", "inline_prop");
                  let skillButton = document.createElement("button");
                  skillButton.innerHTML = `${element}`;
                  table_data_new.appendChild(skillButton);
                  table_data.appendChild(table_data_new);
                // new_data_obj["skills"] = skills.value.split(',');
              })
            }
            table_row.appendChild(table_data);
            
        }else{
            let table_data = document.createElement("td");
            let icons = document.createElement("div");
            icons.setAttribute("class", "icons");
            let sub_icon_1 = document.createElement("i");
            sub_icon_1.setAttribute("class", "fa-solid fa-eye");
            sub_icon_1.setAttribute("id", employee_id.value);
            sub_icon_1.setAttribute("onclick", modal_box_view);
            sub_icon_1.onclick = () => modal_box_view();
            let sub_icon_2 = document.createElement("i");
            sub_icon_2.setAttribute("class", "fa-solid fa-pen-to-square");
            let sub_icon_3 = document.createElement("i");
            sub_icon_3.setAttribute("class", "fa-solid fa-trash");
            sub_icon_3.setAttribute("id", employee_id.value);
            sub_icon_3.setAttribute("onclick", modal_delete);
            sub_icon_3.onclick = () => modal_delete();
            icons.appendChild(sub_icon_1);
            icons.appendChild(sub_icon_2);
            icons.appendChild(sub_icon_3);
            table_data.appendChild(icons);
            table_row.appendChild(table_data);
        }
    }
      new_data_obj["DOB"] = DOB.value;
    
      new_data_obj["Age"] = age.value;
    
      new_data_obj["experiance"] = experiance.value;
    
      new_data_obj["designation"] = designation.value;
    
      new_data_obj["contact_details"] = location_detail.value;
  
      new_data_obj["DOJ"] = DOJ.value;
    
  
  const full_data = JSON.parse(localStorage.getItem("empoyeeData"));
  full_data["details"].push(new_data_obj);
  localStorage.setItem("empoyeeData", JSON.stringify(full_data));
  main_table.appendChild(table_row);
}

// Viewing details of the employee
function modal_box_view() {
  let id = event.target.id;
  let modal_box_view = document.getElementById("modal_box_view");
  modal_box_view.style.display = "block";
  const full_data = JSON.parse(localStorage.getItem("empoyeeData"));
  full_data["details"].forEach((element) => {
    if (+event.target.id === +element.employee_id) {
      document.getElementById("employee_id_!").value = element.employee_id;
      document.getElementById("name_!").value = element.name;
      document.getElementById("DOB_!").value = element["DOB"];
      document.getElementById("age_!").value = element.Age;
      document.getElementById("email_!").value = element.email_id;
      document.getElementById("experiance_!").value = element.experiance;
      document.getElementById("DOJ_!").value = element["DOJ"];
      document.getElementById("designation_!").value = element.designation;
      document.getElementById("skills_!").value = element.skills;
      document.getElementById("location_detail_!").value =element.contact_details;
    }
  });
let edit_btn = document.getElementById("edit_btn");

// under process starts ********************
function edit_btn_fn(id) {
    console.log("edit_btn_fn is called")
    console.log(id)
}
edit_btn.setAttribute("onclick",edit_btn_fn)
edit_btn.onclick=()=>edit_btn_fn(id)
}

// under process ends ********************

// for closing the modal for view
let view_cross = document.getElementById("view_cross");
view_cross.addEventListener("click", modal_view_close);
function modal_view_close() {
  let modal_box_view = document.getElementById("modal_box_view");
  modal_box_view.style.display = "none";
}

// for showing delete confirmation box
function modal_delete() {
  let modal_box_delete = document.getElementById("modal_box_delete");
  modal_box_delete.style.display = "block";
  let id = event.target.id;
  deleteEmployee(id);
}

// for hiding delete confirmatio box
let delete_cross = document.getElementById("delete_cross");
delete_cross.addEventListener("click", modal_confirmation_close);
let no_btn = document.getElementById("no");
no_btn.addEventListener("click", modal_confirmation_close);
function modal_confirmation_close() {
  let modal_box_delete = document.getElementById("modal_box_delete");
  modal_box_delete.style.display = "none";
}

//for deleting the detalils when yes is clicked in the confirmation box
function deleteEmployee(id) {
  let yesBtn = document.getElementById("yes");
  yesBtn.addEventListener("click", modal_confirmation_close);
  yesBtn.addEventListener("click", () => {
    const full_data = JSON.parse(localStorage.getItem("empoyeeData"));
    full_data["details"].forEach((element, index) => {
      if (id == element.employee_id) {
        full_data["details"].splice(index, 1);
        localStorage.setItem("empoyeeData", JSON.stringify(full_data));
        window.location.reload();
      }
    });
  });
}

// function for editing the emloyee details
// function edit_btn_fn(id) {
//     console.log("edit_btn_fn is called")
//     console.log(id)

//   const full_data = JSON.parse(localStorage.getItem("empoyeeData"));
//   full_data["details"].forEach((element) => {
//     if (+id === +element["employee_id"]) {
//       document.getElementById("employee_id_!").value = element.employee_id;
//       document.getElementById("name_!").readOnly = false;
//       document.getElementById("name_!").value = element.name;
//       document.getElementById("DOB_!").value = element["DOB"];
//       document.getElementById("age_!").value = element.Age;
//       document.getElementById("email_!").readOnly = false;
//       document.getElementById("email_!").value = element.email_id;
//       document.getElementById("experiance_!").value = element.experiance;
//       document.getElementById("DOJ_!").value = element["DOJ"];
//       document.getElementById("designation_!").readOnly = false;
//       document.getElementById("designation_!").value = element.designation;
//       document.getElementById("skills_!").readOnly = false;
//       document.getElementById("skills_!").value = element.skills;
//       document.getElementById("location_detail_!").readOnly = false;
//       document.getElementById("location_detail_!").value =
//       element.contact_details;
//     }
//   });
//   full_data["details"].forEach(element => {
//         if(+id===+element.employee_id){
//             document.getElementById("name_!").value = element.name;
//             document.getElementById("email_!").value = element.email_id;
//             document.getElementById("designation_!").value = element.designation;
//             document.getElementById("skills_!").value = element.skills;
//             document.getElementById("location_detail_!").value =element.contact_details;
//             localStorage.setItem("empoyeeData", JSON.stringify(full_data));
//         }

//   });
// }
