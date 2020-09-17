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
goodsRef.doc("mp").set({
    name: "メロンパン",
    category: ["食べ物","パン"],
    price: 128,
    stock: 4,
    image: "images/pan_melonpan.png"
})
goodsRef.doc("sp").set({
    name: "食パン",
    category: ["食べ物", "パン"],
    price: 160,
    stock: 3,
    image: "images/pan_bread_1kin_yama.png"
})
goodsRef.doc("ap").set({
    name: "あんぱん",
    category: ["食べ物", "パン"],
    price: 128,
    stock: 5,
    image: "images/food_anpan.png"
})

// goodsRef.doc("").set({
//     name: "",
//     category: [""],
//     price: ,
//     stock: ,
//     image: ""
// })

function searchByText() {
    const text = $('#searchBox').val();
    console.log(text);
    goodsRef.where("name", "==", text).get().then(function (querrySnapshot) {
        getGoods(querrySnapshot);
    })
}

function category(category) {
    goodsRef.where("category", "array-contains", category).get().then(function (querrySnapshot) {
        getGoods(querrySnapshot);
    })
    $('#dropdown1-text').html(category);
}

function sort(text, sortType, order) {
    goodsRef.orderBy(sortType, order).get().then(function (querrySnapshot) {
        getGoods(querrySnapshot);
    })
    $('#dropdown2-text').html(text);
}

window.onload = function () {
    goodsRef.get().then(function (querrySnapshot) {
        getGoods(querrySnapshot);
    })
}

function getGoods(querrySnapshot) {
    $('#goods').empty();
    querrySnapshot.forEach(function (doc) {
        console.log(doc.id)
        var h = "";
        doc.data().category.forEach(function (category) {
            h += `<span class="badge badge-info">${category}</span>
        `;
        })
        var g = `
            <div class="col-lg-4 col-sm-6">
                <div class="card">
                    <div class="goods-image-wrapper">
                        <img class="card-img-top" src="${doc.data().image}">
                    </div>
                    
                    <div class="card-body">
                        ${h}
                        <h4 class="card-title">${doc.data().name}</h4>
                        <p class="card-text price">¥${doc.data().price}-</p>
                        <p class="card-text stock">残り${doc.data().stock}個</p>
                        <button type="button" class="btn btn-primary id="${doc.id}" btn-block onclick="addCart(this.id);">カートに追加</button>
                    </div>
                </div>
            </div>`;
        $('#goods').append(g);
    })
}

function addCart(element) {
    console.log(element)
}