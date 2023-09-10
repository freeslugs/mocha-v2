const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const { Client } = require('pg');


function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

const client = new Client({
  host: 'db.riikozdctnkhklhbqgwz.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'PW5CKiRn7gYEYru3',
});

// psql -h db.riikozdctnkhklhbqgwz.supabase.co -p 5432 -d postgres -U postgres

async function scrapeCharityWatch() {
  console.log("LFGGG")

  const directoryPath = path.join(__dirname, 'files');
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    } 
    files.forEach(async function  (file) {
      const html = fs.readFileSync(path.join(directoryPath, file), 'utf8');
      const $ = cheerio.load(html);

      const contactInfo = $('h3:contains("Contact Information")').next().text().trim()
      const otherNames = $('h3:contains("Other Names")').next().text().trim()
      const taxStatus = $('h3:contains("Tax Status")').next().text().trim()
      const statedMission = $('h3:contains("Stated Mission")').next().text().trim()
      const website = $('h3:contains("Website")').next().text().trim()
    
      const grade = $('div.title:contains("Grade")').prev().text().trim()
      const programPercentage = $('h3:contains("Program Percentage")').text().split(':')[1]
      const costToRaise = $('h3:contains("Cost to Raise $100:") span').text()

      const ogTitle = $('meta[property="og:title"]').attr('content');
      const ogUrl = $('meta[property="og:url"]').attr('content');

      const extraInfo = programPercentage != undefined
    
      // Insert data into the table
      await client.query(`
        INSERT INTO charities (
          contact_info,
          other_names,
          website,
          tax_status,
          stated_mission,
          grade,
          program_percentage,
          cost_to_raise,
          title,
          url
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [
        contactInfo,
        otherNames,
        website,
        taxStatus,
        statedMission,
        extraInfo ? grade : null,
        extraInfo ? parseInt(programPercentage) : null,
        extraInfo ? parseFloat(costToRaise.replace(/[^0-9.-]+/g,"")) : null,
        ogTitle,
        ogUrl
      ]);
    });
  });
}



const initDB = async () => {
     // Create table if not exists
   const res = await client.query(`
   CREATE TABLE charities (
     id SERIAL PRIMARY KEY,
     contact_info TEXT,
     other_names TEXT,
     website TEXT,
     tax_status TEXT,
     stated_mission TEXT,
     grade TEXT,
     program_percentage INTEGER,
     cost_to_raise INTEGER,
     title TEXT,
     url TEXT
   )
 `);

} 

client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  // client.query('DELETE FROM charities', (err, res) => {
  //   if(err) {
  //     console.error(err);
  //     return;
  //   }
  //   console.log('All rows deleted from table charities');
  // });
  

  scrapeCharityWatch();
});
