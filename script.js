// lembrar de colocar a key no id
// função para pegar todos os campeaos e os ids
const campeaoContainer = document.querySelector('.campeao-lista')
const avisoCarregando = document.querySelector('.aviso-carregando')
const input = document.querySelector('#input-search')
const skinsContainer = document.querySelector('.campeao-skins-fundo')
const btnFechar = document.querySelector('.btn-fechar')
const swiperImagens = document.querySelector('.swiper-wrapper')
const nomeSkin = document.querySelector('.skin-nome')

async function fetchChampions() {
    const response = await fetch('http://ddragon.leagueoflegends.com/cdn/13.4.1/data/pt_BR/champion.json').then(resp => resp.json())
    const champions = await response.data
    return champions
}

fetchChampions().then((championList) => {
    avisoCarregando.style.display = 'none'

    for (let champion in championList ) {
        campeaoContainer.innerHTML += `<div id="${championList[champion].id}" class="campeao">
            <div class="campeao-img-container">
            <img loading=lazy src="http://ddragon.leagueoflegends.com/cdn/img/champion/centered/${championList[champion].id}_0.jpg" alt="">
            </div>
            <span class="campeao-nome">${championList[champion].name}</span>
            </div>`

        if (championList[champion].id == 'Fiddlesticks') {
            document.querySelector('#Fiddlesticks img').src = 'http://ddragon.leagueoflegends.com/cdn/img/champion/centered/FiddleSticks_0.jpg'
        }
    }

    const campeaoIcone = document.querySelectorAll('.campeao')

    campeaoIcone.forEach( campeao => campeao.addEventListener('click', () => {
        skinsContainer.style.display = 'flex'
        fetchChampionSkin(campeao.id)
    }))

})

async function fetchChampionSkin(champId) {
    const response = await fetch(`http://ddragon.leagueoflegends.com/cdn/13.4.1/data/pt_BR/champion/${champId}.json`).then(resp => resp.json())
    // TALVEZ MERDA
    const arrayData = await response.data[champId]
    swiperImagens.innerHTML = ''
    arrayData.skins.forEach(skinObj => {
        nomeSkin.innerHTML = arrayData.name
        if (champId == 'Fiddlesticks') {
            swiperImagens.appendChild(adicionarSkin('FiddleSticks', skinObj.num, skinObj.name, arrayData.name))
        } else swiperImagens.appendChild(adicionarSkin(champId, skinObj.num, skinObj.name, arrayData.name))
    })
}

function adicionarSkin(id, num, skinNome, champNome) {
    const div = document.createElement('div')
    const img = document.createElement('img')
    const span = document.createElement('span')
    skinNome == 'default' ? span.innerHTML = champNome + ' Default' : span.innerHTML = skinNome
    img.src = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_${num}.jpg`
    div.classList.add('swiper-slide')
    img.classList.add('slider-img')
    span.classList.add('slider-skin-nome')
    div.appendChild(span)
    div.appendChild(img)
    return div
}

btnFechar.addEventListener('click', () => skinsContainer.style.display = 'none')

input.addEventListener('input', () => {
    const campeaoNome = document.querySelectorAll('.campeao-nome')

    campeaoNome.forEach( champ => {
        const champName = champ.innerHTML.toLowerCase()
        if (champName.includes(input.value.toLowerCase())) champ.parentElement.style.display = 'flex'
        if (!champName.includes(input.value.toLowerCase())) champ.parentElement.style.display = 'none'
    })
})

const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
    },
});