function get(id) { return document.getElementById(id); }
function getFloatValue(id) { return parseFloat(gets(id).value); }
function getIntValue(id) { return parseInt(get(id).value); }

const MSG_ERROR_TYPE_DECIMAL = '<br><br>' + '<font color="red">' + "You must use ony numbers.";

const $fnChoise = get('fnNum');
const $from = get('from');
const $to = get('to');
const $step = get('step');
const $result = get('rez');
const $btnRun = get('btnRun');

const func1 = x =>((Math.pow(Math.cos(x - 5),5) - Math.log(x))/(x + 5*Math.sin(x)));
const func2 = x =>(Math.pow(Math.sin(x),2) - Math.abs(Math.sin(x -4)));
const func3 = x =>(Math.exp(x - 2) + (Math.pow(x,3) + 2*x)/4);

const max = (func,[a,b],step)=>{
    var max = -Infinity;
    step<0?step-=step:step;    
    for (var i=a;a<b?i<=b:i>=b;a<b?i+=step:i-=step) {
        const valueFunc = func(i);
        if (valueFunc > max) {
            max = valueFunc;
        }
    }
    return max;
};

const memoize = (()=>{
    const cache = {};
    window.cache = cache;

    return applyFunc => FNP => (fN, range, step) => {
        const reverseOrderRange = range.slice().reverse();
        const memMetaDirect = `${fN}/[${range}]/${step}`;
        const memMetaReverse = `${fN}/[${reverseOrderRange}]/${-step}`;
        var result = null;
        
        if (cache[memMetaDirect]) {
            result = cache[memMetaDirect];
        } else if (cache[memMetaReverse]) {
            cache[memMetaDirect] = cache[memMetaReverse];
            result = cache[memMetaDirect];
        } else {
            result = applyFunc(FNP[fN - 1],range,step);
            cache[memMetaDirect] = result;
        }
        return result;
    };
})();

const getMax = memoize(max)([func1,func2,func3]);

$btnRun.onclick = () => {
    const fnNum = +$fnChoise.value;
    const from = +$from.value;
    const to = +$to.value;
    const step = +$step.value;

    if (!fnNum || !from || !to || !step) {
        $result.innerHTML = MSG_ERROR_TYPE_DECIMAL;
        return;
    }
    getMax(fnNum,[from,to],step);
    $result.innerHTML = printCache(window.cache);
};

function printCache(cache) {
    var out='<table border="1" id="tableResult">';
    out+='<tr><th>Func Name</th><th>Range</th><th>Step</th><th>Max Value</th></tr>';
    Object.keys(cache).forEach (fnMetaInfo=>{
        const [name,range,step] = fnMetaInfo.split('/');
        out+=`<tr><td>${name}</td><td>${range}</td><td>${step}</td><td>${cache[fnMetaInfo]}</td></tr>`;
    });
    out+='</table>';
    return out;
}


