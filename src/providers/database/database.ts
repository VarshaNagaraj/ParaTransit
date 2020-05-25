import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
 Generated class for the DatabaseProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class DatabaseProvider {

    public localDatabase : any;
    constructor(public http: HttpClient) {
        console.log('Hello DatabaseProvider Provider');
    }

    //..... Initialize the Database on the browser....
    initilizeDB(){
        return new Promise((resolve) => {
            console.log("DB : initializeDB");
            this.localDatabase = window['openDatabase'] (
                "testlocater",
                "1.0",
                "testlocater DB",
                5000000
            );
            resolve(this.localDatabase);
        });

    }

    //-----Creating Ride-list table-----//
    createRide_List_Table(){
        this.localDatabase.transaction((txn) => {
            txn.executeSql("CREATE TABLE IF NOT EXISTS Ride_List (RIDE_ID INTEGER PRIMARY KEY AUTOINCREMENT,RIDE_TIME VARCHAR, RIDER_NAME TEXT, RIDER_CONTACT INTEGER, RIDER_ADDRESS TEXT,RIDER_LATITUDE FLOAT, RIDER_LONGITUDE FLOAT, RIDER_EMAIL VARCHAR )",
                [], (txn, result) => {
                    console.log(txn);
                    console.log(result);
                    console.log("Success creating Ride_List Table ----->>>");
                },(txn,error)=>{
                    console.log(error);
                })

        });
    }

    //-----Drop Ride-list table-----//
    dropRide_List_Table(){
        this.localDatabase.transaction((txn) => {
            txn.executeSql("DROP TABLE Ride_List", [], (txn, result) => {
                //console.log(txn);
                //console.log(result);
                console.log("Drop Ride_List Table ---@@@");
            })
        });
    }

    //-----Inserting Ride-list table using hard coded values-----//
    insertRide_List_Table(){

        return new Promise (resolve =>{
            this.localDatabase.transaction((txn) => {
                console.log("entered insert table")
                txn.executeSql("INSERT OR REPLACE INTO Ride_List ( RIDE_TIME, RIDER_NAME,RIDER_CONTACT,RIDER_ADDRESS,RIDER_LATITUDE, RIDER_LONGITUDE,RIDER_EMAIL) "+
                "VALUES ('08:00 AM','VARSHA',3169251118,'Tall Oaks Apartments 2330 N Oliver Ave, Wichita, KS 67220','37.7256','97.2786','vxnagaraj@shockers.wichita.edu'),('08:20 AM','PRIYA',2248176154,'White Chapel Memorial Gardens, 1806 N Oliver Ave, Wichita, KS 67208','37.7159','97.2799','priya_9292@hotmail.com'),('11:30 AM','ARNAV',3164168348,'Eaton Place, 517 E Douglas Ave, Wichita, KS 67202','37.6858','97.3325','varsha.nagaraj06@gmail.com'),('14:00 PM','KAVYA',6823866221,'East Hampton Estates Apartments, 2901 N Governeour St, Wichita, KS 67226','37.7363','97.2559','kavyareddysama.24@gmail.com')",
                     [],(txn, result) => {
                        console.log(txn);
                        //console.log(result);
                        console.log("Success inserting into Ride_List Table ----->>>");
                        resolve('success');
                    })

            });
        });
    }
    //-----Fetching particular Ride-list data from the table using unique Identifier-----//
    getRide_List(id){
            return new Promise (resolve => {
                this.localDatabase.transaction((txn) => {
                    txn.executeSql("SELECT * FROM Ride_List WHERE RIDE_ID = '" + id + "'",
                        [], (txn, data) => {
                            // console.log(data);
                            let currentRow, table_data = [];

                            for(let key in data.rows){
                                if(data.rows.hasOwnProperty(key)){
                                    console.log(key + " ==> " + data.rows[key]);
                                    currentRow = data.rows[key];
                                    table_data.push(currentRow);
                                }
                            }
                            resolve(table_data);
                        },(txn, error) => {
                            // console.log(error);
                        })
                })
            })
        }


    //-----Fetching complete Ride-list table-----//
    getAllRide_List_Table(){
        return new Promise (resolve => {
            this.localDatabase.transaction((txn) => {
                txn.executeSql("SELECT * FROM Ride_List",
                    [], (txn, data) => {
                        console.log(data);
                        let currentRow, table_data = [];

                        for(let key in data.rows){
                            if(data.rows.hasOwnProperty(key)){
                                //console.log(key + " ==> " + data.rows[key]);
                                currentRow = data.rows[key];
                                table_data.push(currentRow);
                            }
                        }
                        resolve(table_data);
                    })
            })
        })
    }

    //-----Creating User-list table after signing up-----//
    createUserTable(){
        this.localDatabase.transaction((txn) => {
            txn.executeSql("CREATE TABLE IF NOT EXISTS users (id INTEGER  PRIMARY KEY AUTOINCREMENT ,  username TEXT, password TEXT ,identitynum INTEGER ,contact INTEGER,  userProfile TEXT,email TEXT)",
                [], (txn, result) => {
                    console.log(txn);
                    console.log(result);
                    console.log("Success creating Users Table ----->>>");
                },(txn,error)=>{
                    console.log(error);
                })
        });
    }

    //-----Drop User-list table-----//
    dropUserTable(){
        this.localDatabase.transaction((txn) => {
            txn.executeSql("DROP TABLE users", [], (txn, result) => {
                //console.log(txn);
                //console.log(result);
                console.log("Drop users Table ---@@@");
            })
        });
    }

    //-----Inserting User-list table-----//
    insertUserTable(username,password,identitynum,contact, userProfile,email){
        return new Promise (resolve =>{
            this.localDatabase.transaction((txn) => {
                console.log("entered insert table")

                txn.executeSql("INSERT OR REPLACE INTO users (username,password,identitynum,contact, userProfile,email) VALUES (?,?,?,?,?,?)",
                   
                    [username,password,identitynum,contact, userProfile,email], (txn, result) => {
                        console.log(txn);
                        console.log(result);
                        console.log("Success inserting into users Table ----->>>");
                        resolve('success');
                    })
            });
        });
    }
}