const Faculty = [
  "Humanities",
  "Education",
  "Fine Arts",
  "Social Sciences",
  "Science",
  "Engineering",
  "Medicine",
  "Agriculture",
  "Dentistry",
  "Pharmacy",
  "Associated Medical Science",
  "Nursing",
  "Agro-Industry",
  "Veterinary Medicine",
  "Business Administration",
  "Economics",
  "Architecture",
  "Mass Communication",
  "Political Science and Public Administration",
  "Law",
  "College of Art, Media and Technology",
];

class Notify{
  static saveNoti(){
    const noti = document.querySelector('.saveAlert')
    localStorage.getItem('gpacal') !== null ? noti.innerText = '1': noti.innerText = ''
  }
  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className} alertUI`;
    const span = document.createElement("span");
    span.setAttribute("class", "textAlert");
    span.innerText = message;
    div.appendChild(span);
    div.style.animationName;
    document.querySelector(".app").insertAdjacentElement("afterend", div);
    setTimeout(
      () => (document.querySelector(".alertUI").style.animationName = "fade-out"),
      2000
    );
    setTimeout(() => document.querySelector(".alertUI").remove(), 3000);
  }
}
class Table {
  static addSubject() {
    const tbody = document.querySelector(".content");
    const tr = document.createElement("tr");
    const html = `
            <td style="width:200px"><input type="number" class="form-control"></td>
                        <td class="w-50"><input type="text" class="form-control"></td>
                        <td style="width:50px"><select class="form-control">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select></td>
                        <td style="width: 10vw;"><select name="grade" id="grade" class="form-control">
                            <option value="-1">-</option>
                            <option value="4">A</option>
                            <option value="3.5">B+</option>
                            <option value="3">B</option>
                            <option value="2.5">C+</option>
                            <option value="2">C</option>
                            <option value="1.5">D+</option>
                            <option value="1">D</option>
                            <option value="0">F</option>
                            <option value="-1">W</option>
                        </select></td>
                        <td><button class="delete btn btn-outline-danger">X</button></td>
        `;
    tr.innerHTML = html;
    tbody.insertAdjacentElement("beforeend", tr);
  }
  static deleteSubject({ target }) {
    if (target.classList.contains("delete")) {
      target.parentElement.parentElement.remove();
    }
  }
}
function calculateData() {
  const tbody = document.querySelector(".content").children;
  var Data = [];
  for (let i = 0; i < tbody.length; i++) {
    let id = tbody.item(i).children.item(0).children[0].value;
    let name = tbody.item(i).children.item(1).children[0].value;
    let credit = tbody.item(i).children.item(2).children[0].value;
    let gpa = tbody.item(i).children.item(3).children[0].value;
    Data.push({ id, name, credit, gpa });
  }
  return Data;
}
function convert(grade) {
  if (grade === "A") return 4;
  else if (grade === "B+") return 3.5;
  else if (grade === "B") return 3;
  else if (grade === "C+") return 2.5;
  else if (grade === "C") return 2;
  else if (grade === "D+") return 1.5;
  else if (grade === "D") return 1;
  else if (grade === "F") return 0;
  else if (grade === "W" || grade === "-") return -1;
}

function calculateGPA() {
  const Data = calculateData();
  var GPA = 0;
  var creditSum = 0.0;
  var gpaMultiply = 0.0;
  Data.forEach((each) => {
    if (each.gpa !== "-1") {
      creditSum += parseFloat(each.credit);
      gpaMultiply += parseFloat(each.credit) * parseFloat(each.gpa);
    }
  });
  creditSum !== 0.0
    ? (GPA = (parseFloat(gpaMultiply) / parseFloat(creditSum)).toFixed(2))
    : (GPA = "Can't caculate put some grade..");
  document.getElementById("output").style.display = "inline";
  document.getElementById("output").innerText = "Your GPA : " + GPA;
}
function removeSave() {
  localStorage.removeItem("gpacal");
  Notify.saveNoti()
  Notify.showAlert("ลบเรียบร้อย", "danger");
}
function load() {
  const savedData = localStorage.getItem("gpacal");
  if (savedData !== null) {
    const r = confirm("ต้องการโหลด Save");
    if (r) document.querySelector(".content").innerHTML = savedData;
  } else {
    Notify.showAlert("ไม่มี save", "warning");
  }
}

function save() {
  const Data = calculateData();
  var tbody = document.querySelector(".content").children;
  for (let i = 0; i < tbody.length; i++) {
    tbody
      .item(i)
      .children.item(0)
      .children[0].setAttribute("value", Data[i].id);
    tbody
      .item(i)
      .children.item(1)
      .children[0].setAttribute("value", Data[i].name);
    let creLen = tbody.item(i).children.item(2).children[0].children.length;
    for (let j = 0; j < creLen; j++) {
      let creSelected = tbody
        .item(i)
        .children.item(2)
        .children[0].children.item(j).value;
      if (Data[i].credit === creSelected) {
        tbody
          .item(i)
          .children.item(2)
          .children[0].children.item(j)
          .setAttribute("selected", "selected");
        j = creLen;
      }
    }
    let gpaLen = tbody.item(i).children.item(3).children[0].children.length;

    for (let j = 0; j < gpaLen; j++) {
      let gpaSelected = tbody
        .item(i)
        .children.item(3)
        .children[0].children.item(j).value;
      if (Data[i].gpa === gpaSelected) {
        tbody
          .item(i)
          .children.item(3)
          .children[0].children.item(j)
          .setAttribute("selected", "selected");
        j = gpaLen;
      }
    }
  }
  if (localStorage.getItem("gpacal") === null) {
    localStorage.setItem(
      "gpacal",
      document.querySelector(".content").innerHTML
    );
  } else {
    const r = confirm("Save ทับของเดิม ?");
    if (r)
      localStorage.setItem(
        "gpacal",
        document.querySelector(".content").innerHTML
      );
  }
  Notify.saveNoti()
  Notify.showAlert("ทำการ save ข้อมูลแล้ว", "success");
}

function logout({target}){
  localStorage.removeItem('GPACalUser')
  target.style.display = 'none'
  document.getElementById('login').style.display = "flex"
  document.querySelector(".app").style.display = "none";
}
function login(student_id){
  const FacultyIdx = parseInt(student_id[2] + student_id[3]) - 1;
  var setDisplay = ''
  if(FacultyIdx+1 == 21) setDisplay = `${student_id} : ${Faculty[FacultyIdx]}`
  else setDisplay = `${student_id} : Faculty of ${Faculty[FacultyIdx]}`
  localStorage.setItem('GPACalUser',setDisplay)
 
}
function ChangePage(student_id) {  
  if(localStorage.getItem('GPACalUser') === null){
    login(student_id)
  }
  document.getElementById('logout').style.display = 'inline'
  Notify.saveNoti()
  document.getElementById('name-display').innerText = localStorage.getItem('GPACalUser')
  document.getElementById('login').style.display = "none"
  document.querySelector(".app").style.display = "flex";
  
}
function onSubmitID(event) {
  event.preventDefault();
  const student_id = event.target.id.value;
  if (student_id.length < 9) alert("โปรดกรอกรหัส นศ ให้ครบถ้วน");
  else if (
    parseInt(student_id[2] + student_id[3]) > 21 ||
    parseInt(student_id[2] + student_id[3]) < 1 ||
    student_id.length > 9
  )
    alert("โปรดกรอกรหัส นศ ให้ถูกต้อง");
  else ChangePage(student_id);
}
if(localStorage.getItem('GPACalUser')!== null){
  ChangePage()
}


document.body.addEventListener("input", calculateGPA);
document.getElementById("save").addEventListener("click", save);
document.getElementById("load").addEventListener("click", load);
document.getElementById("del").addEventListener("click", removeSave);
document.querySelector(".input").addEventListener("submit", onSubmitID);
document.querySelector("#add").addEventListener("click", Table.addSubject);
document.getElementById("subject").addEventListener("click", Table.deleteSubject);
document.getElementById("load").addEventListener("click", calculateGPA);
document.getElementById('logout').addEventListener('click',logout)


