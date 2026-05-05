// Validate all Unsplash image URLs and fix broken ones
const https = require('https');
const fs = require('fs');

const content = fs.readFileSync('./src/products.js', 'utf8');
const matches = [...content.matchAll(/id:'([^']+)'.*?img:'([^']+)'/g)];

console.log(`Checking ${matches.length} image URLs...`);

let checked = 0;
let broken = [];

function checkUrl(id, url) {
  return new Promise((resolve) => {
    const req = https.get(url, { timeout: 8000 }, (res) => {
      res.resume(); // consume response
      if (res.statusCode === 200) {
        resolve({ id, status: 'ok' });
      } else {
        resolve({ id, status: 'broken', code: res.statusCode, url });
      }
    });
    req.on('error', () => resolve({ id, status: 'broken', code: 0, url }));
    req.on('timeout', () => { req.destroy(); resolve({ id, status: 'broken', code: 'timeout', url }); });
  });
}

async function main() {
  // Check in batches of 10
  for (let i = 0; i < matches.length; i += 10) {
    const batch = matches.slice(i, i + 10);
    const results = await Promise.all(batch.map(m => checkUrl(m[1], m[2])));
    results.forEach(r => {
      checked++;
      if (r.status === 'broken') {
        broken.push(r);
        process.stdout.write('X');
      } else {
        process.stdout.write('.');
      }
    });
  }

  console.log(`\n\nResults: ${checked} checked, ${broken.length} broken`);
  
  if (broken.length > 0) {
    console.log('\nBroken images:');
    broken.forEach(b => console.log(`  ${b.id}: status=${b.code}`));
    
    // Fix broken images with known-good fallback Unsplash photos per category
    const fallbacks = {
      s: [ // sneaker fallbacks
        '1542291026-7eec264c27ff','1600185365926-3a2ce3cdb9eb','1605348532760-6753d2c43329',
        '1556906781-9a412961c28c','1608231387042-66d1773070a5','1597045566677-8cf032ed6634',
        '1543508282-6dbb228527e2','1549298916-b41d501d3772','1584735175315-9d5df23860e6',
        '1579338559194-a162d19bf842','1552346154-21d32810aba3','1587563871167-1ee9c731aefb',
        '1539185441755-769473a23570','1560769629-975ec94e6a86','1551107696-a4b0c5a0d9a2',
        '1520256862855-398228c41684','1491553895911-0055eca6402d','1582588678413-dbf45f4823e9',
        '1596522354195-e84ae3c98731','1575537302964-96cd47c06b1b','1494496195158-c3becb4f2475',
      ],
      j: [ // jewelry fallbacks  
        '1573408301185-9146fe634ad0','1535632066927-ab7c9ab60908','1603561596112-0a132b757442',
        '1599643478518-a784e5dc4c8f','1610694955371-d4a3e0ce4b52','1524592094714-0f0654e20314',
        '1596944924616-7b38e7cfac36','1506630448388-4e683c67ddb0','1583484963886-cfe2df6e7e84',
        '1569397288203-0a4db41b3675','1586104237491-5b4bef302783','1571172964533-d30853e2d15b',
        '1614164185128-1826f95a3145','1508057198894-247b23fe5ade','1523170335258-f5ed11844a49',
      ],
      u: [ // clothing fallbacks
        '1556821840-3a63f95609a7','1576566588028-4147f3842f27','1620799140408-edc6dcb6d633',
        '1562157873-818bc0726f68','1591047139829-d91aecb6caea','1521572163474-6864f9cf17ab',
        '1489987707025-afc232f7ea0f','1523381210434-271e8be1f52b','1434389677669-e08b4cac3105',
        '1558618666-fcd25c85f521','1544441893-675835616361','1551488831-00ddcb6c6bd3',
        '1581655353564-df123a1eb820','1565693413579-8ff3fdc270f4','1529374255404-311a2a4f3fd6',
      ],
      w: [ // underwear/intimates fallbacks
        '1571945153237-4929e783af4a','1591085686350-798c0f9faa7f','1571019613454-1cb2f99b2d8b',
        '1515886657613-9f3515b0c78f','1574180045827-681f8a1a9622','1556745753-b2904692b3cd',
        '1595777457583-95e4f5ef4fd5','1556905055-8f358a7a47b2','1563826904577-6b72c5d05769',
        '1598300042247-d088f8ab3a91','1590283603385-17ffb3a7f29f','1582655121448-50c6e7a96b8f',
      ],
    };
    
    // Get all currently used photo IDs
    let updatedContent = fs.readFileSync('./src/products.js', 'utf8');
    const usedIds = new Set([...updatedContent.matchAll(/photo-([a-f0-9-]+)\?/g)].map(m => m[1]));
    
    let fixCount = 0;
    for (const b of broken) {
      const catPrefix = b.id.charAt(0);
      const catFallbacks = fallbacks[catPrefix] || fallbacks['s'];
      // Find a fallback not already used
      const available = catFallbacks.filter(f => !usedIds.has(f));
      if (available.length > 0) {
        const newId = available[0];
        usedIds.add(newId);
        const newUrl = `https://images.unsplash.com/photo-${newId}?w=500&h=500&fit=crop&q=80`;
        const regex = new RegExp(`(id:'${b.id}',.*?img:')([^']+)(')`);
        updatedContent = updatedContent.replace(regex, `$1${newUrl}$3`);
        fixCount++;
        console.log(`  Fixed ${b.id} -> photo-${newId}`);
      } else {
        console.log(`  No fallback available for ${b.id}, using placeholder`);
        const placeholderUrl = `https://placehold.co/500x500/111/D4AF37?text=REUBX`;
        const regex = new RegExp(`(id:'${b.id}',.*?img:')([^']+)(')`);
        updatedContent = updatedContent.replace(regex, `$1${placeholderUrl}$3`);
        fixCount++;
      }
    }
    
    fs.writeFileSync('./src/products.js', updatedContent, 'utf8');
    console.log(`\n✅ Fixed ${fixCount} broken images`);
  } else {
    console.log('✅ All images are valid!');
  }
}

main();
