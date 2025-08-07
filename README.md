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

### CRUD
```
To begin with CRUD operations we first need to creata Database, that is, Firestore

Open firestore.com, login to your account, then go to console
Click on the project you are using
Now in the sidebar, Click on Build, then Click on FireStore Database
Now click on Create Database
Now make sure you have Production Mode clicked otherwise your DB will be removed in 30 days
Click on Next and Create
Now go to Rules

Make :-
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  }
}

To :-
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}

and then click on Publish

Now in your FirebaseConfig.jsx 
import { getFirestore } from "firebase/firestore"
and
export const fireDB = getFirestore(app);

Get the collection in Context or in component, it is more preferred to import it in a context and then export the function using it, similar to Models in nodeJS

import { collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
const collectionRef = collection(fireDB, "collectionName");

for CREATE operation
import { addDoc } from "firebase/firestore";
await addDoc(collectionRef, addDataPayload);

for READ operation
import { query, collection, orderBy, onSnapshot, QuerySnapshot } from "firebase/firestore";
const dbQuery = query(
                    collection(fireDB, "collectionName"),
                    orderBy("fieldName"),
                );

const data = onSnapshot(dbQuery, (QuerySnapshot) => {
                    let collectionRows = [];
                    QuerySnapshot.forEach((doc) => {
                        collectionRows.push({ ...doc.data(), id: doc.id });
                    });
                });

for UPDATE operation
import { fireDB } from "../../firebase/FirebaseConfig";
import { setDoc, doc } from "firebase/firestore";
await setDoc(doc(fireDB, "collectionName", rowEntry.id), udpateDataPayload);    

for DELETE operation
import { fireDB } from "../../firebase/FirebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";
await deleteDoc(doc(fireDB, "collectionName", rowEntry.id));
```