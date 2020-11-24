//convert meters & sec -> miles/min
function paceConverter(m, s){
    return (s / 60) / (m * 0.000621371192)
}

//convert date object to shorter string. Ex. 07-11-2020
function shortDate(obj){
    let month = obj.getMonth() + 1;
    return (
      month +
      "-" +
      obj.getDate() +
      "-" +
      obj.getFullYear()
    )
}


const authLink = "https://www.strava.com/oauth/token";
const mySecret = "94390e3fb81c4de14d55c4983dc20388cbe628ef";
const myToken = "0cec6481e41265ed524b13a27262b3a4a74ee797";
const myID = '54733'

//https://observablehq.com/@d3/color-schemes
let reversedReds = ["#ffffcc","#fffecb","#fffec9","#fffdc8","#fffdc6","#fffcc5","#fffcc4","#fffbc2","#fffac1","#fffac0","#fff9be","#fff9bd","#fff8bb","#fff8ba","#fff7b9","#fff6b7","#fff6b6","#fff5b5","#fff5b3","#fff4b2","#fff4b0","#fff3af","#fff2ae","#fff2ac","#fff1ab","#fff1aa","#fff0a8","#fff0a7","#ffefa6","#ffeea4","#ffeea3","#ffeda2","#ffeda0","#ffec9f","#ffeb9d","#ffeb9c","#ffea9b","#ffea99","#ffe998","#ffe897","#ffe895","#ffe794","#ffe693","#ffe691","#ffe590","#ffe48f","#ffe48d","#ffe38c","#fee28b","#fee289","#fee188","#fee087","#fee085","#fedf84","#fede83","#fedd82","#fedc80","#fedc7f","#fedb7e","#feda7c","#fed97b","#fed87a","#fed778","#fed777","#fed676","#fed574","#fed473","#fed372","#fed270","#fed16f","#fed06e","#fecf6c","#fece6b","#fecd6a","#fecb69","#feca67","#fec966","#fec865","#fec764","#fec662","#fec561","#fec460","#fec25f","#fec15e","#fec05c","#febf5b","#febe5a","#febd59","#febb58","#feba57","#feb956","#feb855","#feb754","#feb553","#feb452","#feb351","#feb250","#feb14f","#feb04e","#feae4d","#fead4d","#feac4c","#feab4b","#feaa4a","#fea84a","#fea749","#fea648","#fea547","#fea347","#fea246","#fea145","#fda045","#fd9e44","#fd9d44","#fd9c43","#fd9b42","#fd9942","#fd9841","#fd9741","#fd9540","#fd9440","#fd923f","#fd913f","#fd8f3e","#fd8e3e","#fd8d3d","#fd8b3c","#fd893c","#fd883b","#fd863b","#fd853a","#fd833a","#fd8139","#fd8039","#fd7e38","#fd7c38","#fd7b37","#fd7937","#fd7736","#fc7535","#fc7335","#fc7234","#fc7034","#fc6e33","#fc6c33","#fc6a32","#fc6832","#fb6731","#fb6531","#fb6330","#fb6130","#fb5f2f","#fa5d2e","#fa5c2e","#fa5a2d","#fa582d","#f9562c","#f9542c","#f9522b","#f8512b","#f84f2a","#f74d2a","#f74b29","#f64929","#f64828","#f54628","#f54427","#f44227","#f44127","#f33f26","#f23d26","#f23c25","#f13a25","#f03824","#f03724","#ef3524","#ee3423","#ed3223","#ed3123","#ec2f22","#eb2e22","#ea2c22","#e92b22","#e92921","#e82821","#e72621","#e62521","#e52420","#e42220","#e32120","#e22020","#e11f20","#e01d20","#df1c20","#de1b20","#dd1a20","#dc1920","#db1820","#da1720","#d91620","#d81520","#d71420","#d51320","#d41221","#d31121","#d21021","#d10f21","#cf0e21","#ce0d21","#cd0d22","#cc0c22","#ca0b22","#c90a22","#c80a22","#c60923","#c50823","#c40823","#c20723","#c10723","#bf0624","#be0624","#bc0524","#bb0524","#b90424","#b80424","#b60425","#b50325","#b30325","#b10325","#b00225","#ae0225","#ac0225","#ab0225","#a90125","#a70126","#a50126","#a40126","#a20126","#a00126","#9e0126","#9c0026","#9a0026","#990026","#970026","#950026","#930026","#910026","#8f0026","#8d0026","#8b0026","#8a0026","#880026","#860026","#840026","#820026","#800026"]
                        .reverse();

let blues = ["#f7fbff","#f6faff","#f5fafe","#f5f9fe","#f4f9fe","#f3f8fe","#f2f8fd","#f2f7fd","#f1f7fd","#f0f6fd","#eff6fc","#eef5fc","#eef5fc","#edf4fc","#ecf4fb","#ebf3fb","#eaf3fb","#eaf2fb","#e9f2fa","#e8f1fa","#e7f1fa","#e7f0fa","#e6f0f9","#e5eff9","#e4eff9","#e3eef9","#e3eef8","#e2edf8","#e1edf8","#e0ecf8","#e0ecf7","#dfebf7","#deebf7","#ddeaf7","#ddeaf6","#dce9f6","#dbe9f6","#dae8f6","#d9e8f5","#d9e7f5","#d8e7f5","#d7e6f5","#d6e6f4","#d6e5f4","#d5e5f4","#d4e4f4","#d3e4f3","#d2e3f3","#d2e3f3","#d1e2f3","#d0e2f2","#cfe1f2","#cee1f2","#cde0f1","#cce0f1","#ccdff1","#cbdff1","#cadef0","#c9def0","#c8ddf0","#c7ddef","#c6dcef","#c5dcef","#c4dbee","#c3dbee","#c2daee","#c1daed","#c0d9ed","#bfd9ec","#bed8ec","#bdd8ec","#bcd7eb","#bbd7eb","#b9d6eb","#b8d5ea","#b7d5ea","#b6d4e9","#b5d4e9","#b4d3e9","#b2d3e8","#b1d2e8","#b0d1e7","#afd1e7","#add0e7","#acd0e6","#abcfe6","#a9cfe5","#a8cee5","#a7cde5","#a5cde4","#a4cce4","#a3cbe3","#a1cbe3","#a0cae3","#9ec9e2","#9dc9e2","#9cc8e1","#9ac7e1","#99c6e1","#97c6e0","#96c5e0","#94c4df","#93c3df","#91c3df","#90c2de","#8ec1de","#8dc0de","#8bc0dd","#8abfdd","#88bedc","#87bddc","#85bcdc","#84bbdb","#82bbdb","#81badb","#7fb9da","#7eb8da","#7cb7d9","#7bb6d9","#79b5d9","#78b5d8","#76b4d8","#75b3d7","#73b2d7","#72b1d7","#70b0d6","#6fafd6","#6daed5","#6caed5","#6badd5","#69acd4","#68abd4","#66aad3","#65a9d3","#63a8d2","#62a7d2","#61a7d1","#5fa6d1","#5ea5d0","#5da4d0","#5ba3d0","#5aa2cf","#59a1cf","#57a0ce","#569fce","#559ecd","#549ecd","#529dcc","#519ccc","#509bcb","#4f9acb","#4d99ca","#4c98ca","#4b97c9","#4a96c9","#4895c8","#4794c8","#4693c7","#4592c7","#4492c6","#4391c6","#4190c5","#408fc4","#3f8ec4","#3e8dc3","#3d8cc3","#3c8bc2","#3b8ac2","#3a89c1","#3988c1","#3787c0","#3686c0","#3585bf","#3484bf","#3383be","#3282bd","#3181bd","#3080bc","#2f7fbc","#2e7ebb","#2d7dbb","#2c7cba","#2b7bb9","#2a7ab9","#2979b8","#2878b8","#2777b7","#2676b6","#2574b6","#2473b5","#2372b4","#2371b4","#2270b3","#216fb3","#206eb2","#1f6db1","#1e6cb0","#1d6bb0","#1c6aaf","#1c69ae","#1b68ae","#1a67ad","#1966ac","#1865ab","#1864aa","#1763aa","#1662a9","#1561a8","#1560a7","#145fa6","#135ea5","#135da4","#125ca4","#115ba3","#115aa2","#1059a1","#1058a0","#0f579f","#0e569e","#0e559d","#0e549c","#0d539a","#0d5299","#0c5198","#0c5097","#0b4f96","#0b4e95","#0b4d93","#0b4c92","#0a4b91","#0a4a90","#0a498e","#0a488d","#09478c","#09468a","#094589","#094487","#094386","#094285","#094183","#084082","#083e80","#083d7f","#083c7d","#083b7c","#083a7a","#083979","#083877","#083776","#083674","#083573","#083471","#083370","#08326e","#08316d","#08306b"]
function speedColor(num) {
    //console.log(Math.round(num))
    //console.log(reversedReds[Math.round(num)])
    return reversedReds[Math.round(num)];
}

function distColor(num) {
    //console.log(Math.round(num))
    //console.log(reversedReds[Math.round(num)])
    return blues[Math.round(num)];
}

function numToMins(num) {
    let seconds = Math.round(((num % 1)*6000)/100);
    if(seconds < 10){
        seconds = "0" + seconds.toString()
    }
    
    return Math.floor(num) + ":" + seconds;
}

function metersToMiles(m) {
    return Math.round(m*0.000621371192*10)/10;
}


function weeksInMonth(month) {
    let m = d3.timeMonth.floor(month)   //first day of month
    return d3.timeWeeks(d3.timeWeek.floor(m), d3.timeMonth.offset(m,1)).length;
    //returns length of all weeks b/t first day of this month and first day of next month
}