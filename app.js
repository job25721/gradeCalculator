var add = document.querySelector('#add').addEventListener('click',addSub);
const form = document.querySelector('#myForm');
var count = 1;

function addSub(){
    count++;
    
    const order = document.createElement('label');
    order.setAttribute("id",`o${count}`);
    order.setAttribute("class","order");
    order.textContent = count;
    
    

    const input = document.createElement('input');
    input.setAttribute("type","text");
    input.setAttribute("class","name form-group");
    input.setAttribute("id",`name${count}`);
    input.setAttribute("placeholder",`subjectname${count}`);

    
    //credit
    const credit = document.createElement('select');
    credit.setAttribute("class","form-group credit");
    credit.setAttribute("id",`cre${count}`);
    var credits = [3,2,1];
    var nodeC;

    credits.forEach(cre=>{
        nodeC = document.createElement('option');
        nodeC.text = `${cre}`;
        credit.appendChild(nodeC);
    })

    //grade
    const grade = document.createElement('select');
    grade.setAttribute("class","form-group grade");
    grade.setAttribute("id",`grade${count}`);

    var grades = ["A","B+","B","C+","C","D+","D","F"];
    var nodeG;
    grades.forEach(g=>{
             nodeG = document.createElement('option');
             nodeG.text = `${g}`;
             grade.appendChild(nodeG);
    }
    )

    //removebutton
    const removeButton = document.createElement('button');
    removeButton.setAttribute("type","button");
    removeButton.setAttribute("class","btn-danger delete");
   

    removeButton.textContent = "X";

    var br = document.createElement('br');
    
    form.appendChild(br);
    form.appendChild(order);
    form.appendChild(input);
    form.appendChild(credit);
    form.appendChild(grade);
    form.appendChild(removeButton);
    
    
}

var remove = document.querySelector('.delete').addEventListener('click',remove);

function remove(e){
    
        e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.remove();
        e.target.previousElementSibling.previousElementSibling.previousElementSibling.remove();
        e.target.previousElementSibling.previousElementSibling.remove();
        e.target.previousElementSibling.remove();
        e.target.remove();
        count --;
    
  
 
  
  
  //console.log(e.target);
    
}


var calculateButton = document.querySelector('#calculate').addEventListener('click',calculate);


var t;
function calculate(e){
    console.log(count);
    var creditSum=0;
    var gradeMultiplySum=0;
    for(let i = 1; i<=count; i++){
        var credit = document.getElementById(`cre${i}`).value;
        var grade = convert(document.getElementById(`grade${i}`).value);
         var c = parseInt(credit);
         
         creditSum+= c;
         gradeMultiplySum += c*grade;
         
    }
    var GPA = gradeMultiplySum/creditSum;
    if(document.getElementById('output')!==null){
        document.getElementById('output').remove();
    }
    
    var area = document.querySelector('.area');
    
    var div = document.createElement('div');
    
    div.setAttribute("id","output");

    if(GPA < 2){
        div.setAttribute("class","card bg-danger mb-5");
    }else if(GPA <3){
        div.setAttribute("class","card bg-warning mb-5");
    }else if(GPA <4){
        div.setAttribute("class","card bg-primary mb-5");
    }else if(GPA === 4){
        GPA = "4.00";
        div.setAttribute("class","card bg-success mb-5");
    }
    area.appendChild(div);

    document.querySelector('#output').style.visibility = 'hidden';

    var output = document.querySelector('#output');
    
    document.querySelector('#output').style.visibility = '';
    if(GPA !== "4.00") output.innerHTML = `Your GPA is : ${GPA.toFixed(2)}`;
    else output.innerHTML = `Your GPA is : ${GPA}`;
    
    
    
}

function convert(grade){
    if(grade==="A") return 4;
    else if(grade==="B+") return 3.5;
    else if(grade==="B") return 3;
    else if(grade==="C+") return 2.5;
    else if(grade==="C") return 2;
    else if(grade==="D+") return 1.5;
    else if(grade==="D") return 1;
    else if(grade==="F") return 0;
}
