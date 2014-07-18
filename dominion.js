$(function ()
  {
      var names = [];
      for (n in cards) names.push(n);
      show(names[Math.floor(names.length * Math.random())]);

      $('#input-field input')
          .on('keyup focus blur click',
              function ()
              {
                  var query = latin($(this).val().toLowerCase());
                  var candidates = names
                          .filter(function (n) { return latin(n.toLowerCase()).indexOf(query) != -1; })
                          .slice(0, 24)
                          .map(function (s) { return latin(s.toLowerCase()).indexOf(query) == 0 ? '0' + s : '1' + s; });
                  candidates.sort();
                  candidates = candidates.map(function (s) { return s.slice(1); });
                  $('#candidates').html('');
                  for (var i = 0; i < candidates.length; i++)
                  {
                      $('<img/>')
                          .attr('src', cards[candidates[i]].img)
                          .attr('title', candidates[i])
                          .data('name', candidates[i])
                          .appendTo($('#candidates'));
                  }

                  if (candidates.length == 1) {
                      $('#candidates img').click();
                  }
              })
          .click();

      $(document).on('click', '#candidates img', function () { show($(this).data('name')); });

      function show(name)
      {
          var card = cards[name];
          $('#main div > img.card-img').attr('src', card.img);
          $('#main div > h1').text(name);
          $('#main div > div').html(card.src);
      }

      function latin(s)
      {
          return s
              .replace(/ß/g, 'ss')
              .replace(/ü/g, 'u')
              .replace(/ä/g, 'a')
              .replace(/ö/g, 'o');
      }
  });