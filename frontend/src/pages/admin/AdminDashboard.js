import Navbar from "../../components/Navbar";

const AdminDashboard = () => {
    return (
        <>
            <Navbar />

            <div className='w-full h-full flex flex-col items-center justify-center'>
                <div className="min-h-[100vh] container mx-auto pt-36 px-6">
                    Welcome, Admin!
                </div>
            </div>
        </>
    );
}

export default AdminDashboard;