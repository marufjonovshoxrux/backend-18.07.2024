
export function Product(item, arr) {
    const tr = document.createElement('tr')
    const td_NO = document.createElement('td')
    const td_Name = document.createElement('td')
    const td_age = document.createElement('td')  
    const td_img = document.createElement('td')
    const img_pererabotka = document.createElement('img')
    const img_basket = document.createElement('img')
    const years_old = (new Date()).getFullYear();

    img_pererabotka.src = './img/pererabotka.png'
    img_pererabotka.alt = 'pererabotka'
    img_pererabotka.id = 'pererabotka'

    img_basket.src = './img/basket.png'
    img_basket.alt = 'basket'
    img_basket.id = 'basket'


    td_NO.innerHTML = item.number + 1
    td_Name.innerHTML = item.name
    td_age.innerHTML = years_old - item.age

    tr.append(td_NO, td_Name, td_img)
    td_img.append(img_pererabotka, img_basket)
    
    const baseUrl = 'http://localhost:8080'
    img_basket.onclick = () => {
        let idx = arr.indexOf(item)
        arr.splice(idx, 1)
        tr.remove()


        fetch(`${baseUrl}/todos/${item.id}`, {
            method: 'DELETE',

        })
    }

    
    if (item.complet === true) {
        td_Name.classList.add('show')
        
    }
    
    img_pererabotka.onclick = () => {
        
        fetch(baseUrl + '/todos/' + item.id, {
                method: 'PATCH',
                body: JSON.stringify({
                    complet: !item.complet
                })
            })
            .then(res => {
                if (item.complet == false) {
                    td_Name.classList.add('show')
                    item.complet = true
                } else {
                    td_Name.classList.remove('show')
                    item.complet = false
                }
            })
    }
    


    return tr
}