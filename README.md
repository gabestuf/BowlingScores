# Bowling Score Tracker

## Description

An app for logging bowling games. Ideally, you would use this on a mobile device when on the lanes to record your scores. The goal is to be able to show you your past games, sessions, avgs, handicaps, and other statistics. It was built with React frontend and with an express backend.

---

### Change Log

**V1.2**
_1/25/23_

- Removed server, API now goes through different repo.
- slightly decreased button font size
- current game saves on page reload

- **V1.1**\
  _1/13/23_\
  Overall

- Updated CSS, changed highlight color to blue
- streamlined button style
- Adjusted item spacing
- Applied wrapping, shrinking, responsiveness to text and divs
- added loading icon
  Scorecard Page
- adjusted keypad size
- added Max Score and Current Score box
  Header Page
- Toggles between 'Profile' and 'Home' depending on page using useLocation
  Profile Page
- added ability to delete games
- added button to toggle each scoreboard on or off, default is off. //TODO global toggle

Goals for next version:

- [ ] refactor, create more subfolders
- [ ] optimize code a bit, especially when making api calls and calculating scores
- [x] global toggle for scoreboards in Profile
- [ ] add more statistics to Profile
- [ ] add github link

  **V1.0**\
   _1/11/23_\
   Features a wireframe styled app. You can add scores using the number pad and can save completed games. By clicking on your name in the header (this will be made more apparent soon), you can visit the profile page and view your previous games.

Goals for next version:

- [ ] more apparant profile page
- [ ] add more stats to profile page & scorecard such as:
- - [x] total
- - [ ] handicap
- - [x] max-score (for scorecard)
- - [x] add delete button in match history
- [ ] random CSS stuff, mobile friendly
- - [x] change header hover color to be same as buttons
- - [x] center score frames
- - [x] see how shrinking the frame to fit on one line looks
- - [x] add a top to header
- - [x] style the unstyled buttons
