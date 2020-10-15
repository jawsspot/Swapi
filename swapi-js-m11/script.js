// var response;
window.onload = function () {
  // Сохраняем адрес API
  
  var api = "https://swapi.dev/api/";
  var btnSearch = document.querySelector('button');
  var resultsLi = document.querySelector('.search_result');
  var search;
  let category = document.querySelector('.category')
  let planets = document.querySelector('.planets_data')
  let starship = document.querySelector('.starship_data')
  let person = document.querySelector('.person_data') 
  let categoryInput = document.querySelector('.category_input')

  category.addEventListener('click', function(){
    if(event.target.matches('input')){
      category.classList.toggle('open');
    }else if(event.target.matches('li')) {
      categoryInput.value = event.target.innerText;
      categoryInput.dataset.type = event.target.dataset.type;
      category.classList.remove('open_li');
      if(categoryInput.dataset.type == 'people'){
        starship.classList.remove('open_data');
        planets.classList.remove('open_data');
        category.classList.toggle('open');
        if(person.classList.contains('open_data') == false){
        person.classList.toggle('open_data');
        }
      }else if (categoryInput.dataset.type == 'starships'){
        person.classList.remove('open_data');
        planets.classList.remove('open_data');
        starship.classList.toggle('open_data');
        category.classList.toggle('open');
      }else if(categoryInput.dataset.type == 'planets'){
        person.classList.remove('open_data');
        starship.classList.remove('open_data');
        planets.classList.toggle('open_data'); 
        category.classList.toggle('open');
      } 
    }else {
      category.classList.remove('open_li');
    }
  });
   
  btnSearch.addEventListener('click', function(ev) {
      ev.preventDefault();
      // Считываем значение в поиске
       search = document.querySelector('.person_search').value;
       
      // resultsLi.remove();
      while (resultsLi.firstChild) {
        resultsLi.removeChild(resultsLi.firstChild);
    }
    // Формируем полный адрес запроса:
    var url;
    if(categoryInput.dataset.type == 'planets'){
      url = api + "planets/?search=";
      url += search;
    }else if (categoryInput.dataset.type == 'starships'){
      url = api + "starships/?search=";
      url += search;
    }else {
      var url = api + "people/?search="; // добавляем к запросу тип необходимых данных подробно о формате https://swapi.dev/documentation
      url += search; // значение переменной запроса search
    }
  
    // Создаем объект XMLHttpRequest, при помощи которого будем отправлять запрос
     var request = new XMLHttpRequest();
      
    // Назначаем обработчик события load для запроса
     request.addEventListener("load", function () {
      // отображаем в консоли текст ответа сервера
      console.log(request.response); 
      
      // парсим его из JSON-строки в JavaScript-объект
      var response = JSON.parse(request.response); 

      if (request.status !== 200) {
        alert(
          "Произошла ошибка при получении ответа от сервера:\n\n" +
            response.message
        );
        return;
      }

      // Проверяем, если поле имя в ответе на запрос
      if (response.count == 0) {
        let p = document.createElement('p');
        p.append('Данные не найдены, введите другой запрос');
        resultsLi.append(p);
        return;
      }

      
      // Если все в порядке, то проходим циклом по элементам массива и
      //  отображаем имена персонажей из результатов поиска
      for (var i=0; i<=response.results.length-1; i++) {
        let person = response.results[i]['name'];
        let li = document.createElement('li');
        li.append(person);
        resultsLi.append(li);
      }
      
    });



    // Обработчик готов, можно отправлять запрос
    // Открываем соединение и отправляем
    request.open("get", url);
    request.send();
    });


    
    resultsLi.addEventListener('click', function(event){
      if (!event.target.matches('li')){ 
        return;
      }else{
        
        var url;
		    if(categoryInput.dataset.type == 'planets'){
		      url = api + "planets/?search=";
		      url += event.target.innerText;
		    }else if (categoryInput.dataset.type == 'starships'){
		      url = api + "starships/?search=";
          url += event.target.innerText;
		    }else {
		      var url = api + "people/?search="; // добавляем к запросу тип необходимых данных подробно о формате https://swapi.dev/documentation
		      url += event.target.innerText; // значение переменной запроса search
		    } // значение переменной запроса search
    
      // Создаем объект XMLHttpRequest, при помощи которого будем отправлять запрос
       var request = new XMLHttpRequest();
        
      // Назначаем обработчик события load для запроса
      request.addEventListener("load", function () {
        // отображаем в консоли текст ответа сервера
        console.log(request.response); 
        
        // парсим его из JSON-строки в JavaScript-объект
        var response = JSON.parse(request.response); 
  
        if (request.status !== 200) {
          alert(
            "Произошла ошибка при получении ответа от сервера:\n\n" +
              response.message
          );
          return;
        }
        
        if(categoryInput.dataset.type == 'planets'){
          document.querySelector('#planets_name').textContent = response.results[0]['name'];
          document.querySelector('#climate').textContent = response.results[0]['climate'];
          document.querySelector('#diameter').textContent = response.results[0]['diameter'];
          document.querySelector('#population').textContent = response.results[0]['population'];
          document.querySelector('#planets_films_count').textContent = response.results[0]['films'].length;
        }else if (categoryInput.dataset.type == 'starships'){
          document.querySelector('#starship_name').textContent = response.results[0]['model'];
          document.querySelector('#length').textContent = response.results[0]['length'];
          document.querySelector('#max_atmosphering_speed').textContent = response.results[0]['max_atmosphering_speed'];
          document.querySelector('#cost_in_credits').textContent = response.results[0]['cost_in_credits'];
          document.querySelector('#starship_films_count').textContent = response.results[0]['films'].length;
        }else{
          document.querySelector('#name').textContent = response.results[0]['name'];
          document.querySelector('#height').textContent = response.results[0]['height'];
          document.querySelector('#mass').textContent = response.results[0]['mass'];
          document.querySelector('#birth_year').textContent = response.results[0]['birth_year'];
          document.querySelector('#films_count').textContent = response.results[0]['films'].length;
        }
      });

      request.open("get", url);
      request.send();
      }
    });
  };