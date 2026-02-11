// import * as SQLite from 'expo-sqlite';
// import * as dbCreator from './dbCreator';
// import useBoundStore from '../utils/store/store';
// import * as dbModel from './dbModel';
import { getItem } from "../utils/storage";
import { createTable, db } from "./dbCreator";
import * as XLSX from "xlsx";
import RNFS from 'react-native-fs'
import { getFormattedDate } from "./helpers";

const executeQuery = (query: any, params: any) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx: { executeSql: (arg0: any, arg1: any, arg2: (_: any, result: any) => void, arg3: (_: any, error: any) => void) => void; }) => {
            tx.executeSql(query, params, (_: any, result: unknown) => {
                resolve(result);
                // console.log("answers successfully inserted,", result);

            }, (_: any, error: any) => {
                reject(error);
            });
        });
    });
};

// Function to drop table if it exists
export const dropTableIfExists = async (tableName: any) => {
    try {
        await createTable(tableName, ''); // Just a placeholder, you will execute the drop table command directly
        await db.transaction(tx => {
            tx.executeSql(`DROP TABLE IF EXISTS ${tableName}`);
        });
        // console.log(`Table ${tableName} dropped`);
    } catch (error) {
        console.error(`Error dropping table ${tableName}:`, error);
    }
};

export const logTableColumns = (tableName: any) => {
    db.transaction((tx) => {
        tx.executeSql(
            `PRAGMA table_info(${tableName})`,
            [],
            (tx, results) => {
                const columns = [];
                for (let i = 0; i < results.rows.length; i++) {
                    columns.push(results.rows.item(i));
                }
                console.log(`Columns for table ${tableName}:`, columns);
            },
            (error) => {
                console.error('Error executing PRAGMA statement:', error);
            }
        );
    });
};

export const clearTableRecords = async (tableName: string) => {
    return new Promise((resolve, reject) => {
        if (!tableName) {
            reject("Table name is required.");
            return;
        }

        db.transaction(tx => {
            tx.executeSql(
                `DELETE FROM ${tableName};`, // Delete all records from the table
                [],
                (_, result) => {
                    // console.log(`All records deleted from '${tableName}'.`);
                    resolve(result);
                },
                (_, error) => {
                    console.error(`Error deleting records from '${tableName}':`, error);
                    reject(error);
                }
            );
        });
    });
};

const chunkArray = (array: any[], size: number) => {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
        array.slice(index * size, index * size + size)
    );
};

export const clearTable = async (tableName, batchIds = null) => {
    try {
        const query = batchIds
            ? `DELETE FROM ${tableName} WHERE batch_id IN (${batchIds.join(",")})` // Only clear specific batches
            : `DELETE FROM ${tableName}`; // Clear all rows if no batchIds provided

        // Execute the query
        await db.transaction(tx => {
            tx.executeSql(query);
        });
        console.log(`Successfully cleared table: ${tableName}`);
    } catch (error) {
        console.error(`Error clearing table ${tableName}:`, error);
    }
};

export const clearSingleTable = async (tableName: string, batchId = null) => {
    try {
        if (!batchId) {
            console.log("No batchId provided. Nothing to delete.");
            return; // Do nothing if no batchId is passed
        }

        const query = `DELETE FROM ${tableName} WHERE batch_id = ?`; // Delete specific batch by batch_id

        // Execute the query
        await db.transaction(tx => {
            tx.executeSql(query, [batchId]);
        });
        console.log(`Successfully deleted record with batch_id: ${batchId} in table: ${tableName}`);
    } catch (error) {
        console.error(`Error deleting record in table ${tableName}:`, error);
    }
};
















































































