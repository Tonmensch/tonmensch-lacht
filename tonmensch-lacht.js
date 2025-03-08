Hooks.on('ready', () => {
  let isBottom = true; // Startposition ist unten

  createButton(); // Ersten Button erstellen

  function createButton() {
    $('#reaction-button').remove(); // Alten Button entfernen, falls vorhanden

    $('body').append(`
      <div id="reaction-button">
        <button class="reaction" data-reaction="thumbUp"><i class="fas fa-thumbs-up"></i></button>
        <button class="reaction" data-reaction="thumbDown"><i class="fas fa-thumbs-down"></i></button>
        <button class="reaction" data-reaction="happy"><i class="fas fa-smile"></i></button>
        <button class="reaction" data-reaction="sad"><i class="fas fa-sad-tear"></i></button>
        <button class="reaction" data-reaction="confused"><i class="fas fa-question-circle"></i></button>
        <button class="reaction" data-reaction="angry"><i class="fas fa-angry"></i></button>
        <button id="position-toggle"><i class="fas fa-arrows-alt-v"></i></button>
      </div>
    `);

    $('.reaction').click(function () {
      const reaction = $(this).data('reaction');
      let actor = game.user.character; // Standardmäßig Charakter des Spielers

      // Überprüfen, ob ein Token ausgewählt ist (nur für GM)
      if (game.user.isGM && canvas.tokens.controlled.length > 0) {
        actor = canvas.tokens.controlled[0].actor; // Ausgewählten Token-Charakter verwenden
      }

      let message = '';

      if (actor) {
        switch (reaction) {
          case 'thumbUp':
            message = getRandomMessage(actor.name, 'thumbUp');
            break;
          case 'thumbDown':
            message = getRandomMessage(actor.name, 'thumbDown');
            break;
          case 'happy':
            message = getRandomMessage(actor.name, 'happy');
            break;
          case 'sad':
            message = getRandomMessage(actor.name, 'sad');
            break;
          case 'confused':
            message = getRandomMessage(actor.name, 'confused');
            break;
          case 'angry':
            message = getRandomMessage(actor.name, 'angry');
            break;
          default:
            message = 'Eine Reaktion wurde ausgelöst.';
        }
        ChatMessage.create({ content: message });
      } else {
        ui.notifications.warn('Kein Charakter ausgewählt!');
      }
    });

    $('#position-toggle').click(() => {
      isBottom = !isBottom;
      createButton(); // Neuen Button erstellen und alte entfernen
    });

    centerButton();
  }

  $(window).resize(() => {
      centerButton();
  });

  function centerButton() {
    const windowWidth = $(window).width();
    const windowHeight = $(window).height();
    const buttonWidth = $('#reaction-button').outerWidth();
    const buttonHeight = $('#reaction-button').outerHeight();

    $('#reaction-button').css({
      left: (windowWidth - buttonWidth) / 2,
      top: isBottom ? windowHeight - buttonHeight - 10 : 10,
    });
  }

  function getRandomMessage(actorName, reaction) {
    const messages = {
      thumbUp: [
        `${actorName} zeigt enthusiastisch den Daumen hoch!`,
        `${actorName} signalisiert Zustimmung mit einem kräftigen Daumen hoch.`,
        `${actorName} ist begeistert und hebt den Daumen.`,
        `${actorName} klatscht in die Hände und zeigt den Daumen hoch.`,
        `${actorName} springt auf und ab, während er den Daumen hochhält.`,
        `${actorName} nickt zustimmend und streckt den Daumen in die Luft.`,
        `${actorName} pfeift anerkennend und zeigt den Daumen hoch.`,
        `${actorName} hebt triumphierend den Daumen und grinst breit.`,
        `${actorName} formt mit beiden Händen ein Herz und zeigt den Daumen hoch.`,
        `${actorName} macht einen Salto und zeigt dabei den Daumen hoch.`,],
      thumbDown: 
[
 	`${actorName} zeigt missmutig den Daumen runter.`,
        `${actorName} signalisiert Ablehnung mit einem deutlichen Daumen runter.`,
        `${actorName} ist unzufrieden und senkt den Daumen.`,
        `${actorName} schüttelt den Kopf und zeigt den Daumen runter.`,
        `${actorName} wirft die Hände in die Luft und zeigt den Daumen runter.`,
        `${actorName} verschränkt die Arme und zeigt den Daumen runter.`,
        `${actorName} schnaubt verächtlich und zeigt den Daumen runter.`,
        `${actorName} kneift die Augen zusammen und zeigt den Daumen runter.`,
        `${actorName} dreht sich um und zeigt den Daumen runter.`,
        `${actorName} wirft einen missbilligenden Blick und zeigt den Daumen runter.`,
],
      happy: 
[
        `${actorName} strahlt vor Freude und lacht herzlich.`,
        `${actorName} grinst über das ganze Gesicht.`,
        `${actorName} ist überglücklich und hüpft vor Freude.`,
        `${actorName} tanzt vor Freude und klatscht in die Hände.`,
        `${actorName} pfeift fröhlich und strahlt über das ganze Gesicht.`,
        `${actorName} umarmt die Luft vor Freude und lacht laut.`,
        `${actorName} wirft Konfetti in die Luft und jubelt.`,
        `${actorName} macht einen Freudensprung und klatscht in die Hände.`,
        `${actorName} wirbelt im Kreis und lacht ausgelassen.`,
        `${actorName} macht einen Handstand vor Freude und grinst.`,
],
      sad: 
[
        `${actorName} sieht traurig aus und lässt die Schultern hängen.`,
        `${actorName} ist betrübt und seufzt leise.`,
        `${actorName} hat Tränen in den Augen und schaut bedrückt.`,
        `${actorName} wischt sich eine Träne aus dem Gesicht und schaut traurig.`,
        `${actorName} versteckt sein Gesicht in den Händen und schluchzt leise.`,
        `${actorName} starrt traurig auf den Boden und seufzt tief.`,
        `${actorName} klammert sich an ein Stofftier und weint leise.`,
        `${actorName} zieht die Mundwinkel nach unten und schaut betrübt.`,
        `${actorName} lässt den Kopf hängen und schaut niedergeschlagen.`,
        `${actorName} schaut aus dem Fenster und seufzt traurig.`,
],
      confused: 
[        
	`${actorName} ist verwirrt und runzelt die Stirn.`,
        `${actorName} guckt verwirrt in der Gegend rum.`,
        `${actorName} ist verwirrt und kratzt sich am Kinn.`,
        `${actorName} schüttelt den Kopf und guckt fragend.`,
        `${actorName} starrt ins Leere und runzelt die Stirn.`,
        `${actorName} dreht sich im Kreis und guckt verwirrt.`,
        `${actorName} reibt sich die Augen und schaut fragend.`,
        `${actorName} kippt den Kopf zur Seite und guckt verwirrt.`,
        `${actorName} zuckt mit den Schultern und guckt fragend.`,
        `${actorName} tippt sich an die Stirn und guckt ratlos.`,
],
      angry: 
[        
	`${actorName} ist wütend und ballt die Fäuste.`,
        `${actorName} knurrt vor Wut und stampft mit dem Fuß auf.`,
        `${actorName} ist stinksauer und raunzt.`,
        `${actorName} schlägt mit der Faust auf den Tisch und brüllt.`,
        `${actorName} wirft Gegenstände durch die Gegend und tobt.`,
        `${actorName} schäumt vor Wut und schreit herum.`,
        `${actorName} stampft mit den Füßen und schnaubt verächtlich.`,
],
    };

    const reactionMessages = messages[reaction];
    const randomIndex = Math.floor(Math.random() * reactionMessages.length);
    return reactionMessages[randomIndex];
  }
});