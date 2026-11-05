/* ===== EDIT HERE: shop details and products ===== */
const CONFIG = {
  wa: "254745158038",            // WhatsApp number, international format
  phoneDisplay: "0745 158 038",
  tiktok: "https://www.tiktok.com/@mtsinaifurniture"
};
// image: put photos in the images/ folder. If a file is missing, a wood-colour tile shows instead.
const PRODUCTS = [
  {id:1,name:"8-Seater Mahogany Dining Set",cat:"Dining Sets",price:120000,icon:"🍽️",image:"https://images.unsplash.com/photo-1617802690992-15d93263d3a9?auto=format&fit=crop&w=1000&q=85",desc:"Live-edge mahogany table with 8 carved, cushioned chairs.",dim:"Table 8 ft x 3.5 ft"},
  {id:2,name:"6-Seater Dining Set",cat:"Dining Sets",price:85000,icon:"🍽️",image:"https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85",desc:"Polished mahogany table with 6 padded chairs.",dim:"Table 6 ft x 3 ft"},
  {id:3,name:"Carved Mahogany Bed 5x6",cat:"Beds",price:65000,icon:"🛏️",image:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=85",desc:"Hand-carved headboard and footboard, solid mahogany frame.",dim:"5 ft x 6 ft"},
  {id:4,name:"Carved Mahogany Bed 4x6",cat:"Beds",price:52000,icon:"🛏️",image:"https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85",desc:"Carved panels with a deep varnish finish.",dim:"4 ft x 6 ft"},
  {id:5,name:"Round Coffee Table with 4 Stools",cat:"Coffee Tables",price:45000,icon:"☕",image:"https://images.unsplash.com/photo-1499933374294-4584851497cc?auto=format&fit=crop&w=1000&q=85",desc:"Round mahogany top with four fan-shaped stools that tuck underneath.",dim:"Top 80 cm wide"},
  {id:6,name:"Mahogany Nest Coffee Table",cat:"Coffee Tables",price:28000,icon:"☕",image:"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=85",desc:"Oval top with a cross-leg base.",dim:"90 cm x 60 cm"},
  {id:7,name:"5-Seater Blue Sofa Set",cat:"Sofa Sets",price:130000,icon:"🛋️",image:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=85",desc:"Soft blue fabric with polished mahogany trim (3+1+1).",dim:"3-seater 210 cm"},
  {id:8,name:"7-Seater Grey Sofa Set",cat:"Sofa Sets",price:140000,icon:"🛋️",image:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85",desc:"Grey chenille with mahogany arm rails (3+2+1+1).",dim:"3-seater 210 cm"},
  {id:9,name:"Orange Modern Sofa",cat:"Sofa Sets",price:150000,icon:"🛋️",image:"https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=85",desc:"New design: tufted corner sofa in bold orange.",dim:"L-shape, 3 m side"},
  {id:10,name:"Mahogany Timber (per foot)",cat:"Timber",price:350,icon:"🪵",image:"https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1000&q=85",desc:"Seasoned mahogany timber. Ask for sizes and bulk prices.",dim:"Various"},
  {id:11,name:"Mahogany Wardrobe",cat:"Beds",price:70000,icon:"🚪",image:"https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=85",desc:"Carved doors, 3-door solid mahogany wardrobe.",dim:"6 ft x 2 ft"},
  {id:12,name:"Dining Chairs (set of 4)",cat:"Dining Sets",price:24000,icon:"🪑",image:"https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1000&q=85",desc:"Carved back, upholstered seat, studded trim.",dim:"Seat height 45 cm"}
];
/* Prices above are samples. Replace with the shop's real prices. */

const $ = s => document.querySelector(s), fmt = n => "KES " + n.toLocaleString();
const load = k => { try { return JSON.parse(localStorage.getItem(k)) || [] } catch { return [] } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch {} };
let cart = load("sinai_cart"), wish = load("sinai_wish"), cat = "All";
const wa = text => `https://wa.me/${CONFIG.wa}?text=${encodeURIComponent(text)}`;
const byId = id => PRODUCTS.find(p => p.id === id);
const tile = p => `<img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.remove()">`;

function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove("show"),1800)}

/* links */
document.querySelectorAll("[data-wa]").forEach(a=>{a.href=wa("Hello MT SINAI Furniture, I would like to ask about your furniture.");a.target="_blank";a.rel="noopener"});
document.querySelectorAll("[data-tiktok]").forEach(a=>a.href=CONFIG.tiktok);
document.querySelectorAll("[data-tel]").forEach(a=>{a.href="tel:+"+CONFIG.wa;a.textContent="Call or WhatsApp: "+CONFIG.phoneDisplay});
$("#yr").textContent=new Date().getFullYear();

/* categories + products */
function renderCats(){
  const cats=["All",...new Set(PRODUCTS.map(p=>p.cat))];
  $("#cats").innerHTML=cats.map(c=>`<button class="${c===cat?"on":""}" data-cat="${c}">${c}</button>`).join("");
}
function renderGrid(){
  const q=$("#search").value.trim().toLowerCase(), s=$("#sort").value;
  let list=PRODUCTS.filter(p=>(cat==="All"||p.cat===cat)&&(p.name+p.cat+p.desc).toLowerCase().includes(q));
  if(s)list.sort((a,b)=>s==="asc"?a.price-b.price:b.price-a.price);
  $("#none").hidden=list.length>0;
  $("#grid").innerHTML=list.map(p=>`<article class="pc"><div class="pimg" data-view="${p.id}">${tile(p)}<button class="heart" data-wish="${p.id}" aria-label="Save to wishlist">${wish.includes(p.id)?"❤️":"🤍"}</button></div>
  <div class="pb"><h3>${p.name}</h3><p class="muted">${p.desc}</p><div class="price">${fmt(p.price)}</div>
  <div class="row"><button class="btn brown" data-add="${p.id}">Add to cart</button><a class="btn wa" target="_blank" rel="noopener" href="${wa(`Hello MT SINAI Furniture, I am interested in: ${p.name} (${fmt(p.price)}). Is it available?`)}">Ask on WhatsApp</a></div></div></article>`).join("");
}

/* cart */
const count=()=>cart.reduce((n,i)=>n+i.q,0), total=()=>cart.reduce((n,i)=>n+byId(i.id).price*i.q,0);
function renderCart(){
  $("#cartCount").textContent=count();
  save("sinai_cart",cart);
  $("#items").innerHTML=cart.length?cart.map(i=>{const p=byId(i.id);return `<div class="ci"><div class="t">${tile(p).replace(/<span>.*?<\/span>/,"")}</div><div><b>${p.name}</b><div class="muted">${fmt(p.price)}</div><div class="qty"><button data-dec="${p.id}" aria-label="Less">−</button>${i.q}<button data-inc="${p.id}" aria-label="More">+</button></div></div><button class="rm" data-rm="${p.id}" aria-label="Remove">✕</button></div>`}).join("")
   :`<p class="muted">Your cart is empty. Add a piece you like and it will show here.</p><button class="btn brown" data-close>Continue shopping</button>`;
  $("#checkout").hidden=!cart.length;$("#total").textContent=fmt(total());
}
function add(id){const i=cart.find(x=>x.id===id);i?i.q++:cart.push({id,q:1});renderCart();toast("Added to cart")}
function openCart(o=true){$("#drawer").classList.toggle("open",o);$("#drawer").setAttribute("aria-hidden",!o);$("#scrim").hidden=!o}

/* quick view */
function view(id){const p=byId(id);$("#mbox").innerHTML=`<div class="pimg">${tile(p)}</div><div class="pb"><h3>${p.name}</h3><div class="price">${fmt(p.price)}</div><p>${p.desc}</p><p class="muted">Size: ${p.dim}<br>Wood: solid mahogany<br>Category: ${p.cat}</p><div class="row"><button class="btn brown" data-add="${p.id}" data-close-modal>Add to cart</button><button class="btn ghost" style="color:var(--ink);border-color:var(--ink)" data-close-modal>Close</button></div></div>`;$("#modal").hidden=false}

/* events */
document.addEventListener("click",e=>{
  const t=e.target.closest("button,[data-view]");if(!t)return;const d=t.dataset;
  if(d.cat){cat=d.cat;renderCats();renderGrid();if(!e.target.closest("#grid"))$("#shop").scrollIntoView()}
  else if(d.wish){e.stopPropagation();const id=+d.wish;wish=wish.includes(id)?wish.filter(x=>x!==id):[...wish,id];save("sinai_wish",wish);renderGrid();toast(wish.includes(id)?"Saved to wishlist":"Removed from wishlist")}
  else if(d.add)add(+d.add);
  else if(d.view)view(+d.view);
  else if(d.inc){cart.find(i=>i.id==d.inc).q++;renderCart()}
  else if(d.dec){const i=cart.find(i=>i.id==d.dec);if(--i.q<1)cart=cart.filter(x=>x!==i);renderCart()}
  else if(d.rm){cart=cart.filter(i=>i.id!=d.rm);renderCart()}
  else if("close" in d){openCart(false);$("#shop").scrollIntoView()}
  if("closeModal" in d)$("#modal").hidden=true;
});
$("#cartBtn").onclick=()=>openCart();$("#closeCart").onclick=$("#scrim").onclick=()=>openCart(false);
$("#modal").onclick=e=>{if(e.target.id==="modal")$("#modal").hidden=true};
document.addEventListener("keydown",e=>{if(e.key==="Escape"){$("#modal").hidden=true;openCart(false)}});
$("#burger").onclick=()=>$("#menu").classList.toggle("open");
$("#menu").onclick=()=>$("#menu").classList.remove("open");
$("#search").oninput=renderGrid;$("#sort").onchange=renderGrid;

/* WhatsApp checkout */
$("#checkout").addEventListener("submit",e=>{
  e.preventDefault();
  const name=$("#fName").value.trim(),phone=$("#fPhone").value.replace(/[\s-]/g,""),loc=$("#fLoc").value.trim(),notes=$("#fNotes").value.trim(),err=$("#err");
  if(name.length<2)return err.textContent="Enter your full name.";
  if(!/^(\+?254|0)?[17]\d{8}$/.test(phone))return err.textContent="Enter a valid Kenyan phone number, like 0712 345 678.";
  if(loc.length<3)return err.textContent="Enter your delivery location or area.";
  err.textContent="";
  const lines=cart.map((i,n)=>{const p=byId(i.id);return `${n+1}. ${p.name} x${i.q} - ${fmt(p.price*i.q)}`}).join("\n");
  const msg=`Hello MT SINAI Furniture, I would like to place an order.\nName: ${name}\nPhone: ${phone}\nLocation: ${loc}\nItems:\n${lines}\nTotal: ${fmt(total())}${notes?"\nNotes: "+notes:""}`;
  window.open(wa(msg),"_blank","noopener");
});
$("#customForm").addEventListener("submit",e=>{
  e.preventDefault();
  const msg=`Hello MT SINAI Furniture, I would like a custom order.\nType: ${$("#cType").value}\nSize: ${$("#cSize").value||"Not sure yet"}\nDetails: ${$("#cNotes").value||"-"}`;
  window.open(wa(msg),"_blank","noopener");
});

renderCats();renderGrid();renderCart();
