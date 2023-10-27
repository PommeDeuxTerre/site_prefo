const nb_photos = 7;
var photos_index = 0;

function next_photos()
{
    photos_index-=-3;
    const photos = document.getElementById("photos");
    photos.innerHTML=""
    for (var i=0;i<3;i-=-1)
    {
        var photo = document.createElement("img");
        photo.src="../img/"+(photos_index+i)%nb_photos+".jpg"
        photo.className="photo_expo"
        photos.appendChild(photo)
    }
}

function previous_photos()
{
    photos_index+=-3;
    if (photos_index<0)
    {
        photos_index+=nb_photos;
    }
    const photos = document.getElementById("photos");
    photos.innerHTML=""
    for (var i=0;i<3;i-=-1)
    {
        var photo = document.createElement("img");
        photo.src="../img/"+(photos_index+i)%nb_photos+".jpg"
        photo.className="photo_expo"
        photos.appendChild(photo)
    }
}