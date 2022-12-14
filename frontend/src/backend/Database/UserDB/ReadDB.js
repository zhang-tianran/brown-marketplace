/*
    This class handles reading the users in the database. It includes methods that read all the users,
    read a user by its ID, filter the users by class year.
 */
import { getDatabase, ref, get, onValue, query, orderByChild, equalTo }
    from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
const database = getDatabase();

/*
  This method reads and returns the information of a particular user in the database. It listens for changes and uses
  onValue() to observe events. This method is triggered once when the listener is attached and again every time the
  data, including children, changes.
 */
var readOneUserInfo = (id) => {
    onValue(ref(database, 'users/' + id), (snapshot) => {
        console.log(snapshot.val())
    })
}

/*
    This method reads and returns the data of all the users in the database.
 */
var readAllUserInfo = () => {
    onValue(ref(database, 'users'), (snapshot) => {
        snapshot.forEach(function(childSnapshot) {
            console.log(childSnapshot.val())
        })
    })
}

/*
    This method filters the users by class year.
 */
var filterUsersByClassYear = (classYear) => {
    const q = query(ref(database, 'users/'), orderByChild('classYear'), equalTo(classYear));
    get(q).then(snapshot => {
        console.log(snapshot.val())
    })
}

document.querySelector('#read').addEventListener("click", () => {
    readOneUserInfo("u3");
})
document.querySelector('#readAll').addEventListener("click", () => {
    readAllUserInfo();
})
document.querySelector('#readFiltered').addEventListener("click", () => {
    filterUsersByClassYear("sophomore");
})