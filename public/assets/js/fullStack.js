//hands off speech recognition app that listens for what the user is saying and when it recognizes certain words, triggers an API request that returns the image for that word

//speech recognition, global variable that lives
//within the browser - on top of window
window.SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition; //check to see if speech recog is native to browser if not, then loads relative prefix (webKit)
//declare new instance of recognition
var recognition = new SpeechRecognition();
recognition.lang = 'en-US';
// recognition.lang = 'hi-IN';

recognition.interimResults = true; //as user speaks, results get populated - user can see what she says as she says it
// let p = document.createElement("p");//adding paragraph element
// const words = document.querySelector(".words");//taking words div and appending the p's
// words.appendChild(p);

// function makeReq(){
//   var request = new XMLHttpRequest();
//   request.open("GET", "/api?word="+word, true);
//
//   request.onload = function(){
//     console.log("works")
//     if(request.status >= 200 && request.status < 400){
//       //success!
//       var data = JSON.parse(request.responseText);
//       console.log(data)
//     } else{
//       console.log("we reached our target server, but it returned an error");
//     }
//   }
// };

var x = document.querySelectorAll('.in');
var i, item;
for (i = 0; i < x.length; i++) {
    item = x[i];
    // item.value=i;
}
function speech(id) {
    console.log(id);
    recognition.addEventListener(
        'result',
        function fun(e) {
            //if stop speaking and start again, speech recognition no longer works because it only runs after it hears a 'result' event. When the result event is over, the event listener unbinds itself. So must include another function that calls speech recognition when it ends.
            console.log(e.results);
            var result = e.results;
            const transcript = Array.from(result) //take all the nested results and turn into a string. form an array because not array by default
                //map the first results
                .map(result => result[0])
                .map(result => result.transcript)
                .join(''); //want to join one big string in the end, made up of all the things the user said that the computer picked up

            console.log('result ' + result);
            console.log('transcript: ' + transcript);
            console.log('e.results[0] ' + e.results[0]);
            // p.textContent = transcript;//appending text to the DOM
            if (e.results[0] != undefined) {
                if (e.results[0].isFinal) {
                    console.log('inside Final');
                    // console.log("item"+x[i]);
                    document.getElementById(id).value = transcript;
                    recognition.stop();
                    recognition.removeEventListener('result', fun);
                    // recognition=null;
                    return;
                    // p = document.CreateElement("p");
                    // words.appendChild(p);
                }
            } //words each over each other as user talks because speech recognition resets so this is an edgecase

            //   if(transcript.includes("is" || "I" || "that")){
            //     makeReq();
            //   }
            //
            //   console.log(transcript);
        },
        { once: true }
    );
}
recognition.onspeechend = function() {
    recognition.stop();
};
recognition.addEventListener('end', recognition.start); //this will start speech recognition back up again after the user stops talking
recognition.start();
