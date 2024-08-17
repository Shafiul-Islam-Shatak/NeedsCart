
const Footer = () => {
    return (
        <div className="mt-10">
            <footer className="footer footer-center bg-gray-500 text-base-content p-4">
                <aside>
                    <p className="text-white">Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
                </aside>
            </footer>

        </div>
    );
};

export default Footer;