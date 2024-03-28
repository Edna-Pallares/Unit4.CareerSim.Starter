# Unit4.CareerSim.Starter
//Table Design
/* ---Product---
id (UUID generated)
name
price
num_inventory


---User---
id (UUID generated)
name
address
credit_card_num
isAdmin BOOLEAN

---Carted_Products---
id (UUID generated)
user_id (foreign key)
product_id (foreign key)
amount
constraint one_product UNIQUE (user_id, product_id)
constraint valid_amount CHECK (amount <= product_inventory)

*/