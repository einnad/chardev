# CHARDEV

#### Video Demo: https://youtu.be/8ndDN75S4pM

#### Description:

CharDev is an easy way for creators to develop characters and keep them all in one place. This is a site that allows multiple users, and once signed in they can create characters using the form outlined. The characters are saved and can be edited or deleted at any point in time.

Mongodb handles the data in this project. Going for a noSQL approach made it easier to create models for users, timelines and characters. The character model takes a creator objectID that refers to the users \_id that mongodb creates.

This project is split into multiple files. Db.js configures the database and is imported to app.js separately. I chose to have an app.js that calls upon the index.js which contains the router. This router handles all of the requests to get each page and make post requests from forms. The mongodb models are characters, users and timelines which all have separate files and are imported into the index.js. App.js creates a session which contains a cookie to enable the user to remain logged in when navigating the site. App.js also has a middleware to help assign an ‘authenticated’ tag after the user logs in. This allows ejs to render the appropriate navbar items such as login vs logout.

Additionally, each webpage is within the views folder. Using express is the best option to pull data and render it using a template structure. The header and footer are partials to avoid repetition of code. A script.js contains the colour themes code to abstract from any additional CSS or ejs code, as well as functions to activate the clock, date and toggle button.

The initial account creation requires a unique username - this is to avoid issues when making requests to the database for characters. A minimum password length of 8 characters is required for security and then the user is redirected to the login page. Bcrypt hashes the password and a passport local strategy is used for authentication. As there are username/password inputs, this made most sense to create a secure, simple login process. Once logged in, the overview page is displayed.

Upon first login, the form to create the first character will be shown. As long as the user enters a name, they can save the character without other fields completed. If the user has already created characters prior, a list - presented using CSS grid - will display the characters as buttons. Characters can have ‘groups’; if the user has several projects and wants to note characters for a game, or book etc, they can create a title for these groups. On the overview page, there’s a sort function that can sort by group to make it easier to visualise. The user can also sort alphabetically, as well as the default which is order of creation. The new character form displays in all cases.

When a character is selected, the table page is rendered with the data of that character filled into the form. The user can then edit this as much as required. The textareas are used to allow the user to easily expand and shrink as needed. There’s a ‘delete character’ button at the top of the page. When the user presses the save button, an update request is sent to the database and the user is redirected to the overview page.

Another feature is the timelines. As this tool is designed to make things helpful for creators and help focalise their projects, timelines included can help. They are based on the Three Act Structure because it’s one of the most popular and effective story structures. However, while the sections are named after this, the creator can fill anything they want to adapt to their preferences. A link is on the timelines page to explain more about the Three Act Structure.

As this site is designed to help creators, there are themes available to choose from in the dropdown menu in the navbar. The default is the light theme and the others are dark, blue, purple, green and pink. The user’s selection is stored in LocalStorage so when they revisit or switch pages, their choice is maintained. Javascript is used to build and manage these themes instead of pure CSS to help abstract from the CSS file.

The project is responsive for smaller screens, as grids filter down to two columns. Bootstrap reverts to a collapsed navbar menu on small screens. Bootstrap also controls the forms and makes them look uniform across the whole site.

The date is based on local time using the navigator API and the clock is alongside it in the navbar. The user can focus entirely within the site with these additions, rather than getting distracted by needing to search externally for this basic information. If the clock is too distracting, there is a button that toggles a ‘hidden’ class which removes it.

The main goal for this project is to provide a minimalist, functional place to develop ideas. The choice to exclude any moving parts, too much visual noise or more features can help a creator to excel in their task.
