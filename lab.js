fetch('https://jsonplaceholder.typicode.com/users')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    var usernames_array = [];
    for (var i = 0; i < myJson.length; i++)
    {
      usernames_array.push(myJson[i].username);
    }
    usernames_array = orderByLength(usernames_array);
    appendArrayToHtml("usernames", usernames_array);
  });

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var Json_array = JSON.parse(this.responseText);
      var email_array = [];
      for (var i = 0; i < Json_array.length; i++)
      {
        email_array.push(Json_array[i].email);
      }
      email_array.sort();
      appendArrayToHtml("emails", email_array);
    }
  };
  xhttp.open("GET", "https://jsonplaceholder.typicode.com/users", true);
  xhttp.send();

  function appendArrayToHtml(id, my_array)
  {
    html_element = document.getElementById(id);
    for (var i = 0; i < my_array.length; i++)
    {
      html_element.appendChild(document.createTextNode(my_array[i]));
      html_element.innerHTML += "<br>";
    }
  }

  function orderByLength(unordered_array)
  {
    var ordered_array = [];
    var array_size = unordered_array.length;
    while (ordered_array.length < array_size)
    {
      var min_size = 0;
      var biggest_string = "";
      for (var i = 0; i < unordered_array.length; i++)
      {
        if (unordered_array[i].length < min_size || min_size === 0)
        {
          biggest_string = unordered_array[i];
          min_size = unordered_array[i].length; 
        }
      }
      ordered_array.push(biggest_string);
      var index = unordered_array.indexOf(biggest_string);
      if (index !== -1)
        unordered_array.splice(index, 1);
    }
    return ordered_array;
  }