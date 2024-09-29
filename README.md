in this weeks project i have decided to make a basic games/tracker info app.
the home page shows a list of games with likes and a link to a more details page, i have also added a navbar to take you home or add a new game.

you can also filter by genre what games appear on the homepage with the dropdown box.
once you click the more details of the game it will take you to a page giving more details about the game selected also you have the abilty to like the game or delete it entirely.

on the add new game page the only requirement is the title and there is a dropdown box to add the game to one of the pre existing genres, but if the genre doesn't exist you have the option to add a new genre which displays in place of the genre dropdown with the option to save and use the genre or cancel and go back.

there is a seed file to update the database and restore to default so to speak, thanks to Scott in the pair programming excersise for showing that as it was quite useful.

the overall theme was supposed to be pipboy inspired (as i did google the colours to use) but at times feels more 80's IBM instead so apologies if the text is a bit bright.

what i found most challenging this week was getting the genre filter working and adding a new genre, after a lot of reading i managed to get it working which i am pleased with, in the process i found a new react component which i have added "useNavigate" to return you to the homepage after completing an action which to me gave a better experience, i also found challenging having the list display correctly with the navbar but found an article showing me max-height: calc(100vh - 160px) and having it overflow with a scrollbar to help tremendously.
the release year form box works but if you don't enter in the format shown it doesn't work, i tried to use type"number" but it gave me up and down arrows instead so i chose text.

i did spend a lot of time making sure everything worked and that i was being re-directed correctly and databases were being updated so spent less time on the visual appearance, if i had more time with this there would of been a few things i would of done differently. made the visuals more appealing, potentially with animations etc, i chose a many to 1 db join approach, a many to many would of been nicer, adding cover art/screenshots to the details page and finally i think i would of added a button to link to the steam store page for each game.

having the code open from my guestbook project helped greatly with getting the get and post routes added.

overall i have learnt more than i anticipated on this project. in particular useNavigate, creating a dropdown box with select and option and most definately learning how to get the joins to cooperate with each other.

so thanks to stackoverflow, reactdocs, reactrouterdocs, mdn, knowbody and too many other pages visited to mention on all the very useful guides etc to help produce this.
