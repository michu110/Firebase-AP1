import "./../styles/styles.css";
import { initializeApp } from "firebase/app";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPAYNuUeFxjJM48wu8osVulhxXEqEXnc8",

  authDomain: "fir-zadania.firebaseapp.com",

  projectId: "fir-zadania",

  storageBucket: "fir-zadania.appspot.com",

  messagingSenderId: "431532735875",

  appId: "1:431532735875:web:ccd23f41f353c8d6b08ab6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// const myImageRef = ref(storage, "WIN_20221014_20_46_12_Pro.jpg");

// const img = document.createElement("img");
// img.src = `https://firebasestorage.googleapis.com/v0/b/${myImageRef.bucket}/o/${myImageRef.fullPath}?alt=media`;
// document.body.appendChild(img);

// document.getElementById("myBtn").addEventListener("click", () => {
//   const myInput = document.getElementById("myFile");
//   console.log(myInput);
//   const file = myInput.files[0];
//   const myImg2Ref = ref(storage, "chuj");
//   uploadBytes(myImg2Ref, file);
// });

// const myInput2 = document.querySelector("#myFile");

// // IKONKA
// myInput2.addEventListener("change", function () {
//   const file = myInput2.files[0];
//   const icon = document.getElementById("thumbnail");

//   const fileReader = new FileReader();
//   fileReader.readAsDataURL(file); //wywołanie tej metody powoduje pojawienie się we właściwości result obiektu fileReader adresu url

//   fileReader.onloadend = function () {
//     icon.src = fileReader.result;
//     console.log(fileReader.result);
//   };
// });

// ZADANIE 1 i 2
// document.getElementById("myBtn").addEventListener("submit", () => {
//   const myInput = document.getElementById("myFile");
//   const file = myInput.files[0];
//   console.log("działam");
//   const fileName = document.getElementById("fileName");
//   let myFileRef = null;

//   if (fileName.value) {
//     myFileRef = ref(storage, fileName.value);
//   } else {
//     myFileRef = ref(storage, file.name);
//   }

//   const span = document.querySelector("span");
//   span.textContent = "przesyłanie pliku";

//   uploadBytes(myFileRef, file).then(() => {
//     span.textContent = "przesyłanie zakończone sukcesem";
//   });
// });

// 18_12_2022
// POBRANIE OBRAZKA
// getDownloadURL()

//ZAD 4 - LISTOWANIE ZAWARTOŚCI STORAGE
// const storageRef = ref(storage);
// listAll(storageRef).then((result) => {
//   const ol = document.createElement("ol");
//   document.body.appendChild(ol);

//   result.items.forEach((item) => {
//     const li = document.createElement("li");
//     li.textContent = item.fullPath;
//     console.log(item);
//     ol.appendChild(li);
//   });
// });

// ZAD - asynchroniczność z wykorzystaniem "then"
// const storageRef = ref(storage);
// listAll(storageRef).then((result) => {
//   result.items.forEach((item) => {
//     getDownloadURL(item).then((url) => {
//       const div = document.createElement("div");
//       const h3 = document.createElement("h3");
//       const img = document.createElement("img");
//       const btn = document.createElement("button");
//       img.src = url;
//       h3.textContent = item.fullPath;
//       btn.textContent = "Usuń";

//       btn.addEventListener("click", (event) => {
//         deleteObject(item).then(() => {
//           //usuwanie pliku ze storage
//           document.body.removeChild(div);
//         });
//       });

//       div.appendChild(img);
//       div.appendChild(h3);
//       div.appendChild(btn);
//       document.body.appendChild(div);
//     });
//   });
// });

// ZAD - asynchroniczność z wykorzystaniem funkcji asynchronicznej
// async function loadImages() {
//   const storageRef = ref(storage);
//   const result = await listAll(storageRef);

//   result.items.forEach(async (item) => {
//     const url = await getDownloadURL(item);
//     const div = document.createElement("div");
//     const h3 = document.createElement("h3");
//     const img = document.createElement("img");
//     const btn = document.createElement("button");
//     img.src = url;
//     h3.textContent = item.fullPath;
//     btn.textContent = "Usuń";

//     btn.addEventListener("click", async () => {
//       await deleteObject(item);
//       document.body.removeChild(div);
//     });

//     div.appendChild(img);
//     div.appendChild(h3);
//     div.appendChild(btn);
//     document.body.appendChild(div);
//   });
// }

// loadImages();

// ----------------------------------------------------------------------
// FIRESTORE - BAZA DANYCH
import {
  doc,
  getFirestore,
  setDoc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore"; //import funkcji z pakietu firebase/firestore
const db = getFirestore(app); //pobranie referencji do całej bazy danych firestore

// DODAWANIE DANYCH DO BAZY
// const mpDoc = doc(db, "users", "IdMichałaPudełko"); //stworzenie dokumentu i pobranie do niego referencji
// setDoc(mpDoc, {
//   //dodanie do bazy dokumentu
//   name: "Michał",
//   surname: "Pudełko",
// });

// // ZADANIE 1 - dodawanie danych
// const inpName = document.querySelector("#name");
// const inpSurName = document.querySelector("#surname");
// const inpAge = document.querySelector("#age");

// document.querySelector("#add").addEventListener("click", () => {
//   const newDoc = doc(db, "users", `${inpName.value}${inpSurName.value}`);

//   setDoc(
//     newDoc,
//     {
//       name: `${inpName.value}`,
//       surname: `${inpSurName.value}`,
//       age: `${inpAge.value}`,
//     },
//     {
//       merge: true, //pozwala na aktualizację danych, nie usuwa danych w istniejącym pliku, lecz je aktualizujemy
//     }
//   );
// });

// POBIERANIE DANYCH
// const Doc1 = doc(db, "users", "IdMichałaPudełko");
// getDoc(Doc1).then((doc) => {
//   console.log(doc); //wyświetlenie zawartości pobranego pliku
// });

// ZADANIE 2 - pobieranie danych
// const inName = document.querySelector("#name");
// const inSurName = document.querySelector("#surname");
// const inAge = document.querySelector("#age");
// const btn = document.querySelector("#add");

// const doc2 = doc(db, "users", "IdMichałaPudełko");
// getDoc(doc2).then((doc) => {
//   inName.value = doc.data().name; //przypisanie danych do pola
//   inSurName.value = doc.data().surname;
//   inAge.value = doc.data().age;

//   btn.addEventListener("click", () => {
//     setDoc(
//       doc2,
//       {
//         name: `${inName.value}`,
//         surname: `${inSurName.value}`,
//         age: `${inAge.value}`,
//       },
//       {
//         merge: true,
//       }
//     );
//   });
// });

// DODAWANIE DANYCH - METODA addDoc() powoduje, że to Firestore nadaje dokumentowi ID, w sposób automatyczny, tak, aby każdy dokument miał unikatowe ID
// ZADANIE 2 z wykorzystaniem metody addDoc()
// ZADANIE 2 - pobieranie danych
// const inName = document.querySelector("#name");
// const inSurName = document.querySelector("#surname");
// const inAge = document.querySelector("#age");
// const btn = document.querySelector("#add");

// const doc2 = doc(db, "users", "IdMichałaPudełko");
// getDoc(doc2).then((doc) => {
//   inName.value = doc.data().name; //przypisanie danych do pola
//   inSurName.value = doc.data().surname;
//   inAge.value = doc.data().age;

//   btn.addEventListener("click", () => {
//     const userCollection = collection(db, "users");
//     addDoc(userCollection, {
//       name: `${inName.value}`,
//       surname: `${inSurName.value}`,
//       age: `${inAge.value}`,
//     });
//   });
// });

// AKTUALIZACJA DANYCH - metoda updateDoc()

// POBRANIE WSZYSTKICH DOKUMENTÓW W KOLEKCJI
// metoda getDocs() pobiera wszystkie dokumenty z danej kolekcji i zwraca kolekcję tych dokumentów

// const userCollection = collection(db, "users");
// getDocs(userCollection).then((docs) => {
//   console.log(docs);
// });

// ZADANIE 3 - pobranie wszystkich plików i wyświetlenie nazw użytkownika w liście numerowanej
// const userCollection = collection(db, "users");
// getDocs(userCollection).then((docs) => {
//   const ol = document.createElement("ol");
//   docs.forEach((doc) => {
//     const li = document.createElement("li");
//     li.textContent = `${doc.data().name} ${doc.data().surname}`;
//     ol.appendChild(li);
//   });

//   document.body.appendChild(ol);
// });

// ZAPYTANIA DO BAZY
// metoda query()
// ZADANIE 5
// const input = document.createElement("input");
// const btn = document.createElement("button");
// btn.textContent = "Szukaj";

// document.body.appendChild(input);
// document.body.appendChild(btn);

// btn.addEventListener("click", () => {
//   const userCollection = collection(db, "users");
//   const user = query(userCollection, where("name", "==", `${input.value}`));
//   const ol = document.createElement("ol");

//   getDocs(user).then((docs) => {
//     docs.forEach((doc) => {
//       const li = document.createElement("li");
//       li.textContent = `${doc.data().name} ${doc.data().surname}`;
//       ol.appendChild(li);
//     });

//     document.body.appendChild(ol);
//   });
// });

// ZADANIE 6
// const inpName = document.querySelector("#name");
// const inpSurname = document.querySelector("#surname");
// const select = document.querySelector("#dep");
// const btn = document.querySelector("#add");
// const ol = document.querySelector("#deps-list");

// const refreshDepartments = (depCollection) => {
//   const spanNodes = document.querySelectorAll("span");
//   const deps = [];
//   deps[0] = query(depCollection, where("department", "==", "IT"));
//   deps[1] = query(depCollection, where("department", "==", "HR"));
//   deps[2] = query(depCollection, where("department", "==", "FINANCE"));

//   deps.forEach((dep, i) => {
//     getDocs(dep).then((docs) => {
//       spanNodes[i].textContent = docs.size;
//     });
//   });
// };

// const addNewEmployee = (event) => {
//   event.preventDefault(); //zatrzymnie odświeżania strony po submicie
//   const depCollection = collection(db, "departments");
//   console.log(inpName.value);
//   console.log(inpSurname.value);
//   console.log(select.value);
//   addDoc(depCollection, {
//     name: `${inpName.value}`,
//     surname: `${inpSurname.value}`,
//     department: `${select.value}`,
//   })
//     .then(() => {
//       inpName.value = "";
//       inpSurname.value = "";
//       select.value = "";

//       refreshDepartments(depCollection);
//     })
//     .catch(() => {
//       console.log("zjebało się na amen");
//     });
// };

// btn.addEventListener("click", addNewEmployee);
