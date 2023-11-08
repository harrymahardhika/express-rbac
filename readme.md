## Command References

```
npx sequelize model:generate --name Role --attributes name:string
npx sequelize model:generate --name Permission --attributes name:string
npx sequelize model:generate --name User --attributes name:string,email:string,password:string,roleId:integer
npx sequelize model:generate --name Token --attributes token:string,userId:integer
npx sequelize seed:generate --name role-seeder
npx sequelize seed:generate --name permission-seeder
npx sequelize seed:generate --name user-seeder
npx sequelize migration:create --name create-permission-role

npx sequelize db:migrate:undo:all; npx sequelize db:migrate;
npx sequelize db:seed:undo:all; npx sequelize db:seed:all;
```
