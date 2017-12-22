const get=(id)=>{return document.getElementById(id);}

const $btnOk = get('btnOk');
const $inputHours = get('hours');
const $inputMinutes = get('minutes');
const $result = get('rez');

const MSG_ERROR_HOURS= '<br><br>' + '<font color="red">' + "Часы должны находиться в пределах от 0 до 23";
const MSG_ERROR_MINUTES='<br><br>' + '<font color="red">'+"Минуты должны находиться в пределах от 0 до 59";
const MSG_ERROR_TYPE = '<br><br>'+'<font color="red">'+"Должны использоваться только цифры";
const MSG_OK = '<br><br>'+'<font color="green">'+"Время совпадает";
const MSG_NOT_MATCH = '<br><br>'+'<font color="red">'+"Время не совпадает";

$btnOk.onclick = ()=>{
    if (isNaN($inputHours.value)) {
        $result.innerHTML=MSG_ERROR_TYPE;
        return;
    }
    if ((+$inputHours.value > 23) || (+$inputHours.value < 0)) {
        $result.innerHTML=MSG_ERROR_HOURS;
        return;
    }
    if ((+$inputMinutes.value > 59 || +$inputMinutes.value < 0)) {
        $result.innerHTML=MSG_ERROR_MINUTES;
        return;
    }

    if (checkingTime()) {
        $result.innerHTML=MSG_OK;
    } else {
        $result.innerHTML=MSG_NOT_MATCH;
    }
};

const checkingTime=()=>{
    var nowTime = new Date();
    if ((nowTime.getHours()===+$inputHours.value) && (nowTime.getMinutes()===+$inputMinutes.value)) {
        return true;
    }
    return false;
};



