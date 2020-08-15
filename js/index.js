'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const renderCards = (data) => {
        data.forEach(item => {
            let card = document.createElement('div');

            card.classList.add('card');

            let icon;
            if (item.sex === 'male') {
                icon = './icons/mars.png';
            } else {
                icon = './icons/female.png';
            }

            card.innerHTML = `
                <img src="${item.photo}" alt="photo">
                <div class="name">${item.name} ${item.surname}</div>
                <div class="sex">
                    <img src=${icon} alt="sex-icon">
                </div>
                <div class="age">${item.age}</div>
            `;

            document.querySelector('.app').append(card);
        });
    };

    const getResource = async (url) => {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }

        return await response.json();
    };

    const req = () => {
        // const request = new XMLHttpRequest();
        // request.open('GET', 'http://localhost:3000/people');
        // request.setRequestHeader('Content-type', 'application/json; charset=utf-8;');
        // request.send();
        // request.addEventListener('load', () => {
        //     if (request.readyState === 4 && request.status === 200) {
        //         let data = JSON.parse(request.response);

        //         renderCards(data);
        //     } else {
        //         console.error('Something wrong...');
        //     }
        // });

        getResource('http://localhost:3000/people')
            .then(data => renderCards(data))
            .catch(error => console.error(error));
    };

    document.querySelector('button').addEventListener('click', req, {once: true});
});