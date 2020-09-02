const firebaseConfig = {
    apiKey: "AIzaSyB0I1cWl0fh_xozLfeoCmt8-lEQRKmqARo",
    authDomain: "store-a25b6.firebaseapp.com",
    databaseURL: "https://store-a25b6.firebaseio.com",
    projectId: "store-a25b6",
    storageBucket: "store-a25b6.appspot.com",
    messagingSenderId: "253113168071",
    appId: "1:253113168071:web:e620962b3e90d273ad0ee2",
    measurementId: "G-MNNKD98KV2"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.firestore();


var citiesRef = db.collection("cities");

citiesRef.doc("SF").set({
    name: "San Francisco", state: "CA", country: "USA",
    capital: false, population: 860000,
    regions: ["west_coast", "norcal"] });
citiesRef.doc("LA").set({
    name: "Los Angeles", state: "CA", country: "USA",
    capital: false, population: 3900000,
    regions: ["west_coast", "socal"] });
citiesRef.doc("DC").set({
    name: "Washington, D.C.", state: null, country: "USA",
    capital: true, population: 680000,
    regions: ["east_coast"] });
citiesRef.doc("TOK").set({
    name: "Tokyo", state: null, country: "Japan",
    capital: true, population: 9000000,
    regions: ["kanto", "honshu"] });
citiesRef.doc("BJ").set({
    name: "Beijing", state: null, country: "China",
    capital: true, population: 21500000,
    regions: ["jingjinji", "hebei"] });

var goodsRef = db.collection("goods");



goodsRef.doc("te").set({
    name: "うま茶",
    category: ["飲み物"],
    price: 140,
    stock: 20,
    image: "images/petbottle_tea.png"
})
goodsRef.doc("wa").set({
    name: "森の天然水",
    category: ["飲み物"],
    price: 98,
    stock: 40,
    image: "images/bottle_water.png"
})
goodsRef.doc("mm").set({
    name: "モーモー牛乳",
    category: ["飲み物"],
    price: 210,
    stock: 5,
    image: "images/drink_milk_pack.png"
})
goodsRef.doc("so").set({
    name: "鮭おにぎり",
    category: ["食べ物", "おにぎり"],
    price: 150,
    stock: 10,
    image: "images/onigiri_sake.png"
})
goodsRef.doc("io").set({
    name: "いくらおにぎり",
    category: ["食べ物", "おにぎり"],
    price: 110,
    stock: 7,
    image: "images/onigiri_ikura.png"
})
goodsRef.doc("ko").set({
    name: "昆布おにぎり",
    category: ["食べ物", "おにぎり"],
    price: 120,
    stock: 18,
    image: "images/onigiri_konbu.png"
})
goodsRef.doc("mo").set({
    name: "めんたいおにぎり",
    category: ["食べ物", "おにぎり"],
    price: 150,
    stock: 13,
    image: "images/onigiri_mentaiko.png"
})



var docRef = db.collection("cities").doc("SF");
var data = "";

// docRef.get().then(function(doc) {
//   if (doc.exists) {
//     console.log("document Data:", doc.data());
//     data = doc.data();
//     console.log(data);
//     console.log(data.name);
//   } else {
//      console.log("no such document");
//   }

// }).catch(function(error) {
//   console.log("Error getting document:", error);
// })

goodsRef.get().then(function(doc) {
    if (doc.exists) {
        console.log(doc.data());
    } else {
        console.log("no such document");
    }
})


function category(category) {
    goodsRef.where("category", "array-contains", category).get().then(function (querrySnapshot) {
        getGoods(querrySnapshot);
    })
}

window.onload = function () {
    goodsRef.get().then(function (querrySnapshot) {
        getGoods(querrySnapshot);
    })
}

function getGoods(querrySnapshot) {

    $('#goods').empty();
    querrySnapshot.forEach(function (doc) {
        var h = "";
        doc.data().category.forEach(function (category) {
            h += `<span class="badge badge-primary">${category}</span>
            `;
        })
        var g = `
                <div class="col-lg-3">
                    <div class="card">
                        <img class="card-img-top" src="${doc.data().image}">
                        <div class="card-body">
                            ${h}
                            <h4 class="card-title">${doc.data().name}</h4>
                            <p class="card-text price">¥${doc.data().price}-</p>
                            <p class="card-text stock">残り${doc.data().stock}個</p>
                        </div>
                    </div>
                </div>`;
        $('#goods').append(g);
    })
}

