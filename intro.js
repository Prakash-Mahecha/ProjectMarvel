var myvar = document.querySelector("#title");
//var id = document.querySelector('#id');
//const image = document.querySelector('#image');

Public_key = `af8dc2c389a07e056c12fc74fbf0b468`;
Private_key = `b8cd7bac4ec73fc385a27e75ac0bb038cb8faeeb`;

var date = new Date();
var ts = date.getTime();
var anything = [];

var hash = md5(ts+Private_key+Public_key);

console.log(hash);

var url=`http://gateway.marvel.com/v1/public/characters?limit=40&ts=${ts}&apikey=${Public_key}&hash=${hash}`;

var xhr = new XMLHttpRequest();
xhr.open("Get",url)
xhr.onreadystatechange = function(){
    if(this.status === 200 && this.readyState === 4){
       var resData = JSON.parse(this.responseText);
        display = resData.data.results;
        //  console.log(display);

        console.log(resData.data.results[0].thumbnail.path);
        var partImg;
        var img;
        var charac;
        var char;
        for(let i=0; i<display.length; i++)
        {
            partImg = `${display[i].thumbnail.path}/portrait_xlarge.jpg`;
            char = `${display[i].name}`;
            console.log(partImg);
            if(partImg !== "image_not_available")
            {
                img = document.createElement('img');
                charac = document.createElement("h2");
                charac.textContent = char;
                myvar.appendChild(charac);
                myvar.appendChild(img);
                img.src = `${partImg}`;
                img.style.width = '20%';
                
            }
        }
    }
}
xhr.send()