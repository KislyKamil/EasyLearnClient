

let SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
let SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
let SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;


let grammar = '#JSGF V1.0;'

let recognition = new SpeechRecognition();
let speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = 'en-US';
recognition.interimResults = false;