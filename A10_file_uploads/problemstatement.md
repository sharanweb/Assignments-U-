EXPRESS FILE UPLOADS
Create a user model which has the following things first_name last_name profile_pic ( can be 1 only )

Create a gallery model which will belong to the user pictures ( multiple images are allowed ) user_id ( belong to the user)

Create endpoints for

Creating a user
Updating a user ( if profile pic is updated then you need to delete that file from your local server and upload this and change the path in the profile_pic)
Deleting a user ( In this case also the file should be deleted from the server)
OPTIONAL
Adding photos to the gallery ( User can upload only 5 photos at a time and in multer there is way to do this)
Deleting photos from the gallery ( here also files should be deleted from the server ) Please
Note :- For deleting files from the server you can use the fs module that comes with Node.
Hint :- For update and Delete you can find the image path from the MongoDb document and then use the fs module given by Node and try to delete it before updating and delete it for deleting. Function that you might need is fs.unlink().

If you get stuck ask your IA on the channel or in standup