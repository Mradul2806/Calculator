let input = document.getElementById('inputbox');
let buttons = document.querySelectorAll('button');

let operator = ["+" , "-" , "*" , "/" , "%"];
const allowedCharacters = ["."];
let string = "";
let arr = Array.from(buttons);
arr.forEach(button => {
    button.addEventListener('click' , (e) =>{
        
        // For EqualsTo Button
        if(e.target.innerHTML == '='){
            string = eval(string);
            input.value = string;
            string = "";
        }

        // For All Clear Button
        else if(e.target.innerHTML == 'AC'){
            string = '';
            input.value = string;
        }
        
        // For Delete Button
        else if(e.target.innerHTML == 'DEL'){
            string = string.substring(0, string.length-1);
            input.value = string;
        }

        else if (e.target.innerHTML === '.' && string.includes('.')) {
            string = string.toString() ;
            // updateDisplay();
            // if(string.includes('+') || string.includes('-') || string.includes('*') || string.includes('/') || string.includes('%')){
            //     string = string.toString();

                // if (string.indexOf(operator)) {
                //     input.value += ".";
                // }

                // string.includes('.');
                // input.addEventListener("input", () => {
                //     allowSpecificInput(inputbox, allowedCharacters);
                //   });

            // }
        }

        

        else{
            string += e.target.innerHTML;
            input.value = string;
        }
    })
})

function updateDisplay() {
    const display = document.getElementById('inputbox');
    display.innerHTML = string;
}