const fs = require('fs');
let content = fs.readFileSync('src/products.js', 'utf8');

// Map of product IDs to real Unsplash photo IDs
const replacements = {
  // Sneakers
  "id:'s10'": 'photo-1460353581641-37baddab0fa2',
  "id:'s18'": 'photo-1512374382149-233c42b6a83b',
  "id:'s25'": 'photo-1518002171953-a080ee817e1f',
  "id:'s28'": 'photo-1544441893-675973e31985',
  "id:'s33'": 'photo-1543163521-1bf539c55dd2',
  "id:'s34'": 'photo-1595461135849-c20e7e492d4a',
  "id:'s35'": 'photo-1579298245158-33e8f568f3d1',
  "id:'s38'": 'photo-1565814636199-ae8133055c1c',
  // Jewelry
  "id:'j1'": 'photo-1611085583191-a3b181a88401',
  "id:'j11'": 'photo-1614164185128-e4ec99c436d7',
  "id:'j16'": 'photo-1605101100278-5d1deb2b6498',
  "id:'j19'": 'photo-1591209627944-37f1c3ce8b80',
  "id:'j20'": 'photo-1610108909883-07fde6cd1be8',
  "id:'j23'": 'photo-1573053986790-a39b13d7d49b',
  "id:'j24'": 'photo-1602751584552-8ba73aad10e1',
  "id:'j25'": 'photo-1599458252573-56ae36120de1',
  "id:'j30'": 'photo-1583292650898-7d22cd27ca6f',
  "id:'j31'": 'photo-1548036328-c9fa89d128fa',
  "id:'j37'": 'photo-1612903351789-75833e55cf2f',
  "id:'j38'": 'photo-1617038220319-276d3cfab638',
  "id:'j39'": 'photo-1603974372039-adc49044b6bd',
  // Unisex
  "id:'u12'": 'photo-1516826957135-700dedea698c',
  "id:'u16'": 'photo-1618517351616-38fb9c5210c6',
  "id:'u17'": 'photo-1503342217505-b0a15ec515c6',
  "id:'u18'": 'photo-1527719327859-c6ce80353573',
  "id:'u21'": 'photo-1544022613-e87ca75a784a',
  "id:'u25'": 'photo-1548126032-079a0fb0099d',
  "id:'u28'": 'photo-1580907114587-148483e7bd5f',
  "id:'u29'": 'photo-1548883354-7622d03c6145',
  "id:'u31'": 'photo-1542272604-787c3835535d',
  "id:'u37'": 'photo-1588850561407-ed78c334e67a',
  // Underwear
  "id:'w5'": 'photo-1564859228273-274232fdb516',
  "id:'w7'": 'photo-1558171813-4c088753af8f',
  "id:'w8'": 'photo-1606902965551-dce093cda6e7',
  "id:'w9'": 'photo-1617952739858-28043b3bbd0e',
  "id:'w10'": 'photo-1517466787929-bc90a1233e62',
  "id:'w12'": 'photo-1583744946564-b52ac1c389c8',
  "id:'w16'": 'photo-1518310383802-640c2de311b2',
  "id:'w18'": 'photo-1519568470290-c0c1fbfff16f',
  "id:'w19'": 'photo-1616627577385-5c0c5be0c13d',
  "id:'w21'": 'photo-1570976447640-ac859083963e',
  "id:'w22'": 'photo-1567401893414-76b7b1e5a7a5',
  "id:'w23'": 'photo-1609505848912-b7c3b8b4beda',
  "id:'w24'": 'photo-1604176354204-9268737828e4',
  "id:'w25'": 'photo-1616627561950-9f746e330187',
  "id:'w26'": 'photo-1515377905703-c4788e51af15',
  "id:'w27'": 'photo-1571019613454-1cb2f99b2d8b',
  "id:'w29'": 'photo-1596783074918-c84cb06531ca',
  "id:'w30'": 'photo-1578632292335-df3abbb0d586',
  "id:'w33'": 'photo-1586350977771-b3b0abd50c82',
  "id:'w34'": 'photo-1582966772680-860e372bb948',
  "id:'w35'": 'photo-1556745753-b2904692b3cd',
  "id:'w37'": 'photo-1609709295948-17d77cb2a69b',
  "id:'w39'": 'photo-1590736969955-71cc94901144',
  "id:'w41'": 'photo-1617331140180-e8262094733d',
};

const placeholder = "https://placehold.co/500x500/111/D4AF37?text=REUBX";

// For each product ID, find the line and replace the placehold URL
for (const [idStr, photoId] of Object.entries(replacements)) {
  const unsplashUrl = `https://images.unsplash.com/${photoId}?w=500&h=500&fit=crop&q=80`;
  // Find lines containing this product ID AND the placeholder
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(idStr) && lines[i].includes(placeholder)) {
      lines[i] = lines[i].replace(placeholder, unsplashUrl);
      console.log(`✓ Replaced ${idStr}`);
    }
  }
  content = lines.join('\n');
}

// Verify no placeholders remain
const remaining = (content.match(/placehold\.co/g) || []).length;
console.log(`\nRemaining placeholders: ${remaining}`);

fs.writeFileSync('src/products.js', content, 'utf8');
console.log('Done! products.js updated.');
