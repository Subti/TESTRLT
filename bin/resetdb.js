// load .env data into process.env
import dotenv from 'dotenv';
dotenv.config();

// other dependencies
import * as fs from 'fs'
import pool from '../database/db-config.js'

const db = pool;

// PG connection setup
// const connectionString = process.env.DATABASE_URL ||
//   `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable`;
// const client = new Client();

// Loads the schema files from db/schema
const runSchemaFiles = async() => {
  console.log((`-> Loading Schema Files ...`));
  const schemaFilenames = fs.readdirSync(`./database/schema`);

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`./database/schema/${fn}`, 'utf8');
    console.log(`\t-> Running ${(fn)}`);
    await db.query(sql);
  }
};

// const runSeedFiles = async() => {
//   console.log((`-> Loading Seeds ...`));
//   const schemaFilenames = fs.readdirSync('./database/seeds');

//   for (const fn of schemaFilenames) {
//     const sql = fs.readFileSync(`./database/seeds/${fn}`, 'utf8');
//     console.log(`\t-> Running ${(fn)}`);
//     await db.query(sql);
//   }
// };

const runResetDB = async() => {
  try {
    process.env.DB_HOST &&
      console.log(`-> Connecting to PG on ${process.env.DB_HOST} as ${process.env.DB_USER}...`);

    await runSchemaFiles();
    // await runSeedFiles();
    process.exit();
  } catch (err) {
    console.error((`Failed due to error: ${err}`));
    process.exit();
  }
};

runResetDB();
