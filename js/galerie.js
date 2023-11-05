const nb_photos = 18;
var photos_index = 0;
var all_photos = []

function next_photos()
{
    photos_index-=-3;
    photos_index%=nb_photos
    photos_actualise()
}

function previous_photos()
{
    photos_index+=-3;
    if (photos_index<0)
    {
        photos_index+=nb_photos;
    }
    photos_index%=nb_photos
    photos_actualise()
}

async function photos_actualise(first=false)
{
    //counter
    const galerie = document.getElementById("Galerie")
    galerie.innerText = `Galerie (${photos_index+1}/${nb_photos})`
    //photos
    const photos = document.getElementById("photos");
    photos.innerHTML=""
    if (first)
    {
        for (var i=0;i<3;i-=-1)
        {
            var photo = document.createElement("img");
            photo.src="../img/photos/"+(photos_index+i)%nb_photos+".webp"
            photo.className="photo_expo"
            photos.appendChild(photo)
            all_photos[(photos_index+i)%nb_photos]=photo
        }
    }
    else{
        photos.appendChild(all_photos[photos_index])
        photos.appendChild(all_photos[(photos_index+1)%nb_photos])
        photos.appendChild(all_photos[(photos_index+2)%nb_photos])
    }
}

async function preload()
{
    var photo
    const void_div = document.getElementById("void")
    for (var i=0;i<nb_photos;i++)
    {
        photo = document.createElement("img");
        photo.src=`../img/photos/${i}.webp`
        photo.className="photo_expo"
        all_photos[(photos_index+i)%nb_photos]=photo
    }
}
window.onload = function() {
    photos_actualise(first=true)
    preload()
}