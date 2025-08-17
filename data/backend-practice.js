const xhr = new XMLHttpRequest ();

xhr.addEventListener('load', () => {               //wait for response and save 
  console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev');    // sending GET message to URL
xhr.send();     // send request 
