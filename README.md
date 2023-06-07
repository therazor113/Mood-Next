# Mood-Next

A mood tracking app built using nextjs

*Work in progress*

## Instructions:
https://mood-next.vercel.app/

Test drive:
1. Select the button labeled "Test Drive?" under the sign in button
2. Choose from a dev account to view the app with autofilled data

Create account:
1. Select the "Register" button in the top right of the login page
2. Create an account and hit "Create Account" </br>
(this will automatically sign you in to your new account)

Add Journal:
1. Log in to your account and select the "Add a new entry?" button </br>
*(If an entry was created in the past hour this will not be available)*
2. Select your current mood and enter your journal entry and hit "Send"

Edit Journal:
1. Find the journal entry you would like to edit in the graphs section
2. Select the dot/bar graph icon containing your entry and hit the pencil icon in the top right </br>
To change a mood, select one of the arrow keys on either side the mood icon </br>
To change a journal, simply select the text area and change entry as needed
3. Hit the "Update" button when finished

### Additional Features:
- All data is actively updated when user data is changed
- This app utilizes cookies to keep the user logged in even after closing the browser </br>
(the user must log out if they wish to change accounts)

## Future Features:
- New Yearly chart data
- User chart customization
- Ability to change charts between bar and dot charts
- Ability to reset password with email verification
- Search icon for finding specific date/entry

## Setup:
```
npm install
```
```
npm run dev
```
requires a PostgreSQL Database to work as intended</br>

http://localhost:3000
