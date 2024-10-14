# ProblemHunt
If you are a Problem Hunter to create Solutions, you really need to check this out! Also, you can share your problems here.

# 🤔 Why I coded it?
- I really `wanted to try new things` (like Coolify/AppWrite/Docker/etc.) and learn more about configuring a VPS so I thought about a fun idea to develop and just started! Also, I have some Cool Ideas but this is not my Main Project...
- So `what about we develop it as a OpenSource Project?`

# 📸 Screenshots
**the Screenshots been in Portuguese, is only a trick to invite you to see the English Version: <a href="https://problemhunt.site" target="_blank">ProblemHunt.site</a> `CTA here? Yes :D`*
<p float="center">
  <img src="https://imgur.com/ahZonOv.png" alt="Home - Image" width="35%" height="35%" />
  <img src="https://imgur.com/jXMZSbX.png" alt="Create a Post - Image" width="35%" height="35%" /> 
</p>

# 📌 To-Do
```console
[] Create Middleware to prevent requests with Postman, etc.
[] Setup Helmet to prevent XSS, etc.
[] Setup SMTP Server + Email*
[] Integrate X/Twitter Bot
[] Integrate Discord Bot
```
**waiting until coolify have a way to self-host smtp server*

# 📌 How to Run
```console
# Clone this repository
git clone https://github.com/RobertoValente/ProblemHunt.git

# Navigate to the folder
cd ProblemHunt/website

# Install all dependencies of the project
npm install

# Navigate to the main folder
cd ..

# Rename the file '.env.example' to '.env'
mv .env.example .env

# Change the information inside .env file (tips inside of '.env')
nano .env

# Run the project
node start
```
