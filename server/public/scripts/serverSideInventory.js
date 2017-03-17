$(document).ready(function() {
  console.log('jquery here');

  $('#addItemButton').on('click', function() {
    console.log('addItemButton clicked');
    // get user input
    // assemble into object
    var objectToSend = {
      name: $('#nameInAdd').val(),
      description: $('#descriptionInAdd').val(),
    };
    // ajax post the object to server (/inventory/add)
    $.ajax({
      type: "POST",
      url: "/inventory/add",
      data: objectToSend,
      success: function (response) {
          console.log('back from add with ',response);
          if(response == 'OK'){
            $('#nameInAdd').val('');
            $('#descriptionInAdd').val('');
            getInventory();
          }
      }
    });
    // update display
  });

  $('#clearItemsButton').on('click', function() {
    console.log('clearItemsButton clicked');
    // empty the inputs
    $( '#nameInSearch' ).val('');
    $( 'descriptionInSearch' ).val('');
    // get all the things
    getInventory();
  });

  $('#searchByDescriptionButton').on('click', function() {
    console.log('searchByDescriptionButton clicked');
    var objectToSend = {
      description: $( '#descriptionInSearch' ).val()
    }; // end objectToSend
    console.log( 'sending:', objectToSend );
    // ajax call to inventory/searchByName
    $.ajax({
      type: 'POST',
      url: 'inventory/searchByDescription',
      data: objectToSend,
      success: function( response ){
        console.log( 'back from search by description with:', response );
        // clear input
        $('#descriptionInSearch').val('');
        // update display
        if (response.length > 0) {
          displayInventory( response );
        } else {
          $('#outputDiv').empty();
          $('#outputDiv').append('<p>No matches</p>');
        }
      }
    });
  });

  $('#searchByNameButton').on('click', function() {
    console.log('searchByNameButton clicked');
    var objectToSend = {
      name: $( '#nameInsearch' ).val()
    }; // end objectToSend
    console.log( 'sending:', objectToSend );
    // ajax call to inventory/searchByName
    $.ajax({
      type: 'POST',
      url: 'inventory/searchByName',
      data: objectToSend,
      success: function( response ){
        console.log( 'back from search with:', response );
        // clear input
        $('#nameInsearch').val('');
        // update display
        if (response.length > 0) {
          displayInventory( response );
        } else {
          $('#outputDiv').empty();
          $('#outputDiv').append('<p>No matches</p>');
        }
      }
    });
  });

  $('#searchButton').on('click', function() {
    console.log('searchButton clicked');
    var objectToSend = {
      name: $( '#nameInsearch' ).val(),
      description: $( '#descriptionInSearch' ).val()
    };
    console.log('sending',objectToSend);
    $.ajax({
      type: "POST",
      url: 'inventory/search',
      data: objectToSend,
      success: function(response) {
        console.log('back from search with:', response);
        // clear input
        // update display
      }
    });

  });



  var displayInventory = function(items) {
    console.log('in displayInventory');
    // loop through items and append dem to outputDiv
    $('#outputDiv').empty();
    for (var i = 0; i < items.length; i++) {
      $('#outputDiv').append('<div id ="' + i + '"></div>');
      var $el = $('#outputDiv').children().last();
      $el.append('<button class="removeItem">Delete</button>');
      $el.append('<span><b>' + items[i].name + '</b> '+ items[i].description + '</span>');
    }
  };


  $('#outputDiv').on('click', ".removeItem", function() {
    console.log('removeItem button clicked');
    // gets index of item removed to send to the server
    var itemIndex = $(this).parent().attr("id");
    console.log("Index is:", itemIndex);
    // updates server info
    var objectToSend = {
      index: itemIndex
    };
    console.log("object to send: ",objectToSend);
    // ajax call to inventory/removeItem
    $.ajax({
      type: "POST",
      url: "inventory/removeItem",
      data: objectToSend,
      success:  function(response) {
        console.log('back from removeItem with ',response);
        if(response == 'OK'){
          getInventory();
        }
      }
    });
  });



  var getInventory = function() {
    console.log('in getInventory');
    $.ajax({
      type: "GET",
      url: "/inventory",
      success: function(response) {
        console.log('back from inventory with: ',response);
        displayInventory(response);
      }
    });
  };

  getInventory();

});
