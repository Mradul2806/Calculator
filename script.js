let input = document.getElementById('inputbox');
let buttons = document.querySelectorAll('button');

let operator = ["+" , "-" , "*" , "/" , "%"];
const allowedCharacters = ["."];
let string = "";
let f=false;
let arr = Array.from(buttons);
arr.forEach(button => {
    button.addEventListener('click' , (e) =>{
        
        // For EqualsTo Button
        if(e.target.innerHTML == '='){
            string = eval(string);
            input.value = string;
            // string = "";
            f=true;
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
            string = string.toString();

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
            console.log("f "+e.target.innerHTML)
            // temp=string;
            if(f && e.target.innerHTML>="0"){
                console.log(e.target.innerHTML)
                //  string += string;
                string = "";
                f=false
            }
            f=false
            string += e.target.innerHTML;
           // string=temp;
            input.value = string;
            //temp=""
             console.log(string)
           
           
            // console.log(e.target.innerHTML);
        }

        $(document).ready(function(){
            // $("p").css("background-color","red");
    
            if(string.length >= 10){
                console.log(string.length);
                $("string").css("font-size","50px");
            }
            // else{
            //     console.log(string.length);
            // }
        })
    })
})




function updateDisplay() {
    const display = document.getElementById('inputbox');
    display.innerHTML = string;
}