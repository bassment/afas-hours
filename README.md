## How to use:

1) Install yarn - https://yarnpkg.com/en/docs/install#mac-stable
2) Download this repo and go into the project folder and run ```yarn```
3) Open *config.js* file in your editor and provide your _afas_ username and password

4) Justify the config for you specific need:
- *userType* (string) - could only be 'developer' or 'meteorologist'
- *project* (string) the script will try to search the projects name by key words so it's ok to provide shorten variant of your project
- *month* (string) - for now you could only select *ONE* monthby it's number for example *7* is *JULY*.
- *days* (sring as a range) - Will fill the days one by one. Please provide the range of days in format like: '7-25' as a string. Should always be a *RANGE*
- *skipDays* (array of numbers | optional) - Mainly is used for skipping of yours/national holidays in format of - [5, 6, 22]
- *time* (object) - the start and and time of your work day. Will be populated for every day. The fields are - *from* and *to*

5)After configuring, go to your terminal with a path of the root folder of this project and run ```yarn fill-hours```

## Process
The Process will fire up the Chrome instance and will run automated test to fill in your hours specified in config. 
You could watch how it gets populated. *BUT I RECOMEND TO AVOID TOUCHING THE WINDOW WITH YOUR MOUSE :D* 
Otherwise you will mess up everything.

## Features:
- Don't worry about adding weekends to the *skipDays* The script will calculate and skip the weekends itself.