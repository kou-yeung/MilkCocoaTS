// Type definitions for milkcocoa SDK
// milkcocoa : https://mlkcca.com/
// doc : https://mlkcca.com/document/api-js.html

// MilkCocoa
declare module milkcocoa {
    interface AddAccount {
        FormatError: number;            // 無効な書式のメールアドレスです。
        AlreadyExist: number;           // 既に追加されているメールアドレスです。
    }
    interface Login {
        FormatError: number;            // メールアドレスのフォーマットが無効です。
        LoginError: number;             // 無効なパスワードです。
        EmailNotVerificated: number;    // メールアドレスが認証されていません。
    }
    interface GetCurrentUser {
        NotLoggedIn: number;            // 現在どのユーザーとしてもログインしていません。
    }
    interface Error {
        AddAccount: AddAccount;
        Login: Login;
    }
    // データストアへの接続を確立し、通信に使うオブジェクト
    export class MilkCocoa {
        static Error: Error;
        constructor(host: string, cb?: () => void);
        // データの保存や取得の命令を出すため、データストアとの通信を行うDataStoreオブジェクトを取得します。
        dataStore(path:string) : DataStore;
        // 新しいログインアカウントを作成します。
        addAccount(email: string, password: string, options: string, callback: (err: number, user: Object)=>void);
        // ログインの処理を行います。
        login(email: string, password: string, callback: (err: number, user: Object) => void);
        // ログアウトの処理を行います。
        logout(callback?:(err:number)=>void);
        // 現在ログインしているユーザの情報を取得します。ユーザーのログイン・非ログインで表示する情報を切り分けるなどして利用します。
        getCurrentUser(callback: (err: number, user: Object) => void): Object;
    }
}
// DataStoreはデータのやり取りを行うためのオブジェクトです。
declare module milkcocoa {
    export class DataStore {
        // データストアに新しくデータを追加します。
        push(object: Object, callback?: (data) => void);
        // データストアの要素を変更します。
        set(id: string, data: Object);
        // データストアからデータを削除します。
        remove(id: string);
        // データストアにデータを残さず、現在接続されているユーザーにデータを送信することができます。
         send(object: Object);
        // データストアへのイベントを登録します。
         on(event: string, callback: (data: any) => void);
        // データストアに登録されたイベントを解除します。
         off(event: string);
        // 特定のデータストア要素を取得することができます。
         get(id: string, callback: (data: Object) => void);
        // データストアからデータをまとめて取得します。
         query(condition?: Object): Query;
        // 子のデータストアを取得するメソッドできます。
         child(path: string): DataStore;
        // 親のデータストアを取得するメソッドです。
         parent(): DataStore;
        // ルートのデータストアを取得するメソッドです。
         root(): DataStore;
    }
}
declare module milkcocoa {
    export class Query {
        // データストアからデータの取得を行います。
         done(callback: (data:any[]) => void);
        // 取得件数に制限をかけます。
         limit(number: number): Query;
        // 読み飛ばすデータ数を指定します。
         skip(index: number): Query;
        // 指定した要素でデータを降順にソートします。
         sort(mode: string): Query;
    }
}

import MilkCocoa = milkcocoa.MilkCocoa;
import DataStore = milkcocoa.DataStore;
import Query = milkcocoa.Query;

