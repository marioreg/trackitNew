$(document).ready(function () {

  var carrierInput = $("#carrier");
  var trackingNum = $("#tracking");
  //var trackContainer = $(".track-container");
  var trackingList = $("tbody");

  $(document).on("submit", "#new-guide", handleAuthorFormSubmit);
  $(document).on("click", ".delete-track", handleDeleteButtonPress);

  getTracks();


  function handleAuthorFormSubmit(event) {
    console.log("entro al submit, carrier "+carrierInput.val().trim()+" y track "+trackingNum.val().trim());
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!carrierInput.val().trim().trim()||!trackingNum.val().trim().trim())  {
      return;
    }
  
    writeTrack({
      carrier: carrierInput.val().trim(),
      track: trackingNum.val().trim(),
      UserId:$("#userhbs").text()
    });
  }

  function writeTrack(trackData) {
    console.log("entro a writeTrak");
    $.post("/api/tracks", trackData)
      .then(getTracks);
  }

  function createTrackRow(trackData) {
    var newTr = $("<tr>");
    newTr.data("track", trackData);
    newTr.append("<td>" + trackData.id + "</td>");
    newTr.append("<td> " + trackData.carrier + "</td>");
    newTr.append("<td> "+ trackData.track +"</td>");
    newTr.append("<td> "+ trackData.origin +" </td>");
    newTr.append("<td> "+ trackData.destination +" </td>");
    newTr.append("<td> "+ trackData.status +" </td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-track'> X </a></td>");
    return newTr;
  }

  function getTracks() {
    console.log("entro a get Tracks");
    
    
    $.get("/api/tracks/" + $("#userhbs").text(), function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createTrackRow(data[i]));
      }
      renderTrackList(rowsToAdd);
      carrierInput.val("");
    });
  }  
  
  function renderTrackList(rows) {
    trackingList.children().remove();
    if (rows.length) {
      console.log(rows);
      trackingList.prepend(rows);
    }
  }

  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("track");
    var track = listItemData.track;
    console.log("entro a borrar " + track);
    $.ajax({
      method: "DELETE",
      url: "/api/tracks/" + track
    })
      .then(getTracks);
  }

});