class table{
    
    static addtd(tag){
        const td = document.createElement('td');
        td.appendChild(tag);
        return td;
    }

    static addtr(arr){
        const tr = document.createElement('tr');
        arr.forEach(tdTag=>{
            tr.appendChild(tdTag);
        })
        return tr;
    }

    static visibletoTable(Table,tr){
        Table.appendChild(tr);
    }

    static delete(e){
        if(e.classList.contains('delete')){
            e.parentElement.parentElement.remove();
        }
    }
}
var count = 1;

document.getElementById('myTable').addEventListener('click',EventClick);

function EventClick(e){
    e.preventDefault();
    if(e.target.classList.contains('delete')){

        table.delete(e.target);
        count--;
    }
}


var add = document.querySelector('#add').addEventListener('click',addSub);
const form = document.querySelector('#myForm');
const Table = document.getElementById('myTable');



function addSub(){
    count++;
    
    const input = document.createElement('input');
    input.setAttribute("type","text");
    input.setAttribute("class","name form-group form-control");
    input.setAttribute("id",`name${count}`);
    input.setAttribute("placeholder","ชื่อวิชา");

    
    //credit
    const credit = document.createElement('select');
    credit.setAttribute("class","form-group credit form-control");
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
    grade.setAttribute("class","form-group grade form-control");
    grade.setAttribute("id",`grade${count}`);

    var grades = ["A","B+","B","C+","C","D+","D","F","W"];
    var nodeG;
    grades.forEach(g=>{
             nodeG = document.createElement('option');
             nodeG.text = `${g}`;
             grade.appendChild(nodeG);
    }
    )
    //createRemoveButton
    const Button = document.createElement('button');
    Button.setAttribute("class","btn btn-danger btn-sm delete form-control");
    Button.textContent = "X";
    

    
    var arr = [
        table.addtd(input),table.addtd(credit),table.addtd(grade),table.addtd(Button)
    ];
    
    table.visibletoTable(Table,table.addtr(arr));

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
         if(grade !== -1){
            creditSum+= c;
            gradeMultiplySum += c*grade;
        }
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
    var yourname = document.getElementById('yourname').value;
    document.querySelector('#output').style.visibility = '';
    if(yourname === ''){
            var name = 'Your';
    }else{
            name = yourname+"'s";
    }
    
    if(count > 0) {
        
        if(GPA !== "4.00") output.innerHTML = `${name} GPA is : ${GPA.toFixed(2)}`;
        else output.innerHTML = `${name} GPA is : ${GPA}`;
        
    }else{
        if(yourname !== '') name = yourname;
        else name = ''
        div.setAttribute("class","card bg-danger mb-5");
        output.innerHTML = `${name} !!!! please add some subject `;
    }
    
    
    
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
    else if(grade==="W") return -1;
}
