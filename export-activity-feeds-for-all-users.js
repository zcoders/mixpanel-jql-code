// run this query to exam all the available properties.

function main() {
  return join(
    Events({
      from_date: "2020-12-01",
      to_date:  "2021-01-08"
    }),
    People(),
    {
      type: 'inner'
    })
}

//use below query to group the activity feeds for all users.
//Events belong to same user will be listed next to each other.

function main() {
    return join(
        Events({
            from_date: "2020-12-01",
            to_date:  "2021-01-08"
        }),
        People(),
        {type: 'inner'}
    )
    .groupByUser(
        ["user.properties.$email",
        "user.properties.$name", //first name and last name
        "event.properties.mp_country_code", //like US, IN
        "event.properties.$region",  
        "event.properties.$city", 
        formatTime, 
        "event.properties.$duration", //duration returned in seconds
        "event.name", 
        "event.properties.Booth", //project specific property as example
        "event.properties.link", //project specific property as example
        "event.properties.Video Title", //project specific property as example
        "event.properties.page"], //project specific property as example
        ixpanel.reducer.count()
    );
}
  
function formatTime(obj) {
    return new Date(obj.event.time)
}
