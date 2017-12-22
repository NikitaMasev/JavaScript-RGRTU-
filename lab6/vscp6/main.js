var randomData={};
window.onload = () => {
    loadJSON().then(json => {
        randomData = json;
        get('btnGenerateListEmpl').disabled = false;
        get('btnDeleteDateborn').disabled = false;
        get('btnComputeSumSalary').disabled = false;
        get('btnSortEmpl').disabled = false;    
    });
}

function get(id) { return document.getElementById(id); }
function getFloatValue(id) { return parseFloat(gets(id).value); }
function getIntValue(id) { return parseInt(get(id).value); }

const MIN_DAY=1;
const MAX_DAY=31;
const MAX_MONTH=12;
const MIN_MONTH=1;
const MIN_YEAR=1960;
const MAX_YEAR=1999;

const MSG_ERROR_NULL_LIST = '<br><br>' + '<font color="red">' + "Массив еще не сгенерирован.";
const MSG_ERROR_TYPE_INT = '<br><br>' + '<font color="red">' + "Должны использоваться только целые числа.";
const MSG_ERROR_SIZE_ARRAY = '<br><br>' + '<font color="red">' + "Размер должен задаваться числом от 1.";

var employeesList;

function loadJSON() {
    return fetch('http://localhost:8080/data.json', { mode: 'no-cors' })
        .then(data => data.json())
        .catch(console.warn)
}

function getRandomValue(min, max) {
    return (Math.floor(Math.random() * (max - min)) + min);
}

function getRandomDataFromArray(array) {
	return array[getRandomValue(0,(array.length-1)];
}
function getRandomData(field) {
    return randomData[field][getRandomValue(0,(randomData[field].length-1))];
}
function getEmployee() {
    var employees = {
        FIO: {
            lastName: "",
            firstName: "",
            middleName: "",
        },
        dateBorn: {
            day: getRandomValue(MIN_DAY,MAX_DAY),
            month: getRandomValue(MIN_MONTH,MAX_MONTH),
            year: getRandomValue(MIN_YEAR,MAX_YEAR)
        },
        post: "",
        experience: "",
        salary: {
            cash: "",
            premium: "",
            intensityPay: "",
            processingPay: ""
        },
        setRandomData: function() {
            Object.keys(this).forEach(field=>{
                if ((this[field]!=this.setRandomData) && (this[field]!=this.dateBorn)) {
                    if (this[field] instanceof Object) {
                        Object.keys(this[field]).forEach(key=>{
                            this[field][key] = getRandomData(key);
                        });
                    } else {
                        this[field] = getRandomData(field);
                    }
                }
            });
        }
    };
    employees.setRandomData();
    return employees;
}
function printEmployees(employees) {
    var output='<br><br>'+'<table border="2" cellpading="2" cellspacing="2">'; 
    output+='<tr>'; 
    Object.keys(employees[0]).forEach(field => { 
        if(employees[0][field] instanceof Object) { 
            Object.keys(employees[0][field]).forEach(key=>{
            output+='<td width="70px" align="center">'+key+'</td>'; 
            }) 
        } else { 
            output+='<td width="70px" align="center">'+field+'</td>'; 
        } 
    }); 
    output+='</tr>'; 
    for (var i=0;i<employees.length;i++) { 
        output+='<tr>';
        Object.keys(employees[i]).forEach(field=> {
            if (employees[i][field] instanceof Object) {
                Object.keys(employees[i][field]).forEach(key=> {
                output+='<td width="70px" align="center">'+employees[i][field][key]+'</td>';
                })
            } else {
                output+='<td width="70px" align="center">'+employees[i][field]+'</td>'; 
            }
        }); 
        output+='</tr>'; 
    } 
    output+='</table>'; 
    get('rez').innerHTML += output; 
}
function createListEmployees() {
    if (isNaN(getIntValue('sizeArray'))) {
        get('rez').innerHTML = MSG_ERROR_TYPE_INT;
        return;
    }
    if ((getIntValue('sizeArray') < 1)) {
        get('rez').innerHTML = MSG_ERROR_SIZE_ARRAY;
        return;
    }
    var sizeArray = getIntValue('sizeArray');
    employeesList = new Array(sizeArray);
    for (var i = 0; i < employeesList.length; i++) {
        employeesList[i] = getEmployee();
    }
    printEmployees(employeesList);
}

function deleteDateBorn() {
    if (isNaN(getIntValue('experience'))) {
        get('rez').innerHTML = MSG_ERROR_TYPE_INT;
        return;
    }
    if (employeesList == null) {
        get('rez').innerHTML = MSG_ERROR_NULL_LIST;
        return;
    }
    var requiredExp = getIntValue('experience');
    for (var i = 0; i < employeesList.length; i++) {
        if (employeesList[i].experience < requiredExp) {
            for(var o in employeesList[i].dateBorn) {
                employeesList[i].dateBorn[o] = "none";
            }
        }
    }
    printEmployees(employeesList);
}

function getSum(salaryObj) {
    var sum = 0.0;
    for (var field in salaryObj) {
        sum += salaryObj[field];
    }
    return sum;
}
function computeSumSalary() {
    if (employeesList == null) {
        get('rez').innerHTML = MSG_ERROR_NULL_LIST;
        return;
    }
    for (var i = 0; i < employeesList.length; i++) {
        var sumSalary = getSum(employeesList[i].salary);
        sumSalary *= 0.87;
        employeesList[i].sumSalary = sumSalary;
    }
    printEmployees(employeesList);
}

function filterEmployees() {
    if (employeesList == null) {
        get('rez').innerHTML = MSG_ERROR_NULL_LIST;
        return;
    }
    employeesList.sort(function (a, b) { return b.sumSalary - a.sumSalary });
    printEmployees(employeesList);
}
