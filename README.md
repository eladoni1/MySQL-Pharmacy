# MySQL-Pharmacy - User Login & Up-To-Date Drug Reviews.

**(Created using NodeJS + MySQL)**

How to run : 

1. Open as Project

![](https://github.com/eladoni1/MySQL-Pharmacy/blob/main/png/open%20in%20webstorm.png?raw=true)

2. With MySQL database, create the following tables: (A) drug, (B) patient, (C) prescription, (D) request, (E) review.

3. Create a .env file in the root folder, copy the data from env.txt, but you'll have to change parameters like database name, port, username, password etc.

4. Run "npm install" to install all packages in package.json file.

5. Run "npm start " to start the project


You could download example CSV files to fill your reviews, drugs, etc. :
https://drive.google.com/drive/folders/1GorZrsNVxr52MgU1N6uU9VomZ_45J93t?usp=sharing

# Table's column names & structure :

## (A) Column names, (B) Data types, (C) Flags, (D) Default values

#### Drug's table :


![](https://github.com/eladoni1/MySQL-Pharmacy/blob/main/png/drug%20table.png?raw=true)


#### Patient's table :


![](https://github.com/eladoni1/MySQL-Pharmacy/blob/main/png/patient%20table.png?raw=true)


#### Prescription's table :


![](https://github.com/eladoni1/MySQL-Pharmacy/blob/main/png/prescriptions%20table.png?raw=true)


#### Request's table :


![](https://github.com/eladoni1/MySQL-Pharmacy/blob/main/png/request%20table.png?raw=true)


#### Review's table :


![](https://github.com/eladoni1/MySQL-Pharmacy/blob/main/png/review%20table.png?raw=true)



## Our application simulates a clinic, where you can make a request for drugs and purchase them online.
## Let's get a quick review on our app :

#### First, when we launch our app using an IDE / command line, we will receive the following meesage on success -


![](https://github.com/eladoni1/MySQL-Pharmacy/blob/main/png/database%20connected.png?raw=true)


#### When we launch our website on localhost, we will be met with the login screen -


![](https://github.com/eladoni1/MySQL-Pharmacy/blob/main/png/login%20screen.png?raw=true)


#### If we do not have an account already registered, we can do just that, and add a user to the DB as a patient (Doctors are registered manually for safety reasons) -


![](https://github.com/eladoni1/MySQL-Pharmacy/blob/main/png/register%20screen.png?raw=true)


#### If connected as a patient, we'll be redirected accordingly -


![](https://github.com/eladoni1/MySQL-Pharmacy/blob/main/png/patient%20screen.png?raw=true)


#### Pressing on 'Show Prescriptions' will show us our prescriptions available for purchase, or ran out of time (expired) -


![](https://github.com/eladoni1/MySQL-Pharmacy/blob/main/png/prescriptions%20screen.png?raw=true)


#### Pressing on 'My Requests' will show us our requests, whether open or closed (approved or rejected) -


![](https://github.com/eladoni1/MySQL-Pharmacy/blob/main/png/open%20requests%20screen.png?raw=true)


### In prescriptions we can see that we can give new reviews to be saved upon the DB, but only for drugs we've already purchased.
### We can also purchase as much as the prescription allows us (chosen by the doctor).
### Lastly, we can check the reviews of the drugs prescribed to us.

#### Adding a new review -


![](https://github.com/eladoni1/MySQL-Pharmacy/blob/main/png/new%20review%20screen.png?raw=true)


#### Purchasing a prescribed medicine - 


![](https://github.com/eladoni1/MySQL-Pharmacy/blob/main/png/purchase%20screen.png?raw=true)


#### Check a drug's reviews (given by other patients) - 


![](https://github.com/eladoni1/MySQL-Pharmacy/blob/main/png/reviews%20screen.png?raw=true)


### In requests we can make a new request, and check status of active or closed requests.

#### Making a new request -


![](https://github.com/eladoni1/MySQL-Pharmacy/blob/main/png/new%20request%20screen.png?raw=true)


### Now, let's move on to the doctors POV.

#### First, when we log into a user classified as a doctor we will be met with -


![](https://github.com/eladoni1/MySQL-Pharmacy/blob/main/png/doctor%20screen.png?raw=true)


### We can show a queue of patient's requests, and inside it we can decide whether to approve or not, and provide a full prescription.
### On every request, we can check the patient's medical history and request history - so we can figure out if a mix of drugs is the culprit, or rather the patient misuse the request system.
### Also, a doctor can do a manual prescription which can be initiated without the client requesting in the first place.
### Lastly, showing a statistics about most popular doctor (respond to requests the fastest) or most requested drug by patients.

#### Queue of patient's requests -


![](https://github.com/eladoni1/MySQL-Pharmacy/blob/main/png/queue%20screen.png?raw=true)


#### Manual Prescription -


![](https://github.com/eladoni1/MySQL-Pharmacy/blob/main/png/manual%20prescription%20from%20doc%20to%20patient.png?raw=true)


### After pressing the 'upvote' icon, we need as doctors to fill up all sort of information, and how much can the patient buy at any given time. After filling up and pressing 'Approve' button, the request will be removed from the list.

#### Example of approving a patient's request -


![](https://github.com/eladoni1/MySQL-Pharmacy/blob/main/png/approval%20example.png?raw=true)


### 'Downvote' will be followed with the removal of the request from the list as well, w/o providing any information.
### The patient will be notified the request was rejected through his 'Requests' screen.

### Lastly, we can check the patient's medical history. It is crucial for us to do so to not mix drugs which are prohibited to and known to cause trouble.

#### Showing medical history - 


![](https://github.com/eladoni1/MySQL-Pharmacy/blob/main/png/patient%20history.png?raw=true)


## Hope you have a great time using our app! thanks for reading~
