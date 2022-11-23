# Project Title 
- S381 group project -- Inventory management system  
- A brief description of how this project works  
 
## Group 29 Members: 
LEE Kwok Shing, James s13106876  
LAU TSZ KIT, Keith s13070119 
LO Wing Lun, Patrick s13103419 
 
## Tech stack 
COMPOSED OF: Node, Express, EJS 
DATABASE: MongoDB, Mongoose  
WEB HOSTING: Amazon Web Service (AWS) 
 
## System trial 
[Link to our system login page.](https://v3ju7kjtgj.ap-northeast-1.awsapprunner.com/documents/login) 
 
## Features 
- User Authentication 
- Search documents 
- Create documents 
- Delete documents 
- Update documents  
 
## Operations Guides 
- Login  
The system requires user to login. 
Users are held within the login page before successful authentication. 
The followings are default username and password for testing purposes 
- Logout 
To logout of the system, all required is a simple click to the "LOGOUT" button.  
The session is expired and users are back to the login page. 
```javascript  
//user array  
const users = [ 
  {name: "admin", password: "admin"}, 
  {name: "demo", password: "demo"}, 
  {name: "student", password: "student"} 
  {name: "teacher", password: "teacher"}]; 
} 
``` 
 
After successful authentication, 
Users will be redirected to the index page of the system. 
 
## CRUD Services  
All documents are listed in the index page(Latest added at the top). 
Details of the documents can be accessed via clicking it. 
 
- Steps to Search Documents 
<Search bar is at the top of document list at index page> 
1. Select the search field. 
2. Enter the target content. 
3. Click the search button. 
4. The page refreshes and results are shown. 
 
- Steps to Delete Documents 
1. Use search function/scroll to find the document. 
2. Click the document. 
3. Click the little trashcan icon on the rightest of the page. 
4. It goes bcak to index page and the document is gone. 
 
- Steps to Update Documents 
1. Use search function/scroll to find the document. 
2. Click the document. 
3. Fill in the form with new data for the document. 
4. Click the submit button. 
5. The page refreshes and details are updated. 
 
- Steps to Create Documents 
<Create page is at the navigation bar (Top right of the webpage)> 
1. Click "CREATE" to go to create page. 
2. Fill in the form with new data for the document 
3. Click the submit button. 
4. It goes back to index page and the document is added. 
 
## RESTful service  
```javascript  
//All RESTful service used 
{ 
router.get('/create', docController.doc_create_get); 
router.get('/index', docController.doc_index); 
router.get('/search', docController.doc_search); 
router.get('/login', docController.doc_login_get); 
router.get('/logout', docController.doc_logout); 
router.post('/login', docController.doc_login_post); 
router.post('/', docController.doc_create_post); 
router.get('/:id', docController.doc_details); 
router.delete('/:id', docController.doc_delete); 
router.post('/update/:id', docController.doc_update); 
} 
//NOTE: the full path is /documents/…(RESTful route)} 
``` 
// routes 
```javascript 
app.get('/', (req, res) => { 
res.redirect('/documents'); 
}); 
 
``` 
