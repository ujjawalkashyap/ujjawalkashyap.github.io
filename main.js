const TypeWriter=function(txtElement, words, wait=3000){
  this.txtElement = txtElement;
  this.words= words;
  this.txt='';
  this.wordIndex = 0;
  this.wait = parseInt(wait,10);
  this.type();
  this.isDeleting;
}

//Type Method
TypeWriter.prototype.type=function(){
// console.log("hello");
// current Index
const current = this.wordIndex%this.words.length;
//get full text of current word
const fulltext=this.words[current];
//Check if deleting
if(this.isDeleting){
//remove char
this.txt= fulltext.substr(0, this.txt.length-1);
}
else{
//add char
this.txt= fulltext.substr(0, this.txt.length+1);

}

//insert text into element
this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

//Type speed
let typeSpeed=300;
if(this.isDeleting){
  typeSpeed/=2;
}

//If word is complete
if(!this.isDeleting && this.txt===fulltext){
//make pause at end
typeSpeed=this.wait;
//set isDeleting to true
this.isDeleting = true;
}else if(this.isDeleting && this.txt===''){
  this.isDeleting=false;
  //move to next work
  this.wordIndex++;
  //pause before the new word
  typeSpeed=500;
}


console.log(fulltext); 
  setTimeout(()=>this.type(),typeSpeed);
}

//Init on DOM load
document.addEventListener("DOMContentLoaded", init);

//Init App
function init(){
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  //Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}