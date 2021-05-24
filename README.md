# GraphQL(サーバー)
GraphQL(サーバー)側のサンプルプログラム

## 準備
srcに移動して、nodejsで起動する。
```sh
cd src
node server.js
```

以下のアドレスにブラウザからアクセスする。
- [http://localhost:4000/graphql]

以下のクエリを定義する(左上側)
```
query MessageQuery($id: Int!) {
  message(id: $id) {
      id
      message
  }
}

query ViewAll{
  messages {
      id
      message
  }
}

mutation AddMessage($message: String!) {
  addMessage(message: $message){
      id
      message
  }
}

mutation UpdateMesage($id: Int!, $message: String!){
  updateMessage(id: $id, message: $message){
      id
      message
  }
}
```

## クエリを実行する
### ViewAll(メッセージの全件表示)
スタートボタンを押し、ViewAll を選択する。  
右側に結果が表示され、表示内容は"database.json"の中身になる。

### MessageQuery(メッセージの1件表示)
左下のQUERY VARIABLESを開く。  
以下のデータを入力する。
```
{
  "id" : 0
}
```
スタートボタンを押し、MessageQueryを選択する。

### AddMessage(メッセージの追加)
左下のQUERY VARIABLESを開く。  
以下のデータを入力する。
```
{
  "message" : "hello"
}
```
スタートボタンを押し、AddMessageを選択する。

### UpdateMessage(メッセージの1件更新)
左下のQUERY VARIABLESを開く。  
以下のデータを入力する。
```
{
  "id" : 3,
  "message" : "bye"
}
```
スタートボタンを押し、UpdateMessageを選択する。
