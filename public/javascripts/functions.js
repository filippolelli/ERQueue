function updateCodice(id){
   const el= document.getElementById('codice');
   const codvalue= document.getElementById('codiceVal');

    switch(id){
        case 'wh':
            el.innerText="CODICE BIANCO";
            el.style.color='black';
            codvalue.value="0";
            break;
        case 'gr':
            el.innerText="CODICE VERDE"
            el.style.color='green';
            codvalue.value="1";
            break;
        case 'ye':
            el.innerText="CODICE GIALLO"
            el.style.color='#FFC500';
            codvalue.value="2";
            break;
        case 're':
            el.innerText="CODICE ROSSO"
            el.style.color='red';
            codvalue.value="3";
            break;
    }
}

