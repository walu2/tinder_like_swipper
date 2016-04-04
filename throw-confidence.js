document.addEventListener('DOMContentLoaded', function () {
    var stack,
        cardElement,
        throwOutConfidenceBind,
        directionBind,
        throwOutConfidenceElements;

    stack = gajus.Swing.Stack();
    cardElement = document.querySelector('.stack li');
    throwOutConfidenceBind = document.querySelector('#throw-out-confidence-bind');
    directionBind = document.querySelector('#direction-bind');
    throwOutConfidenceElements = {};

    window.card = stack.createCard(cardElement);
	
    [].forEach.call(document.querySelectorAll('.stack li'), function (targetElement) {
        stack.createCard(targetElement);

        targetElement.classList.add('in-deck');
    });

    stack.on('dragstart', function (e) {
        throwOutConfidenceElements.yes = e.target.querySelector('.yes').style;
        throwOutConfidenceElements.no = e.target.querySelector('.no').style;
    });

    stack.on('dragmove', function (e) {
        throwOutConfidenceElements[e.throwDirection == gajus.Swing.Card.DIRECTION_RIGHT ? 'yes' : 'no'].opacity = e.throwOutConfidence;

		e.throwDirection == gajus.Swing.Card.DIRECTION_RIGHT ? 'right' : 'left';
    });

    stack.on('dragend', function (e) {
        if (e.throwOutConfidence != 1) {
            throwOutConfidenceElements.yes.opacity = 0;
            throwOutConfidenceElements.no.opacity = 0;
        }
    });
	

    stack.on('throwout', function (e) {
        e.target.classList.remove('in-deck');
    });

    stack.on('throwin', function (e) {
        e.target.classList.add('in-deck');
    });
});
