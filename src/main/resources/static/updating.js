// var update_loop = setInterval(Main, 1000);
//
// Main();
//
// function Main(){
//
//     // Thankfully JavaScript has an inherent time object we can use.
//     // It does need to be called every time you want an update value however.
//     var time = new Date();
//
//     // The "Date" method has predefined methods of its own.  These three for
//     // instance will return hours, minutes, and seconds as you might guess.
//     var hours = time.getHours();
//     var minutes = time.getMinutes();
//     var seconds = time.getSeconds();
//
//     if (document.querySelector("table")) {
//         let pattern = /(.+\s\/\s)/i;
//         let product_time = document.querySelector("table").getElementsByTagName("tr")[1].getElementsByTagName("td")[2].innerText;
//         product_time = product_time.replace(pattern, '').split(":");
//
//         let product_date = new Date();
//         product_date.setHours(parseInt(product_time[0]));
//         product_date.setMinutes(parseInt(product_time[1]));
//         product_date.setSeconds(parseInt(product_time[2]));
//
//         console.log(product_date);
//         console.log(time);
//
//         if (product_date >= time) {
//             let table = document.createElement("table");
//             table.dispatchEvent(buildEvent);
//         }
//     }
//
//     // We can then reference these values to create our clock as the inner
//     // html of any div we choose.
//     // document.getElementById("demo").innerHTML = hours + ':' + minutes + ':' + seconds;
// }