function closeNav() {
  
  try {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("mySidebar").style.display="none"
  }
  catch {

  }
 }
function openNav() {
  try {
    document.getElementById("mySidebar").style.display = "block"
    document.getElementById("mySidebar").style.width = "100vw";
  }
  catch {
    
  }
 }
