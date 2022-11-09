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

//Common Selections
let employee_id = document.getElementById("employee_id");
let name = document.getElementById("name");
let DOB = document.getElementById("DOB");
let age = document.getElementById("age");
let email = document.getElementById("email");
let experiance = document.getElementById("experiance");
let DOJ = document.getElementById("DOJ");
let designation = document.getElementById("designation");
let skills = document.getElementById("skills");
let location_detail = document.getElementById("location_detail");
let modal_box_add = document.getElementById("modal_box_add");
let modal_box_view = document.getElementById("modal_box_view")

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
  console.log(location.details)
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
        let count_skills = element["skills"].length;
        element["skills"].forEach((element, index) => {
          let table_data_new = document.createElement("p");
          table_data_new.setAttribute("class", "inline_prop");
          let skillButton = document.createElement("button");
          skillButton.innerHTML = `${element}`;
          table_data_new.appendChild(skillButton);
          table_data.appendChild(table_data_new);
        });
        table_row.appendChild(table_data);
      } else {
        let icons = document.createElement("div");
        icons.setAttribute("class", "icons");
        let sub_icon_1 = document.createElement("i");
        sub_icon_1.setAttribute("class", "fa-solid fa-eye");
        sub_icon_1.setAttribute("id", element.employee_id);
        sub_icon_1.setAttribute("onclick", modal_box_view_fn);
        sub_icon_1.onclick = () => modal_box_view_fn();
        let sub_icon_3 = document.createElement("i");
        sub_icon_3.setAttribute("class", "fa-solid fa-trash");
        sub_icon_3.setAttribute("id", element.employee_id);
        sub_icon_3.setAttribute("onclick", modal_delete);
        sub_icon_3.onclick = () => modal_delete();
        icons.appendChild(sub_icon_1);
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
add_new_btn.addEventListener("click", () => {
  modal_box_add.style.display = "block";
});

//closng after adding new employee using both cross and submit button
let add_cross = document.getElementById("add_cross");
add_cross.addEventListener("click", add_modal_close);

function add_modal_close() {
  modal_box_add.style.display = "none";
}

let submit_btn = document.getElementById("submit_btn");
submit_btn.addEventListener("click", add_modal_submit_close);

function add_modal_submit_close() {
    let employeeValue=employee_id.value ;
    let nameValue=name.value ;
    let dobValue=DOB.value ;
    let ageValue=age.value ;
    let emailValue=email.value;
    let experianceValue=experiance.value;
    let dojValue=DOJ.value
    let designationValue=designation.value
    let skillsValue=skills.value ;
    let location_detailValue=location_detail.value;

    if (
        employeeValue!== "" &&
        nameValue!== "" &&
        dobValue!== "" &&
        ageValue !== "" &&
        emailValue!== "" &&
        experianceValue !== "" &&
        dojValue!== "" &&
        designationValue!== "" &&
        skillsValue !== "" &&
        location_detailValue!== ""
    ) {
        modal_box_add.style.display = "none";
    }
}

//Adding details of the employee using submit button
submit_btn.addEventListener("click", addingData);
function addingData() {
  let new_data_obj = {};
  let split_skill_array = skills.value.split(",");
  let table_row = document.createElement("tr");

  // adding data to table when user fills data

  let submit_count = 0;
  for (let i = 1; i <= 12; i++) {
    let table_data = document.createElement("td");
    if (i === 1) {
      let table_data = document.createElement("td");
      table_data.innerHTML = employee_id.value;
      if (table_data.innerHTML !== "") {
        table_row.appendChild(table_data);
        submit_count++;
      }

      new_data_obj["employee_id"] = +employee_id.value;
    } else if (i === 2) {
      table_data.innerHTML = name.value;
      if (table_data.innerHTML !== "") {
        table_row.appendChild(table_data);
        submit_count++;
      }
      new_data_obj["name"] = name.value;
    } else if (i === 3) {
      if (ValidateEmail(email.value) === true) {
        table_data.innerHTML = email.value;
        new_data_obj["email_id"] = email.value;
        if (table_data.innerHTML !== "") {
          table_row.appendChild(table_data);
          submit_count++;
        }
      }else{
        modal_box_add.style.display = "block";
      }
    } else if (i === 4) {
      if (skills.value !== "") {
        table_data.setAttribute("class", "skill_td");
        let count_skills = split_skill_array.length;
        split_skill_array.forEach((element, index) => {
          let table_data_new = document.createElement("p");
          table_data_new.setAttribute("class", "inline_prop");
          let skillButton = document.createElement("button");
          skillButton.innerHTML = `${element}`;
          table_data_new.appendChild(skillButton);
          table_data.appendChild(table_data_new);
          new_data_obj["skills"] = skills.value.split(",");
        });
      }
      if (table_data.innerHTML !== "") {
        table_row.appendChild(table_data);
        submit_count++;
      }
    } else if (i === 5) {
      let table_data = document.createElement("td");
      let icons = document.createElement("div");
      icons.setAttribute("class", "icons");
      let sub_icon_1 = document.createElement("i");
      sub_icon_1.setAttribute("class", "fa-solid fa-eye");
      sub_icon_1.setAttribute("id", employee_id.value);
      sub_icon_1.setAttribute("onclick", modal_box_view_fn);
      sub_icon_1.onclick = () => modal_box_view_fn();
      let sub_icon_3 = document.createElement("i");
      sub_icon_3.setAttribute("class", "fa-solid fa-trash");
      sub_icon_3.setAttribute("id", employee_id.value);
      sub_icon_3.setAttribute("onclick", modal_delete);
      sub_icon_3.onclick = () => modal_delete();
      icons.appendChild(sub_icon_1);
      icons.appendChild(sub_icon_3);
      table_data.appendChild(icons);
      table_row.appendChild(table_data);
    } else if (i === 6) {
      new_data_obj["DOB"] = DOB.value;
      submit_count++;
    } else if (i === 7) {
      new_data_obj["Age"] = age.value;
      submit_count++;
    } else if (i === 9) {
      new_data_obj["experiance"] = experiance.value;
      submit_count++;
    } else if (i === 10) {
      new_data_obj["designation"] = designation.value;
      submit_count++;
    } else if (i === 11) {
      new_data_obj["contact_details"] = location_detail.value;
      submit_count++;
    } else if (i === 12) {
      new_data_obj["DOJ"] = DOJ.value;
      submit_count++;
    }
  }

  if (submit_count === 10) {
    const full_data = JSON.parse(localStorage.getItem("empoyeeData"));
    full_data["details"].push(new_data_obj);
    localStorage.setItem("empoyeeData", JSON.stringify(full_data));
    console.log("submit_count", submit_count);
    main_table.appendChild(table_row);
  }
}

// Viewing details of the employee
function modal_box_view_fn() {
  let id = event.target.id;
 
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
      document.getElementById("location_detail_!").value =
        element.contact_details;
    }
  });
// Editing details
  let edit_btn = document.getElementById("edit_btn");
  function edit_btn_fn(id) {
    console.log("edit_btn_fn is called");
    console.log(id);
    const full_data = JSON.parse(localStorage.getItem("empoyeeData"));
    full_data["details"].forEach((element) => {
      if (+id === +element.employee_id) {
        document.getElementById("name_!").value!=="" ? element.name = document.getElementById("name_!").value: modal_box_view.style.display=block;
        if((document.getElementById("email_!").value!=="") && (ValidateEmail(document.getElementById("email_!").value)===true)){
            element.email_id = document.getElementById("email_!").value;
        }else{
            modal_box_view.style.display="block"
        }
        document.getElementById("designation_!").value!==""? element.designation = document.getElementById("designation_!").value:modal_box_view.style.display=block
        if(document.getElementById("skills_!").value!==""){
            element.skills = document.getElementById("skills_!").value;
            element.skills = element.skills.split(",");
        }else{
            modal_box_view.style.display=block
        }
        document.getElementById("location_detail_!").value!==""? element.contact_details =document.getElementById("location_detail_!").value:modal_box_view.style.display=block
         
        localStorage.setItem("empoyeeData", JSON.stringify(full_data));
        addInitialData();
        window.location.reload();
      }
    });
  }
  edit_btn.setAttribute("onclick", edit_btn_fn);
  edit_btn.onclick = () => edit_btn_fn(id);
}



// for closing the modal for view
let view_cross = document.getElementById("view_cross");
view_cross.addEventListener("click", modal_view_close);
function modal_view_close() {
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
    full_data["details"].forEach((element, index) => {
      if (id == element.employee_id) {
        full_data["details"].splice(index, 1);
        localStorage.setItem("empoyeeData", JSON.stringify(full_data));
        addInitialData();
        window.location.reload();
      }
    });
  });
}

// Validating Email
function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  alert("You have entered an invalid email address!");
  return false;
}

//Sorting based on employee id

const sortName = (array) => { 
    return array.sort(function(a, b) {
    var firstTest = a.name.toUpperCase();
    var secondText = b.name.toUpperCase();
    return (firstTest < secondText) ? -1 : (firstTest > secondText) ? 1 : 0;
});
}

// console.log(document.getElementById("sort_label").value)
let sort_label=document.getElementById("sort_label")
sort_label.addEventListener("input",function(){
    if("Name"===this.value){
        console.log("Inside this")
        const full_data = JSON.parse(localStorage.getItem("empoyeeData"));
        sortName(full_data.details)
        console.log(sortName(full_data.details))
        localStorage.setItem("empoyeeData", JSON.stringify(full_data));
        window.location.reload();
        addInitialData()
       
    }
})


