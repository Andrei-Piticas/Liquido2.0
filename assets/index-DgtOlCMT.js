(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const p of l.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&a(p)}).observe(document,{childList:!0,subtree:!0});function t(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerPolicy&&(l.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?l.credentials="include":r.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function a(r){if(r.ep)return;r.ep=!0;const l=t(r);fetch(r.href,l)}})();const N="drink-tracker-data";class W{constructor(){this.data=this.load()}load(){try{const e=localStorage.getItem(N);if(e)return JSON.parse(e)}catch(e){console.error("Failed to load data:",e)}return{users:[],drinkEntries:[],userStats:{},badges:this.getDefaultBadges()}}save(){try{return localStorage.setItem(N,JSON.stringify(this.data)),!0}catch(e){return console.error("Failed to save data:",e),!1}}createUser(e){return this.data.users.push(e),this.save(),e}getUser(e){return this.data.users.find(t=>t.id===e)}getUserByEmail(e){return this.data.users.find(t=>t.email===e)}updateUser(e,t){const a=this.getUser(e);return a?(Object.assign(a,t),this.save(),a):null}getAllUsers(){return this.data.users}getPendingUsers(){return this.data.users.filter(e=>e.status==="pending")}createDrinkEntry(e){return this.data.drinkEntries.push(e),this.updateStatsForEntry(e),this.save(),e}getDrinkEntry(e){return this.data.drinkEntries.find(t=>t.id===e)}updateDrinkEntry(e,t){const a=this.getDrinkEntry(e);return a?(Object.assign(a,t),this.recalculateAllStats(),this.save(),a):null}deleteDrinkEntry(e){const t=this.data.drinkEntries.findIndex(a=>a.id===e);return t!==-1?(this.data.drinkEntries.splice(t,1),this.recalculateAllStats(),this.save(),!0):!1}getAllDrinkEntries(){return this.data.drinkEntries}getUserStats(e){return this.data.userStats[e]||(this.data.userStats[e]={userId:e,totalDrinks:{coffee:0,beer:0,other:0,total:0},totalPaid:{coffee:0,beer:0,other:0,total:0},paymentRatio:0,badges:[],lastActive:Date.now()}),this.data.userStats[e]}getGlobalStats(){const e={totalDrinks:{coffee:0,beer:0,other:0,total:0},totalPaid:{coffee:0,beer:0,other:0,total:0},totalUsers:this.data.users.filter(t=>t.status==="approved").length,totalEntries:this.data.drinkEntries.length};return Object.values(this.data.userStats).forEach(t=>{e.totalDrinks.coffee+=t.totalDrinks.coffee,e.totalDrinks.beer+=t.totalDrinks.beer,e.totalDrinks.other+=t.totalDrinks.other,e.totalDrinks.total+=t.totalDrinks.total,e.totalPaid.coffee+=t.totalPaid.coffee,e.totalPaid.beer+=t.totalPaid.beer,e.totalPaid.other+=t.totalPaid.other,e.totalPaid.total+=t.totalPaid.total}),e}updateStatsForEntry(e){e.consumers.forEach(t=>{const a=this.getUserStats(t),r=e.quantity/e.consumers.length;a.totalDrinks[e.drinkType]+=r,a.totalDrinks.total+=r,a.lastActive=Date.now()}),e.payers.forEach(t=>{const a=this.getUserStats(t.userId);a.totalPaid[e.drinkType]+=t.quantity,a.totalPaid.total+=t.quantity,a.lastActive=Date.now()}),Object.values(this.data.userStats).forEach(t=>{t.paymentRatio=t.totalDrinks.total>0?t.totalPaid.total/t.totalDrinks.total:0})}recalculateAllStats(){this.data.userStats={},this.data.drinkEntries.forEach(e=>{this.updateStatsForEntry(e)})}awardBadge(e,t){const a=this.getUserStats(e);return a.badges.find(r=>r.badgeId===t)?!1:(a.badges.push({badgeId:t,awardedAt:Date.now()}),this.save(),!0)}getUserBadges(e){return this.getUserStats(e).badges.map(a=>({...this.data.badges.find(r=>r.id===a.badgeId),awardedAt:a.awardedAt}))}getAllBadges(){return this.data.badges}getDefaultBadges(){return[{id:"first-drink",name:"Primo Sorso",description:"Registra la tua prima bevuta",icon:"🥤",rarity:"common",criteria:{type:"total_drinks",threshold:1,drinkType:null}},{id:"coffee-starter",name:"Amante del Caffè",description:"Bevi 5 caffè",icon:"☕",rarity:"common",criteria:{type:"total_drinks",threshold:5,drinkType:"coffee"}},{id:"beer-starter",name:"Appassionato di Birra",description:"Bevi 5 birre",icon:"🍺",rarity:"common",criteria:{type:"total_drinks",threshold:5,drinkType:"beer"}},{id:"social-drinker",name:"Bevitore Sociale",description:"Raggiungi 10 bevute totali",icon:"🎉",rarity:"common",criteria:{type:"total_drinks",threshold:10,drinkType:null}},{id:"generous-friend",name:"Amico Generoso",description:"Paga per 10 bevute",icon:"💰",rarity:"rare",criteria:{type:"total_paid",threshold:10,drinkType:null}},{id:"coffee-addict",name:"Dipendente da Caffè",description:"Bevi 25 caffè",icon:"☕",rarity:"rare",criteria:{type:"total_drinks",threshold:25,drinkType:"coffee"}},{id:"beer-expert",name:"Esperto di Birra",description:"Bevi 25 birre",icon:"🍺",rarity:"rare",criteria:{type:"total_drinks",threshold:25,drinkType:"beer"}},{id:"party-animal",name:"Animale da Festa",description:"Raggiungi 50 bevute totali",icon:"🎊",rarity:"epic",criteria:{type:"total_drinks",threshold:50,drinkType:null}},{id:"big-spender",name:"Grande Spendaccione",description:"Paga per 50 bevute",icon:"💸",rarity:"epic",criteria:{type:"total_paid",threshold:50,drinkType:null}},{id:"legend",name:"Leggenda",description:"Raggiungi 100 bevute totali",icon:"👑",rarity:"legendary",criteria:{type:"total_drinks",threshold:100,drinkType:null}}]}export(){return JSON.stringify(this.data,null,2)}import(e){try{const t=JSON.parse(e);if(!t.users||!t.drinkEntries)throw new Error("Invalid data format");return this.data=t,this.save(),{success:!0}}catch(t){return{success:!1,error:t.message}}}clear(){this.data={users:[],drinkEntries:[],userStats:{},badges:this.getDefaultBadges()},this.save()}}var X=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function K(x){return x&&x.__esModule&&Object.prototype.hasOwnProperty.call(x,"default")?x.default:x}function Z(x){if(x.__esModule)return x;var e=x.default;if(typeof e=="function"){var t=function a(){return this instanceof a?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};t.prototype=e.prototype}else t={};return Object.defineProperty(t,"__esModule",{value:!0}),Object.keys(x).forEach(function(a){var r=Object.getOwnPropertyDescriptor(x,a);Object.defineProperty(t,a,r.get?r:{enumerable:!0,get:function(){return x[a]}})}),t}function ee(x){throw new Error('Could not dynamically require "'+x+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var H={exports:{}};const te={},ae=Object.freeze(Object.defineProperty({__proto__:null,default:te},Symbol.toStringTag,{value:"Module"})),re=Z(ae);(function(x){/**
 * @license bcrypt.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
 * Released under the Apache License, Version 2.0
 * see: https://github.com/dcodeIO/bcrypt.js for details
 */(function(e,t){typeof ee=="function"&&x&&x.exports?x.exports=t():(e.dcodeIO=e.dcodeIO||{}).bcrypt=t()})(X,function(){var e={},t=null;function a(d){if(x&&x.exports)try{return re.randomBytes(d)}catch{}try{var o;return(self.crypto||self.msCrypto).getRandomValues(o=new Uint32Array(d)),Array.prototype.slice.call(o)}catch{}if(!t)throw Error("Neither WebCryptoAPI nor a crypto module is available. Use bcrypt.setRandomFallback to set an alternative");return t(d)}var r=!1;try{a(1),r=!0}catch{}t=null,e.setRandomFallback=function(d){t=d},e.genSaltSync=function(d,o){if(d=d||F,typeof d!="number")throw Error("Illegal arguments: "+typeof d+", "+typeof o);d<4?d=4:d>31&&(d=31);var i=[];return i.push("$2a$"),d<10&&i.push("0"),i.push(d.toString()),i.push("$"),i.push(D(a(I),I)),i.join("")},e.genSalt=function(d,o,i){if(typeof o=="function"&&(i=o,o=void 0),typeof d=="function"&&(i=d,d=void 0),typeof d>"u")d=F;else if(typeof d!="number")throw Error("illegal arguments: "+typeof d);function n(s){p(function(){try{s(null,e.genSaltSync(d))}catch(c){s(c)}})}if(i){if(typeof i!="function")throw Error("Illegal callback: "+typeof i);n(i)}else return new Promise(function(s,c){n(function(f,h){if(f){c(f);return}s(h)})})},e.hashSync=function(d,o){if(typeof o>"u"&&(o=F),typeof o=="number"&&(o=e.genSaltSync(o)),typeof d!="string"||typeof o!="string")throw Error("Illegal arguments: "+typeof d+", "+typeof o);return L(d,o)},e.hash=function(d,o,i,n){function s(c){typeof d=="string"&&typeof o=="number"?e.genSalt(o,function(f,h){L(d,h,c,n)}):typeof d=="string"&&typeof o=="string"?L(d,o,c,n):p(c.bind(this,Error("Illegal arguments: "+typeof d+", "+typeof o)))}if(i){if(typeof i!="function")throw Error("Illegal callback: "+typeof i);s(i)}else return new Promise(function(c,f){s(function(h,u){if(h){f(h);return}c(u)})})};function l(d,o){for(var i=0,n=0,s=0,c=d.length;s<c;++s)d.charCodeAt(s)===o.charCodeAt(s)?++i:++n;return i<0?!1:n===0}e.compareSync=function(d,o){if(typeof d!="string"||typeof o!="string")throw Error("Illegal arguments: "+typeof d+", "+typeof o);return o.length!==60?!1:l(e.hashSync(d,o.substr(0,o.length-31)),o)},e.compare=function(d,o,i,n){function s(c){if(typeof d!="string"||typeof o!="string"){p(c.bind(this,Error("Illegal arguments: "+typeof d+", "+typeof o)));return}if(o.length!==60){p(c.bind(this,null,!1));return}e.hash(d,o.substr(0,29),function(f,h){f?c(f):c(null,l(h,o))},n)}if(i){if(typeof i!="function")throw Error("Illegal callback: "+typeof i);s(i)}else return new Promise(function(c,f){s(function(h,u){if(h){f(h);return}c(u)})})},e.getRounds=function(d){if(typeof d!="string")throw Error("Illegal arguments: "+typeof d);return parseInt(d.split("$")[2],10)},e.getSalt=function(d){if(typeof d!="string")throw Error("Illegal arguments: "+typeof d);if(d.length!==60)throw Error("Illegal hash length: "+d.length+" != 60");return d.substring(0,29)};var p=typeof process<"u"&&process&&typeof process.nextTick=="function"?typeof setImmediate=="function"?setImmediate:process.nextTick:setTimeout;function b(d){var o=[],i=0;return P.encodeUTF16toUTF8(function(){return i>=d.length?null:d.charCodeAt(i++)},function(n){o.push(n)}),o}var g="./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),k=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,54,55,56,57,58,59,60,61,62,63,-1,-1,-1,-1,-1,-1,-1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,-1,-1,-1,-1,-1,-1,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,-1,-1,-1,-1,-1],E=String.fromCharCode;function D(d,o){var i=0,n=[],s,c;if(o<=0||o>d.length)throw Error("Illegal len: "+o);for(;i<o;){if(s=d[i++]&255,n.push(g[s>>2&63]),s=(s&3)<<4,i>=o){n.push(g[s&63]);break}if(c=d[i++]&255,s|=c>>4&15,n.push(g[s&63]),s=(c&15)<<2,i>=o){n.push(g[s&63]);break}c=d[i++]&255,s|=c>>6&3,n.push(g[s&63]),n.push(g[c&63])}return n.join("")}function $(d,o){var i=0,n=d.length,s=0,c=[],f,h,u,m,v,y;if(o<=0)throw Error("Illegal len: "+o);for(;i<n-1&&s<o&&(y=d.charCodeAt(i++),f=y<k.length?k[y]:-1,y=d.charCodeAt(i++),h=y<k.length?k[y]:-1,!(f==-1||h==-1||(v=f<<2>>>0,v|=(h&48)>>4,c.push(E(v)),++s>=o||i>=n)||(y=d.charCodeAt(i++),u=y<k.length?k[y]:-1,u==-1)||(v=(h&15)<<4>>>0,v|=(u&60)>>2,c.push(E(v)),++s>=o||i>=n)));)y=d.charCodeAt(i++),m=y<k.length?k[y]:-1,v=(u&3)<<6>>>0,v|=m,c.push(E(v)),++s;var M=[];for(i=0;i<s;i++)M.push(c[i].charCodeAt(0));return M}var P=function(){var d={};return d.MAX_CODEPOINT=1114111,d.encodeUTF8=function(o,i){var n=null;for(typeof o=="number"&&(n=o,o=function(){return null});n!==null||(n=o())!==null;)n<128?i(n&127):n<2048?(i(n>>6&31|192),i(n&63|128)):n<65536?(i(n>>12&15|224),i(n>>6&63|128),i(n&63|128)):(i(n>>18&7|240),i(n>>12&63|128),i(n>>6&63|128),i(n&63|128)),n=null},d.decodeUTF8=function(o,i){for(var n,s,c,f,h=function(u){u=u.slice(0,u.indexOf(null));var m=Error(u.toString());throw m.name="TruncatedError",m.bytes=u,m};(n=o())!==null;)if(!(n&128))i(n);else if((n&224)===192)(s=o())===null&&h([n,s]),i((n&31)<<6|s&63);else if((n&240)===224)((s=o())===null||(c=o())===null)&&h([n,s,c]),i((n&15)<<12|(s&63)<<6|c&63);else if((n&248)===240)((s=o())===null||(c=o())===null||(f=o())===null)&&h([n,s,c,f]),i((n&7)<<18|(s&63)<<12|(c&63)<<6|f&63);else throw RangeError("Illegal starting byte: "+n)},d.UTF16toUTF8=function(o,i){for(var n,s=null;(n=s!==null?s:o())!==null;){if(n>=55296&&n<=57343&&(s=o())!==null&&s>=56320&&s<=57343){i((n-55296)*1024+s-56320+65536),s=null;continue}i(n)}s!==null&&i(s)},d.UTF8toUTF16=function(o,i){var n=null;for(typeof o=="number"&&(n=o,o=function(){return null});n!==null||(n=o())!==null;)n<=65535?i(n):(n-=65536,i((n>>10)+55296),i(n%1024+56320)),n=null},d.encodeUTF16toUTF8=function(o,i){d.UTF16toUTF8(o,function(n){d.encodeUTF8(n,i)})},d.decodeUTF8toUTF16=function(o,i){d.decodeUTF8(o,function(n){d.UTF8toUTF16(n,i)})},d.calculateCodePoint=function(o){return o<128?1:o<2048?2:o<65536?3:4},d.calculateUTF8=function(o){for(var i,n=0;(i=o())!==null;)n+=d.calculateCodePoint(i);return n},d.calculateUTF16asUTF8=function(o){var i=0,n=0;return d.UTF16toUTF8(o,function(s){++i,n+=d.calculateCodePoint(s)}),[i,n]},d}();Date.now=Date.now||function(){return+new Date};var I=16,F=10,V=16,Y=100,S=[608135816,2242054355,320440878,57701188,2752067618,698298832,137296536,3964562569,1160258022,953160567,3193202383,887688300,3232508343,3380367581,1065670069,3041331479,2450970073,2306472731],R=[3509652390,2564797868,805139163,3491422135,3101798381,1780907670,3128725573,4046225305,614570311,3012652279,134345442,2240740374,1667834072,1901547113,2757295779,4103290238,227898511,1921955416,1904987480,2182433518,2069144605,3260701109,2620446009,720527379,3318853667,677414384,3393288472,3101374703,2390351024,1614419982,1822297739,2954791486,3608508353,3174124327,2024746970,1432378464,3864339955,2857741204,1464375394,1676153920,1439316330,715854006,3033291828,289532110,2706671279,2087905683,3018724369,1668267050,732546397,1947742710,3462151702,2609353502,2950085171,1814351708,2050118529,680887927,999245976,1800124847,3300911131,1713906067,1641548236,4213287313,1216130144,1575780402,4018429277,3917837745,3693486850,3949271944,596196993,3549867205,258830323,2213823033,772490370,2760122372,1774776394,2652871518,566650946,4142492826,1728879713,2882767088,1783734482,3629395816,2517608232,2874225571,1861159788,326777828,3124490320,2130389656,2716951837,967770486,1724537150,2185432712,2364442137,1164943284,2105845187,998989502,3765401048,2244026483,1075463327,1455516326,1322494562,910128902,469688178,1117454909,936433444,3490320968,3675253459,1240580251,122909385,2157517691,634681816,4142456567,3825094682,3061402683,2540495037,79693498,3249098678,1084186820,1583128258,426386531,1761308591,1047286709,322548459,995290223,1845252383,2603652396,3431023940,2942221577,3202600964,3727903485,1712269319,422464435,3234572375,1170764815,3523960633,3117677531,1434042557,442511882,3600875718,1076654713,1738483198,4213154764,2393238008,3677496056,1014306527,4251020053,793779912,2902807211,842905082,4246964064,1395751752,1040244610,2656851899,3396308128,445077038,3742853595,3577915638,679411651,2892444358,2354009459,1767581616,3150600392,3791627101,3102740896,284835224,4246832056,1258075500,768725851,2589189241,3069724005,3532540348,1274779536,3789419226,2764799539,1660621633,3471099624,4011903706,913787905,3497959166,737222580,2514213453,2928710040,3937242737,1804850592,3499020752,2949064160,2386320175,2390070455,2415321851,4061277028,2290661394,2416832540,1336762016,1754252060,3520065937,3014181293,791618072,3188594551,3933548030,2332172193,3852520463,3043980520,413987798,3465142937,3030929376,4245938359,2093235073,3534596313,375366246,2157278981,2479649556,555357303,3870105701,2008414854,3344188149,4221384143,3956125452,2067696032,3594591187,2921233993,2428461,544322398,577241275,1471733935,610547355,4027169054,1432588573,1507829418,2025931657,3646575487,545086370,48609733,2200306550,1653985193,298326376,1316178497,3007786442,2064951626,458293330,2589141269,3591329599,3164325604,727753846,2179363840,146436021,1461446943,4069977195,705550613,3059967265,3887724982,4281599278,3313849956,1404054877,2845806497,146425753,1854211946,1266315497,3048417604,3681880366,3289982499,290971e4,1235738493,2632868024,2414719590,3970600049,1771706367,1449415276,3266420449,422970021,1963543593,2690192192,3826793022,1062508698,1531092325,1804592342,2583117782,2714934279,4024971509,1294809318,4028980673,1289560198,2221992742,1669523910,35572830,157838143,1052438473,1016535060,1802137761,1753167236,1386275462,3080475397,2857371447,1040679964,2145300060,2390574316,1461121720,2956646967,4031777805,4028374788,33600511,2920084762,1018524850,629373528,3691585981,3515945977,2091462646,2486323059,586499841,988145025,935516892,3367335476,2599673255,2839830854,265290510,3972581182,2759138881,3795373465,1005194799,847297441,406762289,1314163512,1332590856,1866599683,4127851711,750260880,613907577,1450815602,3165620655,3734664991,3650291728,3012275730,3704569646,1427272223,778793252,1343938022,2676280711,2052605720,1946737175,3164576444,3914038668,3967478842,3682934266,1661551462,3294938066,4011595847,840292616,3712170807,616741398,312560963,711312465,1351876610,322626781,1910503582,271666773,2175563734,1594956187,70604529,3617834859,1007753275,1495573769,4069517037,2549218298,2663038764,504708206,2263041392,3941167025,2249088522,1514023603,1998579484,1312622330,694541497,2582060303,2151582166,1382467621,776784248,2618340202,3323268794,2497899128,2784771155,503983604,4076293799,907881277,423175695,432175456,1378068232,4145222326,3954048622,3938656102,3820766613,2793130115,2977904593,26017576,3274890735,3194772133,1700274565,1756076034,4006520079,3677328699,720338349,1533947780,354530856,688349552,3973924725,1637815568,332179504,3949051286,53804574,2852348879,3044236432,1282449977,3583942155,3416972820,4006381244,1617046695,2628476075,3002303598,1686838959,431878346,2686675385,1700445008,1080580658,1009431731,832498133,3223435511,2605976345,2271191193,2516031870,1648197032,4164389018,2548247927,300782431,375919233,238389289,3353747414,2531188641,2019080857,1475708069,455242339,2609103871,448939670,3451063019,1395535956,2413381860,1841049896,1491858159,885456874,4264095073,4001119347,1565136089,3898914787,1108368660,540939232,1173283510,2745871338,3681308437,4207628240,3343053890,4016749493,1699691293,1103962373,3625875870,2256883143,3830138730,1031889488,3479347698,1535977030,4236805024,3251091107,2132092099,1774941330,1199868427,1452454533,157007616,2904115357,342012276,595725824,1480756522,206960106,497939518,591360097,863170706,2375253569,3596610801,1814182875,2094937945,3421402208,1082520231,3463918190,2785509508,435703966,3908032597,1641649973,2842273706,3305899714,1510255612,2148256476,2655287854,3276092548,4258621189,236887753,3681803219,274041037,1734335097,3815195456,3317970021,1899903192,1026095262,4050517792,356393447,2410691914,3873677099,3682840055,3913112168,2491498743,4132185628,2489919796,1091903735,1979897079,3170134830,3567386728,3557303409,857797738,1136121015,1342202287,507115054,2535736646,337727348,3213592640,1301675037,2528481711,1895095763,1721773893,3216771564,62756741,2142006736,835421444,2531993523,1442658625,3659876326,2882144922,676362277,1392781812,170690266,3921047035,1759253602,3611846912,1745797284,664899054,1329594018,3901205900,3045908486,2062866102,2865634940,3543621612,3464012697,1080764994,553557557,3656615353,3996768171,991055499,499776247,1265440854,648242737,3940784050,980351604,3713745714,1749149687,3396870395,4211799374,3640570775,1161844396,3125318951,1431517754,545492359,4268468663,3499529547,1437099964,2702547544,3433638243,2581715763,2787789398,1060185593,1593081372,2418618748,4260947970,69676912,2159744348,86519011,2512459080,3838209314,1220612927,3339683548,133810670,1090789135,1078426020,1569222167,845107691,3583754449,4072456591,1091646820,628848692,1613405280,3757631651,526609435,236106946,48312990,2942717905,3402727701,1797494240,859738849,992217954,4005476642,2243076622,3870952857,3732016268,765654824,3490871365,2511836413,1685915746,3888969200,1414112111,2273134842,3281911079,4080962846,172450625,2569994100,980381355,4109958455,2819808352,2716589560,2568741196,3681446669,3329971472,1835478071,660984891,3704678404,4045999559,3422617507,3040415634,1762651403,1719377915,3470491036,2693910283,3642056355,3138596744,1364962596,2073328063,1983633131,926494387,3423689081,2150032023,4096667949,1749200295,3328846651,309677260,2016342300,1779581495,3079819751,111262694,1274766160,443224088,298511866,1025883608,3806446537,1145181785,168956806,3641502830,3584813610,1689216846,3666258015,3200248200,1692713982,2646376535,4042768518,1618508792,1610833997,3523052358,4130873264,2001055236,3610705100,2202168115,4028541809,2961195399,1006657119,2006996926,3186142756,1430667929,3210227297,1314452623,4074634658,4101304120,2273951170,1399257539,3367210612,3027628629,1190975929,2062231137,2333990788,2221543033,2438960610,1181637006,548689776,2362791313,3372408396,3104550113,3145860560,296247880,1970579870,3078560182,3769228297,1714227617,3291629107,3898220290,166772364,1251581989,493813264,448347421,195405023,2709975567,677966185,3703036547,1463355134,2715995803,1338867538,1343315457,2802222074,2684532164,233230375,2599980071,2000651841,3277868038,1638401717,4028070440,3237316320,6314154,819756386,300326615,590932579,1405279636,3267499572,3150704214,2428286686,3959192993,3461946742,1862657033,1266418056,963775037,2089974820,2263052895,1917689273,448879540,3550394620,3981727096,150775221,3627908307,1303187396,508620638,2975983352,2726630617,1817252668,1876281319,1457606340,908771278,3720792119,3617206836,2455994898,1729034894,1080033504,976866871,3556439503,2881648439,1522871579,1555064734,1336096578,3548522304,2579274686,3574697629,3205460757,3593280638,3338716283,3079412587,564236357,2993598910,1781952180,1464380207,3163844217,3332601554,1699332808,1393555694,1183702653,3581086237,1288719814,691649499,2847557200,2895455976,3193889540,2717570544,1781354906,1676643554,2592534050,3230253752,1126444790,2770207658,2633158820,2210423226,2615765581,2414155088,3127139286,673620729,2805611233,1269405062,4015350505,3341807571,4149409754,1057255273,2012875353,2162469141,2276492801,2601117357,993977747,3918593370,2654263191,753973209,36408145,2530585658,25011837,3520020182,2088578344,530523599,2918365339,1524020338,1518925132,3760827505,3759777254,1202760957,3985898139,3906192525,674977740,4174734889,2031300136,2019492241,3983892565,4153806404,3822280332,352677332,2297720250,60907813,90501309,3286998549,1016092578,2535922412,2839152426,457141659,509813237,4120667899,652014361,1966332200,2975202805,55981186,2327461051,676427537,3255491064,2882294119,3433927263,1307055953,942726286,933058658,2468411793,3933900994,4215176142,1361170020,2001714738,2830558078,3274259782,1222529897,1679025792,2729314320,3714953764,1770335741,151462246,3013232138,1682292957,1483529935,471910574,1539241949,458788160,3436315007,1807016891,3718408830,978976581,1043663428,3165965781,1927990952,4200891579,2372276910,3208408903,3533431907,1412390302,2931980059,4132332400,1947078029,3881505623,4168226417,2941484381,1077988104,1320477388,886195818,18198404,3786409e3,2509781533,112762804,3463356488,1866414978,891333506,18488651,661792760,1628790961,3885187036,3141171499,876946877,2693282273,1372485963,791857591,2686433993,3759982718,3167212022,3472953795,2716379847,445679433,3561995674,3504004811,3574258232,54117162,3331405415,2381918588,3769707343,4154350007,1140177722,4074052095,668550556,3214352940,367459370,261225585,2610173221,4209349473,3468074219,3265815641,314222801,3066103646,3808782860,282218597,3406013506,3773591054,379116347,1285071038,846784868,2669647154,3771962079,3550491691,2305946142,453669953,1268987020,3317592352,3279303384,3744833421,2610507566,3859509063,266596637,3847019092,517658769,3462560207,3443424879,370717030,4247526661,2224018117,4143653529,4112773975,2788324899,2477274417,1456262402,2901442914,1517677493,1846949527,2295493580,3734397586,2176403920,1280348187,1908823572,3871786941,846861322,1172426758,3287448474,3383383037,1655181056,3139813346,901632758,1897031941,2986607138,3066810236,3447102507,1393639104,373351379,950779232,625454576,3124240540,4148612726,2007998917,544563296,2244738638,2330496472,2058025392,1291430526,424198748,50039436,29584100,3605783033,2429876329,2791104160,1057563949,3255363231,3075367218,3463963227,1469046755,985887462],_=[1332899944,1700884034,1701343084,1684370003,1668446532,1869963892];function T(d,o,i,n){var s,c=d[o],f=d[o+1];return c^=i[0],s=n[c>>>24],s+=n[256|c>>16&255],s^=n[512|c>>8&255],s+=n[768|c&255],f^=s^i[1],s=n[f>>>24],s+=n[256|f>>16&255],s^=n[512|f>>8&255],s+=n[768|f&255],c^=s^i[2],s=n[c>>>24],s+=n[256|c>>16&255],s^=n[512|c>>8&255],s+=n[768|c&255],f^=s^i[3],s=n[f>>>24],s+=n[256|f>>16&255],s^=n[512|f>>8&255],s+=n[768|f&255],c^=s^i[4],s=n[c>>>24],s+=n[256|c>>16&255],s^=n[512|c>>8&255],s+=n[768|c&255],f^=s^i[5],s=n[f>>>24],s+=n[256|f>>16&255],s^=n[512|f>>8&255],s+=n[768|f&255],c^=s^i[6],s=n[c>>>24],s+=n[256|c>>16&255],s^=n[512|c>>8&255],s+=n[768|c&255],f^=s^i[7],s=n[f>>>24],s+=n[256|f>>16&255],s^=n[512|f>>8&255],s+=n[768|f&255],c^=s^i[8],s=n[c>>>24],s+=n[256|c>>16&255],s^=n[512|c>>8&255],s+=n[768|c&255],f^=s^i[9],s=n[f>>>24],s+=n[256|f>>16&255],s^=n[512|f>>8&255],s+=n[768|f&255],c^=s^i[10],s=n[c>>>24],s+=n[256|c>>16&255],s^=n[512|c>>8&255],s+=n[768|c&255],f^=s^i[11],s=n[f>>>24],s+=n[256|f>>16&255],s^=n[512|f>>8&255],s+=n[768|f&255],c^=s^i[12],s=n[c>>>24],s+=n[256|c>>16&255],s^=n[512|c>>8&255],s+=n[768|c&255],f^=s^i[13],s=n[f>>>24],s+=n[256|f>>16&255],s^=n[512|f>>8&255],s+=n[768|f&255],c^=s^i[14],s=n[c>>>24],s+=n[256|c>>16&255],s^=n[512|c>>8&255],s+=n[768|c&255],f^=s^i[15],s=n[f>>>24],s+=n[256|f>>16&255],s^=n[512|f>>8&255],s+=n[768|f&255],c^=s^i[16],d[o]=f^i[V+1],d[o+1]=c,d}function U(d,o){for(var i=0,n=0;i<4;++i)n=n<<8|d[o]&255,o=(o+1)%d.length;return{key:n,offp:o}}function j(d,o,i){for(var n=0,s=[0,0],c=o.length,f=i.length,h,u=0;u<c;u++)h=U(d,n),n=h.offp,o[u]=o[u]^h.key;for(u=0;u<c;u+=2)s=T(s,0,o,i),o[u]=s[0],o[u+1]=s[1];for(u=0;u<f;u+=2)s=T(s,0,o,i),i[u]=s[0],i[u+1]=s[1]}function Q(d,o,i,n){for(var s=0,c=[0,0],f=i.length,h=n.length,u,m=0;m<f;m++)u=U(o,s),s=u.offp,i[m]=i[m]^u.key;for(s=0,m=0;m<f;m+=2)u=U(d,s),s=u.offp,c[0]^=u.key,u=U(d,s),s=u.offp,c[1]^=u.key,c=T(c,0,i,n),i[m]=c[0],i[m+1]=c[1];for(m=0;m<h;m+=2)u=U(d,s),s=u.offp,c[0]^=u.key,u=U(d,s),s=u.offp,c[1]^=u.key,c=T(c,0,i,n),n[m]=c[0],n[m+1]=c[1]}function O(d,o,i,n,s){var c=_.slice(),f=c.length,h;if(i<4||i>31)if(h=Error("Illegal number of rounds (4-31): "+i),n){p(n.bind(this,h));return}else throw h;if(o.length!==I)if(h=Error("Illegal salt length: "+o.length+" != "+I),n){p(n.bind(this,h));return}else throw h;i=1<<i>>>0;var u,m,v=0,y;Int32Array?(u=new Int32Array(S),m=new Int32Array(R)):(u=S.slice(),m=R.slice()),Q(o,d,u,m);function M(){if(s&&s(v/i),v<i)for(var A=Date.now();v<i&&(v=v+1,j(d,u,m),j(o,u,m),!(Date.now()-A>Y)););else{for(v=0;v<64;v++)for(y=0;y<f>>1;y++)T(c,y<<1,u,m);var w=[];for(v=0;v<f;v++)w.push((c[v]>>24&255)>>>0),w.push((c[v]>>16&255)>>>0),w.push((c[v]>>8&255)>>>0),w.push((c[v]&255)>>>0);if(n){n(null,w);return}else return w}n&&p(M)}if(typeof n<"u")M();else for(var B;;)if(typeof(B=M())<"u")return B||[]}function L(d,o,i,n){var s;if(typeof d!="string"||typeof o!="string")if(s=Error("Invalid string / salt: Not a string"),i){p(i.bind(this,s));return}else throw s;var c,f;if(o.charAt(0)!=="$"||o.charAt(1)!=="2")if(s=Error("Invalid salt version: "+o.substring(0,2)),i){p(i.bind(this,s));return}else throw s;if(o.charAt(2)==="$")c="\0",f=3;else{if(c=o.charAt(2),c!=="a"&&c!=="b"&&c!=="y"||o.charAt(3)!=="$")if(s=Error("Invalid salt revision: "+o.substring(2,4)),i){p(i.bind(this,s));return}else throw s;f=4}if(o.charAt(f+2)>"$")if(s=Error("Missing salt rounds"),i){p(i.bind(this,s));return}else throw s;var h=parseInt(o.substring(f,f+1),10)*10,u=parseInt(o.substring(f+1,f+2),10),m=h+u,v=o.substring(f+3,f+25);d+=c>="a"?"\0":"";var y=b(d),M=$(v,I);function B(A){var w=[];return w.push("$2"),c>="a"&&w.push(c),w.push("$"),m<10&&w.push("0"),w.push(m.toString()),w.push("$"),w.push(D(M,M.length)),w.push(D(A,_.length*4-1)),w.join("")}if(typeof i>"u")return B(O(y,M,m));O(y,M,m,function(A,w){A?i(A,null):i(null,B(w))},n)}return e.encodeBase64=D,e.decodeBase64=$,e})})(H);var se=H.exports;const G=K(se);function ne({username:x,email:e,password:t,profilePicture:a=null,isAdmin:r=!1}){return{id:crypto.randomUUID(),username:x,email:e,passwordHash:t,profilePicture:a,status:"pending",isAdmin:r,createdAt:Date.now(),approvedAt:null}}function ie({drinkType:x,quantity:e,consumers:t,payers:a,notes:r=null,createdBy:l}){return{id:crypto.randomUUID(),drinkType:x,quantity:e,consumers:t,payers:a,timestamp:Date.now(),notes:r,createdBy:l}}function z(x){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x)}function J(x){return x.length>=8&&/[!@#$%^&*(),.?":{}|<>]/.test(x)}function oe(x){return["coffee","beer","other"].includes(x.drinkType)?x.quantity<=0?{valid:!1,error:"Quantity must be positive"}:!x.consumers||x.consumers.length===0?{valid:!1,error:"At least one consumer required"}:!x.payers||x.payers.length===0?{valid:!1,error:"At least one payer required"}:x.payers.reduce((t,a)=>t+a.quantity,0)!==x.quantity?{valid:!1,error:"Payer quantities must sum to total quantity"}:{valid:!0}:{valid:!1,error:"Invalid drink type"}}class de{constructor(e){this.dataManager=e,this.currentUser=this.loadSession()}async register(e,t,a,r=null){if(!e||e.trim().length===0)return{success:!1,error:"Username is required"};if(!z(t))return{success:!1,error:"Invalid email format"};if(!J(a))return{success:!1,error:"Password must be at least 8 characters and contain a special character"};if(this.dataManager.getUserByEmail(t))return{success:!1,error:"Email already registered"};const l=await G.hash(a,10),p=ne({username:e,email:t,password:l,profilePicture:r,isAdmin:!1});return this.dataManager.createUser(p),{success:!0,message:"Registration successful. Awaiting admin approval."}}async login(e,t){const a=this.dataManager.getUserByEmail(e);return a?await G.compare(t,a.passwordHash)?a.status==="pending"?{success:!1,error:"Your account is awaiting admin approval"}:a.status==="rejected"?{success:!1,error:"Your account has been rejected"}:(this.currentUser=a,this.saveSession(a),{success:!0,user:a}):{success:!1,error:"Invalid email or password"}:{success:!1,error:"Invalid email or password"}}logout(){this.currentUser=null,localStorage.removeItem("drink-tracker-session")}getCurrentUser(){return this.currentUser}isAuthenticated(){return this.currentUser!==null&&this.currentUser.status==="approved"}isAdmin(){return this.isAuthenticated()&&this.currentUser.isAdmin}approveUser(e){if(!this.isAdmin())return{success:!1,error:"Admin access required"};const t=this.dataManager.updateUser(e,{status:"approved",approvedAt:Date.now()});return t?{success:!0,user:t}:{success:!1,error:"User not found"}}rejectUser(e){if(!this.isAdmin())return{success:!1,error:"Admin access required"};const t=this.dataManager.updateUser(e,{status:"rejected"});return t?{success:!0,user:t}:{success:!1,error:"User not found"}}saveSession(e){localStorage.setItem("drink-tracker-session",JSON.stringify({userId:e.id,email:e.email}))}loadSession(){try{const e=localStorage.getItem("drink-tracker-session");if(e){const{userId:t}=JSON.parse(e),a=this.dataManager.getUser(t);if(a&&a.status==="approved")return a}}catch(e){console.error("Failed to load session:",e)}return null}}class ce{constructor(e){this.dataManager=e}addDrinkEntry({drinkType:e,quantity:t,consumers:a,payers:r,notes:l=null,createdBy:p}){const b=ie({drinkType:e,quantity:t,consumers:a,payers:r,notes:l,createdBy:p}),g=oe(b);return g.valid?(this.dataManager.createDrinkEntry(b),{success:!0,entry:b}):{success:!1,error:g.error}}addQuickDrink(e,t,a,r){return this.addDrinkEntry({drinkType:e,quantity:t,consumers:[a],payers:[{userId:r,quantity:t}],createdBy:a})}addSplitPayment({drinkType:e,quantity:t,consumers:a,payers:r,notes:l=null,createdBy:p}){return this.addDrinkEntry({drinkType:e,quantity:t,consumers:a,payers:r,notes:l,createdBy:p})}updateEntry(e,t){const a=this.dataManager.updateDrinkEntry(e,t);return a?{success:!0,entry:a}:{success:!1,error:"Entry not found"}}deleteEntry(e){return this.dataManager.deleteDrinkEntry(e)?{success:!0}:{success:!1,error:"Entry not found"}}getEntries(){return this.dataManager.getAllDrinkEntries()}getEntry(e){return this.dataManager.getDrinkEntry(e)}}class le{constructor(e){this.dataManager=e}getConsumptionLeaderboard(e=null){const a=this.dataManager.getAllUsers().filter(r=>r.status==="approved").map(r=>{const l=this.dataManager.getUserStats(r.id),p=e?l.totalDrinks[e]:l.totalDrinks.total;return{userId:r.id,username:r.username,profilePicture:r.profilePicture,consumption:p,drinkType:e}});return a.sort((r,l)=>l.consumption-r.consumption),a}getPaymentLeaderboard(){const t=this.dataManager.getAllUsers().filter(a=>a.status==="approved").map(a=>{const r=this.dataManager.getUserStats(a.id);return{userId:a.id,username:a.username,profilePicture:a.profilePicture,totalPaid:r.totalPaid.total,totalConsumed:r.totalDrinks.total,percentage:r.totalDrinks.total>0?(r.totalPaid.total/r.totalDrinks.total*100).toFixed(1):0}});return t.sort((a,r)=>r.totalPaid-a.totalPaid),t}getFreeloaderLeaderboard(){const t=this.dataManager.getAllUsers().filter(a=>a.status==="approved").map(a=>{const r=this.dataManager.getUserStats(a.id);return{userId:a.id,username:a.username,profilePicture:a.profilePicture,totalPaid:r.totalPaid.total,totalConsumed:r.totalDrinks.total,ratio:r.totalPaid.total>0?r.totalDrinks.total/r.totalPaid.total:r.totalDrinks.total>0?1/0:0,percentage:r.totalDrinks.total>0?(r.totalPaid.total/r.totalDrinks.total*100).toFixed(1):0}}).filter(a=>a.totalConsumed>a.totalPaid);return t.sort((a,r)=>r.ratio-a.ratio),t}getUserRank(e,t,a=null){let r;switch(t){case"consumption":r=this.getConsumptionLeaderboard(a);break;case"payment":r=this.getPaymentLeaderboard();break;case"freeloader":r=this.getFreeloaderLeaderboard();break;default:return null}const l=r.findIndex(p=>p.userId===e);return l>=0?l+1:null}}class fe{constructor(e){this.dataManager=e}checkAndAwardBadges(e){const t=this.dataManager.getUserStats(e),a=this.dataManager.getAllBadges(),r=[];return a.forEach(l=>{t.badges.find(p=>p.badgeId===l.id)||this.checkBadgeCriteria(l,t)&&(this.dataManager.awardBadge(e,l.id),r.push(l))}),r}checkBadgeCriteria(e,t){const{type:a,threshold:r,drinkType:l}=e.criteria;switch(a){case"total_drinks":return l?t.totalDrinks[l]>=r:t.totalDrinks.total>=r;case"total_paid":return l?t.totalPaid[l]>=r:t.totalPaid.total>=r;case"payment_ratio":return t.paymentRatio>=r;default:return!1}}getUserBadges(e){return this.dataManager.getUserBadges(e)}getAllBadges(){return this.dataManager.getAllBadges()}getBadgeProgress(e,t){const a=this.dataManager.getAllBadges().find(k=>k.id===t);if(!a)return null;const r=this.dataManager.getUserStats(e),{type:l,threshold:p,drinkType:b}=a.criteria;let g=0;switch(l){case"total_drinks":g=b?r.totalDrinks[b]:r.totalDrinks.total;break;case"total_paid":g=b?r.totalPaid[b]:r.totalPaid.total;break;case"payment_ratio":g=r.paymentRatio;break}return{current:g,threshold:p,percentage:Math.min(g/p*100,100),completed:g>=p}}}class xe{constructor(e){this.dataManager=e}getUserStats(e){return this.dataManager.getUserStats(e)}getGlobalStats(){return this.dataManager.getGlobalStats()}getMoneyComparisons(e){const t=[];if(e>=10){const a=Math.floor(e/10);t.push(`${a} pizza${a!==1?"s":""}`)}if(e>=1e3){const a=Math.floor(e/1e3);t.push(`${a} iPhone${a!==1?"s":""}`)}if(e>=50){const a=Math.floor(e/50);t.push(`${a} video game${a!==1?"s":""}`)}if(e>=15){const a=Math.floor(e/15);t.push(`${a} movie ticket${a!==1?"s":""}`)}return t}getVolumeComparisons(e){const a=(e.totalDrinks.coffee*250+e.totalDrinks.beer*500+e.totalDrinks.other*350)/1e3,r=[];if(a>=1&&r.push(`${a.toFixed(1)} liters of liquid`),a>=20){const l=Math.floor(a/20);r.push(`Enough to water ${l} baobab tree${l!==1?"s":""}`)}if(a>=200){const l=Math.floor(a/200);r.push(`${l} bathtub${l!==1?"s":""}`)}if(a>=1e3){const l=(a/5e4).toFixed(2);r.push(`${l}% of an Olympic swimming pool`)}return r}calculateTotalSpent(e){const t={coffee:3,beer:5,other:4};return e.totalDrinks.coffee*t.coffee+e.totalDrinks.beer*t.beer+e.totalDrinks.other*t.other}getDetailedStats(e=null){const t=e?this.getUserStats(e):this.getGlobalStats(),a=this.calculateTotalSpent(t);return{...t,totalSpent:a,moneyComparisons:this.getMoneyComparisons(a),volumeComparisons:this.getVolumeComparisons(t)}}getTrendData(e="week"){const t=this.dataManager.getAllDrinkEntries(),a=Date.now(),r={day:24*60*60*1e3,week:7*24*60*60*1e3,month:30*24*60*60*1e3},l=a-r[e],p=t.filter(g=>g.timestamp>=l),b={};return p.forEach(g=>{const k=new Date(g.timestamp).toDateString();b[k]||(b[k]={coffee:0,beer:0,other:0}),b[k][g.drinkType]+=g.quantity}),Object.entries(b).map(([g,k])=>({date:g,...k}))}getPeakConsumption(e="week"){const t=this.getTrendData(e);return t.length===0?null:t.reduce((r,l)=>{const p=l.coffee+l.beer+l.other,b=r.coffee+r.beer+r.other;return p>b?l:r})}}class ue{constructor(){this.container=document.getElementById("notifications"),this.notifications=[]}show(e,t="info",a=3e3){const r={id:crypto.randomUUID(),message:e,type:t,duration:a};return this.notifications.push(r),this.render(r),a>0&&setTimeout(()=>this.dismiss(r.id),a),r.id}dismiss(e){const t=this.notifications.findIndex(a=>a.id===e);if(t>=0){this.notifications.splice(t,1);const a=document.querySelector(`[data-notification-id="${e}"]`);a&&(a.classList.add("fade-out"),setTimeout(()=>a.remove(),300))}}render(e){const t=document.createElement("div");t.className=`notification notification-${e.type}`,t.setAttribute("data-notification-id",e.id),t.innerHTML=`
      <span class="notification-message">${e.message}</span>
      <button class="notification-close" onclick="window.notificationManager.dismiss('${e.id}')">×</button>
    `,this.container.appendChild(t)}success(e,t){return this.show(e,"success",t)}error(e,t){return this.show(e,"error",t)}info(e,t){return this.show(e,"info",t)}badge(e,t){return this.show(`🎉 Badge Sbloccato: ${t} ${e}!`,"success",5e3)}}function pe(x){return["image/jpeg","image/png","image/gif","image/webp"].includes(x.type)?x.size>5242880?{valid:!1,error:"Image too large. Maximum size is 5MB."}:{valid:!0}:{valid:!1,error:"Invalid image format. Please use JPEG, PNG, GIF, or WebP."}}function be(x){return new Promise((e,t)=>{const a=new FileReader;a.onload=()=>e(a.result),a.onerror=t,a.readAsDataURL(x)})}class he{constructor(e){this.app=e}render(){return`
      <div class="auth-container">
        <div class="auth-card">
          <h1>🍺 Drink Tracker</h1>
          <h2>Accedi</h2>
          <form id="login-form" class="auth-form">
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" required>
              <span class="error-message" id="email-error"></span>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" id="password" name="password" required>
              <span class="error-message" id="password-error"></span>
            </div>
            <button type="submit" class="btn btn-primary">Accedi</button>
            <div class="form-footer">
              <p>Non hai un account? <a href="/register" data-link>Registrati</a></p>
            </div>
          </form>
        </div>
      </div>
    `}mount(){document.getElementById("login-form").addEventListener("submit",t=>this.handleSubmit(t))}async handleSubmit(e){e.preventDefault();const t=document.getElementById("email").value,a=document.getElementById("password").value;document.getElementById("email-error").textContent="",document.getElementById("password-error").textContent="";const r=await this.app.authManager.login(t,a);r.success?(this.app.notificationManager.success("Accesso effettuato!"),this.app.router.navigate("/")):this.app.notificationManager.error(r.error)}}class me{constructor(e){this.app=e,this.profilePicture=null}render(){return`
      <div class="auth-container">
        <div class="auth-card">
          <h1>🍺 Drink Tracker</h1>
          <h2>Register</h2>
          <form id="register-form" class="auth-form">
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" id="username" name="username" required>
              <span class="error-message" id="username-error"></span>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" required>
              <span class="error-message" id="email-error"></span>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" id="password" name="password" required>
              <small>At least 8 characters with a special character</small>
              <span class="error-message" id="password-error"></span>
            </div>
            <div class="form-group">
              <label for="profile-picture">Profile Picture (optional)</label>
              <input type="file" id="profile-picture" accept="image/*">
              <div id="picture-preview"></div>
              <span class="error-message" id="picture-error"></span>
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
            <div class="form-footer">
              <p>Already have an account? <a href="/login" data-link>Login</a></p>
            </div>
          </form>
        </div>
      </div>
    `}mount(){const e=document.getElementById("register-form"),t=document.getElementById("profile-picture");e.addEventListener("submit",a=>this.handleSubmit(a)),t.addEventListener("change",a=>this.handlePictureChange(a))}async handlePictureChange(e){const t=e.target.files[0],a=document.getElementById("picture-error"),r=document.getElementById("picture-preview");if(!t){this.profilePicture=null,r.innerHTML="";return}const l=pe(t);if(!l.valid){a.textContent=l.error,this.profilePicture=null,r.innerHTML="";return}a.textContent="",this.profilePicture=await be(t),r.innerHTML=`<img src="${this.profilePicture}" alt="Preview" class="profile-preview">`}async handleSubmit(e){e.preventDefault();const t=document.getElementById("username").value.trim(),a=document.getElementById("email").value.trim(),r=document.getElementById("password").value;document.getElementById("username-error").textContent="",document.getElementById("email-error").textContent="",document.getElementById("password-error").textContent="";let l=!1;if(t||(document.getElementById("username-error").textContent="Username is required",l=!0),z(a)||(document.getElementById("email-error").textContent="Invalid email format",l=!0),J(r)||(document.getElementById("password-error").textContent="Password must be at least 8 characters with a special character",l=!0),l)return;const p=await this.app.authManager.register(t,a,r,this.profilePicture);p.success?(this.app.notificationManager.success(p.message),setTimeout(()=>this.app.router.navigate("/login"),2e3)):this.app.notificationManager.error(p.error)}}class C{constructor(e){this.app=e}render(){return this.app.authManager.getCurrentUser(),`
      <nav class="navbar">
        <div class="nav-container">
          <a href="/" data-link class="nav-brand">🍺 Drink Tracker</a>
          
          <button class="hamburger" id="hamburger-btn" aria-label="Menu">
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div class="nav-links" id="nav-links">
            <a href="/" data-link class="nav-link">
              <span class="nav-icon">🏠</span>
              <span>Dashboard</span>
            </a>
            <a href="/leaderboards" data-link class="nav-link">
              <span class="nav-icon">🏆</span>
              <span>Classifiche</span>
            </a>
            <a href="/stats" data-link class="nav-link">
              <span class="nav-icon">📊</span>
              <span>Statistiche</span>
            </a>
            <a href="/profile" data-link class="nav-link">
              <span class="nav-icon">👤</span>
              <span>Profilo</span>
            </a>
            ${this.app.authManager.isAdmin()?'<a href="/admin" data-link class="nav-link"><span class="nav-icon">⚙️</span><span>Admin</span></a>':""}
            <div class="nav-actions">
              <button class="theme-toggle" onclick="window.app.toggleTheme()" title="Cambia tema">
                <span id="theme-icon">🌙</span>
              </button>
              <button class="btn btn-secondary btn-sm" onclick="window.app.authManager.logout(); window.app.router.navigate('/login')">Esci</button>
            </div>
          </div>
        </div>
      </nav>
    `}mount(){const e=document.getElementById("hamburger-btn"),t=document.getElementById("nav-links");e&&(e.addEventListener("click",()=>{e.classList.toggle("active"),t.classList.toggle("active")}),t.querySelectorAll(".nav-link").forEach(r=>{r.addEventListener("click",()=>{e.classList.remove("active"),t.classList.remove("active")})}),document.addEventListener("click",r=>{!e.contains(r.target)&&!t.contains(r.target)&&(e.classList.remove("active"),t.classList.remove("active"))}))}}class ge{constructor(e){this.app=e,this.splitMode=!1}render(){return`
      <div class="quick-add-card">
        <h2>Aggiungi Bevuta</h2>
        <div class="drink-type-buttons">
          <button class="drink-btn" data-drink="coffee">
            <span class="drink-icon">☕</span>
            <span>Caffè</span>
          </button>
          <button class="drink-btn" data-drink="beer">
            <span class="drink-icon">🍺</span>
            <span>Birra</span>
          </button>
          <button class="drink-btn" data-drink="other">
            <span class="drink-icon">🥤</span>
            <span>Altro</span>
          </button>
        </div>
        <div id="drink-form-container"></div>
      </div>
    `}mount(){document.querySelectorAll(".drink-btn").forEach(t=>{t.addEventListener("click",()=>{const a=t.getAttribute("data-drink");this.showDrinkForm(a)})})}showDrinkForm(e){const t=document.getElementById("drink-form-container"),a=this.app.dataManager.getAllUsers().filter(b=>b.status==="approved"),r=this.app.authManager.getCurrentUser();t.innerHTML=`
      <form id="add-drink-form" class="drink-form">
        <input type="hidden" id="drink-type" value="${e}">
        
        <div class="form-group">
          <label for="quantity">Quantità</label>
          <input type="number" id="quantity" min="1" max="100" value="1" required>
        </div>

        <div class="form-group">
          <label>Chi ha bevuto?</label>
          <div class="user-checkboxes">
            ${a.map(b=>`
              <label class="checkbox-label">
                <input type="checkbox" name="consumers" value="${b.id}" ${b.id===r.id?"checked":""}>
                ${b.username}
              </label>
            `).join("")}
          </div>
        </div>

        <div class="form-group">
          <label>
            <input type="checkbox" id="split-mode">
            Pagamento Diviso
          </label>
        </div>

        <div id="payer-section">
          <div class="form-group">
            <label for="payer">Chi ha pagato?</label>
            <select id="payer" required>
              <option value="">Seleziona</option>
              ${a.map(b=>`
                <option value="${b.id}" ${b.id===r.id?"selected":""}>${b.username}</option>
              `).join("")}
            </select>
          </div>
        </div>

        <div id="split-payers-section" style="display: none;"></div>

        <div class="form-group">
          <label for="notes">Note (opzionale)</label>
          <input type="text" id="notes" placeholder="Aggiungi una nota...">
        </div>

        <div class="form-actions">
          <button type="button" class="btn btn-secondary" onclick="document.getElementById('drink-form-container').innerHTML = ''">Annulla</button>
          <button type="submit" class="btn btn-primary">Aggiungi</button>
        </div>
      </form>
    `;const l=document.getElementById("add-drink-form"),p=document.getElementById("split-mode");l.addEventListener("submit",b=>this.handleSubmit(b)),p.addEventListener("change",b=>this.toggleSplitMode(b.target.checked))}toggleSplitMode(e){this.splitMode=e;const t=document.getElementById("payer-section"),a=document.getElementById("split-payers-section");e?(t.style.display="none",a.style.display="block",this.renderSplitPayers()):(t.style.display="block",a.style.display="none")}renderSplitPayers(){const e=this.app.dataManager.getAllUsers().filter(a=>a.status==="approved"),t=document.getElementById("split-payers-section");t.innerHTML=`
      <div class="form-group">
        <label>Dividi pagamento tra:</label>
        ${e.map(a=>`
          <div class="split-payer">
            <label>${a.username}</label>
            <input type="number" class="split-quantity" data-user-id="${a.id}" min="0" value="0" placeholder="0">
          </div>
        `).join("")}
      </div>
    `}async handleSubmit(e){e.preventDefault();const t=document.getElementById("drink-type").value,a=parseInt(document.getElementById("quantity").value),r=document.getElementById("notes").value||null,l=this.app.authManager.getCurrentUser(),p=document.querySelectorAll('input[name="consumers"]:checked'),b=Array.from(p).map(E=>E.value);if(b.length===0){this.app.notificationManager.error("Seleziona almeno una persona");return}let g;if(this.splitMode){const E=document.querySelectorAll(".split-quantity");if(g=Array.from(E).map($=>({userId:$.getAttribute("data-user-id"),quantity:parseInt($.value)||0})).filter($=>$.quantity>0),g.reduce(($,P)=>$+P.quantity,0)!==a){this.app.notificationManager.error(`I pagamenti devono sommare a ${a}`);return}}else{const E=document.getElementById("payer").value;if(!E){this.app.notificationManager.error("Seleziona chi ha pagato");return}g=[{userId:E,quantity:a}]}const k=this.app.drinkManager.addDrinkEntry({drinkType:t,quantity:a,consumers:b,payers:g,notes:r,createdBy:l.id});k.success?(this.app.notificationManager.success("Bevuta aggiunta!"),b.forEach(E=>{this.app.badgeManager.checkAndAwardBadges(E).forEach($=>{this.app.notificationManager.badge($.name,$.icon)})}),document.getElementById("drink-form-container").innerHTML="",this.app.router.handleRoute()):this.app.notificationManager.error(k.error)}}function ve(x){return new Date(x).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})}function q(x){return new Date(x).toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}function ye(x){return{coffee:"☕",beer:"🍺",other:"🥤"}[x]||"🥤"}function ke(x){const e={common:"#9ca3af",rare:"#3b82f6",epic:"#a855f7",legendary:"#f59e0b"};return e[x]||e.common}class we{constructor(e){this.app=e}render(){const e=this.app.drinkManager.getEntries().sort((t,a)=>a.timestamp-t.timestamp).slice(0,10);return e.length===0?`
        <div class="recent-entries">
          <h2>Bevute Recenti</h2>
          <p class="empty-state">Nessuna bevuta ancora. Aggiungi la prima qui sopra!</p>
        </div>
      `:`
      <div class="recent-entries">
        <h2>Bevute Recenti</h2>
        <div class="entries-list">
          ${e.map(t=>this.renderEntry(t)).join("")}
        </div>
      </div>
    `}renderEntry(e){const t=e.consumers.map(r=>{const l=this.app.dataManager.getUser(r);return l?l.username:"Unknown"}).join(", "),a=e.payers.map(r=>{const l=this.app.dataManager.getUser(r.userId),p=l?l.username:"Unknown";return e.payers.length>1?`${p} (${r.quantity})`:p}).join(", ");return`
      <div class="entry-card">
        <div class="entry-icon">${ye(e.drinkType)}</div>
        <div class="entry-details">
          <div class="entry-header">
            <span class="entry-quantity">${e.quantity}x ${e.drinkType}</span>
            <span class="entry-time">${q(e.timestamp)}</span>
          </div>
          <div class="entry-info">
            <div>👥 ${t}</div>
            <div>💰 ${a}</div>
            ${e.notes?`<div class="entry-notes">📝 ${e.notes}</div>`:""}
          </div>
        </div>
      </div>
    `}}class Ee{constructor(e){this.app=e}render(){const e=this.app.authManager.getCurrentUser(),t=this.app.statsManager.getUserStats(e.id);return`
      ${new C(this.app).render()}
      <div class="container">
        <div class="dashboard">
          <div class="welcome-section">
            <h1>Benvenuto, ${e.username}! 👋</h1>
            <div class="quick-stats">
              <div class="stat-card">
                <span class="stat-icon">☕</span>
                <span class="stat-value">${t.totalDrinks.coffee}</span>
                <span class="stat-label">Caffè</span>
              </div>
              <div class="stat-card">
                <span class="stat-icon">🍺</span>
                <span class="stat-value">${t.totalDrinks.beer}</span>
                <span class="stat-label">Birre</span>
              </div>
              <div class="stat-card">
                <span class="stat-icon">🥤</span>
                <span class="stat-value">${t.totalDrinks.other}</span>
                <span class="stat-label">Altro</span>
              </div>
              <div class="stat-card">
                <span class="stat-icon">💰</span>
                <span class="stat-value">${t.totalPaid.total}</span>
                <span class="stat-label">Pagato</span>
              </div>
            </div>
          </div>
          
          <div id="quick-add-section"></div>
          <div id="recent-entries-section"></div>
        </div>
      </div>
    `}mount(){const e=new(require("../common/NavBar.js")).NavBar(this.app);e.mount&&e.mount();const t=document.getElementById("quick-add-section"),a=new ge(this.app);t.innerHTML=a.render(),a.mount();const r=document.getElementById("recent-entries-section"),l=new we(this.app);r.innerHTML=l.render()}}class $e{constructor(e){this.app=e,this.activeTab="coffee"}render(){return`
      ${new C(this.app).render()}
      <div class="container">
        <div class="leaderboards">
          <h1>🏆 Classifiche</h1>
          
          <div class="tabs">
            <button class="tab-btn active" data-tab="coffee">☕ Caffè</button>
            <button class="tab-btn" data-tab="beer">🍺 Birra</button>
            <button class="tab-btn" data-tab="other">🥤 Altro</button>
            <button class="tab-btn" data-tab="total">🎯 Totale</button>
            <button class="tab-btn" data-tab="payment">💰 Più Generosi</button>
            <button class="tab-btn" data-tab="freeloader">🤑 Scrocconi</button>
          </div>

          <div id="leaderboard-content"></div>
        </div>
      </div>
    `}mount(){const e=new(require("../common/NavBar.js")).NavBar(this.app);e.mount&&e.mount();const t=document.querySelectorAll(".tab-btn");t.forEach(a=>{a.addEventListener("click",()=>{t.forEach(r=>r.classList.remove("active")),a.classList.add("active"),this.activeTab=a.getAttribute("data-tab"),this.renderLeaderboard()})}),this.renderLeaderboard()}renderLeaderboard(){const e=document.getElementById("leaderboard-content"),t=this.app.authManager.getCurrentUser();let a,r;switch(this.activeTab){case"coffee":case"beer":case"other":a=this.app.leaderboardManager.getConsumptionLeaderboard(this.activeTab),r=`Top ${this.activeTab.charAt(0).toUpperCase()+this.activeTab.slice(1)} Consumers`;break;case"total":a=this.app.leaderboardManager.getConsumptionLeaderboard(null),r="Top Overall Consumers";break;case"payment":a=this.app.leaderboardManager.getPaymentLeaderboard(),r="Most Generous";break;case"freeloader":a=this.app.leaderboardManager.getFreeloaderLeaderboard(),r="Biggest Freeloaders";break}if(a.length===0){e.innerHTML=`
        <div class="leaderboard-section">
          <h2>${r}</h2>
          <p class="empty-state">No data yet!</p>
        </div>
      `;return}e.innerHTML=`
      <div class="leaderboard-section">
        <h2>${r}</h2>
        <div class="leaderboard-list">
          ${a.map((l,p)=>this.renderLeaderboardEntry(l,p,t.id)).join("")}
        </div>
      </div>
    `}renderLeaderboardEntry(e,t,a){const r=e.userId===a,l=t+1,p=l===1?"🥇":l===2?"🥈":l===3?"🥉":"";let b;return this.activeTab==="payment"?b=`${e.totalPaid} drinks (${e.percentage}%)`:this.activeTab==="freeloader"?b=`${e.totalConsumed} consumed / ${e.totalPaid} paid (${e.percentage}%)`:b=`${e.consumption} drinks`,`
      <div class="leaderboard-entry ${r?"current-user":""}">
        <div class="entry-rank">${p||l}</div>
        ${e.profilePicture?`<img src="${e.profilePicture}" class="entry-avatar" alt="${e.username}">`:'<div class="entry-avatar-placeholder">👤</div>'}
        <div class="entry-info">
          <div class="entry-name">${e.username}${r?" (You)":""}</div>
          <div class="entry-value">${b}</div>
        </div>
      </div>
    `}}class Me{constructor(e){this.app=e}render(){const e=this.app.authManager.getCurrentUser(),t=this.app.statsManager.getDetailedStats(e.id),a=this.app.badgeManager.getUserBadges(e.id),r=this.app.badgeManager.getAllBadges();return`
      ${new C(this.app).render()}
      <div class="container">
        <div class="profile">
          <div class="profile-header">
            ${e.profilePicture?`<img src="${e.profilePicture}" class="profile-avatar" alt="${e.username}">`:'<div class="profile-avatar-placeholder">👤</div>'}
            <div class="profile-info">
              <h1>${e.username}</h1>
              <p>${e.email}</p>
            </div>
          </div>

          <div class="profile-stats">
            <h2>Your Statistics</h2>
            <div class="stats-grid">
              <div class="stat-card">
                <span class="stat-icon">☕</span>
                <span class="stat-value">${t.totalDrinks.coffee}</span>
                <span class="stat-label">Coffees</span>
              </div>
              <div class="stat-card">
                <span class="stat-icon">🍺</span>
                <span class="stat-value">${t.totalDrinks.beer}</span>
                <span class="stat-label">Beers</span>
              </div>
              <div class="stat-card">
                <span class="stat-icon">🥤</span>
                <span class="stat-value">${t.totalDrinks.other}</span>
                <span class="stat-label">Other Drinks</span>
              </div>
              <div class="stat-card">
                <span class="stat-icon">🎯</span>
                <span class="stat-value">${t.totalDrinks.total}</span>
                <span class="stat-label">Total Drinks</span>
              </div>
              <div class="stat-card">
                <span class="stat-icon">💰</span>
                <span class="stat-value">${t.totalPaid.total}</span>
                <span class="stat-label">Drinks Paid For</span>
              </div>
              <div class="stat-card">
                <span class="stat-icon">💵</span>
                <span class="stat-value">$${t.totalSpent.toFixed(0)}</span>
                <span class="stat-label">Estimated Spent</span>
              </div>
            </div>

            ${t.moneyComparisons.length>0?`
              <div class="comparisons">
                <h3>That's enough to buy:</h3>
                <ul>
                  ${t.moneyComparisons.map(l=>`<li>${l}</li>`).join("")}
                </ul>
              </div>
            `:""}

            ${t.volumeComparisons.length>0?`
              <div class="comparisons">
                <h3>Volume consumed:</h3>
                <ul>
                  ${t.volumeComparisons.map(l=>`<li>${l}</li>`).join("")}
                </ul>
              </div>
            `:""}
          </div>

          <div class="profile-badges">
            <h2>Badges (${a.length}/${r.length})</h2>
            <div class="badges-grid">
              ${r.map(l=>{const p=a.find(b=>b.id===l.id);return this.renderBadge(l,p)}).join("")}
            </div>
          </div>

          <div class="profile-actions">
            <button class="btn btn-secondary" onclick="window.app.router.navigate('/stats')">View Detailed Stats</button>
            <button class="btn btn-secondary" onclick="document.getElementById('export-modal').style.display='block'">Export Data</button>
          </div>
        </div>
      </div>

      <div id="export-modal" class="modal" style="display: none;">
        <div class="modal-content">
          <h2>Export Data</h2>
          <p>Download all your drink tracking data as JSON</p>
          <div class="modal-actions">
            <button class="btn btn-secondary" onclick="document.getElementById('export-modal').style.display='none'">Cancel</button>
            <button class="btn btn-primary" onclick="window.app.exportData()">Download</button>
          </div>
        </div>
      </div>
    `}renderBadge(e,t){const a=!t,r=ke(e.rarity);return`
      <div class="badge-card ${a?"locked":""}" style="border-color: ${r}">
        <div class="badge-icon">${a?"🔒":e.icon}</div>
        <div class="badge-name">${e.name}</div>
        <div class="badge-description">${e.description}</div>
        ${t?`<div class="badge-date">Unlocked ${ve(t.awardedAt)}</div>`:""}
        <div class="badge-rarity" style="color: ${r}">${e.rarity}</div>
      </div>
    `}mount(){const e=new(require("../common/NavBar.js")).NavBar(this.app);e.mount&&e.mount(),window.app.exportData=()=>{const t=this.app.dataManager.export(),a=new Blob([t],{type:"application/json"}),r=URL.createObjectURL(a),l=document.createElement("a");l.href=r,l.download=`drink-tracker-export-${Date.now()}.json`,l.click(),URL.revokeObjectURL(r),document.getElementById("export-modal").style.display="none",this.app.notificationManager.success("Dati esportati con successo!")}}}class De{constructor(e){this.app=e}render(){const e=this.app.dataManager.getPendingUsers(),t=this.app.dataManager.getAllUsers(),a=this.app.drinkManager.getEntries().sort((r,l)=>l.timestamp-r.timestamp).slice(0,20);return`
      ${new C(this.app).render()}
      <div class="container">
        <div class="admin-page">
          <h1>⚙️ Admin Dashboard</h1>

          <div class="admin-section">
            <h2>Pending Approvals (${e.length})</h2>
            ${e.length===0?'<p class="empty-state">No pending users</p>':`
              <div class="pending-users-list">
                ${e.map(r=>this.renderPendingUser(r)).join("")}
              </div>
            `}
          </div>

          <div class="admin-section">
            <h2>All Users (${t.length})</h2>
            <div class="users-table">
              <table>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Drinks</th>
                    <th>Paid</th>
                    <th>Admin</th>
                  </tr>
                </thead>
                <tbody>
                  ${t.map(r=>this.renderUserRow(r)).join("")}
                </tbody>
              </table>
            </div>
          </div>

          <div class="admin-section">
            <h2>Recent Entries</h2>
            <div class="entries-table">
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Type</th>
                    <th>Quantity</th>
                    <th>Consumers</th>
                    <th>Payers</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${a.map(r=>this.renderEntryRow(r)).join("")}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `}renderPendingUser(e){return`
      <div class="pending-user-card">
        ${e.profilePicture?`<img src="${e.profilePicture}" class="user-avatar" alt="${e.username}">`:'<div class="user-avatar-placeholder">👤</div>'}
        <div class="user-info">
          <div class="user-name">${e.username}</div>
          <div class="user-email">${e.email}</div>
          <div class="user-date">Registered: ${q(e.createdAt)}</div>
        </div>
        <div class="user-actions">
          <button class="btn btn-success btn-sm" onclick="window.app.approveUser('${e.id}')">Approve</button>
          <button class="btn btn-danger btn-sm" onclick="window.app.rejectUser('${e.id}')">Reject</button>
        </div>
      </div>
    `}renderUserRow(e){const t=this.app.dataManager.getUserStats(e.id);return`
      <tr>
        <td>${e.username}</td>
        <td>${e.email}</td>
        <td><span class="status-badge status-${e.status}">${e.status}</span></td>
        <td>${t.totalDrinks.total}</td>
        <td>${t.totalPaid.total}</td>
        <td>${e.isAdmin?"✅":"❌"}</td>
      </tr>
    `}renderEntryRow(e){const t=e.consumers.map(r=>{const l=this.app.dataManager.getUser(r);return l?l.username:"Unknown"}).join(", "),a=e.payers.map(r=>{const l=this.app.dataManager.getUser(r.userId);return l?l.username:"Unknown"}).join(", ");return`
      <tr>
        <td>${q(e.timestamp)}</td>
        <td>${e.drinkType}</td>
        <td>${e.quantity}</td>
        <td>${t}</td>
        <td>${a}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="window.app.deleteEntry('${e.id}')">Delete</button>
        </td>
      </tr>
    `}mount(){const e=new(require("../common/NavBar.js")).NavBar(this.app);e.mount&&e.mount(),window.app.approveUser=t=>{const a=this.app.authManager.approveUser(t);a.success?(this.app.notificationManager.success("Utente approvato!"),this.app.router.handleRoute()):this.app.notificationManager.error(a.error)},window.app.rejectUser=t=>{if(confirm("Sei sicuro di voler rifiutare questo utente?")){const a=this.app.authManager.rejectUser(t);a.success?(this.app.notificationManager.success("Utente rifiutato"),this.app.router.handleRoute()):this.app.notificationManager.error(a.error)}},window.app.deleteEntry=t=>{if(confirm("Sei sicuro di voler eliminare questa bevuta? Le statistiche verranno ricalcolate.")){const a=this.app.drinkManager.deleteEntry(t);a.success?(this.app.notificationManager.success("Bevuta eliminata"),this.app.router.handleRoute()):this.app.notificationManager.error(a.error)}}}}class Ue{constructor(e){this.app=e}render(){const e=this.app.statsManager.getDetailedStats(),t=this.app.statsManager.getTrendData("week"),a=this.app.statsManager.getPeakConsumption("week");return`
      ${new C(this.app).render()}
      <div class="container">
        <div class="stats-page">
          <h1>📊 Statistics</h1>

          <div class="stats-section">
            <h2>Global Statistics</h2>
            <div class="stats-grid">
              <div class="stat-card">
                <span class="stat-icon">👥</span>
                <span class="stat-value">${e.totalUsers}</span>
                <span class="stat-label">Active Users</span>
              </div>
              <div class="stat-card">
                <span class="stat-icon">📝</span>
                <span class="stat-value">${e.totalEntries}</span>
                <span class="stat-label">Total Entries</span>
              </div>
              <div class="stat-card">
                <span class="stat-icon">☕</span>
                <span class="stat-value">${e.totalDrinks.coffee}</span>
                <span class="stat-label">Total Coffees</span>
              </div>
              <div class="stat-card">
                <span class="stat-icon">🍺</span>
                <span class="stat-value">${e.totalDrinks.beer}</span>
                <span class="stat-label">Total Beers</span>
              </div>
              <div class="stat-card">
                <span class="stat-icon">🥤</span>
                <span class="stat-value">${e.totalDrinks.other}</span>
                <span class="stat-label">Other Drinks</span>
              </div>
              <div class="stat-card">
                <span class="stat-icon">💵</span>
                <span class="stat-value">$${e.totalSpent.toFixed(0)}</span>
                <span class="stat-label">Total Spent</span>
              </div>
            </div>
          </div>

          ${e.moneyComparisons.length>0?`
            <div class="stats-section">
              <h2>💰 Money Comparisons</h2>
              <p>The group has spent enough to buy:</p>
              <ul class="comparisons-list">
                ${e.moneyComparisons.map(r=>`<li>${r}</li>`).join("")}
              </ul>
            </div>
          `:""}

          ${e.volumeComparisons.length>0?`
            <div class="stats-section">
              <h2>🌊 Volume Comparisons</h2>
              <p>The group has consumed:</p>
              <ul class="comparisons-list">
                ${e.volumeComparisons.map(r=>`<li>${r}</li>`).join("")}
              </ul>
            </div>
          `:""}

          ${a?`
            <div class="stats-section">
              <h2>📈 Peak Consumption</h2>
              <p>Highest consumption day this week: <strong>${a.date}</strong></p>
              <div class="peak-stats">
                <span>☕ ${a.coffee} coffees</span>
                <span>🍺 ${a.beer} beers</span>
                <span>🥤 ${a.other} other drinks</span>
              </div>
            </div>
          `:""}

          ${t.length>0?`
            <div class="stats-section">
              <h2>📊 Weekly Trends</h2>
              <div class="trend-chart">
                ${t.map(r=>`
                  <div class="trend-day">
                    <div class="trend-date">${new Date(r.date).toLocaleDateString("en-US",{weekday:"short"})}</div>
                    <div class="trend-bars">
                      <div class="trend-bar coffee" style="height: ${Math.min(r.coffee*10,100)}px" title="Coffee: ${r.coffee}"></div>
                      <div class="trend-bar beer" style="height: ${Math.min(r.beer*10,100)}px" title="Beer: ${r.beer}"></div>
                      <div class="trend-bar other" style="height: ${Math.min(r.other*10,100)}px" title="Other: ${r.other}"></div>
                    </div>
                  </div>
                `).join("")}
              </div>
              <div class="trend-legend">
                <span><span class="legend-color coffee"></span> Coffee</span>
                <span><span class="legend-color beer"></span> Beer</span>
                <span><span class="legend-color other"></span> Other</span>
              </div>
            </div>
          `:""}
        </div>
      </div>
    `}}class Ae{constructor(e){this.app=e,this.routes={"/":Ee,"/login":he,"/register":me,"/leaderboards":$e,"/profile":Me,"/admin":De,"/stats":Ue},this.currentPage=null,this.init()}init(){window.addEventListener("popstate",()=>this.handleRoute()),document.addEventListener("click",e=>{e.target.matches("[data-link]")&&(e.preventDefault(),this.navigate(e.target.getAttribute("href")))}),this.handleRoute()}navigate(e){window.history.pushState({},"",e),this.handleRoute()}handleRoute(){const e=window.location.pathname,t=this.routes[e]||this.routes["/"],a=this.app.authManager.isAuthenticated(),r=this.app.authManager.isAdmin();if(!a&&e!=="/login"&&e!=="/register"){this.navigate("/login");return}if(a&&(e==="/login"||e==="/register")){this.navigate("/");return}if(e==="/admin"&&!r){this.app.notificationManager.error("Admin access required"),this.navigate("/");return}this.renderPage(t)}renderPage(e){const t=document.getElementById("app");if(this.currentPage&&this.currentPage.destroy&&this.currentPage.destroy(),this.currentPage=new e(this.app),t.innerHTML=this.currentPage.render(),this.currentPage.mount&&this.currentPage.mount(),t.querySelector(".navbar")){const r=new(require("./components/common/NavBar.js")).NavBar(this.app);r.mount&&r.mount()}}}class Ie{constructor(){this.dataManager=new W,this.authManager=new de(this.dataManager),this.drinkManager=new ce(this.dataManager),this.leaderboardManager=new le(this.dataManager),this.badgeManager=new fe(this.dataManager),this.statsManager=new xe(this.dataManager),this.notificationManager=new ue,window.notificationManager=this.notificationManager,this.initializeTheme(),this.router=new Ae(this),this.initializeFirstAdmin()}initializeTheme(){const e=localStorage.getItem("drink-tracker-theme")||"light";document.documentElement.setAttribute("data-theme",e),this.updateThemeIcon(e)}toggleTheme(){const t=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";document.documentElement.setAttribute("data-theme",t),localStorage.setItem("drink-tracker-theme",t),this.updateThemeIcon(t)}updateThemeIcon(e){const t=document.getElementById("theme-icon");t&&(t.textContent=e==="dark"?"☀️":"🌙")}async initializeFirstAdmin(){if(this.dataManager.getAllUsers().length===0&&(await this.authManager.register("admin","admin@drinktracker.com","Admin123!",null)).success){const a=this.dataManager.getUserByEmail("admin@drinktracker.com");this.dataManager.updateUser(a.id,{status:"approved",isAdmin:!0,approvedAt:Date.now()}),console.log("Default admin created: admin@drinktracker.com / Admin123!")}}}document.addEventListener("DOMContentLoaded",()=>{window.app=new Ie});
//# sourceMappingURL=index-DgtOlCMT.js.map
