# Run Tracker

## Overview

This project was born out of my own curiousity to see my Spotify song activity during my runs. Since I use Strava to track runs, I created the project to work with the user data available from both the Spotify and Strava APIs. Once extracted, the application takes the user's 50 most recently played songs (50 being the maximum amount set by the API), checks to see if any of the song object `played_at` values fall within the time frames of the runs, and displays the corresponding song and run data together in one "post." The page displays the user's last 10 runs.

## Displaying Run Data

The user's Strava Run Data is the first login available on the home page. Once logged in with Strava, the [Sidebar](#sidebar) will appear as well as posts that display the user's last 10 runs. Each of these posts show the date/time of the run, run title, distance in miles and kilometers, and the time elapsed. A colored dot will also appear next to the date/time denoting the type of run. More info on the dots can be found in the [Sidebar](#sidebar) section. 

Some general Strava user info is displayed in the Sidebar as well such as the profile image, username, and run/distance totals.

## Displaying Song Data 

## Sidebar 