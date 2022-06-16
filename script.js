$(function() {
  
    var jogador = 'X';
    var table = $('table');
    var mensagem = $('.mensagem');
    mensagem.html('Jogador da vez: '+ jogador);
    mensagem.css({background: "rgb(103, 140, 232)"});
    ganhou = 0;
    empate = 0;
    
    $('td').click(function() {
      td = $(this);
      if(!ganhou & !empate){
        var marcada = verifica_casa(td);
        if(!marcada) {
          var icone = define_icone_jogador(jogador);
          coloca_icone(td, icone); 
          if(verifica_se_ganhou(table, icone)) {
            mensagem.html('Parabéns Jogador '+ jogador +' !!!<br> Você é o vencedor');
            mensagem.css({background: "#FFD700", color: '#333', textShadow:'none'});
            ganhou = 1;
          } else if (verifica_empate(table)){
            mensagem.html('Empate');
            mensagem.css({background: "#FFD700", color: '#333', textShadow:'none'});
            empate = 1;
          }else {
            jogador = proximo_jogador(mensagem, jogador);
            mensagem.html('Jogador da vez: '+ jogador);
          }
        } else {
          mensagem.html('Essa casa já foi marcada. Clique em outra');
        }
      }  
    });
    
    $('.recomecar').click(function() {
      ganhou = 0;
      empate = 0;
      jogador = 'X';
      mensagem.html('');
      recomecar(table);
      mensagem.html('Jogador da vez: '+ jogador);
      mensagem.css({background: "rgb(103, 140, 232)", color:"#FFF"});
    });
    
  });
  
  function verifica_casa(td) {
    if(td.hasClass('cruz') || td.hasClass('circulo')) {
      return 1;
    } else {
      return 0;
    }
  }
  
  function coloca_icone(td, icone) {
    return td.addClass(icone);
  }
  
  function define_icone_jogador(jogador) {
    if(jogador == 'X') {
      return 'cruz';
    } else {
      return 'circulo';
    }
  }
  
  function proximo_jogador(mensagem, jogador) {
    if(jogador == 'X') {
      mensagem.css({background: "rgb(220, 55, 190)"});
      return jogador = 'O';
    } else {
      mensagem.css({background: "rgb(103, 140, 232)"});
      return jogador = 'X';
    }
  }
  
  function verifica_se_ganhou(table, icone) {
    var ganhou = 0;
    if(table.find('.casa1').hasClass(icone) && table.find('.casa2').hasClass(icone) && table.find('.casa3').hasClass(icone)) {
      ganhou = 1;
    } else if (table.find('.casa1').hasClass(icone) && table.find('.casa4').hasClass(icone) && table.find('.casa7').hasClass(icone)) {
      ganhou = 1;
    } else if (table.find('.casa1').hasClass(icone) && table.find('.casa5').hasClass(icone) && table.find('.casa9').hasClass(icone)) {
      ganhou = 1;
    } else if (table.find('.casa4').hasClass(icone) && table.find('.casa5').hasClass(icone) && table.find('.casa6').hasClass(icone)) {
      ganhou = 1;
    } else if (table.find('.casa7').hasClass(icone) && table.find('.casa8').hasClass(icone) && table.find('.casa9').hasClass(icone)) {
      ganhou = 1;
    } else if (table.find('.casa2').hasClass(icone) && table.find('.casa5').hasClass(icone) && table.find('.casa8').hasClass(icone)) {
      ganhou = 1;
    } else if (table.find('.casa3').hasClass(icone) && table.find('.casa6').hasClass(icone) && table.find('.casa9').hasClass(icone)) {
      ganhou = 1;
    } else if (table.find('.casa3').hasClass(icone) && table.find('.casa5').hasClass(icone) && table.find('.casa7').hasClass(icone)) {
      ganhou = 1;
    }
    return ganhou;
  }

  function verifica_empate(table){
    var empate = 0;
    let casas =['.casa1', '.casa2', '.casa3', '.casa4', '.casa5', '.casa6', '.casa7', '.casa8', '.casa9'];
    sum = 0;
    for(i = 0; i < casas.length; i = i + 1 ){
      if(table.find(casas[i]).hasClass('cruz') || table.find(casas[i]).hasClass('circulo')){
        sum = sum + 1;
      }
    }
    if(sum == 9){
      empate = 1;
    }
    return empate;
  }
  
  function recomecar(table) {
    table.find('td').each(function() {
      $(this).removeClass('circulo').removeClass('cruz');
    });
  }
