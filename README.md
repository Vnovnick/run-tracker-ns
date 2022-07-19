# Run Tracker

## Overview

This project was born out of my own curiousity to see my Spotify song activity during my runs. Since I use Strava to track runs, I created the project to work with the user data available from both the Spotify and Strava APIs. Once extracted, the application takes the user's 50 most recently played songs (50 being the maximum amount set by the API), checks to see if any of the song object `played_at` values fall within the time frames of the runs, and displays the corresponding song and run data together in one "post." The page displays the user's last 10 runs.

## Displaying Strava Run Data

The user's Strava Run Data is the first login available on the home page. Once logged in with Strava, the [Sidebar](#sidebar) will appear as well as posts that display the user's last 10 runs. Each of these posts show the date/time of the run, run title, distance in miles and kilometers, and the time elapsed. A colored dot will also appear next to the date/time denoting the type of run. More info on the dots can be found in the [Sidebar](#sidebar) section. 

Some general Strava user info is displayed in the Sidebar as well such as the profile image, username, and run/distance totals.

## Displaying Spotify Song Data 

After the user has logged into Strava, a Spotify login will appear at the top of the page. Once logged into Spotify, the application will add the songs the user listened to during any of the ten runs if applicable (see the [Limitations](#limitations) section for details). The songs in each post will be listed under "Listened to" with the album cover, song title, and corresponding album listed for each song. In a collapsible section under each post with song data, there is a timeline, created with Recharts, that displays when each song was played during the run chronologically. 

Just like the Strava login, logging into Spotify will add general user data to the sidebar such as the profile image, username, and top Tracks/Artists for the month. 

## Sidebar 

As mentioned at the ends of "Data" sections above, the Sidebar displays some general user info. This info is hidden in collapsible sections on load and can be viewed when clicking on the profile/username displays for each account. 

The calendar below the profile displays, created with React-Calendar, adds the option to quickly navigate through the runs. If a date corresponds with the date of a run, the tile number will change color and the tile will have a small dot in the upper-right corner. These dots correspond with the dots mentioned in the [Displaying Strava Run Data](#displaying-strava-run-data) section. Clicking on a calendar tile with a dot will make the page scroll to the matching run date. The color will be set based on the `workout_type` value assigned to the run in Strava with black being the default color if no value is assigned. 

A small box below the calendar explains which color corresponds to which `workout_type`.

## Limitations and Plans for Future Changes or Additions

##### Limitations 

As mentioned in the [Displaying Spotify Song Data](#displaying-spotify-song-data) section, one of the main limitations of the application's use of the Spotify API comes from the limit set by the API on retrievable song objects. Since Spotify only saves the user's last 50 most recently played songs, a frequent user of Spotify will find that the Run Tracker posts will not display any song data or will start to omit songs despite them showing up previously. This is due to the range of 50 songs shifting to leave out song objects that no longer fall within said range. Spotify's API allows you to set "before" and "after" parameters in your request, but setting a range that falls outside of the 50 song range or at its edge, as seen in lines 185 to 194 of the Post.js file, will still only return song objects from those 50 that Spotify saves.

##### Plans for Future Changes or Additions

- Reformat RunChart.js to have each collapsible timeline rotate into a vertical timeline on window resize
- Fix post height readjustment on window resize
- Add visual representation of the route as seen in the Strava app
- Add a functioning Spotify player widget in the sidebar that allows users to drag and drop the album art into the widget to play the song
- Find a way to allow the user to properly logout of their Strava and Spotify accounts. Redirecting to the official logout pages will take the user away from Run Tracker with no way of coming back to the homepage. 