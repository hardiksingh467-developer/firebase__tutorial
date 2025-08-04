# Firebase Tutorial

In every Firebase project keep a ./src/firbase/FireBaseConfig.jsx, where we will configure and initialize our Firebase App

Now go to firebase.google.com abd click Get started

Click and Add Project
Now write a project name
Disable Google Analytics and any AI assistant
Now click on Web(</> icon), followed by giving a name to your project and click on register app

Now install firebase, npm i firebase
Copy the code snippet in website and paste in FirebaseConfig.jsx

### Authentication
```
Click on Build dropdown in the sidebar and click on authentication, followed by clicking on `Get Started`

Firebase provides with three types of provider: Native, Additional(Googel, Facebook, Github, ...), Custom

Click on Email/Password and then click on enable and save

In FirebaseConfig.jsx first import { getAuth } from "firebase/auth";

and then export const auth = getAuth(app);

now use createUserWithEmailAndPassword(auth, email, password) in your signUp page

similarly you can use

now use signInWithEmailAndPassword(auth, email, password) in your login page

if you refresh the authentication you can see all the three users
```