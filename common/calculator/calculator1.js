var cxx = {};


//----------------------------------------------------------
// pre-initialization
//----------------------------------------------------------
cxx.preInit = function(){

	cxx.loadLanguage();

}


//----------------------------------------------------------
// Initialization
//----------------------------------------------------------
cxx.init = function(){

	cxx.getScriptEngineVersion();

	cxx.calc.init();

	cxx.conv.init();

	document.title = cxx.lang["cxx_title"];

}


//----------------------------------------------------------
// Load language file
//----------------------------------------------------------
cxx.loadLanguage = function(){

	var lang;

	try{
		lang = external.max_language_id;
	}catch(e){
		lang = "x";
	}

	if(cxx.lang[lang]){

		cxx.lang = cxx.lang[lang];

	}else{

		lang = navigator.userLanguage;

		if(cxx.lang[lang]){
			cxx.lang = cxx.lang[lang];
		}else{
			cxx.lang = cxx.lang["zh-cn"];
		}

	}

}


//----------------------------------------------------------
// Get script engine version
//----------------------------------------------------------
cxx.getScriptEngineVersion = function(){

	var obj = document.getElementById("engineVersion");
	if(obj){
		try{
			obj.innerHTML = ScriptEngine() +" "+
				ScriptEngineMajorVersion() + "."+
				ScriptEngineMinorVersion() + "."+
				ScriptEngineBuildVersion();
		}catch(e){
			obj.innerHTML = cxx.lang["unknown_scriptengine"];
		}
	}

}


//----------------------------------------------------------
// Check special keys
//----------------------------------------------------------
cxx.checkKey = function(event){

	if(event.keyCode == 9){
		if(event.srcElement) cxx.insertTabChar(event.srcElement);
		return false;
	}

}


//----------------------------------------------------------
// Insert Tab Character into textarea
//----------------------------------------------------------
cxx.insertTabChar = function(objTextarea){

	objTextarea.selection = document.selection.createRange();
	objTextarea.selection.text += "\t";

}


//**********************************************************
// Calculator
//**********************************************************
cxx.calc = {};
cxx.calc.autorun = true;

cxx.calc.init = function(){

	cxx.calc.objInput = document.getElementById("calcInput");
	cxx.calc.objOutput = document.getElementById("calcOutput");
	cxx.calc.objAutorun = document.getElementById("toggleAutorun");
	cxx.calc.calculate();

}


//----------------------------------------------------------
// Do the calculation automatically
//----------------------------------------------------------
cxx.calc.autoCalculate = function(){

	if(!cxx.calc.autorun) return;
	cxx.calc.calculate();

}


//----------------------------------------------------------
// Extended Math Object
//----------------------------------------------------------
cxx.Math = {};

// Constants
cxx.Math.Pi = Math.PI;
cxx.Math.E = Math.E;
cxx.Math.GoldenRatio = (1 + Math.sqrt(5)) / 2;

// Numerical Functions
cxx.Math.Abs = Math.abs;

cxx.Math.Sign = function(value){
	if(value==undefined) return null;
	return value>0 ? 1 : (value==0 ? 0 : -1);
};

cxx.Math.Round = Math.round;

cxx.Math.IntegerPart = function(value){
	if(value==undefined) return null;
		var result = value.toString();
	if(result.indexOf(".")>-1){
		return parseInt(result.substr(0, result.indexOf(".")), 10);
	}else{
		return value;
	}
};

cxx.Math.FractionalPart = function(value){
	if(value==undefined) return null;
	var result = value.toString();
	if(result.indexOf(".")>-1){
		return parseFloat("0."+result.substr(result.indexOf(".")+1, result.length));
	}else{
		return value;
	}
};

cxx.Math.Floor = Math.floor;

cxx.Math.Ceiling = Math.ceil;

cxx.Math.Mod = function(x, y){
	return x%y;
};

cxx.Math.Random = function(type, param1, param2){
	if(type!=undefined){
		var result;
		if(param1==undefined){
			result = Math.round(Math.random());
		}else if(param2==undefined){
			result = Math.round(Math.random()*param1);
		}else{
			result = param1 + Math.random()*(param2-param1);
		}
		return type.toLowerCase()=="integer" ? Math.floor(result) : result;
	}
	return Math.random();
};

// Elementary Functions
cxx.Math.Log = function(param1, param2){
	if(param1==undefined) return null;
	if(param2==undefined) return Math.log(param1);
	return Math.log(param2) / Math.log(param1);
};

cxx.Math.Ln = cxx.Math.Log;

cxx.Math.Lg = function(value){
	return Math.log(value) / Math.LN10;
};

cxx.Math.Exp = Math.exp;

cxx.Math.Power = Math.pow;

cxx.Math.Sqrt = Math.sqrt;

cxx.Math.Factorial = function(value){
	if(value==undefined) return null;
	if(value==0) return 0;
	var result = 1;
	for(var i=2; i<=value; i++){
		result = result * i;
	}
	return result;
};

// Triangle Functions
cxx.Math.ToRadian = function(angle){
	if(angle==undefined) return null;
	return angle * (Math.PI * 10) / 180 / 10;
};

cxx.Math.ToDegree = function(radian){
	if(radian==undefined) return null;
	return radian * 180 / Math.PI;
}

cxx.Math.Sin = Math.sin;
cxx.Math.Cos = Math.cos;
cxx.Math.Tan = Math.tan;

cxx.Math.Csc = function(radian){
	return 1/Math.sin(radian);
};
cxx.Math.Sec = function(radian){
	return 1/Math.cos(radian);
};
cxx.Math.Cot = function(radian){
	return 1/Math.tan(radian);
};

cxx.Math.ArcSin = Math.asin;
cxx.Math.ArcCos = Math.acos;
cxx.Math.ArcTan = Math.atan;

cxx.Math.ArcCsc = function(radian){
	return Math.asin(1/radian);
};
cxx.Math.ArcSec = function(radian){
	return Math.acos(1/radian);
};
cxx.Math.ArcCot = function(radian){
	return Math.atan(-radian) + Math.PI/2;;
};


//----------------------------------------------------------
// Do the calculation
//----------------------------------------------------------
cxx.calc.calculate = function(){

	var strExpression = cxx.calc.objInput.value;
	var result;

	if(strExpression){

		// n Degree support
		strExpression = strExpression.replace(/([\d./]+) Degree/g, "ToRadian\($1\)");

		// ^ pow support
		strExpression = strExpression.replace(/([\d./]+)\^([\d./]+)/g, "Math.pow\($1,$2\)");

		// ! factorial support
		strExpression = strExpression.replace(/([\d./]+)\!/g, "Factorial\($1\)");

		// @ sqrt support
		strExpression = strExpression.replace(/\@([\d./]+)/g, "Math.sqrt\($1\)");

		try {
			with(cxx.Math){
				result = eval(strExpression);
			}
		}catch(e){
			result = '(' + (e.number & 0xFFFF) + ') ' + e.description;
		}

		// Process Result
		if(typeof(result) == "function"){
			result = "fuc";
		}else if(typeof(result) == "object"){
			var tmp = $encodeJSON(result);
			if(typeof(tmp) == "string") result = tmp;
		}
		cxx.calc.objOutput.value = result;

	}else{

		cxx.calc.objOutput.value = cxx.lang["type_in_note"];

	}

}


//----------------------------------------------------------
// Toggle auto excution
//----------------------------------------------------------
cxx.calc.toggleAutorun = function(){

	if(cxx.calc.autorun){
		cxx.calc.objAutorun.innerHTML = cxx.lang["autorun_off"];
		cxx.calc.autorun = false;
	}else{
		cxx.calc.objAutorun.innerHTML = cxx.lang["autorun_on"];
		cxx.calc.autorun = true;
	}

	cxx.calc.calculate();

}




//**********************************************************
// Converter
//**********************************************************
cxx.conv = {};

cxx.conv.data = {};

cxx.conv.data.length = [
	"conv_metric",
	["kilometer", 1, "s1"],
	["meter", 1000],
	["decimeter", 10000],
	["centimeter", 100000],
	["millimeter", 1000000],
	["micrometer", 1e9],
	["nanometer", 1e12],
	["angstrom", 1e13],

	"conv_british",
	["mile", 0.6213712, "s2"],
	["foot", 3280.84],
	["inch", 39370.08],
	["league", 0.2071237],
	["furlong", 4.970969],
	["chain", 49.7097],
	["rod", 198.8388],
	["yard", 1093.613],
	["link", 4970.97],
	["hand", 9842.52],
	["mil", 3.937008e7],

	"conv_chinese",
	["li", 2],
	["yin", 30],
	["zhang", 300],
	["bu", 600],
	["chi", 3000],
	["cun", 30000],
	["fen", 300000],
	["li_s", 3000000],
	["hao", 3e7],
	["si", 3e8],
	["hu", 3e9],

	"conv_nautical",
	["sealeague", 0.1799856],
	["seamile", 0.5399568],
	["cable", 4.556722],
	["shortcable", 5.399568],
	["fathom", 546.8066],

	"conv_astronomical",
	["redshift", 7.675934e-24],
	["parsec", 3.240779e-14],
	["lightyear", 1.057023e-13],
	["astronomicalunit", 6.684587e-9],
	["lightminute", 5.559402e-8],
	["lightsecond", 3.335641e-6],

	"conv_font",
	["pica", 236220.5],
	["point", 2834646],
	["pixel", 3793810]

]

cxx.conv.data.area = [

	"conv_metric",
	["squarekilometer", 1],
	["squaremeter", 1000000, "s1"],
	["squarecentimeter", 1e10],
	["squaremillimeter", 1e12],
	["hectare", 100],
	["are", 10000],
	["barn", 1e34],

	"conv_british",
	["squaremile", 0.3861022],
	["squareyard", 1195990],
	["squarefoot", 1.076391e7, "s2"],
	["squareinch", 1.550003e9],
	["squarerod", 39536.86],
	["square", 107639.1],
	["acre", 247.1054],
	["rood", 988.4215],
	["township", 0.01072506],
	["homestead", 1.544409],

	"conv_chinese",
	["qing", 15],
	["mu", 1500],
	["fen", 15000],
	["li", 150000],
	["squarezhang", 90000],
	["squarechi", 9000000],
	["squarecun", 9e8]

]


cxx.conv.data.volume = [

	"conv_metric",
	["cubicmeter", 1],
	["cubicdecimeter", 1000],
	["cubiccentimeter", 1000000],
	["cubicmillimeter", 1e9],
	["liter", 1000, "s1"],
	["milliliter", 1000000],
	["microliter", 1e9],

	"conv_british",
	["barrel", 6.110602],
	["bushel", 27.4961],
	["peck", 109.9844],
	["gallon", 219.9688, "s2"],
	["quart", 879.8752],
	["pint", 1759.75],
	["fluidounce", 35195.01],
	["cubicyard", 1.307951],
	["cubicfoot", 35.31467],
	["cubicinch", 61023.74],

	"conv_chinese",
	["dan", 10],
	["dou", 100],
	["sheng", 1000],
	["ge", 10000],
	["shao", 100000],
	["cuo", 1000000],

	"conv_us_liquid",
	["acrefoot", 0.0008107132],
	["barrel_petroleum", 6.289811],
	["gallon", 264.1721],
	["quart", 1056.688],
	["pint", 2113.376],
	["gill", 8453.506],
	["fluidounce", 33814.02],
	["fluiddram", 270512.2],
	["minim", 1.623073e7],

	"conv_us_dry",
	["barrel", 8.64849],
	["bushel", 28.37759],
	["peck", 113.5104],
	["gallon", 227.0207],
	["quart", 908.083],
	["pint", 1816.166],
	["gill", 7264.664],

	"conv_cook",
	["cup", 4226.753],
	["tablespoon", 67628.04],
	["teaspoon", 202884.1]

]


cxx.conv.data.weight = [
	"conv_metric",
	["tonne", 0.001],
	["kilogram", 1, "s1"],
	["gram", 1000],
	["milligram", 1000000],
	["microgram", 1e9],
	["newton", 9.806652],
	["carat", 5000],
	["atomicmassunit", 6.0225e26],

	"conv_british",
	["longton_uk", 0.0009842065],
	["shortton_us", 0.001102311],
	["pound", 2.204623, "s2"],
	["ounce", 35.27396],
	["dram", 564.3834],
	["grain", 15432.36],

	"conv_chinese",
	["dan", 0.02],
	["jin", 2],
	["liang", 20],
	["qian", 200],
	["fen", 2000],
	["li", 20000],
	["hao", 200000],
	["si", 2000000],
	["hu", 2e7],

	"conv_troy",
	["pound", 2.679229],
	["ounce", 32.15075],
	["pennyweight", 643.0149],
	["carat", 4878.049],
	["grain", 15432.36],
	["mite", 308647.2],
	["doite", 7407532],

	"conv_apothecaries",
	["pound", 2.679229],
	["ounce", 32.15075],
	["dram", 257.206],
	["scruple", 771.6179],
	["grain", 15432.36]

];

cxx.conv.data.angle = [

	["degree", 1, "s1"],
	["minute", 60],
	["second", 360],
	["radian", Math.PI/180, "s2"]

]

cxx.conv.data.temperature = [

	["celsius", -273.15, "s1"],
	["fahrenheit", -459.67, "s2"],
	["kelvin", 0]

]

cxx.conv.data.energy = [

	"conv_metric",
	["kilojoule", 1],
	["joule", 1000, "s1"],

	["kilocalorie", 0.2388459],
	["metrekilogram", 102.6082],
	["calorie", 238.8459, "s2"],
	["kilowatthour", 0.0002777778],
	["watthour", 0.2777778],
	["wattsecond", 1000],
	["erg", 1e10],
	["electronvolt", 6.24145e21],

	"conv_british",
	["quad", 9.478134e-16],
	["therm", 9.478134e-06],
	["britishthermalunit", 0.9478134],
	["footpound", 737.5825]

]

cxx.conv.data.numeral = [

	["binary", 2],
	["octal", 8],
	["decimal", 10, "s1"],
	["hexadecimal", 16, "s2"]

]

cxx.conv.data.storage = [

	["bit", 8388608, "s2"],
	["byte", 1048576],
	["kilobyte", 1024, "s1"],
	["megabyte", 1],
	["gigabyte", 1/1024],
	["terabyte", 1/1048576]

]

//----------------------------------------------------------
// Initialization
//----------------------------------------------------------
cxx.conv.init = function(){

	cxx.conv.objSelectCategory = document.getElementById("convCategory");
	cxx.conv.objSelect1 = document.getElementById("convSelect1");
	cxx.conv.objSelect2 = document.getElementById("convSelect2");
	cxx.conv.objInput1 = document.getElementById("convInput1");
	cxx.conv.objInput2 = document.getElementById("convInput2");

	cxx.conv.buildCategoryList();
	cxx.conv.buildList("length");

}


//----------------------------------------------------------
// Build category list
//----------------------------------------------------------
cxx.conv.buildCategoryList = function(){

	for(var item in cxx.conv.data){
		var objOption = document.createElement("OPTION");
		objOption.value = item;
		objOption.appendChild(document.createTextNode(cxx.lang["conv_" + item]));
		cxx.conv.objSelectCategory.appendChild(objOption);
	}

	cxx.conv.objSelectCategory.selectedIndex = 0;

}


//----------------------------------------------------------
// Build select menu
//----------------------------------------------------------
cxx.conv.buildList = function(type){

	if(!cxx.conv.data[type]) return;

	// Clean old entries
	cxx.conv.objInput1.value = "";
	cxx.conv.objInput2.value = "";
	cxx.conv.objSelect1.innerHTML = "";
	cxx.conv.objSelect2.innerHTML = "";

	// Add new entries
	for(var i=0; i<cxx.conv.data[type].length; i++){

		var objOption1 = document.createElement("OPTION");
		var objOption2 = document.createElement("OPTION");
		var text;
		var value;
		var selected = false;
		var className = "";

		if(typeof(cxx.conv.data[type][i])=="string"){
			text = cxx.lang[cxx.conv.data[type][i]];
			value = "";
			className = "section";
		}else{
			text = " " + cxx.lang[type + "_" + cxx.conv.data[type][i][0]];
			value = cxx.conv.data[type][i][1];
			if(cxx.conv.data[type][i][2]) selected = cxx.conv.data[type][i][2];
		}

		objOption1.value = value;
		objOption1.className = className;
		objOption1.appendChild(document.createTextNode(text));
		cxx.conv.objSelect1.appendChild(objOption1);
		if(selected == "s1") cxx.conv.objSelect1.selectedIndex = i;

		objOption2.value = value;
		objOption2.className = className;
		objOption2.appendChild(document.createTextNode(text));
		cxx.conv.objSelect2.appendChild(objOption2);
		if(selected == "s2") cxx.conv.objSelect2.selectedIndex = i;

	}

}


//----------------------------------------------------------
// Convert value
//----------------------------------------------------------
cxx.conv.convert = function(target){

	// Prepare data
	var type = cxx.conv.objSelectCategory.options[cxx.conv.objSelectCategory.selectedIndex].value.toLowerCase();
	if(!cxx.conv.data[type]) return;

	var obj_v1, obj_v2, obj_r1, obj_r2;

	if(target == 2){
		obj_vi = cxx.conv.objInput1;
		obj_vo = cxx.conv.objInput2;
		obj_ri = cxx.conv.objSelect1;
		obj_ro = cxx.conv.objSelect2;
	}else{
		obj_vi = cxx.conv.objInput2;
		obj_vo = cxx.conv.objInput1;
		obj_ri = cxx.conv.objSelect2;
		obj_ro = cxx.conv.objSelect1;
	}

	var str_vi = obj_vi.value.toLowerCase();
	var str_vo = obj_vo.value.toLowerCase();
	var str_ri = obj_ri.options[obj_ri.selectedIndex].value.toLowerCase();
	var str_ro = obj_ro.options[obj_ro.selectedIndex].value.toLowerCase();

	var num_vi = (str_vi.indexOf(".")>-1 || str_vi.indexOf("e-")>-1) ? parseFloat(str_vi) : parseInt(str_vi, 10);
	var num_vo = (str_vo.indexOf(".")>-1 || str_vo.indexOf("e-")>-1) ? parseFloat(str_vo) : parseInt(str_vo, 10);
	var num_ri = (str_ri.indexOf(".")>-1 || str_ri.indexOf("e-")>-1) ? parseFloat(str_ri) : parseInt(str_ri, 10);
	var num_ro = (str_ro.indexOf(".")>-1 || str_ro.indexOf("e-")>-1) ? parseFloat(str_ro) : parseInt(str_ro, 10);

	// Do calculation now
	var result = "";

	switch(type){
		case "temperature":
			result = cxx.conv.convertTemperature(num_ri, num_ro, num_vi);
			break;
		case "numeral":
			result = cxx.conv.convertNumeral(num_ri, num_ro, str_vi);
			break;
		default:
			result = cxx.conv.convertGeneral(num_ri, num_ro, str_vi);
			break;
	}

	// UI update
	obj_vi.className = "text";
	obj_vo.className = "output";
	obj_vo.value = result;

}


//----------------------------------------------------------
// Convert general value
//----------------------------------------------------------
cxx.conv.convertGeneral = function(ratio1, ratio2, value){

	if(ratio1 == ratio2) return value;
	if(isNaN(ratio1) || isNaN(ratio2)) return cxx.lang["invalid_input"];
	if(ratio2 == 0) return value;

	var ratio = ratio1 / ratio2;

	return value / ratio;

}


//----------------------------------------------------------
// Convert temperature value
//----------------------------------------------------------
cxx.conv.convertTemperature = function(base1, base2, value){

	if(base1 == base2) return value;
	if(isNaN(base1) || isNaN(base2)) return cxx.lang["invalid_input"];

	var result = value;


	// C to K
	if(base1 == -273.15) result = value + 273.15;
	// F to K
	if(base1 == -459.67) result = (result - 32) * 5 / 9 + 273.15;

	if(base2 != 0){
		// K to C
		if(base2 == -273.15) result = result - 273.15;
		// K to F
		if(base2 == -459.67) result = (result - 273.15) * 9 / 5 + 32;
	}

	// Final check
	switch(base2){
		case -273.15:
			result = (result >= -273.15) ? result : cxx.lang["temperature_impossible"];
			break;
		case -459.67:
			result = (result >= -459.67) ? result : cxx.lang["temperature_impossible"];
			break;
		default:
			result = (result >= 0) ? result : cxx.lang["temperature_impossible"];
	}

	return result;

}


//----------------------------------------------------------
// Convert number base
//----------------------------------------------------------
cxx.conv.convertNumeral = function(base1, base2, value){

	if(base1 == base2) return value;
	if(isNaN(base1) || isNaN(base2)) return cxx.lang["invalid_input"];

	// Convert to 10 base
	var result = parseInt(value, base1);
	if(isNaN(result)){
		return cxx.lang["invalid_input"];
	}

	// Convert to target base
	if(base2 != 10){
		result = result.toString(base2);
	}

	return result;

}


//**********************************************************
// Helper Functions
//**********************************************************

//----------------------------------------------------------
// Write Language String
//----------------------------------------------------------
function $lang(label){

	document.write(cxx.lang[label]);

}


//----------------------------------------------------------
// Convert Object to JSON String
//----------------------------------------------------------
function $encodeJSON(obj){

	switch(typeof(obj)){
		case "object":
			if(obj instanceof Array){
				var out = [];
				for(var i=0; i<obj.length; i++){
					var t = $encodeJSON(obj[i]);
					if(t){
						out.push(t);
					}
				}
				out = "[\n" + out.join(",\n") + "\n]";
			}else if(obj instanceof Object){
				var out = [];
				for(label in obj){
					var l = $encodeJSON(label);
					var t = $encodeJSON(obj[label]);
					if(t){
						out.push(l + ":" + t);
					}
				}
				out = "{\n" + out.join(",\n") + "\n}";
			}
			return out;
			break;
		case "string":
			var str = obj;
			str = str.replace(/\\"/g, '\\\\"');
			str = str.replace(/\r/g, '\\r');
			str = str.replace(/\t/g, '\\t');
			str = str.replace(/\n/g, '\\n');
			str = str.replace(/\f/g, '\\f');
			str = str.replace(/\"/g, '\\"');
			return '"' + str + '"';
			break;
		case "number":
			return isFinite(obj) ? String(obj) : 'null';
			break;
		case "boolean":
			return String(obj);
			break;
		case "null":
			return "null";
			break;
	}

}
