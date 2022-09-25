var source = new EventSource("/update");

source.onmessage = function (event) {
  document.getElementById("mess").innerText = "Updating...";
  var x = 0;
  var rows = JSON.parse(event.data);
  var tbody = document.getElementById("tablebody");
  if (tbody) tbody.remove();
  if (rows.error) {
    document.getElementById("div1").innerText =
      "Errore lato server, ricarica la pagina per riprovare";
    return;
  }

  tbody = document.createElement("tbody");
  tbody.setAttribute("id", "tablebody");

  rows.forEach((element) => {
    const tr = document.createElement("tr");
    var em;
    switch (element.codiceemergenza) {
      case "0":
        tr.setAttribute("class", "table-light");
        
        break;
      case "1":
        tr.setAttribute("class", "table-success");
        
        break;
      case "2":
        tr.setAttribute("class", "table-warning");
       
        break;
      case "3":
        tr.setAttribute("class", "table-danger");
        
        break;
    }
    const th = document.createElement("th");
    th.setAttribute("scope", "row");
    th.innerText = ++x;
    tr.appendChild(th);

    var td = document.createElement("td");
    td.innerText = element.nome;
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerText = element.cognome;
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerText = element.codicefiscale;
    tr.appendChild(td);

    

    td = document.createElement("td");
    td.innerText = timeConverter(parseInt(element.orarioarrivo));
    tr.appendChild(td);

    td = document.createElement("td");
    
    
    
    tbody.appendChild(tr);
  });
  if(rows.length!=0)   document.getElementById("codform").hidden=false;
  else document.getElementById("codform").hidden=true;

  const tabella = document.getElementById("tabella");
  tabella.appendChild(tbody);
  tabella.hidden = false;
  document.getElementById("mess").innerText = "";
};

source.onerror = function (error) {};

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp);
  var months = [
    "Gen",
    "Feb",
    "Mar",
    "Apr",
    "Mag",
    "Giu",
    "Lug",
    "Ago",
    "Set",
    "Ott",
    "Nov",
    "Dic",
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  if (min < 9) min = "0" + min;
  var time = date + " " + month + " " + year + " - " + hour + ":" + min;
  return time;
}


