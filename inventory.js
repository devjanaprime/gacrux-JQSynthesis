var cart = [];
var inventory = [];
var inventoryState = true;

$( document ).ready( function(){
    $( '#addButton' ).on( 'click', function(){
      console.log( 'in addButton on click' );
      // get user input
      var newObject = {
        size: $( '#sizeIn' ).val(),
        color: $( '#colorIn' ).val(),
        description: $( '#descriptionIn' ).val()
      }; // end newObject
      console.log( 'adding:', newObject );
      // push into an array
      inventory.push( newObject );
      // update DOM
      displayInventory();
      // display a success alert
      /// - disabled b/c annoying
      // alert( 'Added to inventory!' );
    }); //end addButton on click

    $( '#searchButton' ).on( 'click', function(){
      console.log( 'in searchButton on click' );
      var matches = [];
      // loop through inventory
      for( var i=0; i<inventory.length; i++ ){
        // if both size and color are a match,
        if( inventory[ i ].size === $( '#sizeSearchIn').val() && inventory[ i ].color === $( '#colorSearchIn').val() ){
          // push into a matches array
          console.log( 'match found:', inventory[ i ] );
          matches.push( inventory[ i ] );
        } // end match found
      } // end match check loop
      displayMatches( matches );
    }); // end searchButton on click

    $( '.toggleState' ).on( 'click', function(){
      inventoryState = !inventoryState;
      console.log( inventoryState );
      updateUI();
    }); // end toggleState on click

    $( '#matchesOut' ).on( 'click', '.addToCartButton', function(){
      console.log( 'in matchesOut on click of .addToCartButton:', $( this ).data( 'description' ) );
      for( var i=0; i<inventory.length; i++ ){
        if( inventory[ i ].description === $( this ).data( 'description' ) ){
          console.log( 'match found:', inventory[ i ] );
          // splice item with this description from inventory
          // push that item into the cart
          cart.push( inventory.splice( i, 1 )[0] );
        } //end match found
      } //end for
      updateCart();
    }); // end matchesOut on click of .addToCartButton

    updateUI();
}); // end doc ready

function displayInventory(){
  console.log( 'in displayInventory' );
  // stored the ul elemet in an array
  var outputList = $( '#inventoryOut' );
  // empty ul
  outputList.empty();
  //loop through inventory array
  for( var i=0; i<inventory.length; i++ ){
    // append each item to the ul element
    var stringToAppend = '<li>';
    stringToAppend += inventory[ i ].size + ' ';
    stringToAppend += inventory[ i ].color + ' ';
    stringToAppend += inventory[ i ].description;
    stringToAppend += '</li>';
    outputList.append( stringToAppend );
  } // end for
} // end displayInventory

function displayMatches( matchesArray ){
  console.log( 'in displayMatches:', matchesArray );
  // capture the output element
  var matchesOutput = $( '#matchesOut' );
  // empty
  matchesOutput.empty();
  // check if matches
  if( matchesArray.length > 0 ){
    for( var i=0; i< matchesArray.length; i++ ){
      var appendString = '<li>';
      appendString += matchesArray[ i ].description;
      appendString += ' <button class="addToCartButton" data-description="' + matchesArray[ i ].description + '">Add To Cart</button></li>';
      matchesOutput.append( appendString );
    } // end for
  } // matches found
  else{
    matchesOutput.append( '<li>NONE</li>' );
  } // no matches
} // end displayMatches

function updateCart(){
  console.log( 'in updateCart' );
  var outputElement = $( '#cartOut' );
  outputElement.empty();
  for( var i=0; i<cart.length; i++ ){
    outputElement.append( '<li>' + cart[ i ].description + '</li>')
  } // end for
} // end updateCart

function updateUI(){
  if( inventoryState ){
    $( '#addToInventory' ).show();
    $( '#searchInventory' ).hide();
    $( '#shoppingcart' ).hide();
  } //end show inventory
  else{
    $( '#addToInventory' ).hide();
    $( '#searchInventory' ).show();
    $( '#shoppingcart' ).show();
  } // end !inventoryState
} // end updateUI
