document.addEventListener("DOMContentLoaded", function(){

    ymaps.ready(init);
    function init(){
        var myMap = new ymaps.Map("map", {
            center: [57.09370262679214,65.67333976643754],
            zoom: 14
        });

        var myPlacemark = new ymaps.Placemark([57.09370262679214,65.67333976643754], {}, {
          iconLayout: 'default#image',
          iconImageHref: 'images/mark.svg',
          iconImageSize: [20, 20],
          iconImageOffset: [-10, -10]
        })

        myMap.geoObjects.add(myPlacemark);
    }

    const button = document.querySelectorAll('.services__block-img')
    const modal = document.querySelector('.modal')
    const image = document.querySelector('.modal__img')

    button.forEach(function(btn){
        btn.addEventListener('click', function(){
            let src = "images/" + btn.dataset.number + ".jpg"
            image.src = src
            modal.classList.add('modal__active')
        })
    })

    modal.addEventListener('click', function(){
        modal.classList.remove('modal__active')
    })
})