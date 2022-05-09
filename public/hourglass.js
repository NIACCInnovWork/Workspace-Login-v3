function goodbye(e) {
    printData();
    
        if(!e) e = window.event;
        //e.cancelBubble is supported by IE - this will kill the bubbling process.
        e.cancelBubble = true;
        e.returnValue = 'You sure you want to leave?'; //This is displayed on the dialog

        //e.stopPropagation works in Firefox.
        if (e.stopPropagation) {
            e.stopPropagation();
            e.preventDefault();
        }
    }
window.onbeforeunload=goodbye;

var dataSaved = false;


var clockIns = {};

var clockOuts = [];

let aList = document.createElement('a');

function clockIn() {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    var currentTime = new Date();
    var hour = currentTime.getHours();
    var minute = currentTime.getMinutes();

    currentTime = hour + ':' + minute;

    var _arrayName = prompt('Please Enter Your First And Last Name').toUpperCase();

    clockIns[_arrayName] = [_arrayName];
    clockIns[_arrayName].push("Date: " + today);
    clockIns[_arrayName].push("Arrival Time: " + currentTime);
    
    var name = document.createElement('dt');
    name.id = [_arrayName];
    name.className = "home-dt";
    name.style.textDecoration = 'none';
    name.appendChild(document.createTextNode([_arrayName]));
 
    document.querySelector('dl').appendChild(name);
}//put a clockIns array, have it detect when someone clocks out, and delete, keep files for those still clocked in on close, and make print with clockOuts

function clockOut() {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    var currentTime = new Date();
    var hour = currentTime.getHours();
    var minute = currentTime.getMinutes();

    currentTime = hour + ':' + minute;

    var _arrayName = prompt("Please enter your first and last name.").toUpperCase(); /*should input "return" data from addName()
     based on the name input through the prompt*/ //add a delete method to remove names from clockedIn file of names when clocking out
    clockIns[_arrayName].push("Departure Time: " + currentTime);
    var spaceUse = prompt("What did you use the space for today?");
    clockIns[_arrayName].push("Usage of space: " + spaceUse);
    var toolUse = prompt("What tools did you use today?");
    clockIns[_arrayName].push("Tools used: " + toolUse);

    clockIns[_arrayName] = clockIns[_arrayName].join(" | ");

    clockOuts.push(clockIns[_arrayName]);
    
    
    
    delete clockIns[_arrayName];

    var removedName = document.getElementById([_arrayName]);
    removedName.remove();
}

function printData() {
  //create a FOR loop to turn every index item in clockedIn into a string with .join
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    var currentTime = new Date();
    var hour = currentTime.getHours();
    var minute = currentTime.getMinutes();

    currentTime = hour + ':' + minute;

    clockIns = Object.values(clockIns).map(value => `${value}`).join("p");
    
    clockIns = clockIns.replaceAll('p', '\n');
    clockIns = clockIns.replaceAll(',', ' | ');
    
    aList.href = "data:application/octet-stream," + "Incomplete Data:" + "\n" + encodeURIComponent(clockIns) + "\n" + "\n" + "Complete Data:" + "\n" + encodeURIComponent(clockOuts.join("\n"));
    aList.download = 'DATA' + today + ', ' + currentTime + '.txt';
    aList.click();
    
//    var dataSaved = true;


}


//make a test for whetheror not the program has been saved





