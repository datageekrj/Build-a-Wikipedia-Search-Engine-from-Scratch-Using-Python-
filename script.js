// let currentQuery = "";
// let debouceTimeout = null;;''

// document.getElementById("searchQuery").addEventListener("keyup", function() {
//     clearTimeout(debouceTimeout);

//     debouceTimeout = setTimeout(() => {
//         currentQuery = this.value;
//         document.getElementById("resultList").innerHTML = "";
//         load();
//     }, 300)
// })

// function load(){
//     if (currentQuery.trim() === ""){
//         document.getElementById("resultList").innerHTML = "";
//         return ;
//     }

//     fetch(`/search?query=${encodeURIComponent(currentQuery)}`)
//         .then(res => res.json())
//         .then(data => {
//             const list = document.getElementById("resultList");
//             data.results.forEach((item, index) => {
                
//                 const col = document.createElement("div");
//                 col.className = "col-6";

//                 col.innerHTML = `
//                         <div class="card">
//                             <div class="card-body">
//                                 This is some text within a card body.
//                             </div>
//                         </div>
//                 `
//                 list.appendChild(col);
//             })
//         })
// }

let currentQuery = '';
let currentOffset = 0;
let debounceTimeout = null;

document.getElementById('searchQuery').addEventListener('keyup', function() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        currentQuery = this.value;
        currentOffset = 0;
        document.getElementById('resultsList').innerHTML = '';
        loadMore();
    }, 300); // debounce delay
});

function loadMore() {
    if (currentQuery.trim() === '') {
        document.getElementById('resultsList').innerHTML = '';
        document.getElementById('showMoreBtn').style.display = 'none';
        return;
    }

    fetch(`/search?query=${encodeURIComponent(currentQuery)}&offset=${currentOffset}`)
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById('resultsList');
            data.results.forEach((item, idx) => {
    const col = document.createElement('div');
    col.className = 'col-12';

    col.innerHTML = `
        <a href="#" class="text-decoration-none">
            <div class="card shadow-sm border-0">
                <div class="card-body">
                    <h5 class="card-title">${item.split(':')[0]}</h5>
                    <p class="card-text">${item.slice(item.indexOf(':') + 1).trim()}</p>
                </div>
            </div>
        </a>
    `;

    list.appendChild(col);
});
            currentOffset += data.results.length;
            document.getElementById('showMoreBtn').style.display = data.has_more ? 'inline' : 'none';
        });
}