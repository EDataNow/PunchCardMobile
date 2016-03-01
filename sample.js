fetch('punch-card-2016.herokuapp.com/assignments', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        config_name: 'default',
            user_id: 3,
            login_location: {location_id: 2}
            current_user: {last_name: "Last", first_name: "First", id: 3}
      })
    })