const display = document.getElementById('result');

function appendValue(input) {
    display.value += input;

}

function calculate() {
    // use Eval function
    // use a Try and  Catch statement to error check input
    try{
        display.value = eval(display.value);

    } catch(error) {

        display.value = "Error";
    }

}

function clearInput() {

    display.value = "";


}

function deleteInput() {

    display.value = display.value.slice(0, -1);
}
