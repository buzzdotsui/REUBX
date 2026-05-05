// Generate product data for Reubx World
const fs = require('fs');

const sneakers = [
  ['Nike Air Force 1 Low White','Classic all-white leather AF1.',45000,'Exclusive','white+nike+airforce+sneaker'],
  ['Nike Air Force 1 Black','Triple black leather Air Force 1.',46000,'Hot','black+nike+airforce+shoe'],
  ['Nike Air Max 90 White','Iconic visible Air unit runner.',52000,'','white+nike+airmax+sneaker'],
  ['Nike Air Max 95 Neon','Gradient neon side panels.',58000,'Hot','neon+nike+running+shoe'],
  ['Nike Air Max 97 Silver Bullet','Full-length Air unit, silver.',62000,'','silver+nike+sneaker+shoe'],
  ['Nike Air Max 270 Black','Large heel Air unit, all-day comfort.',55000,'New','black+nike+airmax+270'],
  ['Nike Dunk Low Panda','Black and white colorway.',48000,'Exclusive','black+white+nike+dunk'],
  ['Nike Dunk Low Grey Fog','Neutral grey leather upper.',47000,'','grey+nike+dunk+sneaker'],
  ['Nike Dunk High Black','High-top basketball silhouette.',50000,'','high+top+nike+sneaker'],
  ['Air Jordan 1 Retro High','OG high-top basketball legend.',95000,'Exclusive','jordan+1+retro+sneaker'],
  ['Air Jordan 4 Retro White','Mesh and leather classic.',88000,'Hot','jordan+4+white+sneaker'],
  ['Air Jordan 11 Concord','Patent leather and mesh upper.',110000,'Exclusive','jordan+11+sneaker+shoe'],
  ['Air Jordan 1 Low White','Low-cut everyday Jordan.',65000,'New','jordan+low+white+sneaker'],
  ['Adidas Yeezy Boost 350 V2','Primeknit upper, Boost sole.',85000,'Exclusive','yeezy+boost+350+sneaker'],
  ['Adidas Samba OG White','Classic indoor soccer shoe.',42000,'Hot','adidas+samba+white+shoe'],
  ['Adidas Gazelle Black','Suede upper retro trainer.',38000,'','adidas+gazelle+black+shoe'],
  ['Adidas Superstar Shell Toe','Leather shell-toe sneaker.',35000,'','adidas+superstar+shell+sneaker'],
  ['Adidas Stan Smith Green','Iconic tennis-inspired classic.',32000,'','adidas+stan+smith+green'],
  ['Adidas Ultraboost 22','Responsive Boost midsole runner.',72000,'New','adidas+ultraboost+running+shoe'],
  ['Adidas Forum Low White','Basketball heritage low-top.',40000,'','adidas+forum+low+sneaker'],
  ['New Balance 550 White Green','Retro basketball court shoe.',45000,'Hot','new+balance+550+sneaker'],
  ['New Balance 2002R Protection Pack','Suede and mesh runner.',55000,'','new+balance+2002r+sneaker'],
  ['New Balance 574 Core Grey','Heritage runner with ENCAP.',35000,'','new+balance+574+grey+shoe'],
  ['New Balance 530 White Silver','Retro running silhouette.',38000,'New','new+balance+530+white'],
  ['Puma Suede Classic Black','Suede upper with gum sole.',25000,'','puma+suede+classic+sneaker'],
  ['Puma RS-X Reinvention','Chunky retro running shoe.',32000,'','puma+rsx+chunky+sneaker'],
  ['Converse Chuck 70 High Black','Premium canvas high-top.',28000,'','converse+chuck+70+high+black'],
  ['Converse Chuck Taylor Low White','Timeless low canvas sneaker.',22000,'Sale','converse+chuck+taylor+white'],
  ['Reebok Classic Leather White','Soft leather heritage runner.',30000,'','reebok+classic+leather+white'],
  ['Vans Old Skool Black White','Side-stripe canvas skate shoe.',24000,'','vans+old+skool+black+shoe'],
  ['Vans Sk8-Hi Black','High-top skate classic.',26000,'','vans+sk8+hi+black+shoe'],
  ['Alexander McQueen Oversized White','Chunky platform sneaker.',120000,'Exclusive','alexander+mcqueen+white+sneaker'],
  ['Nike Cortez White Red','Retro running icon.',34000,'Sale','nike+cortez+white+red'],
  ['Nike Blazer Mid 77 White','Vintage basketball mid-top.',42000,'','nike+blazer+mid+white'],
  ['Nike React Vision Black','Futuristic runner with React foam.',48000,'','nike+react+vision+black'],
  ['Adidas NMD R1 Core Black','Urban Boost runner.',45000,'','adidas+nmd+r1+black+shoe'],
  ['Puma Cali Star White','Women\'s platform court shoe.',28000,'New','puma+cali+white+platform'],
  ['Fila Disruptor II White','Chunky dad shoe classic.',22000,'Sale','fila+disruptor+chunky+white'],
  ['Asics Gel-1130 Silver','Retro tech runner.',40000,'','asics+gel+1130+silver'],
  ['Nike Huarache White','Neoprene and leather runner.',38000,'','nike+huarache+white+sneaker'],
];

const jewelry = [
  ['18K Gold Cuban Link Chain 22"','Heavy Cuban link, 10mm width.',55000,'Exclusive','gold+cuban+link+chain+necklace'],
  ['18K Gold Cuban Link Chain 18"','Classic Cuban link, 8mm width.',45000,'Hot','gold+cuban+chain+jewelry'],
  ['Gold Rope Chain 24"','Twisted rope design necklace.',35000,'','gold+rope+chain+necklace'],
  ['Silver Figaro Chain 20"','Alternating link pattern.',18000,'','silver+figaro+chain+necklace'],
  ['Iced Out Tennis Chain','CZ diamond tennis necklace.',65000,'Exclusive','iced+out+tennis+chain'],
  ['Gold Tennis Bracelet','CZ stones in gold setting.',28000,'Hot','gold+tennis+bracelet+jewelry'],
  ['Silver Tennis Bracelet','Brilliant-cut CZ in silver.',18000,'','silver+tennis+bracelet'],
  ['Gold Cross Pendant Chain','Polished cross on box chain.',22000,'','gold+cross+pendant+necklace'],
  ['Iced Out Ankh Pendant','CZ-encrusted ankh pendant.',38000,'New','ankh+pendant+gold+jewelry'],
  ['Lion Head Pendant Gold','Lion motif gold pendant.',32000,'Hot','lion+head+pendant+gold'],
  ['Gold Compass Pendant','Engraved compass on chain.',25000,'','compass+pendant+gold+chain'],
  ['Men\'s Gold Signet Ring','Flat-top 18K signet ring.',16000,'','gold+signet+ring+mens'],
  ['Men\'s Silver Band Ring','Brushed stainless steel band.',12000,'','silver+band+ring+mens'],
  ['Gold Pinky Ring CZ','CZ-encrusted pinky ring.',14000,'New','gold+pinky+ring+cz'],
  ['Stainless Steel Ring Set','3-piece ring set for men.',10000,'','stainless+steel+ring+set'],
  ['Diamond-Cut Hoop Earrings Gold','14K gold-plated hoops.',12000,'','gold+hoop+earrings+diamond'],
  ['Gold Stud Earrings CZ','Round CZ stud earrings.',8500,'','gold+stud+earrings+cz'],
  ['Silver Huggie Hoops','Small huggie hoop earrings.',7500,'Sale','silver+huggie+hoop+earrings'],
  ['Pearl Drop Earrings','Freshwater pearl drop design.',9500,'New','pearl+drop+earrings+jewelry'],
  ['Ear Cuff Set Gold 3pc','No-pierce ear cuff set.',7000,'','gold+ear+cuff+set'],
  ['Gold Bangle Bracelet Set 5pc','Five gold-tone bangles.',12000,'','gold+bangle+bracelet+set'],
  ['Charm Bracelet Silver','Link chain with charms.',15000,'','charm+bracelet+silver'],
  ['Beaded Bracelet Set','Natural stone bead bracelets.',8000,'','beaded+bracelet+natural+stone'],
  ['Leather Wrap Bracelet','Braided leather with clasp.',6500,'Sale','leather+wrap+bracelet+mens'],
  ['Gold Cuff Bracelet','Open cuff bangle, polished.',18000,'','gold+cuff+bracelet+bangle'],
  ['Layered Gold Necklace Set','3-piece layered chain set.',22000,'Hot','layered+gold+necklace+set'],
  ['Choker Necklace Black Velvet','Classic black velvet choker.',5500,'','black+velvet+choker+necklace'],
  ['Pearl Necklace Strand','Classic freshwater pearl strand.',20000,'','pearl+necklace+strand+jewelry'],
  ['Gold Anklet Chain','Dainty gold-tone ankle chain.',5000,'','gold+anklet+chain+jewelry'],
  ['Silver Anklet with Charms','Sterling silver ankle chain.',6500,'','silver+anklet+charm+jewelry'],
  ['Casio Classic Digital Watch','Iconic A168 digital watch.',15000,'Hot','casio+digital+watch+gold'],
  ['Men\'s Chronograph Watch Black','Stainless steel chrono watch.',35000,'Exclusive','chronograph+watch+black+mens'],
  ['Minimalist Watch Rose Gold','Slim mesh band watch.',22000,'New','minimalist+watch+rose+gold'],
  ['Digital Sport Watch','Shock-resistant sport watch.',12000,'','digital+sport+watch+black'],
  ['Couple Watch Set Gold','Matching his-and-hers watches.',28000,'','couple+watch+set+gold'],
  ['Gold Name Plate Necklace','Custom-style name plate chain.',18000,'','name+plate+necklace+gold'],
  ['Butterfly Pendant Silver','Butterfly motif CZ pendant.',14000,'New','butterfly+pendant+silver'],
  ['Cuban Link Bracelet Gold','8mm Cuban link wrist chain.',25000,'','cuban+link+bracelet+gold'],
  ['Money Bag Pendant Iced','Iced-out money bag pendant.',30000,'','iced+pendant+money+gold'],
  ['Rosary Bead Necklace','Gold-tone rosary bead chain.',16000,'','rosary+bead+necklace+gold'],
];

const unisex = [
  ['Oversized Hoodie Black','400g fleece, dropped shoulders.',19500,'Hot','black+oversized+hoodie+streetwear'],
  ['Oversized Hoodie Grey','Heavy fleece relaxed fit.',19500,'','grey+oversized+hoodie+fashion'],
  ['Zip-Up Hoodie Black','Full-zip with kangaroo pockets.',22000,'New','black+zip+hoodie+fashion'],
  ['Graphic Print Hoodie','Bold graphic front print.',18000,'','graphic+print+hoodie+streetwear'],
  ['Vintage Wash Crewneck','Acid-washed crew sweatshirt.',16000,'','vintage+wash+crewneck+sweater'],
  ['Premium Cargo Pants Beige','6-pocket tapered cargo.',22000,'Hot','beige+cargo+pants+fashion'],
  ['Premium Cargo Pants Black','Utility cargo with drawcord.',22000,'','black+cargo+pants+streetwear'],
  ['Wide Leg Pants Cream','Relaxed wide-leg trousers.',20000,'New','cream+wide+leg+pants'],
  ['Parachute Pants Black','Nylon parachute wide-leg.',25000,'Exclusive','black+parachute+pants+fashion'],
  ['Slim Fit Joggers Grey','French terry slim jogger.',14000,'','grey+slim+jogger+pants'],
  ['Slim Fit Joggers Black','Tapered leg, ribbed cuffs.',14000,'','black+jogger+pants+fashion'],
  ['Track Pants Stripe','Side-stripe track bottoms.',16000,'','track+pants+stripe+fashion'],
  ['Oversized Graphic Tee White','Heavy cotton graphic print.',9500,'','white+graphic+tee+oversized'],
  ['Oversized Graphic Tee Black','Bold back-print design.',9500,'Hot','black+graphic+tee+streetwear'],
  ['Plain Heavyweight Tee White','280gsm premium blank tee.',7500,'','white+heavyweight+tee+plain'],
  ['Plain Heavyweight Tee Black','280gsm blank essential.',7500,'','black+heavyweight+tee+plain'],
  ['Vintage Band Tee','Washed band-style print.',12000,'','vintage+band+tee+fashion'],
  ['Tie-Dye Tee Multicolor','Hand-dyed spiral pattern.',10000,'New','tie+dye+tee+colorful'],
  ['Varsity Jacket Black','Wool body, leather sleeves.',38000,'Exclusive','varsity+jacket+black+fashion'],
  ['Denim Jacket Washed Blue','Acid-washed trucker jacket.',28500,'Sale','denim+jacket+washed+blue'],
  ['Puffer Vest Black','Lightweight quilted vest.',25000,'','black+puffer+vest+fashion'],
  ['Windbreaker Navy','Lightweight packable jacket.',32000,'','navy+windbreaker+jacket'],
  ['Corduroy Overshirt Brown','Relaxed cord shirt-jacket.',21000,'','brown+corduroy+overshirt'],
  ['Colorblock Track Jacket','Retro 90s track top.',20000,'Hot','colorblock+track+jacket+retro'],
  ['Bomber Jacket Olive','Satin bomber with ribbed trim.',30000,'','olive+bomber+jacket+fashion'],
  ['Mesh Shorts Black','Athletic mesh basketball shorts.',8500,'','black+mesh+shorts+athletic'],
  ['Cargo Shorts Khaki','Relaxed cargo short.',12000,'','khaki+cargo+shorts+fashion'],
  ['Biker Shorts Set Black','High-waist shorts + crop top.',12000,'New','black+biker+shorts+set'],
  ['Sweat Shorts Grey','French terry casual shorts.',10000,'','grey+sweat+shorts+casual'],
  ['Board Shorts Print','Quick-dry printed swim shorts.',9000,'Sale','print+board+shorts+summer'],
  ['Tracksuit Set Black','Matching jacket and pants.',35000,'Exclusive','black+tracksuit+set+fashion'],
  ['Tracksuit Set Grey','Full grey matching set.',35000,'','grey+tracksuit+set+fashion'],
  ['Ribbed Knit Vest Cream','Sleeveless ribbed knit top.',11500,'','cream+ribbed+knit+vest'],
  ['Fleece Quarter-Zip Olive','Polar fleece QZ pullover.',17500,'Sale','olive+fleece+quarter+zip'],
  ['Bucket Hat Black','Cotton canvas bucket hat.',7500,'','black+bucket+hat+fashion'],
  ['Bucket Hat Tan','Canvas hat with chin cord.',7500,'','tan+bucket+hat+fashion'],
  ['Dad Cap Washed Black','Low-profile washed cap.',5500,'','washed+black+dad+cap'],
  ['Beanie Knit Black','Ribbed knit winter beanie.',5000,'','black+knit+beanie+hat'],
  ['Crossbody Bag Black','Nylon sling crossbody bag.',15000,'New','black+crossbody+bag+fashion'],
  ['Tote Bag Canvas','Heavy canvas everyday tote.',10000,'','canvas+tote+bag+fashion'],
];

const underwear = [
  ['Men\'s Boxer Brief 3-Pack Black','Cotton-modal contour pouch.',14500,'Exclusive','mens+boxer+brief+black+pack'],
  ['Men\'s Boxer Brief 3-Pack White','Stretch cotton blend briefs.',14500,'','mens+boxer+brief+white+pack'],
  ['Men\'s Trunk 4-Pack Assorted','Microfiber trunks multipack.',12000,'Hot','mens+trunk+underwear+pack'],
  ['Men\'s Trunk Black','Single premium trunk.',4500,'','mens+black+trunk+underwear'],
  ['Men\'s Boxer Shorts 3-Pack','Breathable woven boxers.',11000,'New','mens+boxer+shorts+pack'],
  ['Men\'s Long Leg Trunk Black','Full coverage long trunk.',7000,'','mens+long+leg+trunk'],
  ['Men\'s Athletic Brief 5-Pack','Sport performance briefs.',10000,'','mens+athletic+brief+pack'],
  ['Men\'s Bamboo Boxer 3-Pack','Breathable bamboo fiber.',13000,'New','bamboo+boxer+shorts+mens'],
  ['Men\'s Seamless Trunk Grey','No-seam microfiber trunk.',5500,'','seamless+trunk+grey+mens'],
  ['Men\'s Compression Shorts','Sport compression fit.',8000,'','mens+compression+shorts'],
  ['Men\'s Cotton Vest White 3-Pack','Classic ribbed singlet.',7500,'','mens+white+vest+singlet'],
  ['Men\'s Cotton Vest Black 3-Pack','Essential black undershirt.',7500,'','mens+black+vest+undershirt'],
  ['Women\'s Lace Bralette Black','Floral lace bralette set.',8500,'New','lace+bralette+black+womens'],
  ['Women\'s Lace Bralette White','Delicate white lace bra.',8500,'','white+lace+bralette+womens'],
  ['Women\'s Sports Bra Black','Medium-support sports bra.',7500,'Sale','sports+bra+black+womens'],
  ['Women\'s Sports Bra Grey','Moisture-wicking support.',7500,'','grey+sports+bra+womens'],
  ['Women\'s Push-Up Bra Nude','Underwire for max lift.',10500,'Hot','push+up+bra+nude+womens'],
  ['Women\'s Comfort Wireless Bra','Wire-free everyday bra.',9500,'','wireless+comfort+bra+womens'],
  ['Women\'s Seamless Bra Set','Smooth seamless T-shirt bra.',9000,'','seamless+bra+set+womens'],
  ['Women\'s Mesh Bralette','Sheer mesh triangle bra.',5500,'New','mesh+bralette+triangle+womens'],
  ['Seamless Hipster 5-Pack','No-show seamless briefs.',10000,'','seamless+hipster+briefs+pack'],
  ['Cotton Brief 6-Pack','100% cotton breathable.',9000,'Sale','cotton+brief+pack+womens'],
  ['Women\'s Thong 5-Pack','Microfiber thong multipack.',6000,'','thong+pack+microfiber+womens'],
  ['Women\'s Boyshort 3-Pack','Full-coverage boyshorts.',7500,'','boyshort+pack+womens'],
  ['High-Waist Shaping Brief','Light-control shapewear.',8000,'Hot','high+waist+shaping+brief'],
  ['Tummy Control Shapewear','Mid-thigh body shaper.',12000,'','tummy+control+shapewear+womens'],
  ['Waist Trainer Corset','Latex waist cincher.',15000,'Exclusive','waist+trainer+corset'],
  ['Satin Slip Shorts','Silky satin mini shorts.',6500,'','satin+slip+shorts+womens'],
  ['Women\'s Camisole White','Adjustable strap camisole.',5000,'','white+camisole+womens'],
  ['Women\'s Camisole Black','Essential black cami top.',5000,'','black+camisole+womens'],
  ['Thermal Underwear Set','Base-layer top and bottom.',13500,'Exclusive','thermal+underwear+set'],
  ['Men\'s Athletic Socks 6-Pack','Cushioned sport socks.',5500,'','mens+athletic+socks+pack'],
  ['Men\'s Ankle Socks 6-Pack','Low-cut everyday socks.',4500,'','mens+ankle+socks+pack'],
  ['Women\'s Ankle Socks 6-Pack','Soft cotton ankle socks.',4500,'','womens+ankle+socks+pack'],
  ['No-Show Socks 6-Pack','Invisible liner socks.',5000,'','no+show+invisible+socks'],
  ['Crew Socks Stripe 3-Pack','Retro striped crew socks.',4000,'','striped+crew+socks+retro'],
  ['Women\'s Stocking Nude','Sheer pantyhose stocking.',3500,'','nude+stocking+pantyhose'],
  ['Men\'s Thermal Socks 3-Pack','Thick winter thermal socks.',6000,'','thermal+socks+winter+mens'],
  ['Silk Robe Short Black','Silky short lounging robe.',18000,'New','silk+robe+black+short'],
  ['Cotton Lounge Set','Matching top and shorts set.',14000,'','cotton+lounge+set+pajama'],
  ['Women\'s Nightgown Satin','Satin mid-length nightgown.',12000,'','satin+nightgown+womens'],
];

const cats = {sneakers, jewelry, unisex, underwear};
const prefixes = {sneakers:'s', jewelry:'j', unisex:'u', underwear:'w'};
const badgeClass = {New:'badge-new',Hot:'badge-hot',Sale:'badge-sale',Exclusive:'badge-exclusive'};

let allProducts = [];
let imgIdx = 1;

for (const [cat, items] of Object.entries(cats)) {
  const pre = prefixes[cat];
  items.forEach((item, i) => {
    const [name, desc, price, badge, searchTerms] = item;
    allProducts.push({
      id: `${pre}${i+1}`,
      cat,
      name,
      price,
      badge: badge || '',
      img: `https://loremflickr.com/500/500/${searchTerms}?lock=${imgIdx}`,
      desc
    });
    imgIdx++;
  });
}

// Write as JS module
const lines = allProducts.map(p => 
  `  { id:'${p.id}', cat:'${p.cat}', name:'${p.name.replace(/'/g,"\\'")}', price:${p.price}, badge:'${p.badge}', img:'${p.img}', desc:'${p.desc.replace(/'/g,"\\'")}' }`
);

const output = `// Auto-generated Nigerian market product data for Reubx World
// Total: ${allProducts.length} products
export const PRODUCTS = [\n${lines.join(',\n')}\n];\n`;

fs.writeFileSync('./src/products.js', output, 'utf8');
console.log(`Generated ${allProducts.length} products to src/products.js`);
