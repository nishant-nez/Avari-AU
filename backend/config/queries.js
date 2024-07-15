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
    categories c ON p.category_id = c.id
JOIN 
    vendors v ON p.vendor_id = v.id
WHERE v.id = $1;
`;
const addProduct = "INSERT INTO products (name, category_id, price, unit, image, description, vendor_id) VALUES ($1, $2, $3, $4, $5, $6, $7)";
const updateProduct = "UPDATE products SET name = $1, category_id = $2, price = $3, unit = $4, description = $5, vendor_id = $6 WHERE id = $7";
const updateProductImage = "UPDATE products SET image = $1 WHERE id = $2"
const deleteProduct = "DELETE FROM products WHERE id = $1";

// default_values
const getMinimumOrder = "SELECT * FROM default_values LIMIT 1";
const updateMinimumOrder = "UPDATE default_values set minimum_order = $1"


module.exports = {
    // vendors
    getVendors,
    getVendorById,
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
    addProduct,
    updateProduct,
    updateProductImage,
    deleteProduct,
    // minimum_order
    getMinimumOrder,
    updateMinimumOrder,
}