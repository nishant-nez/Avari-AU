// vendors
const getVendors = "SELECT * FROM vendors";
const getVendorById = "SELECT * FROM vendors WHERE id = $1";
const checkVendorEmailExists = "SELECT * FROM vendors WHERE email = $1";
const addVendor = "INSERT INTO vendors (name, email, password, location, state, country, latitude, longitude, phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";
const updateVendor = "UPDATE vendors SET name = $1, email = $2, password = $3, location = $4, state = $5, country = $6, latitude = $7, longitude = $8, phone = $9 WHERE id = $10";
const deleteVendor = "DELETE FROM vendors WHERE id = $1";


module.exports = {
    getVendors,
    getVendorById,
    checkVendorEmailExists,
    addVendor,
    updateVendor,
    deleteVendor,
}