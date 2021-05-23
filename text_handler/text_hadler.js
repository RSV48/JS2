let text = ''

// "Сборная России одержала вторую победу на групповом этапе чемпионата мира по хоккею в Латвии. Команда Валерия Брагина разгромила соперника со счетом '7:1'. Исход встречи был решен еще в первом периоде. Сборная России отправила четыре шайбы подряд в ворота соперника. Дубль сделал Антон Бурдасов, по голу забили Михаил Григоренко и Сергей Толчикнский. В концовке периода британцы отыграли одну шайбу. Далее ход игры немного успокоился — и сборная России уверенно довела встречу до победы. Еще голами отметились 'Паве'л Карнаухов', 'Андрей Кузьменко' и 'Антон Слепышев'. Россия набрала шесть очков после двух матчей и возглавляет турнирную таблицу группы A. '24 мая' российская команда сыграет против Словакии."

const regexp = /(\s)(\')(.+?)(\'[.,\s])/gi;
// console.log(text.match(regexp));
// console.log(text.replace(regexp, '$1"$3"'))



document.addEventListener('DOMContentLoaded', async () => {

    const input = document.querySelector('.input_text')
    input.addEventListener('change', (item) => {
        console.log(item.target.value)
        text = item.target.value.replace(regexp, '$1"$3"')
        let html = `<p>${text}</p>`
        resultElements = document.querySelector('.result_text')
        resultElements.innerHTML = html
    })


});