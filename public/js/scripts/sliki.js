var selo = document.querySelector("#nome").innerHTML;
var name;
if(selo == "Dolno Lukovo"){
    name = "dlukovo";
}else if(selo == "Gorno Lukovo"){
    name = "glukovo";
}else{
    name = selo.toLowerCase();
}
var sliki = document.querySelector('#otherPics');
// for localhost http://localhost:3000/api/ddis/
// for phone http://192.168.0.8:3000/api/ddis/
// for server http://80.211.7.75:3000/api/ddis/
fetch("http://80.211.7.75:3000/api/ddis/" + name)
    .then(response => response.json())
    .then(data => {
        data.anni.slice().reverse().forEach(element => {

            var immagini = document.createElement("div");

            for(var i=1; i<element.lista_foto.length; i++){

                var foto = document.createElement("img");
                foto.classList = "resp";
                foto.src = "images/turnir/teams/" + name + "/years/" + element.lista_foto[0] + "/" + element.lista_foto[i];

                var anchor = document.createElement("a");
                var att1 = document.createAttribute("data-strip-group");
                att1.value = element.lista_foto[0];
                var att2 = document.createAttribute("data-strip-group-options");
                att2.value = "loop: true, hideOnClickOutside: true,preload: [1,2]";
                anchor.classList = "strip";
                anchor.href = "images/turnir/teams/" + name + "/years/" + element.lista_foto[0] + "/" + element.lista_foto[i];
                anchor.setAttributeNode(att1);
                anchor.setAttributeNode(att2);
                anchor.appendChild(foto);

                immagini.appendChild(anchor);   
            }
            var divGalleria = document.createElement("div");
            divGalleria.classList = "galleria";
            divGalleria.appendChild(immagini);

            var titolo = document.createElement("h2");
            titolo.classList = "year";
            titolo.innerHTML = element.lista_foto[0];

            var divGodina = document.createElement("div");
            divGodina.classList = "godina";
            divGodina.appendChild(titolo);
            divGodina.appendChild(divGalleria);
            
            var divFoto = document.createElement("div");
            divFoto.classList = "years frost";
            divFoto.appendChild(divGodina);
            sliki.appendChild(divFoto);
        });
    })
    .catch(function() {
        console.log("there was an error");
    });