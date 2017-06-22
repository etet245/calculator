$(document).ready(function() {
  var input = "0";
  var currInput = "0";
  
  function calculate() {
    if (!/=/.test(input) && !(currInput==="+" || currInput==="-" || currInput==="*" || currInput==="/")) {
      currInput = eval(input);
      input += "=" + currInput;
      $("#curr-input").text(currInput);
      $("#log").text(input);
    }
  }
  
  function clear() {
    input = "0";
    currInput = "0";
    $("#curr-input").text("0");
    $("#log").text("0");
  }
  
  function backspace() {
    if (currInput==="+" || currInput==="-" || currInput==="*" || currInput==="/") {
      return;
    }
    
    input = input.slice(0,input.length-1);
    currInput = currInput.slice(0,currInput.length-1);
    if (input.length===0) {
      clear();
      return;
    }
    
    if (currInput.length===0) {
      currInput=input[input.length-1];
    }
    
    $("#curr-input").text(currInput);
    $("#log").text(input);
  }
  
  function numInput(btnID) {
    // clear after "=" evaluation
    if (/=/.test(input)) {
      clear();
    }
    
    // clear operator
    if (currInput==="+" || currInput==="-" || currInput==="*" || currInput==="/") {
      currInput = "0";
      input += currInput;
    }
    
    if (btnID==="dec") {
      // only one decimal point allowed
      if (/\./.test(currInput)) {
        return;
      } else {
        input += ".";
        currInput += ".";
      }
    } else if (btnID==="neg") {
      // if number is not already negative
      if (!/-/.test(currInput)) {
        input = input.slice(0,input.length-currInput.length);
        currInput = "-" + currInput;
        input = input + " " + currInput;
      }
      // otherwise take out negative sign
      else {
        input = input.slice(0,input.length-currInput.length-1);
        currInput = currInput.slice(1);
        input = input+currInput;
      }
    }
    else {
      // no leading 0 unless decimal
      if (currInput==="0"||currInput==="-0") {
        currInput = currInput.slice(0,currInput.length-1);
        input = input.slice(0,input.length-1);
      }
      input += btnID;
      currInput += btnID;
    }
    
    $("#curr-input").text(currInput);
    $("#log").text(input);
  }
  
  function operator(btnID) {
    // reuse output number after "=" is pressed
    if (/=/.test(input)) {
      input = currInput;
    }
    
    // only one operator at a time
    if (currInput==="+" || currInput==="-" || currInput==="*" || currInput==="/") {
      input = input.slice(0,input.length-1);
    }
    switch(btnID) {
      case "plus":
        currInput = "+"
        input += currInput;
        break;
      case "minus":
        currInput = "-"
        input += currInput;
        break;
      case "times":
        currInput = "*"
        input += currInput;
        break;
      case "divide":
        currInput = "/"
        input += currInput;
        break;
    }
    $("#curr-input").text(currInput);
    $("#log").text(input);
  }
  
  function btnPress(btnID) {
    if (/[0-9]/.test(btnID) || btnID==="dec" || btnID==="neg") {
      numInput(btnID);
    }
    if (btnID==="AC") {
      clear();
    }
    if (btnID==="back") {
      backspace();
    }
    if (btnID==="plus" || btnID==="minus" || btnID==="times" || btnID==="divide") {
      operator(btnID);
    }
    if (btnID==="eq") {
      calculate();
    }
  }
  
  $("td").click(function() {
    btnPress($(this).attr("id"));
  });
});