# CM4025-Enterprise-Web-Development
Name: Borislav Nikolaev Aleksandrov
Student number: 1906490
Web Development stuff from labs

1. Created my index.ejs file, which is just the normal functional webpage
2. Made a whole login/register/change password system, which works perfectly with a mongo database and a JWT for additional security authentication, hence users need to prove themselves somehow. Preferred that instead of cookies. I also slowed down the login algothitm, as a security measure - if the algorhitm is slow, the breaching will also be slow. It is bad practice to have lightning-speed login and register for security purposes.
3. Users will get errors if they try to mess up with the login/register/changepw.
4. Anothr function is the calculation function, which defines the hourly rate for workers and calculates their final budget figure.
5. My program also allows atleast 1 worker per project.
6. Final budget is obvious in a way of calculation, but I have shown the numbers on the webpage.
7. Have added the fudge factor, so the quotes system is harder to breach and reverse engineer
8. I have also allowed users to store/delete quotes based on the quote name.
9. Another security feature is that the main quotes database, works both from Linux and Windows, and is stored in the Mongo cloud system. There, I have allowed Mongo the authentication of ONLY my laptop and the Linux VM IP addresses, which is another security feature. 
10. Database can be pulled from Linux too, would make a Linux guide, if it wasn't so specific for 22.04, crashing on every install for hours over and over, until I figured some techniques out for mongo, thanks to Indian youtubers (god bless them)
11. On top of all that, I managed to fit ALL of my code into a single app.js file as a backend.
12. I hashed all the passwords as a security feature
13. Users can access their accounts via MongoCompass
14. Everything works on 8080, from both Linux and Windows machines, which is great news.
15. Added a Monke gif as an easter egg.
16. TODO

So what I haven't managed to do is to allow users to edit existing quotes, althought I attempted it, but it ruined my whole script, also edit the prompt from the Login, Register and Change password pages to take the user to the next page.
Will write a Linux guide on this one day.





I am grateful for my struggles in both univercity and with this coursework in particular, because of how hard it was, and how it inspired me to debug and learn for hours. Wrote 15 pages out of a notebook with commands and different methods... amazing. Thanks to all of my teachers and I will be showing my future work on github, thanks to their inspiration.
