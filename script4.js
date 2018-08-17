// Initialize Firebase
var config = {
  apiKey: "AIzaSyCc2YpTnKyjFaRWM-QZDDAMIw4ELX4TeEw",
  authDomain: "falegnameriafinal.firebaseapp.com",
  databaseURL: "https://falegnameriafinal.firebaseio.com",
  projectId: "falegnameriafinal",
  storageBucket: "falegnameriafinal.appspot.com",
  messagingSenderId: "630877363606"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

Lista=[];
ListaFoto=[];

var databaseRef = database.ref().child('Lista');

loadData();

function snapshotToArraySpettacoli(snapshot) {

  snapshot.forEach(function(childSnapshot) {
    var item = childSnapshot.val();
    item.key = childSnapshot.key;
    //console.log(item);
    if(item.categoria=="vedute"){
      Lista.push(item);
    }
    console.log(Lista);
  });
  return Lista;
}

function loadData(){
  document.getElementById("loaderRicerca").style.display = "block";
  databaseRef.once("value").then( function(snapshot) {
    console.log(snapshotToArraySpettacoli(snapshot));

    ListaLen = Lista.length;
    lista="";
    modali="";
    for(i = 0; i < ListaLen; i++){
      lista += "<tr><td><div class=\"col-md-12\"><div class=\"row\"><h3><strong>"+ Lista[i].nome.toString() +"</strong></h3></div>"
      lista += "<div class=\"row\"><div class=\"col-md-4\"><img src=\""+ Lista[i].foto[0].toString() +"\" alt=\"Descrizione immagine\"/></div>"
      lista += "<div class=\"col-md-8\"><p>"+ Lista[i].descrizione.toString() +"</p><button type=\"button\" class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#myModal"+ i.toString() +"\" data-target=\".bs-example-modal-lg\">Clicca qui per ulteriori fotografie</button></div></div></div></td></tr>"

      modali += "<div class=\"modal fade bs-example-modal-lg\" tabindex=\"-1\" role=\"dialog\" id=\"myModal"+ i.toString() +"\"><div class=\"modal-dialog modal-lg\" role=\"document\">"
      modali += "<div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><h4 class=\"modal-title\">"+ Lista[i].nome.toString() +"</h4></div>"
      modali +="<div class=\"modal-body\"><div id=\"carousel-example-generic"+ i.toString() +"\" class=\"carousel slide\" data-ride=\"carousel\"><!-- Indicators --><ol class=\"carousel-indicators\"><li data-target=\"#carousel-example-generic\" data-slide-to=\"0\" class=\"active\"></li>"
      ListaFotoLen = Lista[i].foto.length;
      console.log(ListaFotoLen)
      for(j=1; j < ListaFotoLen; j++){
        modali += "<li data-target=\"#carousel-example-generic"+ i.toString() +"\" data-slide-to=\""+ j.toString() +"\"></li>"
      }

      modali += "</ol>"
      modali += "<!-- Wrapper for slides --><div class=\"carousel-inner\" role=\"listbox\"><div class=\"item active\"><img src=\""+ Lista[i].foto[0].toString() +"\" alt=\"Descrizione immagine\" id=\"photo"+ Lista[i].foto[0].toString() +"\" /><div class=\"carousel-caption\"><p>Foto 1</p><button class=\"btn btn-default\" onclick=\"myRotate('photo"+ Lista[i].foto[0].toString() +"')\"><img src=\"rotate_90_degrees_ccw_black_192x192.png\" alt=\"Descrizione immagine\" /></button></div></div>"
      for(k=1; k < ListaFotoLen; k++){
        modali += "<div class=\"item\"><img src=\""+ Lista[i].foto[k].toString() +"\" alt=\"Descrizione immagine\" id=\"photo"+ Lista[i].foto[k].toString() +"\"/><div class=\"carousel-caption\"><p>Foto "+ "2" +"</p><button class=\"btn btn-default\" onclick=\"myRotate('photo"+ Lista[i].foto[k].toString() +"')\"><img src=\"rotate_90_degrees_ccw_black_192x192.png\" alt=\"Descrizione immagine\" /></button></div></div>"
      }
      modali += "</div>"
      modali += "<!-- Controls --><a class=\"left carousel-control\" href=\"#carousel-example-generic"+ i.toString() +"\" role=\"button\" data-slide=\"prev\"><span class=\"glyphicon glyphicon-chevron-left\" aria-hidden=\"true\"></span><span class=\"sr-only\">Previous</span></a><a class=\"right carousel-control\" href=\"#carousel-example-generic"+ i.toString() +"\" role=\"button\" data-slide=\"next\"><span class=\"glyphicon glyphicon-chevron-right\" aria-hidden=\"true\"></span><span class=\"sr-only\">Next</span></a></div></div>"
      modali += "<div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-success\" data-dismiss=\"modal\">Close</button></div></div><!-- /.modal-content --></div><!-- /.modal-dialog --></div><!-- /.modal -->"
    }
    document.getElementById("loaderRicerca").style.display = "none";
    document.getElementById("Tabella").innerHTML = lista;
    document.getElementById("Modali").innerHTML = modali;
  });
}

function myRotate(id){
  var curr_value = document.getElementById(id.toString()).style.transform;
  var new_value = "rotate(90deg)";
  if(curr_value !== ""){
    var new_rotate = parseInt(curr_value.replace("rotate(","").replace(")","")) + 90;
    new_value = "rotate(" + new_rotate + "deg)";

  }
  document.getElementById(id.toString()).style.transform = new_value;
};

function myResearch(){
  document.getElementById("loaderRicerca").style.display = "block";
  var word = document.getElementById("Cerca").value;
  databaseRef.once("value").then( function(snapshot) {
    console.log(snapshotToArraySpettacoli(snapshot));
    ListaS=[]
    ListaLen = Lista.length;
    for(i==0; i<ListaLen; i++){
      var verificaA= Lista[i].descrizione.toLowerCase().includes(word.toString().toLowerCase());
      var verificaB= Lista[i].nome.toLowerCase().includes(word.toString().toLowerCase());
      if(verificaA || verificaB){
        ListaS.push(Lista[i]);
      }
    }
    ListaLenS = ListaS.length;
    lista="";
    modali="";
    for(i = 0; i < ListaLenS; i++){
      lista += "<tr><td><div class=\"col-md-12\"><div class=\"row\"><h3><strong>"+ ListaS[i].nome.toString() +"</strong></h3></div>"
      lista += "<div class=\"row\"><div class=\"col-md-4\"><img src=\""+ ListaS[i].foto[0].toString() +"\" alt=\"Descrizione immagine\"/></div>"
      lista += "<div class=\"col-md-8\"><p>"+ ListaS[i].descrizione.toString() +"</p><button type=\"button\" class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#myModal"+ i.toString() +"\" data-target=\".bs-example-modal-lg\">Clicca qui per ulteriori fotografie</button></div></div></div></td></tr>"

      modali += "<div class=\"modal fade bs-example-modal-lg\" tabindex=\"-1\" role=\"dialog\" id=\"myModal"+ i.toString() +"\"><div class=\"modal-dialog modal-lg\" role=\"document\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><h4 class=\"modal-title\">"+ ListaS[i].nome.toString() +"</h4></div>"
      modali +="<div class=\"modal-body\"><div id=\"carousel-example-generic"+ i.toString() +"\" class=\"carousel slide\" data-ride=\"carousel\"><!-- Indicators --><ol class=\"carousel-indicators\"><li data-target=\"#carousel-example-generic\" data-slide-to=\"0\" class=\"active\"></li>"
      ListaFotoLen = ListaS[i].foto.length;
      console.log(ListaFotoLen)
      for(j=1; j < ListaFotoLen; j++){
        modali += "<li data-target=\"#carousel-example-generic"+ i.toString() +"\" data-slide-to=\""+ j.toString() +"\"></li>"
      }

      modali += "</ol>"
      modali += "<!-- Wrapper for slides --><div class=\"carousel-inner\" role=\"listbox\"><div class=\"item active\"><img src=\""+ ListaS[i].foto[0].toString() +"\" alt=\"Descrizione immagine\" id=\"photo"+ ListaS[i].foto[0].toString() +"\" /><div class=\"carousel-caption\"><p>Foto 1</p><button class=\"btn btn-default\" onclick=\"myRotate('photo"+ ListaS[i].foto[0].toString() +"')\"><img src=\"rotate_90_degrees_ccw_black_192x192.png\" alt=\"Descrizione immagine\" /></button></div></div>"
      for(k=1; k < ListaFotoLen; k++){
        modali += "<div class=\"item\"><img src=\""+ ListaS[i].foto[k].toString() +"\" alt=\"Descrizione immagine\" id=\"photo"+ ListaS[i].foto[k].toString() +"\"/><div class=\"carousel-caption\"><p>Foto "+ "2" +"</p><button class=\"btn btn-default\" onclick=\"myRotate('photo"+ ListaS[i].foto[k].toString() +"')\"><img src=\"rotate_90_degrees_ccw_black_192x192.png\" alt=\"Descrizione immagine\" /></button></div></div>"
      }
      modali += "</div>"
      modali += "<!-- Controls --><a class=\"left carousel-control\" href=\"#carousel-example-generic"+ i.toString() +"\" role=\"button\" data-slide=\"prev\"><span class=\"glyphicon glyphicon-chevron-left\" aria-hidden=\"true\"></span><span class=\"sr-only\">Previous</span></a><a class=\"right carousel-control\" href=\"#carousel-example-generic"+ i.toString() +"\" role=\"button\" data-slide=\"next\"><span class=\"glyphicon glyphicon-chevron-right\" aria-hidden=\"true\"></span><span class=\"sr-only\">Next</span></a></div></div>"
      modali += "<div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-success\" data-dismiss=\"modal\">Close</button></div></div><!-- /.modal-content --></div><!-- /.modal-dialog --></div><!-- /.modal -->"
    }
    document.getElementById("loaderRicerca").style.display = "none";
    document.getElementById("Tabella").innerHTML = lista;
    document.getElementById("Modali").innerHTML = modali;
  });
}