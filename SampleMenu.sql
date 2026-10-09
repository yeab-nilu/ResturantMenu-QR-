-- ============================================================
-- NILUS RESTAURANT - SAMPLE MENU
-- 10 ITEMS PER CATEGORY = 70 ITEMS
-- ============================================================

-- ============================================================
-- BREAKFAST
-- ============================================================

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Nilus Special Breakfast',
       'A generous breakfast platter with eggs, bread, butter, cheese and fresh vegetables.',
       380, true, 1
FROM public.categories WHERE name = 'Breakfast';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Chechebsa',
       'Traditional Ethiopian flatbread mixed with spiced butter and honey.',
       220, true, 2
FROM public.categories WHERE name = 'Breakfast';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Foul',
       'Seasoned mashed fava beans served with fresh vegetables and bread.',
       180, true, 3
FROM public.categories WHERE name = 'Breakfast';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Scrambled Eggs',
       'Fresh scrambled eggs served with bread and vegetables.',
       200, true, 4
FROM public.categories WHERE name = 'Breakfast';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Omelette',
       'Three-egg omelette with onion, tomato, green pepper and cheese.',
       230, true, 5
FROM public.categories WHERE name = 'Breakfast';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Egg Sandwich',
       'Egg sandwich with fresh vegetables and house sauce.',
       210, true, 6
FROM public.categories WHERE name = 'Breakfast';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Pancakes',
       'Fluffy pancakes served with honey and fresh fruit.',
       250, true, 7
FROM public.categories WHERE name = 'Breakfast';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'French Toast',
       'Golden French toast served with honey and fresh fruit.',
       240, true, 8
FROM public.categories WHERE name = 'Breakfast';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Breakfast Sandwich',
       'Egg, cheese and vegetables served in toasted bread.',
       260, true, 9
FROM public.categories WHERE name = 'Breakfast';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Avocado Toast',
       'Toasted bread topped with seasoned avocado and fresh vegetables.',
       280, true, 10
FROM public.categories WHERE name = 'Breakfast';


-- ============================================================
-- BURGERS
-- ============================================================

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Classic Beef Burger',
       'Juicy beef patty with lettuce, tomato, onion and house sauce.',
       420, true, 1
FROM public.categories WHERE name = 'Burgers';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Cheese Burger',
       'Classic beef burger topped with melted cheese and house sauce.',
       470, true, 2
FROM public.categories WHERE name = 'Burgers';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Double Beef Burger',
       'Two juicy beef patties with cheese, lettuce, tomato and special sauce.',
       620, true, 3
FROM public.categories WHERE name = 'Burgers';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Chicken Burger',
       'Crispy chicken fillet with lettuce, tomato and house sauce.',
       430, true, 4
FROM public.categories WHERE name = 'Burgers';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Spicy Chicken Burger',
       'Crispy spicy chicken fillet with fresh vegetables and spicy sauce.',
       460, true, 5
FROM public.categories WHERE name = 'Burgers';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'BBQ Beef Burger',
       'Beef patty with cheddar cheese, onions and smoky BBQ sauce.',
       490, true, 6
FROM public.categories WHERE name = 'Burgers';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Mushroom Burger',
       'Beef burger topped with sautéed mushrooms and cheese.',
       500, true, 7
FROM public.categories WHERE name = 'Burgers';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Bacon Cheese Burger',
       'Beef patty with cheese, crispy bacon, lettuce and special sauce.',
       550, true, 8
FROM public.categories WHERE name = 'Burgers';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Veggie Burger',
       'Homemade vegetable patty with lettuce, tomato and house sauce.',
       380, true, 9
FROM public.categories WHERE name = 'Burgers';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Nilus Special Burger',
       'Signature double beef burger with cheese, vegetables and special Nilus sauce.',
       650, true, 10
FROM public.categories WHERE name = 'Burgers';


-- ============================================================
-- PIZZA
-- ============================================================

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Margherita Pizza',
       'Classic pizza with tomato sauce, mozzarella and fresh basil.',
       550, true, 1
FROM public.categories WHERE name = 'Pizza';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Chicken Pizza',
       'Pizza topped with seasoned chicken, mozzarella and vegetables.',
       680, true, 2
FROM public.categories WHERE name = 'Pizza';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Beef Pizza',
       'Pizza topped with seasoned beef, cheese, onions and peppers.',
       700, true, 3
FROM public.categories WHERE name = 'Pizza';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Pepperoni Pizza',
       'Classic pizza topped with pepperoni and melted mozzarella.',
       720, true, 4
FROM public.categories WHERE name = 'Pizza';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Vegetable Pizza',
       'Fresh vegetables, tomato sauce and mozzarella cheese.',
       580, true, 5
FROM public.categories WHERE name = 'Pizza';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Mushroom Pizza',
       'Mozzarella pizza topped with fresh mushrooms and herbs.',
       620, true, 6
FROM public.categories WHERE name = 'Pizza';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Hawaiian Pizza',
       'Chicken, pineapple, mozzarella and tomato sauce.',
       690, true, 7
FROM public.categories WHERE name = 'Pizza';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Four Cheese Pizza',
       'Creamy blend of four cheeses baked over our signature crust.',
       750, true, 8
FROM public.categories WHERE name = 'Pizza';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'BBQ Chicken Pizza',
       'Chicken, mozzarella, onions and smoky BBQ sauce.',
       720, true, 9
FROM public.categories WHERE name = 'Pizza';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Nilus Special Pizza',
       'Signature pizza with beef, chicken, vegetables and extra cheese.',
       820, true, 10
FROM public.categories WHERE name = 'Pizza';


-- ============================================================
-- JUICES (SMOOTHIE)
-- ============================================================

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Mango Smoothie',
       'Creamy fresh mango smoothie.',
       180, true, 1
FROM public.categories WHERE name = 'Juices (Smoothie)';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Avocado Smoothie',
       'Fresh creamy avocado blended into a smooth drink.',
       220, true, 2
FROM public.categories WHERE name = 'Juices (Smoothie)';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Banana Smoothie',
       'Fresh banana blended with milk.',
       180, true, 3
FROM public.categories WHERE name = 'Juices (Smoothie)';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Strawberry Smoothie',
       'Fresh strawberry smoothie with a creamy finish.',
       220, true, 4
FROM public.categories WHERE name = 'Juices (Smoothie)';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Pineapple Juice',
       'Freshly blended pineapple juice.',
       170, true, 5
FROM public.categories WHERE name = 'Juices (Smoothie)';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Papaya Juice',
       'Fresh papaya juice blended to order.',
       170, true, 6
FROM public.categories WHERE name = 'Juices (Smoothie)';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Orange Juice',
       'Freshly squeezed orange juice.',
       180, true, 7
FROM public.categories WHERE name = 'Juices (Smoothie)';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Mixed Fruit Juice',
       'Refreshing blend of seasonal fresh fruits.',
       220, true, 8
FROM public.categories WHERE name = 'Juices (Smoothie)';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Mango Avocado Smoothie',
       'Creamy combination of fresh mango and avocado.',
       250, true, 9
FROM public.categories WHERE name = 'Juices (Smoothie)';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Papaya Banana Smoothie',
       'Smooth blend of papaya and banana.',
       220, true, 10
FROM public.categories WHERE name = 'Juices (Smoothie)';


-- ============================================================
-- HOT DRINKS
-- ============================================================

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Ethiopian Coffee',
       'Freshly roasted and traditionally prepared Ethiopian coffee.',
       90, true, 1
FROM public.categories WHERE name = 'Hot Drinks';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Macchiato',
       'Espresso topped with steamed milk foam.',
       100, true, 2
FROM public.categories WHERE name = 'Hot Drinks';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Double Macchiato',
       'Double espresso with steamed milk foam.',
       130, true, 3
FROM public.categories WHERE name = 'Hot Drinks';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Cappuccino',
       'Espresso with steamed milk and rich foam.',
       140, true, 4
FROM public.categories WHERE name = 'Hot Drinks';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Caffe Latte',
       'Smooth espresso blended with steamed milk.',
       150, true, 5
FROM public.categories WHERE name = 'Hot Drinks';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Espresso',
       'Rich and concentrated freshly brewed espresso.',
       90, true, 6
FROM public.categories WHERE name = 'Hot Drinks';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Tea',
       'Hot freshly brewed black tea.',
       70, true, 7
FROM public.categories WHERE name = 'Hot Drinks';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Ginger Tea',
       'Hot tea infused with fresh ginger.',
       90, true, 8
FROM public.categories WHERE name = 'Hot Drinks';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Hot Chocolate',
       'Rich creamy hot chocolate.',
       160, true, 9
FROM public.categories WHERE name = 'Hot Drinks';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Spiced Tea',
       'Aromatic tea prepared with warm Ethiopian spices.',
       90, true, 10
FROM public.categories WHERE name = 'Hot Drinks';


-- ============================================================
-- SOFT DRINKS
-- ============================================================

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Cola',
       'Chilled cola soft drink.',
       80, true, 1
FROM public.categories WHERE name = 'Soft Drinks';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Fanta Orange',
       'Chilled orange-flavored soft drink.',
       80, true, 2
FROM public.categories WHERE name = 'Soft Drinks';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Sprite',
       'Chilled lemon-lime soft drink.',
       80, true, 3
FROM public.categories WHERE name = 'Soft Drinks';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Pepsi',
       'Chilled Pepsi soft drink.',
       80, true, 4
FROM public.categories WHERE name = 'Soft Drinks';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Mirinda',
       'Chilled fruit-flavored soft drink.',
       80, true, 5
FROM public.categories WHERE name = 'Soft Drinks';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, '7UP',
       'Chilled lemon-lime flavored soft drink.',
       80, true, 6
FROM public.categories WHERE name = 'Soft Drinks';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Mineral Water',
       'Cold bottled mineral water.',
       40, true, 7
FROM public.categories WHERE name = 'Soft Drinks';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Tonic Water',
       'Refreshing chilled tonic water.',
       100, true, 8
FROM public.categories WHERE name = 'Soft Drinks';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Ginger Ale',
       'Chilled ginger-flavored sparkling drink.',
       100, true, 9
FROM public.categories WHERE name = 'Soft Drinks';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Sparkling Water',
       'Chilled carbonated mineral water.',
       90, true, 10
FROM public.categories WHERE name = 'Soft Drinks';


-- ============================================================
-- TRADITIONAL FOOD
-- ============================================================

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Doro Wot',
       'Traditional Ethiopian spicy chicken stew served with injera.',
       590, true, 1
FROM public.categories WHERE name = 'Traditional Food';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Shiro',
       'Traditional Ethiopian chickpea stew seasoned with spices and served with injera.',
       300, true, 2
FROM public.categories WHERE name = 'Traditional Food';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Beef Tibs',
       'Sautéed beef cubes with onion, peppers and Ethiopian spices.',
       520, true, 3
FROM public.categories WHERE name = 'Traditional Food';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Special Tibs',
       'Tender beef sautéed with vegetables, rosemary and Ethiopian spices.',
       650, true, 4
FROM public.categories WHERE name = 'Traditional Food';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Kitfo',
       'Traditional seasoned minced beef dish served with Ethiopian sides.',
       650, true, 5
FROM public.categories WHERE name = 'Traditional Food';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Gored Gored',
       'Traditional seasoned beef cubes prepared with Ethiopian spices.',
       620, true, 6
FROM public.categories WHERE name = 'Traditional Food';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Vegetable Firfir',
       'Pieces of injera mixed with vegetables and traditional spices.',
       280, true, 7
FROM public.categories WHERE name = 'Traditional Food';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Beef Firfir',
       'Shredded injera mixed with seasoned beef and spicy sauce.',
       380, true, 8
FROM public.categories WHERE name = 'Traditional Food';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Beyaynetu',
       'Assortment of traditional Ethiopian vegetable and meat dishes served with injera.',
       450, true, 9
FROM public.categories WHERE name = 'Traditional Food';

INSERT INTO public.menu_items
(category_id, name, description, price, available, display_order)
SELECT id, 'Vegetarian Combination',
       'Selection of traditional vegetarian dishes served with fresh injera.',
       380, true, 10
FROM public.categories WHERE name = 'Traditional Food';


-- ============================================================
-- CHECK THE RESULT
-- ============================================================

SELECT
    c.name AS category,
    COUNT(m.id) AS number_of_items
FROM public.categories c
LEFT JOIN public.menu_items m
    ON m.category_id = c.id
GROUP BY c.id, c.name
ORDER BY c.display_order;