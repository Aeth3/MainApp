
import SQLite from 'react-native-sqlite-storage';

export const db = SQLite.openDatabase(
  {
    name: 'data.sqlite',
    location: 'default',
  },
  () => console.log('Database opened successfully'),
  error => console.log('Error opening database', error)
);

/**
 * Reusable function to create a table
 * @param {string} tableName - The name of the table
 * @param {string} columns - The columns definition (e.g., "id INTEGER PRIMARY KEY, name TEXT")
 */
export const createTable = async (tableName: string, columns: string) => {
  return new Promise<void>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${tableName} (${columns});`,
        [],
        () => {
          // console.log(`Table "${tableName}" created successfully.`);
          resolve();
        },
        (_, error) => {
          console.error(`Error creating table "${tableName}":`, error);
          reject(error);
        }
      );
    });
  });
};

export const dropTable = async (tableName: string) => {
  return new Promise((resolve, reject) => {
    if (!tableName) {
      reject("Table name is required.");
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        `DROP TABLE IF EXISTS ${tableName};`, // Drop the specified table
        [],
        (_, result) => {
          console.log(`Table '${tableName}' deleted successfully.`);
          resolve(result);
        },
        (_, error) => {
          console.error(`Error deleting table '${tableName}':`, error);
          reject(error);
        }
      );
    });
  });
};

export const checkTablesExist = async (tableNames = []) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT name FROM sqlite_master WHERE type='table' AND name IN (${tableNames.map(() => '?').join(',')})`,
        tableNames,
        (_, results) => {
          const existing = [];
          for (let i = 0; i < results.rows.length; i++) {
            existing.push(results.rows.item(i).name);
          }
          // Ensure all requested tables are found
          const allExist = tableNames.every(name => existing.includes(name));
          resolve(allExist);
        },
        (_, error) => {
          console.error("Error checking table existence:", error);
          reject(error);
          return true;
        }
      );
    });
  });
};