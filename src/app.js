import "./../styles/styles.css";
import { initializeApp, onLog } from "firebase/app";
import {
  collection,
  doc,
  getFirestore,
  setDoc,
  addDoc,
  getDoc,
  updateDoc,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import {
  getStorage,
  uploadBytes,
  ref,
  getDownloadURL,
  listAll,
  getMetadata,
  deleteObject,
  list,
} from "firebase/storage";
import {
  getDatabase,
  onChildAdded,
  onChildRemoved,
  onValue,
  push,
  ref as rtRef,
  remove,
  set,
} from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyBPAYNuUeFxjJM48wu8osVulhxXEqEXnc8",

  authDomain: "fir-zadania.firebaseapp.com",

  projectId: "fir-zadania",

  storageBucket: "fir-zadania.appspot.com",

  messagingSenderId: "431532735875",
  databaseURL:
    "https://fir-zadania-default-rtdb.europe-west1.firebasedatabase.app",

  appId: "1:431532735875:web:ccd23f41f353c8d6b08ab6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

class StorageExercises {
  static zad1() {
    const h1 = document.createElement("h1");
    const inputFile = document.createElement("input");
    const button = document.createElement("button");
    const header = document.createElement("header");

    h1.textContent = "Zadanie 1";
    inputFile.setAttribute("type", "file");
    button.textContent = "Wyślij";

    document.body.appendChild(h1);
    document.body.appendChild(inputFile);
    document.body.appendChild(button);
    document.body.appendChild(header);

    button.addEventListener("click", () => {
      header.textContent = "Przesyłam...";
      Storage.uploadFiles(storage, inputFile.files[0], inputFile.files[0].name)
        .then(() => {
          header.textContent = "Przesyłanie zakończone pomyślnie!!!";
        })
        .catch(() => {
          header.textContent = "Błąd przesyłania pliku!!!";
        });
    });
  }

  static zad2() {
    const h1 = document.createElement("h1");
    const inputFile = document.createElement("input");
    const inputText = document.createElement("input");
    const button = document.createElement("button");
    const header = document.createElement("header");

    h1.textContent = "Zadanie 2";
    inputFile.setAttribute("type", "file");
    inputText.setAttribute("type", "text");
    button.textContent = "Wyślij";

    document.body.appendChild(h1);
    document.body.appendChild(inputFile);
    document.body.appendChild(inputText);
    document.body.appendChild(button);
    document.body.appendChild(header);

    button.addEventListener("click", () => {
      header.textContent = "Przesyłam...";
      Storage.uploadFiles(storage, inputFile.files[0], inputText.value)
        .then(() => {
          header.textContent = "Przesyłanie zakończone pomyślnie!!!";
        })
        .catch(() => {
          header.textContent = "Błąd przesyłania pliku!!!";
        });
    });
  }

  static zad3() {
    const h1 = document.createElement("h1");
    const inputFile = document.createElement("input");
    const inputText = document.createElement("input");
    const button = document.createElement("button");
    const header = document.createElement("header");
    const img = document.createElement("img");

    h1.textContent = "Zadanie 3";
    inputFile.setAttribute("type", "file");
    inputText.setAttribute("type", "text");
    button.textContent = "Wyślij";

    document.body.appendChild(h1);
    document.body.appendChild(inputFile);
    document.body.appendChild(inputText);
    document.body.appendChild(button);
    document.body.appendChild(header);

    button.addEventListener("click", () => {
      header.textContent = "Przesyłam...";
      Storage.uploadFiles(storage, inputFile.files[0], inputText.value)
        .then(() => {
          header.textContent = "Przesyłanie zakończone pomyślnie!!!";
          Storage.downloadURL(storage, inputText.value).then((url) => {
            img.setAttribute("src", url);
            document.body.appendChild(img);
          });
        })
        .catch((e) => {
          header.textContent = "Błąd przesyłania pliku!!!";
          console.log(e);
        });
    });
  }

  static zad4() {
    const ol = document.createElement("ol");
    document.body.appendChild(ol);

    const storageRef = ref(storage);
    listAll(storageRef).then((res) => {
      res.items.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item.fullPath;
        ol.appendChild(li);
      });
    });
  }

  static zad5() {
    const storageRef = ref(storage);

    listAll(storageRef).then((res) => {
      //wylistowanie wszystkich plików ze storage
      res.items.forEach((item) => {
        getMetadata(ref(storageRef, item.fullPath)).then((meta) => {
          //pobranie metadanych dla danego pliku w celu sprawdzenia jego typu

          if (meta.contentType.includes("image")) {
            getDownloadURL(ref(storageRef, item.fullPath)).then((url) => {
              //pobranie adresu url pliku jeśli jego typ to image

              const span = document.createElement("span");
              const img = document.createElement("img");
              const h3 = document.createElement("h3");

              span.style.display = "inline-block";
              span.style.margin = "10px";
              span.style.border = "solid green 2px";
              h3.textContent = item.name;
              h3.style.textAlign = "center";
              img.setAttribute("src", url);
              img.style.display = "block";
              img.style.width = "100px";
              img.style.height = "100px";
              document.body.appendChild(span);
              span.appendChild(img);
              span.appendChild(h3);
            });
          }
        });
      });
    });
  }

  static zad6() {
    Storage.listAllImages(storage).then((res) => {
      res.items.forEach((item) => {
        getMetadata(ref(storage, item.fullPath)).then((res) => {
          if (res.contentType.includes("image")) {
            getDownloadURL(ref(storage, item.fullPath)).then((url) => {
              HTMLStruct(url, item.name);
            });
          }
        });
      });
    });

    const HTMLStruct = (url, name) => {
      const div = document.createElement("div");
      const img = document.createElement("img");
      const h3 = document.createElement("h3");
      const btn = document.createElement("button");

      div.style.display = "inline-block";
      div.style.backgroundColor = "gray";
      div.style.overflow = "hidden";
      div.style.margin = "20px";
      img.style.width = img.style.height = "200px";
      img.setAttribute("src", url);
      img.setAttribute("data-name", name);

      h3.textContent = name;
      h3.style.textAlign = "center";

      btn.textContent = "USUŃ";
      btn.style.display = "block";
      btn.style.margin = "0 auto";
      btn.setAttribute("data-name", name);

      document.body.appendChild(div);
      div.appendChild(img);
      div.appendChild(h3);
      div.appendChild(btn);

      btn.addEventListener("click", deleteImage);
    };

    function deleteImage(event) {
      const name = event.target.getAttribute("data-name");
      console.log(name);
      Storage.deleteImage(storage, name);
      document.body.innerHTML = "";
      Storage.listAllImages(storage).then((res) => {
        res.items.forEach((item) => {
          getMetadata(ref(storage, item.fullPath)).then((res) => {
            if (res.contentType.includes("image")) {
              getDownloadURL(ref(storage, item.fullPath)).then((url) => {
                HTMLStruct(url, item.name);
              });
            }
          });
        });
      });
    }
  }
  static zad7() {
    const liList = document.querySelectorAll(".categories li");

    liList.forEach((li) => {
      li.addEventListener("click", (event) => {
        const category = event.target.textContent;

        const ol = document.querySelector(".docs ol");

        ol.innerHTML = "";

        listAll(ref(storage)).then((res) => {
          res.items.forEach((item) => {
            getMetadata(ref(storage, item.fullPath)).then((res) => {
              if (
                category.toLowerCase() === "zdjęcia" &&
                res.contentType.includes("image")
              ) {
                const li = document.createElement("li");
                li.textContent = item.name;
                document.querySelector(".docs ol").appendChild(li);
              } else if (
                category.toLowerCase() === "pliki pdf" &&
                res.contentType.includes("pdf")
              ) {
                const li = document.createElement("li");
                li.textContent = item.name;
                document.querySelector(".docs ol").appendChild(li);
              }
            });
          });
        });
      });
    });
  }
}

class Storage {
  static uploadFiles(storage, file, fileName) {
    const fileRef = ref(storage, fileName);
    return uploadBytes(fileRef, file);
  }

  static downloadURL(storage, fileName) {
    const fileRef = ref(storage, fileName);
    return getDownloadURL(fileRef);
  }

  static listAllImages(storage, imagesUrls) {
    const storageRef = ref(storage);
    return listAll(storageRef);
  }

  static deleteImage(storage, image) {
    const storageRef = ref(storage, image);
    return deleteObject(storageRef);
  }
}

// StorageExercises.zad1();
// StorageExercises.zad2();
// StorageExercises.zad3();
// StorageExercises.zad4();
// StorageExercises.zad5();
// StorageExercises.zad6();
// StorageExercises.zad7();

// -----------------------------------------------------------------------------------------------

// Zadanie 8
// const select = document.querySelector("#abs");
// const form = document.querySelector("form");

// const downloadAlbums = () => {
//   list(ref(storage)).then((result) => {
//     //pobranie wszystkich plików i folderów ze storage
//     result.prefixes.forEach((album) => {
//       //pobranie nazw albumów z właściwości prefixes
//       addAlbumToSelect(album.fullPath);
//     });
//   });
// };

// const addAlbumToSelect = (albumName) => {
//   const album = document.createElement("option");
//   album.textContent = albumName;
//   album.setAttribute("value", albumName);
//   select.appendChild(album);
// };

// downloadAlbums();

// form.addEventListener("submit", (event) => {
//   event.preventDefault();

//   if (select.value) {
//     uploadBytes(
//       ref(storage, `${select.value}/${event.target[1].files[0].name}`),
//       event.target[1].files[0]
//     ).then((result) =>
//       console.log("Przesyłanie danych zakończone pomyślnie!!!")
//     );
//   }
//   console.log(event);
// });

// -----------------------------------------------------------------------------------------------

// Zadanie 9
// const form = document.querySelector("form");
// const h1 = document.querySelector("h1");
// const p = document.querySelector("p");
// const img = document.querySelector("img");

// form.addEventListener("submit", (event) => {
//   event.preventDefault();

//   // console.log(event);
//   uploadBytes(
//     ref(storage, event.target[1].files[0].name),
//     event.target[1].files[0]
//   ).then((result) => {
//     console.log("Przesyłanie zakończone pomyślnie!!!");
//   });

//   getDownloadURL(ref(storage, event.target[1].files[0].name)).then((url) =>
//     img.setAttribute("src", url)
//   );

//   h1.textContent = event.target[0].value;
//   p.textContent = event.target[2].value;
// });

// -----------------------------------------------------------------------------------------------

// ZADANIE 10
// class Post {
//   constructor(title, file, textArea) {
//     this.title = title;
//     this.file = file;
//     this.textArea = textArea;
//   }
// }

// class App {
//   constructor() {
//     this.posts = [];
//     this.form = document.querySelector("form");
//     this.inputTitle = document.querySelector(".title");
//     this.inputFile = document.querySelector(".file");
//     this.textArea = document.querySelector("textarea");
//     this.wall = document.querySelector(".wall");
//   }

//   main() {
//     this.form.addEventListener("submit", (event) => {
//       event.preventDefault();
//       let urlAdr = "";
//       uploadBytes(
//         ref(storage, this.inputFile.files[0].name),
//         this.inputFile.files[0]
//       ).then((result) => {
//         getDownloadURL(ref(storage, this.inputFile.files[0].name)).then(
//           (url) => {
//             urlAdr = url;
//             this.posts.push(
//               new Post(this.inputTitle.value, urlAdr, this.textArea.value)
//             );
//             this.showOnWall();
//             console.log(this.posts);
//           }
//         );
//       });
//     });
//   }

//   showOnWall() {
//     this.wall.innerHTML = "";

//     this.posts.forEach((post) => {
//       const div = document.createElement("div");
//       const img = document.createElement("img");
//       const h1 = document.createElement("h1");
//       const p = document.createElement("p");

//       h1.textContent = post.title;
//       h1.style.textAlign = "center";
//       p.textContent = post.textArea;
//       p.style.textAlign = "center";
//       img.style.width = img.style.height = "500px";
//       img.src = post.file;
//       div.style.backgroundColor = "gray";
//       div.style.width = "50vw";
//       div.style.margin = "50px auto";

//       div.appendChild(img);
//       div.appendChild(h1);
//       div.appendChild(p);
//       this.wall.appendChild(div);
//     });
//   }
// }

// const app1 = new App();
// app1.main();

// -----------------------------------------------------------------------------------------------
// -------------------------------FIRESTORE----------------------------------
const db = getFirestore(app);

// ZADANIE 1
// const name = document.querySelector(".name");
// const surname = document.querySelector(".surname");
// const age = document.querySelector(".age");
// const form = document.querySelector("form");

// const addNewUser = (event) => {
//   event.preventDefault();
//   setDoc(
//     doc(db, "users", `${name.value} ${surname.value}`).withConverter(
//       usersConverter
//     ),
//     new User(name.value, surname.value, age.value)
//   )
//     .then((result) => {
//       console.log("dupa");
//     })
//     .catch((error) => console.log(error));
// };

// class User {
//   constructor(name, surname, age) {
//     this.name = name;
//     this.surname = surname;
//     this.age = age;
//   }
// }

// // Firestore data converter
// const usersConverter = {
//   toFirestore: (user) => {
//     return {
//       name: user.name,
//       surname: user.surname,
//       age: user.age,
//     };
//   },
//   fromFirestore: (snapshot, options) => {
//     const data = snapshot.data(options);
//     return new User(data.name, data.surname, data.age);
//   },
// };

// form.addEventListener("submit", addNewUser);

// -----------------------------------------------------------------------------------------------

// ZADANIE 2
// const name = document.querySelector(".name");
// const surname = document.querySelector(".surname");
// const age = document.querySelector(".age");
// const submit = document.querySelector(".submit");
// const form = document.querySelector("form");

// const downloadUser = (event) => {
//   event.preventDefault();

//   if (submit.value.toLowerCase() === "pobierz użytkownika") {
//     getDoc(doc(db, "users", `${name.value} ${surname.value}`))
//       .then((doc) => {
//         const user = doc.data();
//         console.log(user);
//         name.value = user.name;
//         surname.value = user.surname;
//         age.value = user.age;
//         submit.value = "Aktualizuj dane";
//       })
//       .catch((error) => console.log(error));
//   } else {
//     updateDoc(doc(db, "users", `${name.value} ${surname.value}`), {
//       name: `${name.value}`,
//       surname: `${surname.value}`,
//       age: `${age.value}`,
//     }).then((result) => console.log(result));
//   }
// };

// const updateUser = () => {};

// form.addEventListener("submit", downloadUser);

// -----------------------------------------------------------------------------------------------

// ZADANIE 3
// const ol = document.querySelector("ol");

// getDocs(collection(db, "users")).then((docs) => {
//   docs.forEach((doc) => {
//     const user = doc.data();
//     const li = document.createElement("li");

//     li.textContent = `Imię: ${user.name}, nazwisko: ${user.surname}, wiek: ${user.age}`;
//     ol.appendChild(li);
//   });
// });

// -----------------------------------------------------------------------------------------------

// ZADANIE 4
// const name = document.querySelector(".name");
// const surname = document.querySelector(".surname");
// const age = document.querySelector(".age");
// const submit = document.querySelector(".submit");
// const form = document.querySelector("form");
// const ol = document.querySelector("ol");
// const users = [];

// const downloadUsers = () => {
//   getDocs(collection(db, "users"))
//     .then((docs) => {
//       let index = 0;
//       docs.forEach((doc) => {
//         const user = doc.data();

//         const li = document.createElement("li");
//         const span = document.createElement("span");
//         const button = document.createElement("button");

//         users.push({
//           name: user.name,
//           surname: user.surname,
//           age: user.age,
//         });
//         console.log(index);
//         li.setAttribute("id", index);
//         span.textContent = `${user.name} ${user.surname}`;
//         button.textContent = "EDYTUJ";

//         li.appendChild(span);
//         li.appendChild(button);
//         ol.appendChild(li);

//         button.addEventListener("click", editUsers);
//         index++;
//       });
//     })
//     .catch((error) => console.log("chuj"));
// };

// const editUsers = (event) => {
//   const index = event.target.parentElement.id;

//   name.value = users[index].name;
//   surname.value = users[index].surname;
//   age.value = users[index].age;
// };

// const updateUserData = (event) => {
//   event.preventDefault();
//   updateDoc(doc(db, "users", `${name.value} ${surname.value}`), {
//     name: `${name.value}`,
//     surname: `${surname.value}`,
//     age: `${age.value}`,
//   }).then((result) => {
//   });
// };

// downloadUsers();
// form.addEventListener("submit", updateUserData);

// -----------------------------------------------------------------------------------------------

// ZADANIE 5
// const form = document.querySelector("form");
// const name = document.querySelector(".name");
// const ol = document.querySelector("ol");

// const downloadUsers = (event) => {
//   event.preventDefault();
//   getDocs(query(collection(db, "users"), where("name", "==", name.value))).then(
//     (docs) => {
//       ol.innerHTML = "";
//       docs.forEach((doc) => {
//         const user = doc.data();

//         const li = document.createElement("li");
//         li.textContent = `${user.name} ${user.surname}`;

//         ol.appendChild(li);
//       });
//     }
//   );
// };

// form.addEventListener("submit", downloadUsers);

// -----------------------------------------------------------------------------------------------

//ZADANIE 6
// const name = document.querySelector(".name");
// const surname = document.querySelector(".surname");
// const age = document.querySelector(".age");
// const select = document.querySelector("select");
// const form = document.querySelector("form");
// const ol = document.querySelector("ol");

// const addEmployer = (event) => {
//   event.preventDefault();
//   setDoc(
//     doc(
//       db,
//       "DEPARTURES",
//       `${select.value}`,
//       "EMPLOYERS",
//       `${name.value} ${surname.value}`
//     ),
//     {
//       name: `${name.value}`,
//       surname: `${surname.value}`,
//     }
//   ).then((result) => departCounter());
// };

// const downloadDepartures = () => {
//   //pobranie wszystkich działów
//   getDocs(collection(db, "DEPARTURES"))
//     .then((docs) => {
//       console.log(docs);
//       docs.forEach((doc) => {
//         const option = document.createElement("option");

//         option.value = doc.data().name;
//         option.textContent = option.value;
//         select.appendChild(option);
//       });
//     })
//     .catch((error) => console.log(error));
// };

// const departCounter = () => {
//   //licznik pracowników w danym dziale
//   ol.innerHTML = "";

//   getDocs(collection(db, "DEPARTURES")).then((docs) => {
//     docs.forEach((doc) => {
//       getDocs(collection(db, "DEPARTURES", doc.data().name, "EMPLOYERS")).then(
//         (docs) => {
//           const li = document.createElement("li");
//           li.textContent = `${doc.data().name}: - ${docs.size}`;

//           ol.appendChild(li);
//         }
//       );
//     });
//   });
// };

// form.addEventListener("submit", addEmployer);
// downloadDepartures();
// departCounter();

// -----------------------------------------------------------------------------------------------

// ZADANIE 7

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// KURS FIREBASE 14.01.2023

// -----------------------------------------------------------------------------

// APLIKACJA 1 - ALBUM
// const aName = document.querySelector(".name");
// const aYear = document.querySelector(".year");
// const form = document.querySelector("form");
// const ol = document.querySelector("ol");

// const addNewAlbum = (event) => {
//   event.preventDefault();

//   addDoc(
//     collection(db, "albums").withConverter(albumConverter),
//     new Album(aName.value, aYear.value)
//   ).then((result) => {
//     aName.value = null;
//     aYear.value = null;
//     downloadAlbums();
//   });
// };

// const photoFile = document.querySelector(".photoFile");
// const albumId = document.querySelector(".albumId");
// const btnAddPhoto = document.querySelector(".addPhoto");
// const photos = document.querySelector(".photos");

// const downloadAlbums = () => {
//   ol.innerHTML = null;

//   getDocs(collection(db, "albums")).then((docs) => {
//     docs.forEach((doc) => {
//       const album = doc.data();
//       const li = document.createElement("li");
//       const btn1 = document.createElement("button");
//       const btn2 = document.createElement("button");

//       btn1.textContent = "Pokaż zdjęcia";
//       btn2.textContent = "Dodaj zdjęcia";

//       li.textContent = `${album.name} ${album.year}`;
//       li.appendChild(btn1);
//       li.appendChild(btn2);
//       ol.appendChild(li);

//       btn1.addEventListener("click", () => {
//         photos.innerHTML = "";
//         const albumRef = ref(storage, `${doc.id}`);

//         listAll(albumRef).then((results) => {
//           results.items.forEach((res) => {
//             getDownloadURL(ref(storage, res.fullPath)).then((url) => {
//               const img = document.createElement("img");
//               img.setAttribute("src", url);

//               photos.appendChild(img);
//             });
//           });
//         });
//       });

//       btn2.addEventListener("click", () => {
//         albumId.value = doc.id;
//       });
//     });
//   });
// };

// btnAddPhoto.addEventListener("click", () => {
//   const file = photoFile.files[0];
//   const fileRef = ref(storage, `${albumId.value}/${file.name}`);
//   uploadBytes(fileRef, file);
// });

// class Album {
//   constructor(name, year) {
//     this.name = name;
//     this.year = year;
//   }
// }
// const albumConverter = {
//   toFirestore: (album) => {
//     return {
//       name: album.name,
//       year: album.year,
//     };
//   },
//   fromFirestore: (snapshot, options) => {
//     const data = snapshot.data(options);
//     return new Album(data.name, data.year);
//   },
// };

// form.addEventListener("submit", addNewAlbum);
// downloadAlbums();

// -----------------------------------------------------------------------------

// Aplikacja 2
// const albumDoc = doc(db, "albums/FwjemlR18cO9ZBPY6jcu");

// onSnapshot(albumDoc, (doc) => {
//   document.body.innerText = JSON.stringify(doc.data());
// });

// APLIKACJA 3 - stoper
// let intervalId;
// let stoperVal = 0;
// const stoperDoc = doc(db, "stopers", "stoper");
// const span = document.querySelector("span");
// const btnStart = document.querySelector(".start");
// const btnReset = document.querySelector(".reset");

// const startStoper = () => {
//   if (intervalId) {
//     //zabezpieczenie przed uruchomieniem kolejnych SetInterval po każdym kliknięciu
//     clearInterval(intervalId);
//   }
//   intervalId = setInterval(() => {
//     setDoc(stoperDoc, {
//       seconds: `${stoperVal}`,
//     });
//     stoperVal++;
//   }, 1000);
// };

// const resetStoper = () => {
//   stoperVal = 0;
//   if (intervalId) {
//     //zabezpieczenie przed uruchomieniem kolejnych SetInterval po każdym kliknięciu
//     clearInterval(intervalId);
//   }

//   setDoc(stoperDoc, {
//     seconds: `${stoperVal}`,
//   });
// };

// onSnapshot(stoperDoc, (doc) => {
//   span.textContent = doc.data().seconds;
// });

// btnStart.addEventListener("click", startStoper);
// btnReset.addEventListener("click", resetStoper);

// -----------------------------------------------------------------------------

// BAZA CZASU RZECZYWISTEGO - REALTIME DATABASE
const rtdb = getDatabase(app);

// PRZYKŁAD 1
// const janRef = rtRef(rtdb, "users/JanKowalskiId");
// set(janRef, {
//   name: "Jan",
//   surname: "Kowalski",
// });

// APLIKACJA 1
// const name = document.querySelector(".name");
// const surname = document.querySelector(".surname");
// const form = document.querySelector("form");

// const addNewUser = (event) => {
//   event.preventDefault();

//   //dodanie nowego użytkownika o określonym id
//   // const userRef = rtRef(rtdb, `users/${name.value}${surname.value}`);
//   // set(userRef, {
//   //   name: `${name.value}`,
//   //   surname: `${surname.value}`,
//   // });

//   // dodanie nowego użytkownika o unikalnym id - metoda push()
//   const usersRef = rtRef(rtdb, "users");
//   const newUser = push(usersRef);
//   set(newUser, {
//     name: `${name.value}`,
//     surname: `${surname.value}`,
//   });
// };

// const ol = document.querySelector("ol");
// const myRef = rtRef(rtdb, "users");
// // onValue(myRef, (snapshot) => { //nasłuchuje na zmiany w bazie - pobiera wszystkie dane z danego pola
// //   ol.innerHTML = "";
// //   snapshot.forEach((user) => {
// //     console.log(user);
// //     const li = document.createElement("li");
// //     li.textContent = `${user.val().name} ${user.val().surname}`;
// //     ol.appendChild(li);
// //   });
// // });

// onChildAdded(myRef, (snapshot) => {
//   // ol.innerHTML = "";
//   const li = document.createElement("li");
//   const btn = document.createElement("button");

//   btn.addEventListener("click", (event) => {
//     const userRef = ref(db, `users/${event.target.id}`);
//     remove(userRef);
//   });

//   btn.textContent = "Usuń";
//   li.textContent = `${snapshot.val().name} ${snapshot.val().surname}`;
//   li.id = snapshot.key;
//   ol.appendChild(btn);
//   ol.appendChild(li);
// }); //nasłuchuje na dodanie nowych danych do pola i zwraca tylko nowo dodane dane

// form.addEventListener("submit", addNewUser);

// onChildRemoved(myRef, (userSnapshot) => {
//   const liToRemove = document.getElementById(userSnapshot.key);
//   ol.removeChild(liToRemove);
// });

//APLIKACJA 2 - do poprawy, bo nie działa dodanie buttona do li
// const fileName = document.querySelector(".fileName");
// const txtArea = document.querySelector(".docTxt");
// const addBtn = document.querySelector(".addDoc");
// const ol = document.querySelector("ol");
// const myRef = rtRef(rtdb, "docs");

// const addNewDoc = (event) => {
//   event.preventDefault();

//   const docRef = push(myRef);
//   set(docRef, {
//     name: `${fileName.value}`,
//     text: `${txtArea.value}`,
//   });
// };

// onChildAdded(myRef, (docSnapshot) => {
//   const docItem = docSnapshot.val();
//   const li = document.createElement("li");
//   const btn = document.createElement("button");

//   btn.textContent = "Edytuj";

//   console.log(btn);
//   li.id = docSnapshot.key;
//   li.appendChild(btn);
//   li.textContent = docItem.name;
//   ol.appendChild(li);

//   btn.addEventListener("click", addText);
// });

// const addText = (event) => {
//   const docId = event.target.parentNode.id;
//   console.log(docId);
// };

// addBtn.addEventListener("click", addNewDoc);

// https://github.com/sroszyk/sda-firebase-17 - link do gita

// ---------------------------------------------
// FIREBASE 15.01.2023

// APLIKACJA 1
// const name = document.querySelector(".name");
// const surname = document.querySelector(".surname");
// const color = document.querySelector(".color");
// const userSelect = document.querySelector(".chooseUser");
// const userChoose = document.querySelector(".user-choose");
// const messageContent = document.querySelector(".messageContent");
// const divMessageForm = document.querySelector(".message-form");
// const divMessages = document.querySelector(".messages");
// const btnAddUser = document.querySelector(".addUser");
// const btnAddMessage = document.querySelector(".addMessage");
// const myRef = rtRef(rtdb, "users");
// const messageRef = rtRef(rtdb, "messages");

// const addNewUser = () => {
//   const userRef = push(myRef);

//   set(userRef, {
//     name: name.value,
//     surname: surname.value,
//     color: color.value,
//   }).then((result) => {
//     name.value = "";
//     surname.value = "";
//     color.value = "";
//   });
// };

// const refreshUserSelect = () => {
//   onChildAdded(myRef, (userSnapshot) => {
//     const user = userSnapshot.val();
//     const option = document.createElement("option");

//     option.textContent = `${user.name} ${user.surname}`;
//     option.value = JSON.stringify(user);
//     userSelect.appendChild(option);
//   });
// };

// let selectedUser;

// const showCurrentUser = (event) => {
//   const h1 = document.querySelector("h1");

//   if (userSelect.value) {
//     const user = JSON.parse(userSelect.value);
//     h1.textContent = `current user: ${user.name} ${user.surname}`;
//     h1.style.color = user.color;

//     userChoose.appendChild(h1);
//     selectedUser = user;
//     divMessageForm.style.display = "flex";
//   } else {
//     h1.textContent = "";
//     selectedUser = undefined;
//     divMessageForm.style.display = "none";
//   }
// };

// const addMessage = () => {
//   const message = push(messageRef);

//   if (selectedUser) {
//     set(message, {
//       name: selectedUser.name,
//       surname: selectedUser.surname,
//       datetime: new Date().toISOString(),
//       content: messageContent.value,
//       userColor: selectedUser.color,
//     }).then(() => {
//       messageContent.value = "";
//     });
//   }
// };

// const showMessages = () => {
//   onChildAdded(messageRef, (messageSnapshot) => {
//     const message = messageSnapshot.val();

//     const div = document.createElement("div");
//     const spanAuthor = document.createElement("span");
//     const dateSpan = document.createElement("span");
//     const contentSpan = document.createElement("span");

//     spanAuthor.textContent = `${message.name} ${message.surname}`;
//     dateSpan.textContent = message.date;
//     contentSpan.textContent = message.content;

//     contentSpan.style.color = message.userColor;
//     div.style.margin = "30px";

//     div.appendChild(spanAuthor);
//     div.appendChild(dateSpan);
//     div.appendChild(contentSpan);
//     divMessages.appendChild(div);
//   });
// };

// showMessages();
// refreshUserSelect();
// btnAddUser.addEventListener("click", addNewUser);
// userSelect.addEventListener("change", showCurrentUser);
// btnAddMessage.addEventListener("click", addMessage);

// ---------------------------------------------------------
// FIREBASE AUTHENTICATION
import {
  getAuth,
  EmailAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import * as firebaseui from "firebaseui";

const auth = getAuth(app); //referencja do serwisu auth
const ui = new firebaseui.auth.AuthUI(auth); //utworzenie obiektu komponentu HTML reprezentującego nasz serwis
ui.start("#firebaseui-auth-container", {
  //inicjalizacja wyświetlenia komponentu w htmlu
  signInOptions: [
    EmailAuthProvider.PROVIDER_ID,
    GoogleAuthProvider.PROVIDER_ID,
  ],
  signInSuccessUrl: "http://localhost:8080/",
});

const btnLogOut = document.createElement("button");
const p1 = document.createElement("p");
const inputFile = document.createElement("input");
const btnAddImage = document.createElement("button");
const profilePhoto = document.createElement("img");
const inputColor = document.createElement("input");
const addColor = document.createElement("button");

inputFile.setAttribute("type", "file");
btnAddImage.textContent = "Dodaj zdjęcie";
inputColor.setAttribute("type", "color");

onAuthStateChanged(auth, (user) => {
  if (user) {
    p1.textContent = `user name: ${user.displayName}`;
    btnLogOut.textContent = "Wyloguj";
    addColor.textContent = "Dodaj kolor";
    profilePhoto.src = auth.currentUser.photoURL;

    document.body.appendChild(p1);
    document.body.appendChild(profilePhoto);
    document.body.appendChild(btnLogOut);

    document.body.appendChild(inputFile);
    document.body.appendChild(btnAddImage);

    document.body.appendChild(inputColor);
    document.body.appendChild(addColor);
  } else {
    p1.style.display = "none";
    profilePhoto.style.display = "none";
    btnLogOut.style.display = "none";
    inputFile.style.display = "none";
    btnAddImage.style.display = "none";
  }
});

const addProfileImage = () => {
  const storageRef = ref(storage, `${auth.currentUser.uid}/profilePhoto.jpg`);
  uploadBytes(storageRef, inputFile.files[0]).then((result) => {
    getDownloadURL(storageRef).then((url) => {
      updateProfile(auth.currentUser, {
        photoURL: url,
      });
    });
  });
};

const addProfileColor = () => {
  const myRef = doc(db, `users/${auth.currentUser.uid}`);

  setDoc(myRef, {
    color: inputColor.value,
  });
};

btnLogOut.addEventListener("click", () => {
  signOut(auth);
});

btnAddImage.addEventListener("click", addProfileImage);
addColor.addEventListener("click", addProfileColor);
