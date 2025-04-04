-- mysql

-- 읽기 전용 사용자 생성 및 권한 부여
CREATE USER 'readonly_user'@'%' IDENTIFIED BY 'read_pw_jjjj';
GRANT SELECT ON comparedb.* TO 'readonly_user'@'%';
FLUSH PRIVILEGES;


-- Customers 테이블
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(40) NOT NULL,
    contact_name VARCHAR(30),
    country VARCHAR(15)
);

-- Products 테이블
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(40) NOT NULL,
    category VARCHAR(15),
    unit_price DECIMAL(10, 2)
);

-- Orders 테이블
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    total_amount DECIMAL(12, 2),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- OrderDetails 테이블
CREATE TABLE order_details (
    order_id INT,
    product_id INT,
    unit_price DECIMAL(10, 2),
    quantity INT,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);





INSERT INTO customers (company_name, contact_name, country) VALUES ('Alfreds Futterkiste', 'Maria Anders', 'Germany');
INSERT INTO customers (company_name, contact_name, country) VALUES ('Ana Trujillo Emparedados y helados', 'Ana Trujillo', 'Mexico');
INSERT INTO customers (company_name, contact_name, country) VALUES ('Antonio Moreno Taquería', 'Antonio Moreno', 'Mexico');
INSERT INTO customers (company_name, contact_name, country) VALUES ('Around the Horn', 'Thomas Hardy', 'USA');
INSERT INTO customers (company_name, contact_name, country) VALUES ('Berglunds snabbköp', 'Christina Berglund', 'Sweden');
INSERT INTO customers (company_name, contact_name, country) VALUES ('Blondel père et fils', 'Frédérique Citeaux', 'France');
INSERT INTO customers (company_name, contact_name, country) VALUES ('Bólido Comidas preparadas', 'María Gutierrez', 'Mexico');
INSERT INTO customers (company_name, contact_name, country) VALUES ('Bon app', 'Laurent Perrin', 'France');
INSERT INTO customers (company_name, contact_name, country) VALUES ('Cactus Comidas para llevar', 'Patricia Mendez', 'Spain');
INSERT INTO customers (company_name, contact_name, country) VALUES ('Centro comercial Moctezuma', 'Francisco Chang', 'Mexico');
INSERT INTO customers (company_name, contact_name, country) VALUES ('Chop-suey Chinese', 'Yang Wang', 'USA');
INSERT INTO customers (company_name, contact_name, country) VALUES ('Comércio Mineiro', 'Antonio Moreno', 'Brazil');
INSERT INTO customers (company_name, contact_name, country) VALUES ('Consolidated Holdings', 'Peter Williams', 'USA');
INSERT INTO customers (company_name, contact_name, country) VALUES ('Drachenblut', 'Hans Fischer', 'Germany');
INSERT INTO customers (company_name, contact_name, country) VALUES ('East Coast Pizza', 'Jack Brown', 'USA');
INSERT INTO customers (company_name, contact_name, country) VALUES ('Ernst Handel', 'Roland Mendel', 'Austria');
INSERT INTO customers (company_name, contact_name, country) VALUES ('Folk och fä HB', 'Bertil Jonsson', 'Sweden');
INSERT INTO customers (company_name, contact_name, country) VALUES ('Furia Bacalhau e Frutos do Mar', 'Carlos Silva', 'Portugal');
INSERT INTO customers (company_name, contact_name, country) VALUES ('Galeria del Gastrónomo', 'José Pérez', 'Spain');
INSERT INTO customers (company_name, contact_name, country) VALUES ('Gourmet Lanchonete', 'Rafael Andrade', 'Brazil');
INSERT INTO customers (company_name, contact_name, country) VALUES ('Great Lakes Food Market', 'Nancy Smith', 'USA');
INSERT INTO customers (company_name, contact_name, country) VALUES ('Hungry Coyote', 'Bill Johnson', 'USA');
INSERT INTO customers (company_name, contact_name, country) VALUES ('Island Trading', 'Helen Bennett', 'UK');
INSERT INTO customers (company_name, contact_name, country) VALUES ('Kuchnia', 'Agnieszka Kowalska', 'Poland');
INSERT INTO customers (company_name, contact_name, country) VALUES ('La maison Asie', 'Jean-Philippe Berger', 'France');
INSERT INTO customers (company_name, contact_name, country) VALUES ('Martas Cafe', 'Marta Torres', 'Mexico');
INSERT INTO customers (company_name, contact_name, country) VALUES ('Nord-Ost-Fisch Handelsgesellschaft mbH', 'Alfred Schmidt', 'Germany');
INSERT INTO customers (company_name, contact_name, country) VALUES ('Old World Delicatessen', 'Ellen Roberts', 'USA');
INSERT INTO customers (company_name, contact_name, country) VALUES ('Paris Café', 'Julien Cottin', 'France');
INSERT INTO customers (company_name, contact_name, country) VALUES ('Sushi Planet', 'Kenta Takahashi', 'Japan');
INSERT INTO customers (company_name, contact_name, country) VALUES ('Toms Bodega', 'Tom Roberts', 'USA');
INSERT INTO customers (company_name, contact_name, country) VALUES ('Waldorf-Astoria', 'Albert Schneider', 'Germany');

INSERT INTO products (product_name, category, unit_price) VALUES ('Chai', 'Beverages', 18.00);
INSERT INTO products (product_name, category, unit_price) VALUES ('Chang', 'Beverages', 19.00);
INSERT INTO products (product_name, category, unit_price) VALUES ('Aniseed Syrup', 'Condiments', 10.00);
INSERT INTO products (product_name, category, unit_price) VALUES ('Apple Juice', 'Beverages', 5.50);
INSERT INTO products (product_name, category, unit_price) VALUES ('Orange Juice', 'Beverages', 4.75);
INSERT INTO products (product_name, category, unit_price) VALUES ('Espresso', 'Beverages', 12.00);
INSERT INTO products (product_name, category, unit_price) VALUES ('Green Tea', 'Beverages', 8.00);
INSERT INTO products (product_name, category, unit_price) VALUES ('Curry Powder', 'Condiments', 11.25);
INSERT INTO products (product_name, category, unit_price) VALUES ('Hot Sauce', 'Condiments', 7.50);
INSERT INTO products (product_name, category, unit_price) VALUES ('Salsa', 'Condiments', 6.00);
INSERT INTO products (product_name, category, unit_price) VALUES ('Olive Oil', 'Condiments', 15.00);
INSERT INTO products (product_name, category, unit_price) VALUES ('Balsamic Vinegar', 'Condiments', 10.50);
INSERT INTO products (product_name, category, unit_price) VALUES ('Bottled Water', 'Beverages', 1.00);
INSERT INTO products (product_name, category, unit_price) VALUES ('Lemonade', 'Beverages', 2.50);
INSERT INTO products (product_name, category, unit_price) VALUES ('Mango Smoothie', 'Beverages', 3.75);
INSERT INTO products (product_name, category, unit_price) VALUES ('Soy Sauce', 'Condiments', 4.00);
INSERT INTO products (product_name, category, unit_price) VALUES ('Teriyaki Sauce', 'Condiments', 8.50);
INSERT INTO products (product_name, category, unit_price) VALUES ('Honey', 'Condiments', 9.00);
INSERT INTO products (product_name, category, unit_price) VALUES ('Maple Syrup', 'Condiments', 15.00);
INSERT INTO products (product_name, category, unit_price) VALUES ('Ketchup', 'Condiments', 2.50);
INSERT INTO products (product_name, category, unit_price) VALUES ('Mustard', 'Condiments', 2.00);
INSERT INTO products (product_name, category, unit_price) VALUES ('Barbecue Sauce', 'Condiments', 5.50);
INSERT INTO products (product_name, category, unit_price) VALUES ('Mayonnaise', 'Condiments', 3.25);
INSERT INTO products (product_name, category, unit_price) VALUES ('Tortilla Chips', 'Snacks', 3.00);
INSERT INTO products (product_name, category, unit_price) VALUES ('Potato Chips', 'Snacks', 2.75);
INSERT INTO products (product_name, category, unit_price) VALUES ('Chocolate Bar', 'Snacks', 1.50);
INSERT INTO products (product_name, category, unit_price) VALUES ('Granola Bar', 'Snacks', 1.00);
INSERT INTO products (product_name, category, unit_price) VALUES ('Mixed Nuts', 'Snacks', 4.50);
INSERT INTO products (product_name, category, unit_price) VALUES ('Beef Jerky', 'Snacks', 5.00);
INSERT INTO products (product_name, category, unit_price) VALUES ('Trail Mix', 'Snacks', 4.00);
INSERT INTO products (product_name, category, unit_price) VALUES ('Ice Cream', 'Desserts', 3.50);
INSERT INTO products (product_name, category, unit_price) VALUES ('Cake', 'Desserts', 15.00);
INSERT INTO products (product_name, category, unit_price) VALUES ('Brownie', 'Desserts', 2.50);
INSERT INTO products (product_name, category, unit_price) VALUES ('Cookies', 'Desserts', 4.00);

INSERT INTO orders (customer_id, order_date, total_amount) VALUES (1, '2023-07-04', 440.00);
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (2, '2023-07-05', 1863.40);
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (3, '2023-07-06', 1813.00);
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (4, '2023-07-07', 1000.00);
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (5, '2023-07-08', 1200.50);
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (6, '2023-07-09', 750.25);
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (7, '2023-07-10', 900.75);
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (8, '2023-07-11', 650.00);
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (9, '2023-07-12', 500.00);
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (10, '2023-07-13', 1100.25);
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (11, '2023-07-14', 300.00);
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (12, '2023-07-15', 450.00);
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (13, '2023-07-16', 1250.50);
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (14, '2023-07-17', 900.00);
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (15, '2023-07-18', 300.75);
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (16, '2023-07-19', 1800.00);
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (17, '2023-07-20', 950.00);
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (18, '2023-07-21', 1300.00);
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (19, '2023-07-22', 1400.50);
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (20, '2023-07-23', 800.00);
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (21, '2023-07-24', 600.00);
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (22, '2023-07-25', 500.00);
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (23, '2023-07-26', 400.25);
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (24, '2023-07-27', 700.00);
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (25, '2023-07-28', 800.75);
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (26, '2023-07-29', 350.50);
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (27, '2023-07-30', 600.00);
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (28, '2023-07-31', 850.00);
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (29, '2023-08-01', 900.00);
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (30, '2023-08-02', 950.00);


INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (1, 1, 18.00, 12);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (1, 2, 19.00, 10);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (2, 1, 18.00, 5);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (2, 3, 10.00, 5);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (3, 2, 19.00, 20);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (4, 4, 12.00, 15);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (4, 5, 15.00, 10);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (5, 6, 25.00, 4);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (5, 7, 8.00, 8);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (6, 8, 22.00, 6);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (6, 9, 5.00, 3);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (7, 10, 30.00, 9);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (7, 11, 9.00, 7);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (8, 12, 14.00, 2);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (8, 13, 7.50, 1);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (9, 14, 20.00, 10);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (9, 15, 12.50, 5);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (10, 16, 16.00, 8);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (10, 17, 11.00, 4);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (11, 18, 27.00, 3);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (11, 19, 4.00, 2);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (12, 20, 33.00, 5);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (12, 21, 6.00, 10);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (13, 22, 28.00, 4);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (13, 23, 13.00, 2);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (14, 24, 21.00, 7);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (14, 25, 18.00, 3);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (15, 26, 29.00, 6);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (15, 27, 17.00, 8);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (16, 28, 15.00, 5);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (16, 29, 14.50, 4);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (17, 30, 26.00, 1);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (17, 1, 18.00, 7);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (18, 2, 19.00, 2);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (18, 3, 10.00, 3);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (19, 4, 12.00, 6);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (19, 5, 15.00, 2);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (20, 6, 25.00, 4);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (20, 7, 8.00, 1);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (21, 8, 22.00, 3);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (21, 9, 5.00, 2);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (22, 10, 30.00, 5);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (22, 11, 9.00, 10);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (23, 12, 14.00, 4);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (23, 13, 7.50, 8);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (24, 14, 20.00, 6);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (24, 15, 12.50, 3);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (25, 16, 16.00, 5);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (25, 17, 11.00, 4);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (26, 18, 27.00, 2);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (26, 19, 4.00, 1);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (27, 20, 33.00, 3);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (27, 21, 6.00, 10);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (28, 22, 28.00, 1);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (28, 23, 13.00, 5);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (29, 24, 21.00, 2);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (29, 25, 18.00, 4);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (30, 26, 29.00, 3);
INSERT INTO order_details (order_id, product_id, unit_price, quantity) VALUES (30, 27, 17.00, 2);



