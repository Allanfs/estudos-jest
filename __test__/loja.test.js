'use strict';
test('displays a user after a click', () => {
    // Set up our document body
    document.body.innerHTML =
      '<div id="serial" class="serial_cofre_inserido" name="3">' +
      '  <span id="username" />' +
      '  <button id="button" />' +
      '</div>';
      
    const $ = require('jquery');
    
    expect(document.getElementsByClassName('serial_cofre_inserido')).not.toBe(undefined)
    expect(document.getElementsByClassName('serial_cofre_inserido')[0].getAttribute('name')).toBe('3')

    expect($('.serial_cofre_inserido')).not.toBe(undefined)

    expect($('#serial').attr('id')).toBe("serial")
})  
