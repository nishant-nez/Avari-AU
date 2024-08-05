// vendors
const getVendors = "SELECT * FROM vendors";
const getVendorById = "SELECT * FROM vendors WHERE id = $1";
const checkVendorEmailExists = "SELECT * FROM vendors WHERE email = $1";
const addVendor = "INSERT INTO vendors (name, email, password, location, state, country, latitude, longitude, phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";
const updateVendor = "UPDATE vendors SET name = $1, email = $2, password = $3, location = $4, state = $5, country = $6, latitude = $7, longitude = $8, phone = $9 WHERE id = $10";
const updateVendorPassword = "UPDATE vendors SET name = $1, email = $2, location = $3, state = $4, country = $5, latitude = $6, longitude = $7, phone = $8 WHERE id = $9";
const deleteVendor = "DELETE FROM vendors WHERE id = $1";

// admin
const getAdmins = "SELECT * FROM admins";
const getAdminById = "SELECT * FROM admins WHERE id = $1";
const getAdminEmails = "SELECT email FROM admins";
const checkAdminUsernameExists = "SELECT * FROM admins WHERE username = $1";
const checkAdminEmailExists = "SELECT * FROM admins WHERE email = $1";
const addAdmin = "INSERT INTO admins (username, email, password) VALUES ($1, $2, $3)";
const updateAdmin = "UPDATE vendors SET username = $1, email = $2, password = $3 WHERE id = $4";

// category
const getCategories = "SELECT * FROM categories";
const getCategoryById = "SELECT * FROM categories WHERE id = $1";
const addCategory = "INSERT INTO categories (name) VALUES ($1)";
const updateCategory = "UPDATE categories SET name = $1 WHERE id = $2";
const deleteCategory = "DELETE FROM categories WHERE id = $1";

// product
const getProducts = `
SELECT 
    p.id,
    p.name,
    p.price,
    p.unit,
    p.image,
    p.description,
    p.created_at,
    p.updated_at,
    s.quantity as stock,
    json_build_object(
        'id', c.id,
        'name', c.name
    ) AS category,
    json_build_object(
        'id', v.id,
        'name', v.name,
        'email', v.email,
        'location', v.location,
        'state', v.state,
        'country', v.country,
        'latitude', v.latitude,
        'longitude', v.longitude,
        'phone', v.phone
    ) AS vendor
FROM 
    products p
JOIN
    stocks s ON p.id = s.product_id
JOIN 
    categories c ON p.category_id = c.id
JOIN 
    vendors v ON p.vendor_id = v.id;
`;
const getProductById = `
SELECT 
    p.id,
    p.name,
    p.price,
    p.unit,
    p.image,
    p.description,
    p.created_at,
    p.updated_at,
    s.quantity as stock,
    json_build_object(
        'id', c.id,
        'name', c.name
    ) AS category,
    json_build_object(
        'id', v.id,
        'name', v.name,
        'email', v.email,
        'location', v.location,
        'state', v.state,
        'country', v.country,
        'latitude', v.latitude,
        'longitude', v.longitude,
        'phone', v.phone
    ) AS vendor
FROM 
    products p
JOIN
    stocks s ON p.id = s.product_id
JOIN 
    categories c ON p.category_id = c.id
JOIN 
    vendors v ON p.vendor_id = v.id
WHERE p.id = $1;
`;
const getProductsByCategory = `
SELECT 
    p.id,
    p.name,
    p.price,
    p.unit,
    p.image,
    p.description,
    p.created_at,
    p.updated_at,
    s.quantity as stock,
    json_build_object(
        'id', c.id,
        'name', c.name
    ) AS category,
    json_build_object(
        'id', v.id,
        'name', v.name,
        'email', v.email,
        'location', v.location,
        'state', v.state,
        'country', v.country,
        'latitude', v.latitude,
        'longitude', v.longitude,
        'phone', v.phone
    ) AS vendor
FROM 
    products p
JOIN
    stocks s ON p.id = s.product_id
JOIN 
    categories c ON p.category_id = c.id
JOIN 
    vendors v ON p.vendor_id = v.id
WHERE c.id = $1;
`;
const getProductsByVendor = `
SELECT 
    p.id,
    p.name,
    p.price,
    p.unit,
    p.image,
    p.description,
    p.created_at,
    p.updated_at,
    s.quantity as stock,
    json_build_object(
        'id', c.id,
        'name', c.name
    ) AS category,
    json_build_object(
        'id', v.id,
        'name', v.name,
        'email', v.email,
        'location', v.location,
        'state', v.state,
        'country', v.country,
        'latitude', v.latitude,
        'longitude', v.longitude,
        'phone', v.phone
    ) AS vendor
FROM 
    products p
JOIN
    stocks s ON p.id = s.product_id
JOIN 
    categories c ON p.category_id = c.id
JOIN 
    vendors v ON p.vendor_id = v.id
WHERE v.id = $1;
`;
const getProductByPriceName = "SELECT id, vendor_id FROM products WHERE price = $1 AND name = $2";
const addProduct = "INSERT INTO products (name, category_id, price, unit, image, description, vendor_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id";
const updateProduct = "UPDATE products SET name = $1, category_id = $2, price = $3, unit = $4, description = $5, vendor_id = $6 WHERE id = $7";
const updateProductImage = "UPDATE products SET image = $1 WHERE id = $2"
const deleteProduct = "DELETE FROM products WHERE id = $1";

// default_values
const getMinimumOrder = "SELECT * FROM default_values LIMIT 1";
const updateMinimumOrder = "UPDATE default_values SET minimum_order = $1"
const getDeliveryFee = "SELECT * FROM default_values LIMIT 1";
const updateDeliveryFee = "UPDATE default_values SET delivery_fee = $1"

// orders
const getOrders = `
SELECT 
    o.id, 
    o.stripe_id, 
    o.amount_subtotal, 
    o.amount_total, 
    o.city, 
    o.country, 
    o.address_line_1, 
    o.address_line_2, 
    o.postal_code, 
    o.state, 
    o.name, 
    o.email, 
    o.phone, 
    o.currency, 
    o.shipping_cost, 
    o.status, 
    o.created_at,
    json_agg(
        json_build_object(
            'id', p.id,
            'name', p.name,
            'description', p.description,
            'price', p.price,
            'unit', p.unit,
            'image', p.image,
            'quantity', oi.quantity,
            'vendor', json_build_object(
                'id', v.id,
                'name', v.name,
                'email', v.email,
                'location', v.location,
                'state', v.state,
                'country', v.country,
                'latitude', v.latitude,
                'longitude', v.longitude,
                'phone', v.phone
            )
        )
    ) AS products
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
JOIN vendors v ON p.vendor_id = v.id
GROUP BY o.id
`;
const getOrderById = `
SELECT 
    o.id, 
    o.stripe_id, 
    o.amount_subtotal, 
    o.amount_total, 
    o.city, 
    o.country, 
    o.address_line_1, 
    o.address_line_2, 
    o.postal_code, 
    o.state, 
    o.name, 
    o.email, 
    o.phone, 
    o.currency, 
    o.shipping_cost, 
    o.status, 
    o.created_at,
    json_agg(
        json_build_object(
            'id', p.id,
            'name', p.name,
            'description', p.description,
            'price', p.price,
            'unit', p.unit,
            'image', p.image,
            'quantity', oi.quantity,
            'vendor', json_build_object(
                'id', v.id,
                'name', v.name,
                'email', v.email,
                'location', v.location,
                'state', v.state,
                'country', v.country,
                'latitude', v.latitude,
                'longitude', v.longitude,
                'phone', v.phone
            )
        )
    ) AS products
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
JOIN vendors v ON p.vendor_id = v.id
WHERE o.id = $1
GROUP BY o.id
`;
const addOrder = `
INSERT INTO orders (
    stripe_id, 
    amount_subtotal, 
    amount_total, 
    city, 
    country, 
    address_line_1, 
    address_line_2, 
    postal_code, 
    state, 
    name, 
    email, 
    phone, 
    currency, 
    shipping_cost, 
    status
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15
) RETURNING id;
`;
const updateOrderStatus = "UPDATE orders SET status = $1 WHERE id = $2";
const deleteOrder = "DELETE FROM orders WHERE id = $1";

// order_items
const getOrderItems = "SELECT * FROM order_items";
const getOrderItemsById = "SELECT * FROM order_items WHERE id = $1";
const getOrderItemsByOrderId = "SELECT * FROM order_items WHERE order_id = $1";
const getOrderItemsByVendorId = "SELECT * FROM order_items WHERE vendor_id = $1";
const getOrderItemsByProductId = "SELECT * FROM order_items WHERE product_id = $1";
const addOrderItem = "INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3)";

// stocks
const getStocks = "SELECT * FROM stocks";
const getStockById = "SELECT * FROM stocks WHERE id = $1";
const getStockByProductId = "SELECT * FROM stocks WHERE product_id = $1";
const addStock = "INSERT INTO stocks (product_id, quantity) VALUES ($1, $2)";
const updateStock = "UPDATE stocks SET quantity = $1 WHERE product_id = $2";
const reduceStock = "UPDATE stocks SET quantity = quantity - $1 WHERE product_id = $2";
const increaseStock = "UPDATE stocks SET quantity = quantity + $1 WHERE product_id = $2";
const deleteStock = "DELETE FROM stocks WHERE id = $1";


module.exports = {
    // vendors
    getVendors,
    getVendorById,
    getAdminEmails,
    checkVendorEmailExists,
    addVendor,
    updateVendor,
    updateVendorPassword,
    deleteVendor,
    // admin
    getAdmins,
    getAdminById,
    checkAdminUsernameExists,
    checkAdminEmailExists,
    addAdmin,
    updateAdmin,
    // category
    getCategories,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory,
    // product
    getProducts,
    getProductById,
    getProductsByCategory,
    getProductsByVendor,
    getProductByPriceName,
    addProduct,
    updateProduct,
    updateProductImage,
    deleteProduct,
    // minimum_order
    getMinimumOrder,
    updateMinimumOrder,
    // delivery_fee
    getDeliveryFee,
    updateDeliveryFee,
    // orders
    getOrders,
    getOrderById,
    addOrder,
    updateOrderStatus,
    deleteOrder,
    // order_items
    getOrderItems,
    getOrderItemsById,
    getOrderItemsByOrderId,
    getOrderItemsByVendorId,
    getOrderItemsByProductId,
    addOrderItem,
    // stocks
    getStocks,
    getStockById,
    getStockByProductId,
    addStock,
    updateStock,
    reduceStock,
    increaseStock,
    deleteStock,
}