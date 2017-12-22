const get=(id)=>{return document.getElementById(id);}
const getFloatValue=(id)=>{return parseFloat(get(id).value);}
const getIntValue=(id)=>{return parseInt(get(id).value);}

const $btnInit = get('btnInit');
const $inputInit = get('stringInit');
const $objChoice = get('objNum');
const $fnChoice = get('func');
const $btnOk = get('btnOk');
const $inputValues = get('values');
const $result = get('rez');
const decimator = ",";

const MSG_ERROR_INIT= '<br><br>' + '<font color="red">' + "You must init stringArray, please, use ',' for separation elements";
const MSG_ERROR_NOT_INIT_STRING_ARRAY='<br><br>' + '<font color="red">'+"Current StringArray is not initiazed";
const MSG_ERROR_FUNC_PARAM = '<br><br>'+'<font color="red">'+"You must fill field for using functions";

var arrStringArrays=[];

function StringArray(args) {
    this.stringArray=[];
    if (args.length>0) {
        Object.keys(args).forEach(index=>{
            this.stringArray.push(args[index]);
        });
    } else {
        throw new SyntaxError("Incorrect arguments");
    }
}

StringArray.prototype.Add = function(lines) {
    if (Array.isArray(lines)) {
        Object.keys(lines).forEach(index=>{
            this.stringArray.push(lines[index]);
        });
    } else {
        this.stringArray.push(lines);
    }
};

StringArray.prototype.Remove = function(lines) {
    if (Array.isArray(lines)) {
        this.stringArray=this.stringArray.filter((elem)=>{
            if (lines.indexOf(elem)===-1) {
                return elem;
            }
        });
    } else {
        this.stringArray=this.stringArray.filter((elem)=>{
            if (lines!==elem) {
                return elem; 
            }
        });
    }
};

StringArray.prototype.OrderAscending = function (ascending) {
    var asc = (ascending === 'true');
    asc?this.stringArray.sort((current,next)=> {return current.length>next.length;}):
    this.stringArray.sort((current,next)=> {return current.length<next.length;});
};

StringArray.prototype.Concat = function(stringArr) {
    if (!Array.isArray(stringArr)) {this.stringArray[0]=this.stringArray[0].concat(stringArr);return;}
    Object.keys(this.stringArray).forEach(index=>{
        if ((index==(this.stringArray.length-1)) && (index<(stringArr.length-1))) {
            this.stringArray[index]=this.stringArray[index].concat(stringArr[index]);
            var remainder=stringArr.slice((Number(index)+1));
            Object.keys(remainder).forEach(index=>{
                this.stringArray.push(remainder[index]);   
            });   
        } else if ((stringArr.length-1)>=index) {
            this.stringArray[index]=this.stringArray[index].concat(stringArr[index]);
        }
    });
};

StringArray.prototype.Exist = function(line) {
    for (var elem in this.stringArray) {
        if (this.stringArray[elem]===line) {
            return true;
        }
    }
    return false;
};

StringArray.prototype.MergeNoRepeat = function(stringArr) {
    Object.keys(stringArr).forEach(index=>{
        if(!this.Exist(stringArr[index])) {
            this.stringArray.push(stringArr[index]);
        }
    });
};

StringArray.prototype.GetLengthArray = function() {
    var arrayLength=[];
        for (var elem in this.stringArray) {
            arrayLength.push(this.stringArray[elem].length);
        }
    return arrayLength;
};

StringArray.prototype.toString = function() {
    return this.stringArray.join(decimator);
};

$btnInit.onclick = ()=>{
    var outPut='<br><br>' + '<font color="blue">'+"StringArray "+$objChoice.value+'<br>';
    var arr=getStrArrayFromOutside($inputInit.value);
    if ((arr==null) || (arr.length<=0)) {
        $result.innerHTML+=MSG_ERROR_INIT;
        return;
    }
    arrStringArrays.push(new StringArray(arr));
    outPut+='"'+arrStringArrays[$objChoice.value].toString()+'"'+'<br>';
    $result.innerHTML+=outPut;
};

$btnOk.onclick = ()=>{
    if (arrStringArrays[$objChoice.value]==null) {
        $result.innerHTML+=MSG_ERROR_NOT_INIT_STRING_ARRAY;
        return;
    }
    var inputValues=$inputValues.value.toString();
    if (inputValues===null) {
        $result.innerHTML+=MSG_ERROR_FUNC_PARAM;
        return;
    }
    if (inputValues.search(decimator)!=-1) {
        inputValues=getStrArrayFromOutside(inputValues);
    }
    var outPut="";
    var lengthArr=arrStringArrays[$objChoice.value][$fnChoice.value](inputValues);
    if (lengthArr!=null) {
        outPut+='<br><br>'+"StringArray "+$objChoice.value+'<br>'+" Array of lengths "+'<br>'+lengthArr.join(decimator);
    }
    outPut+='<br>'+"StringArray "+$objChoice.value+'<br>'+'"'+arrStringArrays[$objChoice.value].toString()+'"'+'<br>';
    $result.innerHTML+=outPut;
};

const getStrArrayFromOutside = (value)=>{
    var strArr = value.split(decimator);
    return strArr;
};




